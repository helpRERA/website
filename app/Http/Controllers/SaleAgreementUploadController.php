<?php

namespace App\Http\Controllers;

use Illuminate\Http\Client\ConnectionException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;

class SaleAgreementUploadController extends Controller
{
    public function store(Request $request, string $data)
    {
        $decoded = strlen($data) <= 4096 ? base64_decode($data, true) : false;
        abort_if($decoded === false, 422, 'Invalid agreement URL.');
        parse_str($decoded, $params);
        $ids = Validator::make($params, [
            'ProjectID' => 'required|integer|min:1',
            'UserID' => 'required|integer|min:1',
        ])->validate();
        $request->validate(['file' => 'required|file|mimes:pdf|max:10240']);

        $key = config('services.sale_agreement.api_key');
        if (!$key) {
            return response()->json(['message' => 'PDF upload service is not configured.'], 503);
        }

        $file = $request->file('file');
        try {
            $response = Http::acceptJson()->withHeaders(['X-Api-Key' => $key])
                ->connectTimeout(10)->timeout(60)
                ->post(config('services.sale_agreement.url'), [
                    'ID' => 0,
                    'ProjectID' => (int) $ids['ProjectID'],
                    'DocID' => 25,
                    'DocumentName' => 'Proforma of Agreement for Sale (As per Annexure A)',
                    'FileName' => $file->getClientOriginalName(),
                    'FileContent' => base64_encode($file->get()),
                    'FileType' => 'application/pdf',
               
                    'FileSize' => round($file->getSize() / 1024, 2),
                    'CreatedBy' => (int) $ids['UserID'],
                    'Description' => 'Uploaded from third party',
                    'Quoter' => null,
                    'QuoterYear' => null,
                ]);
        } catch (ConnectionException $exception) {
            return response()->json(['message' => 'The upload service could not be reached or timed out. Check the project documents before retrying.'], 504);
        }

        if (!$response->successful() || $response->json('Success') !== true) {
            return response()->json(['message' => 'The upload service did not confirm the PDF was saved. Please check the project documents before retrying.'], 502);
        }

        return response()->json([
            'success' => true,
            'message' => 'Sale agreement uploaded successfully.',
            'documentId' => $response->json('DocumentID'),
        ]);
    }
}
