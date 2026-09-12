<?php

namespace Tests\Feature;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Tests\TestCase;

class SaleAgreementUploadTest extends TestCase
{
    private function upload(array $extra = [], string $data = 'ProjectID=268&UserID=30186')
    {
        return $this->postJson('/agreement-for-sale/'.base64_encode($data).'/upload', $extra + [
            'file' => UploadedFile::fake()->createWithContent('SaleAgreement_268.pdf', "%PDF-1.4\n1 0 obj\n<<>>\nendobj\n%%EOF"),
        ]);
    }

    protected function setUp(): void
    {
        parent::setUp();
        config(['services.sale_agreement.api_key' => 'test-key']);
        Http::preventStrayRequests();
    }

    public function test_upload_sends_pdf_and_fixed_metadata_to_api(): void
    {
        Http::fake(['*' => Http::response(['Success' => true, 'DocumentID' => 1501])]);
        $this->upload(['ProjectID' => 999, 'DocID' => 99])->assertOk()->assertJson(['success' => true, 'documentId' => 1501]);
        Http::assertSent(function ($request) {
            return $request->url() === config('services.sale_agreement.url')
                && $request->hasHeader('X-Api-Key', 'test-key')
                && $request['ProjectID'] === 268 && $request['CreatedBy'] === 30186
                && $request['DocID'] === 25 && $request['ID'] === 0
                && $request['DocumentName'] === 'Proforma of Agreement for Sale (As per Annexure A)'
                && $request['FileName'] === 'SaleAgreement_268.pdf'
                && $request['FileType'] === 'application/pdf'
                && base64_decode($request['FileContent']) === "%PDF-1.4\n1 0 obj\n<<>>\nendobj\n%%EOF"
                && $request['FileSize'] === round(strlen(base64_decode($request['FileContent'])) / 1024, 2)
                && $request['Description'] === 'Uploaded from third party'
                && $request['Quoter'] === null && $request['QuoterYear'] === null;
        });
    }

    public function test_invalid_ids_and_non_pdf_are_rejected(): void
    {
        $this->upload([], 'ProjectID[]=268&UserID=30186')->assertUnprocessable();
        $this->upload(['file' => UploadedFile::fake()->createWithContent('bad.pdf', 'plain text')->mimeType('text/plain')])->assertUnprocessable();
        $this->upload(['file' => UploadedFile::fake()->create('large.pdf', 10241, 'application/pdf')])->assertUnprocessable();
        Http::assertNothingSent();
    }

    public function test_api_failure_is_not_reported_as_success(): void
    {
        Http::fake(['*' => Http::response(['Success' => false])]);
        $this->upload()->assertStatus(502);
        Http::fake(['*' => Http::response('Unexpected HTML', 500)]);
        $this->upload()->assertStatus(502);
    }

    public function test_connection_failure_returns_actionable_error(): void
    {
        Http::fake(function () { throw new ConnectionException('Timeout'); });
        $this->upload()->assertStatus(504);
    }

    public function test_missing_configuration_does_not_call_api(): void
    {
        config(['services.sale_agreement.api_key' => null]);
        $this->upload()->assertStatus(503);
        Http::assertNothingSent();
    }
}
