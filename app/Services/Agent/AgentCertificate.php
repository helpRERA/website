<?php

namespace App\Services\Agent;

use App\Libs\StreamFileResponse;
use App\Models\KRERA\HSMSignCert;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AgentCertificate extends StreamFileResponse
{
    public function download(string $userId): StreamedResponse
    {
        $certs = DB::connection('k_rera')->select(
            "select * from HSMSignCert where RoleID=2 and SignatureStatus='Y' and AppId in(
                select ID from tbl_UserHearingDetails where RoleID=2 and  UserID=?
            )",
            [$userId]
        );

        if (empty($certs)) {
            abort(404);
        }


        return $this->steam(
            $certs[0]->FileName,
            $certs[0]->DigitalCert,
            $certs[0]->ContentType
        );

    }
}
