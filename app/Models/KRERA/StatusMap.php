<?php

namespace App\Models\KRERA;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\StatusMap
 *
 * @property int $ID
 * @property string|null $MapID
 * @property int|null $UserID
 * @property string|null $PersonalInfo
 * @property int|null $ProjectID
 * @property int|null $Division
 * @property string|null $BuildingCount
 * @property string|null $Cost
 * @property string|null $Document
 * @property string|null $Architect
 * @property string|null $Payment
 * @property string|null $Scrutiny
 * @property string|null $Flag Details
 * @property string|null $PDetails
 * @property int|null $IsDraft_Project
 * @property int|null $IsDraft_Building
 * @property int|null $IsDraft_Cost
 * @property int|null $IsDraft_Architect
 * @property int|null $IsDraft_Doc
 * @property int|null $IsDraft_PDetails
 * @property string|null $TaskActivity
 * @property int|null $TaskActivity_SubmitCount
 * @property string|null $LastPaymentDate
 * @property int|null $createdby
 * @property string|null $createdon
 * @property int|null $modifiedby
 * @property string|null $modifiedon
 * @property string|null $Payment_TCount
 * @property int|null $TaskActivity_TSubmitCount
 * @property int|null $IsDraft_TaskActivity
 * @property string|null $PaymentID
 * @property int|null $IsWithdraw
 * @property int|null $IsCertificateGenerated
 * @property int|null $IsDraft_CoPromoter
 * @property int|null $IsDraft_CoPromoterDoc
 * @property int|null $ComplaintID
 * @property string|null $CitizenComplainant
 * @property string|null $CitizenRespondent
 * @property string|null $CitizenDocument
 * @property string|null $CitizenDeclaration
 * @property int|null $IsCertificateReGenerated
 * @property string|null $CertificateNo
 * @property string|null $CertificateDate
 * @property string|null $IsEditPayValid
 * @property int|null $IsDraft_PersonalInfo
 * @property int|null $IsPenalty
 * @property string|null $CorrPersonalInfo
 * @property string|null $CorrProjectInfo
 * @property string|null $CorrLandInfo
 * @property string|null $CorrCostInfo
 * @property string|null $CorrIsCertificateReissue
 * @property string|null $CorrDeclaration
 * @property string|null $CorrPaymentID
 * @property string|null $CorrPaymnetDate
 * @property string|null $CorrPayment
 * @property string|null $CorrScrutiny
 * @property string|null $ExtProjectInfo
 * @property string|null $ExtIsDraft_ProjectInfo
 * @property string|null $ExtPaymentID
 * @property string|null $ExtPaymnetDate
 * @property string|null $ExtPayment
 * @property string|null $ExtScrutiny
 * @property string|null $ExtIsCertificateReissue
 * @property string|null $ExtPaymentEligible
 * @property string|null $ExtIsDraft_DocInfo
 * @property string|null $lastModifiedDate
 * @property string|null $CorrBuilding
 * @property int|null $IsRevoc
 * @property string|null $RevocRemark
 * @property int $IsCommencementCertRequired
 * @property int|null $CorrScrutinyTab1
 * @property int|null $CorrScrutinyTab2
 * @property int|null $CorrScrutinyTab3
 * @property int|null $CorrScrutinyTab4
 * @property int|null $CorrRevisedRegCertificate
 * @property bool|null $NextCorrIsPersonalInfoForCorr
 * @property bool|null $NextIsProjectInfoForCorr
 * @property bool|null $NextIsCostInfoForCorr
 * @property bool|null $NextIsCertificateReissueForCorr
 * @property bool|null $CorrAgentAddress
 * @property bool|null $NextCorrAgentAddress
 * @property int|null $CitizenComplianceDeclaration
 * @property int|null $IsDraft_AgentBranch
 * @property int|null $IsDraft_AgentPastExp
 * @property int|null $IsDraft_AgentRegDetails
 * @property int|null $IsDraft_Agentlitigation
 * @property int|null $IsDraft_ProMemberDetails
 * @property int|null $IsDraft_ProPastExperience
 * @property int|null $IsDraft_ProMemberagreeDoc
 * @property int|null $IsDraft_Promotertlitigation
 * @property string|null $AgentRegValidDate
 * @property int|null $IsRenewalAPayment
 * @property int|null $IsScheduleRevocation
 * @property int|null $IsRevocationCertificateGenerated
 * @property string|null $RevocationCertificateDate
 * @property string|null $deletecomment
 * @property int|null $IsDraft_OtherPromoter
 * @property int|null $IsDraft_OtherPromoterDoc
 * @method static Builder|StatusMap newModelQuery()
 * @method static Builder|StatusMap newQuery()
 * @method static Builder|StatusMap query()
 * @method static Builder|StatusMap whereAgentRegValidDate($value)
 * @method static Builder|StatusMap whereArchitect($value)
 * @method static Builder|StatusMap whereBuildingCount($value)
 * @method static Builder|StatusMap whereCertificateDate($value)
 * @method static Builder|StatusMap whereCertificateNo($value)
 * @method static Builder|StatusMap whereCitizenComplainant($value)
 * @method static Builder|StatusMap whereCitizenComplianceDeclaration($value)
 * @method static Builder|StatusMap whereCitizenDeclaration($value)
 * @method static Builder|StatusMap whereCitizenDocument($value)
 * @method static Builder|StatusMap whereCitizenRespondent($value)
 * @method static Builder|StatusMap whereComplaintID($value)
 * @method static Builder|StatusMap whereCorrAgentAddress($value)
 * @method static Builder|StatusMap whereCorrBuilding($value)
 * @method static Builder|StatusMap whereCorrCostInfo($value)
 * @method static Builder|StatusMap whereCorrDeclaration($value)
 * @method static Builder|StatusMap whereCorrIsCertificateReissue($value)
 * @method static Builder|StatusMap whereCorrLandInfo($value)
 * @method static Builder|StatusMap whereCorrPayment($value)
 * @method static Builder|StatusMap whereCorrPaymentID($value)
 * @method static Builder|StatusMap whereCorrPaymnetDate($value)
 * @method static Builder|StatusMap whereCorrPersonalInfo($value)
 * @method static Builder|StatusMap whereCorrProjectInfo($value)
 * @method static Builder|StatusMap whereCorrRevisedRegCertificate($value)
 * @method static Builder|StatusMap whereCorrScrutiny($value)
 * @method static Builder|StatusMap whereCorrScrutinyTab1($value)
 * @method static Builder|StatusMap whereCorrScrutinyTab2($value)
 * @method static Builder|StatusMap whereCorrScrutinyTab3($value)
 * @method static Builder|StatusMap whereCorrScrutinyTab4($value)
 * @method static Builder|StatusMap whereCost($value)
 * @method static Builder|StatusMap whereCreatedby($value)
 * @method static Builder|StatusMap whereCreatedon($value)
 * @method static Builder|StatusMap whereDeletecomment($value)
 * @method static Builder|StatusMap whereDivision($value)
 * @method static Builder|StatusMap whereDocument($value)
 * @method static Builder|StatusMap whereExtIsCertificateReissue($value)
 * @method static Builder|StatusMap whereExtIsDraftDocInfo($value)
 * @method static Builder|StatusMap whereExtIsDraftProjectInfo($value)
 * @method static Builder|StatusMap whereExtPayment($value)
 * @method static Builder|StatusMap whereExtPaymentEligible($value)
 * @method static Builder|StatusMap whereExtPaymentID($value)
 * @method static Builder|StatusMap whereExtPaymnetDate($value)
 * @method static Builder|StatusMap whereExtProjectInfo($value)
 * @method static Builder|StatusMap whereExtScrutiny($value)
 * @method static Builder|StatusMap whereFlagDetails($value)
 * @method static Builder|StatusMap whereID($value)
 * @method static Builder|StatusMap whereIsCertificateGenerated($value)
 * @method static Builder|StatusMap whereIsCertificateReGenerated($value)
 * @method static Builder|StatusMap whereIsCommencementCertRequired($value)
 * @method static Builder|StatusMap whereIsDraftAgentBranch($value)
 * @method static Builder|StatusMap whereIsDraftAgentPastExp($value)
 * @method static Builder|StatusMap whereIsDraftAgentRegDetails($value)
 * @method static Builder|StatusMap whereIsDraftAgentlitigation($value)
 * @method static Builder|StatusMap whereIsDraftArchitect($value)
 * @method static Builder|StatusMap whereIsDraftBuilding($value)
 * @method static Builder|StatusMap whereIsDraftCoPromoter($value)
 * @method static Builder|StatusMap whereIsDraftCoPromoterDoc($value)
 * @method static Builder|StatusMap whereIsDraftCost($value)
 * @method static Builder|StatusMap whereIsDraftDoc($value)
 * @method static Builder|StatusMap whereIsDraftOtherPromoter($value)
 * @method static Builder|StatusMap whereIsDraftOtherPromoterDoc($value)
 * @method static Builder|StatusMap whereIsDraftPDetails($value)
 * @method static Builder|StatusMap whereIsDraftPersonalInfo($value)
 * @method static Builder|StatusMap whereIsDraftProMemberDetails($value)
 * @method static Builder|StatusMap whereIsDraftProMemberagreeDoc($value)
 * @method static Builder|StatusMap whereIsDraftProPastExperience($value)
 * @method static Builder|StatusMap whereIsDraftProject($value)
 * @method static Builder|StatusMap whereIsDraftPromotertlitigation($value)
 * @method static Builder|StatusMap whereIsDraftTaskActivity($value)
 * @method static Builder|StatusMap whereIsEditPayValid($value)
 * @method static Builder|StatusMap whereIsPenalty($value)
 * @method static Builder|StatusMap whereIsRenewalAPayment($value)
 * @method static Builder|StatusMap whereIsRevoc($value)
 * @method static Builder|StatusMap whereIsRevocationCertificateGenerated($value)
 * @method static Builder|StatusMap whereIsScheduleRevocation($value)
 * @method static Builder|StatusMap whereIsWithdraw($value)
 * @method static Builder|StatusMap whereLastModifiedDate($value)
 * @method static Builder|StatusMap whereLastPaymentDate($value)
 * @method static Builder|StatusMap whereMapID($value)
 * @method static Builder|StatusMap whereModifiedby($value)
 * @method static Builder|StatusMap whereModifiedon($value)
 * @method static Builder|StatusMap whereNextCorrAgentAddress($value)
 * @method static Builder|StatusMap whereNextCorrIsPersonalInfoForCorr($value)
 * @method static Builder|StatusMap whereNextIsCertificateReissueForCorr($value)
 * @method static Builder|StatusMap whereNextIsCostInfoForCorr($value)
 * @method static Builder|StatusMap whereNextIsProjectInfoForCorr($value)
 * @method static Builder|StatusMap wherePDetails($value)
 * @method static Builder|StatusMap wherePayment($value)
 * @method static Builder|StatusMap wherePaymentID($value)
 * @method static Builder|StatusMap wherePaymentTCount($value)
 * @method static Builder|StatusMap wherePersonalInfo($value)
 * @method static Builder|StatusMap whereProjectID($value)
 * @method static Builder|StatusMap whereRevocRemark($value)
 * @method static Builder|StatusMap whereRevocationCertificateDate($value)
 * @method static Builder|StatusMap whereScrutiny($value)
 * @method static Builder|StatusMap whereTaskActivity($value)
 * @method static Builder|StatusMap whereTaskActivitySubmitCount($value)
 * @method static Builder|StatusMap whereTaskActivityTSubmitCount($value)
 * @method static Builder|StatusMap whereUserID($value)
 * @mixin Eloquent
 */
class StatusMap extends Model
{
    use HasFactory;

    protected $table = 'tbl_UserStatusSubMapping';
    protected $connection = 'k_rera';


}
