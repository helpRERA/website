<?php

namespace App\Services\ExtensionCertificate;

use App\Libs\StreamFileResponse;
use Exception;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExtensionCertificateService extends StreamFileResponse
{
    /**
     * @return array|null
     */
    public function getCertificate(int $projectId): mixed
    {
        try {
            $records = DB::connection('k_rera')
                ->select(
                    'DECLARE @AppID int
                select @AppID= max(ID) from Kerala_RERA.dbo.tbl_ExtensionMapping where ProjectID=?
                and isnull(IsCertificateGenerated,0)=1
                if ((select count(*) from ExtensionHSMSignCert  With(NoLock) where AppId = @AppID )>0 )
	            begin
		            SELECT  [DgnID],[UserId],[AppId],ProjectID,Division,RoleID,[FileName],[ServiceID],[ContentType],[CreatedDate],[SignatureStatus],AppPreview,AppPublicPreview
		            ,IsReissued,ReissueCount,ReissueReason,ModifiedBy,ModifiedOn
		            FROM ExtensionHSMSignCert With(NoLock) where AppId = @AppID
	            end
                else if ((select count(*) from ExtensionDigitalSignCert where AppId=@AppID)>0)
	            begin
		            SELECT  [DgnID],[UserId],[AppId],ProjectID,Division,RoleID,[FileName],[DigitalCert] as [imagefile],[ServiceID],[ContentType],[CreatedDate],[SignatureStatus],AppPreview,AppPublicPreview
		            ,ModifiedBy,ModifiedOn
		            FROM ExtensionDigitalSignCert With(NoLock) where AppId = @AppID
	            end',
                    [$projectId]
                );
        } catch (Exception $e) {
            $records = [];
        }


        if (empty($records)) {
            return null;
        }

        return $records[0];
    }

    public function downloadCertificate(int $docId): StreamedResponse
    {
        try {
            $records = DB::connection('k_rera')
                ->select(
                    'DECLARE @AppID int
                select @AppID= max(ID) from Kerala_RERA.dbo.tbl_ExtensionMapping where ProjectID=?
                and isnull(IsCertificateGenerated,0)=1
                if ((select count(*) from ExtensionHSMSignCert  With(NoLock) where AppId = @AppID )>0 )
	            begin
		            SELECT  [DgnID],[UserId],[AppId],ProjectID,Division,RoleID,[FileName],[DigitalCert] as [imagefile],[ServiceID],[ContentType],[CreatedDate],[SignatureStatus],AppPreview,AppPublicPreview
		            ,IsReissued,ReissueCount,ReissueReason,ModifiedBy,ModifiedOn
		            FROM ExtensionHSMSignCert With(NoLock) where AppId = @AppID
	            end
                else if ((select count(*) from ExtensionDigitalSignCert where AppId=@AppID)>0)
	            begin
		            SELECT  [DgnID],[UserId],[AppId],ProjectID,Division,RoleID,[FileName],[DigitalCert] as [imagefile],[ServiceID],[ContentType],[CreatedDate],[SignatureStatus],AppPreview,AppPublicPreview
		            ,ModifiedBy,ModifiedOn
		            FROM ExtensionDigitalSignCert With(NoLock) where AppId = @AppID
	            end',
                    [$docId]
                );
        } catch (Exception $e) {
            $records = [];
        }

        if (empty($records)) {
            abort(404);
        }

        return $this->steam(
            (string) $records[0]->FileName,
            (string) $records[0]->imagefile,
            (string) $records[0]->ContentType
        );
    }
}
