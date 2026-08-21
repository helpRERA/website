<?php

namespace App\Models\KRERA;

use App\Services\Project\ApartmentAvailabilityQuery;
use App\Services\Project\PlotAvailabilityQuery;
use App\Services\ProjectDocument\ConsideredDocuments;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Support\Facades\DB;

/**
 * App\Models\KRERA\ProjectMaster
 *
 * @property int $ID
 * @property int $UserID
 * @property string|null $Name
 * @property string|null $ProjectType
 * @property int $RoleID
 * @property string|null $PlotBearing
 * @property string|null $BoundriesE
 * @property string|null $BoundriesW
 * @property string|null $BoundriesN
 * @property string|null $BoundriesS
 * @property int|null $State
 * @property int|null $Division
 * @property int|null $District
 * @property int|null $Taluka
 * @property int|null $Village
 * @property string|null $Area
 * @property string|null $BuildingCount
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property int|null $ModifiedBy
 * @property string|null $ModifiedOn
 * @property string|null $PinCode
 * @property string|null $BankName
 * @property string|null $BankerName
 * @property string|null $BranchName
 * @property string|null $IFSCCode
 * @property string|null $AccountNumber
 * @property string|null $ProjectStartDate
 * @property string|null $ProjectEndDate
 * @property int|null $PType
 * @property string|null $RecreationalArea
 * @property string|null $IsCase
 * @property string|null $PTypeOther
 * @property string|null $BankAddress
 * @property string|null $approvedFSI
 * @property string|null $ProposedFSI
 * @property string|null $ProposedBuildingsCount
 * @property string|null $SanctionedBuildingsCount
 * @property string|null $TotalFSI
 * @property string|null $TotalBuildingCount
 * @property string|null $IsCoPromoter
 * @property string|null $Street
 * @property string|null $Locality
 * @property string|null $Actualproposedcomplitiondate
 * @property string|null $PlotBearing1
 * @property string|null $AreaAffected
 * @property string|null $NetArea
 * @property string|null $PlanApprovalNo
 * @property string|null $AuthorityName
 * @property string|null $ApprovedDate
 * @property string|null $AlreadyRegisterProject
 * @property string|null $ProposedDateOfCompletion
 * @property string|null $TotalFloorAreaOfProjectProposedForRegistration
 * @property string|null $TotalFloorAreaUnderResidentialUse
 * @property string|null $TotalFloorAreaUnderOtherUse
 * @property int|null $NumberOfResidentialUnits
 * @property int|null $NumberOfCommercialUnits
 * @property string|null $SurveyNumber
 * @property string|null $PattaNumber
 * @property string|null $NameOfFinancier
 * @property string|null $AddressOfFinancier
 * @property string|null $ProjectRegistrationNumber
 * @property string|null $FinancialProgress
 * @property string|null $FinancialComment
 * @property string|null $PhysicalProgress
 * @property string|null $PhysicalComment
 * @property string|null $ProgressDate
 * @property int|null $oldUserId
 * @property string|null $Old_ProposedDateOfCompletion
 * @property string|null $KreraRegisterProject
 * @property string|null $KreraRegistrationNumber
 * @property string|null $PromoterTransfer
 * @property string|null $TransferRemarks
 * @property string|null $OrderIssued
 * @property string|null $OrderIssuedRemarks
 * @property string|null $Complaint
 * @property string|null $ComplaintRemarks
 * @property int|null $DDAmountApproved
 * @property int|null $DDAmount
 * @property string|null $IsOtherPromoter
 * @property string|null $Quoter
 * @property int|null $QuoterYear
 * @property string|null $TempQuoter
 * @property int|null $TempQuoterYear
 * @property string|null $TempProgressDate
 * @property int|null $TempFinancialProgress
 * @property string|null $TempFinancialComment
 * @property int|null $TempPhysicalProgress
 * @property string|null $TempPhysicalComment
 * @property string|null $QPRSubmittedOn
 * @property string|null $DDRemarks
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KRERA\ApartmentType> $apartments
 * @property-read int|null $apartments_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KRERA\ProjectDocument> $brochures
 * @property-read int|null $brochures_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KRERA\Building> $buildings
 * @property-read int|null $buildings_count
 * @property-read \App\Models\KRERA\Certificate|null $certificate
 * @property-read \App\Models\KRERA\CertificateInfo|null $certificateInfo
 * @property-read \App\Models\KRERA\UserProfile|null $company
 * @property-read \App\Models\KRERA\ProjectLatLng|null $coordinates
 * @property-read \App\Models\KRERA\UploadedImage|null $coverPhoto
 * @property-read \App\Models\KRERA\District|null $district
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KRERA\ProjectDocument> $documents
 * @property-read int|null $documents_count
 * @property-read \App\Models\KRERA\CertificateExtension|null $extensionCertificate
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KRERA\Facility> $facilities
 * @property-read int|null $facilities_count
 * @property-read \App\Models\KRERA\HSMSignCert|null $hsm
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KRERA\UploadedImage> $images
 * @property-read int|null $images_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KRERA\PlotInfo> $plots
 * @property-read int|null $plots_count
 * @property-read \App\Models\KRERA\CommonDDMaster|null $projectType
 * @property-read \App\Models\KRERA\UserProfile|null $promoter
 * @property-read \App\Models\KRERA\StatusMap|null $statusMap
 * @property-read \App\Models\KRERA\Taluk|null $taluk
 * @property-read \App\Models\KRERA\Village|null $village
 *
 * @method static Builder|ProjectMaster byDistrict()
 * @method static Builder|ProjectMaster newModelQuery()
 * @method static Builder|ProjectMaster newQuery()
 * @method static Builder|ProjectMaster query()
 * @method static Builder|ProjectMaster registered()
 * @method static Builder|ProjectMaster whereAccountNumber($value)
 * @method static Builder|ProjectMaster whereActualproposedcomplitiondate($value)
 * @method static Builder|ProjectMaster whereAddressOfFinancier($value)
 * @method static Builder|ProjectMaster whereAlreadyRegisterProject($value)
 * @method static Builder|ProjectMaster whereApprovedDate($value)
 * @method static Builder|ProjectMaster whereApprovedFSI($value)
 * @method static Builder|ProjectMaster whereArea($value)
 * @method static Builder|ProjectMaster whereAreaAffected($value)
 * @method static Builder|ProjectMaster whereAuthorityName($value)
 * @method static Builder|ProjectMaster whereBankAddress($value)
 * @method static Builder|ProjectMaster whereBankName($value)
 * @method static Builder|ProjectMaster whereBankerName($value)
 * @method static Builder|ProjectMaster whereBoundriesE($value)
 * @method static Builder|ProjectMaster whereBoundriesN($value)
 * @method static Builder|ProjectMaster whereBoundriesS($value)
 * @method static Builder|ProjectMaster whereBoundriesW($value)
 * @method static Builder|ProjectMaster whereBranchName($value)
 * @method static Builder|ProjectMaster whereBuildingCount($value)
 * @method static Builder|ProjectMaster whereComplaint($value)
 * @method static Builder|ProjectMaster whereComplaintRemarks($value)
 * @method static Builder|ProjectMaster whereCreatedBy($value)
 * @method static Builder|ProjectMaster whereCreatedOn($value)
 * @method static Builder|ProjectMaster whereDDAmount($value)
 * @method static Builder|ProjectMaster whereDDAmountApproved($value)
 * @method static Builder|ProjectMaster whereDDRemarks($value)
 * @method static Builder|ProjectMaster whereDistrict($value)
 * @method static Builder|ProjectMaster whereDivision($value)
 * @method static Builder|ProjectMaster whereFinancialComment($value)
 * @method static Builder|ProjectMaster whereFinancialProgress($value)
 * @method static Builder|ProjectMaster whereID($value)
 * @method static Builder|ProjectMaster whereIFSCCode($value)
 * @method static Builder|ProjectMaster whereIsCase($value)
 * @method static Builder|ProjectMaster whereIsCoPromoter($value)
 * @method static Builder|ProjectMaster whereIsOtherPromoter($value)
 * @method static Builder|ProjectMaster whereKreraRegisterProject($value)
 * @method static Builder|ProjectMaster whereKreraRegistrationNumber($value)
 * @method static Builder|ProjectMaster whereLocality($value)
 * @method static Builder|ProjectMaster whereModifiedBy($value)
 * @method static Builder|ProjectMaster whereModifiedOn($value)
 * @method static Builder|ProjectMaster whereName($value)
 * @method static Builder|ProjectMaster whereNameOfFinancier($value)
 * @method static Builder|ProjectMaster whereNetArea($value)
 * @method static Builder|ProjectMaster whereNumberOfCommercialUnits($value)
 * @method static Builder|ProjectMaster whereNumberOfResidentialUnits($value)
 * @method static Builder|ProjectMaster whereOldProposedDateOfCompletion($value)
 * @method static Builder|ProjectMaster whereOldUserId($value)
 * @method static Builder|ProjectMaster whereOrderIssued($value)
 * @method static Builder|ProjectMaster whereOrderIssuedRemarks($value)
 * @method static Builder|ProjectMaster wherePType($value)
 * @method static Builder|ProjectMaster wherePTypeOther($value)
 * @method static Builder|ProjectMaster wherePattaNumber($value)
 * @method static Builder|ProjectMaster wherePhysicalComment($value)
 * @method static Builder|ProjectMaster wherePhysicalProgress($value)
 * @method static Builder|ProjectMaster wherePinCode($value)
 * @method static Builder|ProjectMaster wherePlanApprovalNo($value)
 * @method static Builder|ProjectMaster wherePlotBearing($value)
 * @method static Builder|ProjectMaster wherePlotBearing1($value)
 * @method static Builder|ProjectMaster whereProgressDate($value)
 * @method static Builder|ProjectMaster whereProjectEndDate($value)
 * @method static Builder|ProjectMaster whereProjectRegistrationNumber($value)
 * @method static Builder|ProjectMaster whereProjectStartDate($value)
 * @method static Builder|ProjectMaster whereProjectType($value)
 * @method static Builder|ProjectMaster wherePromoterTransfer($value)
 * @method static Builder|ProjectMaster whereProposedBuildingsCount($value)
 * @method static Builder|ProjectMaster whereProposedDateOfCompletion($value)
 * @method static Builder|ProjectMaster whereProposedFSI($value)
 * @method static Builder|ProjectMaster whereQPRSubmittedOn($value)
 * @method static Builder|ProjectMaster whereQuoter($value)
 * @method static Builder|ProjectMaster whereQuoterYear($value)
 * @method static Builder|ProjectMaster whereRecreationalArea($value)
 * @method static Builder|ProjectMaster whereRoleID($value)
 * @method static Builder|ProjectMaster whereSanctionedBuildingsCount($value)
 * @method static Builder|ProjectMaster whereState($value)
 * @method static Builder|ProjectMaster whereStreet($value)
 * @method static Builder|ProjectMaster whereSurveyNumber($value)
 * @method static Builder|ProjectMaster whereTaluka($value)
 * @method static Builder|ProjectMaster whereTempFinancialComment($value)
 * @method static Builder|ProjectMaster whereTempFinancialProgress($value)
 * @method static Builder|ProjectMaster whereTempPhysicalComment($value)
 * @method static Builder|ProjectMaster whereTempPhysicalProgress($value)
 * @method static Builder|ProjectMaster whereTempProgressDate($value)
 * @method static Builder|ProjectMaster whereTempQuoter($value)
 * @method static Builder|ProjectMaster whereTempQuoterYear($value)
 * @method static Builder|ProjectMaster whereTotalBuildingCount($value)
 * @method static Builder|ProjectMaster whereTotalFSI($value)
 * @method static Builder|ProjectMaster whereTotalFloorAreaOfProjectProposedForRegistration($value)
 * @method static Builder|ProjectMaster whereTotalFloorAreaUnderOtherUse($value)
 * @method static Builder|ProjectMaster whereTotalFloorAreaUnderResidentialUse($value)
 * @method static Builder|ProjectMaster whereTransferRemarks($value)
 * @method static Builder|ProjectMaster whereUserID($value)
 * @method static Builder|ProjectMaster whereVillage($value)
 *
 * @mixin \Eloquent
 */
class ProjectMaster extends Model
{
    use ApartmentAvailabilityQuery;
    use PlotAvailabilityQuery;

    protected $table = 'tbl_Project';

    protected $connection = 'k_rera';

    /**
     * @return HasOne<CommonDDMaster>
     */
    public function projectType(): HasOne
    {
        return $this->hasOne(CommonDDMaster::class, 'Id', 'PType');
    }

    /**
     * @return BelongsTo<District, ProjectMaster>
     */
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class, 'District', 'Districtcode');
    }

    /**
     * @return BelongsTo<Taluk, ProjectMaster>
     */
    public function taluk(): BelongsTo
    {
        return $this->belongsTo(Taluk::class, 'Taluka', 'Subdistrictcode');
    }

    /**
     * @return HasOne<ProjectLatLng>
     */
    public function coordinates(): HasOne
    {
        return $this->hasOne(ProjectLatLng::class, 'ProjectID', 'ID');
    }

    /**
     * @return BelongsTo<Village, ProjectMaster>
     */
    public function village(): BelongsTo
    {
        return $this->belongsTo(Village::class, 'Village', 'Villagecode');
    }

    /**
     * @return HasMany<Building>
     */
    public function buildings(): HasMany
    {
        return $this->hasMany(Building::class, 'ProjectID', 'ID');
    }

    /**
     * @return HasMany<UploadedImage>
     */
    public function images(): HasMany
    {
        return $this->hasMany(UploadedImage::class, 'ProjectID', 'ID');
    }

    /**
     * @return HasOne<UploadedImage>
     */
    public function coverPhoto(): HasOne
    {
        return $this->hasOne(UploadedImage::class, 'ProjectID', 'ID')
            ->where('DocID', ConsideredDocuments::COVER_PHOTO)
            ->select('ID', 'ProjectID');
    }

    /**
     * @return HasMany<Facility>
     */
    public function facilities(): HasMany
    {
        return $this->hasMany(Facility::class, 'ProjectID', 'ID');
    }

    /**
     * @return BelongsTo<UserProfile, ProjectMaster>
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(UserProfile::class, 'UserID', 'UserID');
    }

    /**
     * @return HasOne<Certificate>
     */
    public function certificate(): HasOne
    {
        return $this->hasOne(Certificate::class, 'ProjectID', 'ID');
    }

    /**
     * @return HasOne<CertificateInfo>
     */
    public function certificateInfo(): HasOne
    {
        return $this->hasOne(CertificateInfo::class, 'ProjectID', 'ID');
    }

    /**
     * @return HasMany<ApartmentType>
     */
    public function apartments(): HasMany
    {
        return $this->hasMany(ApartmentType::class, 'ProjectID', 'ID');
    }

    /**
     * @return HasMany<ProjectDocument>
     */
    public function documents(): HasMany
    {
        return $this->hasMany(ProjectDocument::class, 'ProjectID', 'ID');
    }

    /**
     * @return HasOne<HSMSignCert>
     */
    public function hsm(): HasOne
    {
        return $this->hasOne(HSMSignCert::class, 'ProjectID', 'ID');
    }

    /**
     * @return HasMany<ProjectDocument>
     */
    public function brochures(): HasMany
    {
        return $this->hasMany(ProjectDocument::class, 'ProjectID', 'ID');
    }

    /**
     * @return HasOne<UserProfile>
     */
    public function promoter(): HasOne
    {
        return $this->hasOne(UserProfile::class, 'UserID', 'UserID');
    }

    /**
     * @return HasOne<StatusMap>
     */
    public function statusMap(): HasOne
    {
        return $this->hasOne(StatusMap::class, 'ProjectID', 'ID');
    }

    /**
     * @return HasMany<PlotInfo>
     */
    public function plots(): HasMany
    {
        return $this->hasMany(
            PlotInfo::class,
            'ProjectID',
            'ID'
        );
    }

    /**
     * @return HasOne<CertificateExtension>
     */
    public function extensionCertificate(): HasOne
    {
        return $this->hasOne(
            CertificateExtension::class,
            'ProjectID',
            'ID'
        );
    }

    /**
     * @param  Builder<ProjectMaster>  $query
     * @return Builder<ProjectMaster>
     */
    public function scopeRegistered(Builder $query): Builder
    {
        return $query->whereHas('statusMap', function (Builder $builder) {
            $builder->whereRaw('isnull(IsWithdraw,0)=0 and isnull(IsRevoc,0)=0');
        });
    }

    /**
     * @param  Builder<ProjectMaster>  $query
     * @return Builder<ProjectMaster>
     */
    public function scopeByDistrict(Builder $query): Builder
    {
        return $this->leftJoin(DB::raw('mstDistrict district'), 'district.DistrictCode', '=', 'tbl_Project.District')
            ->groupByRaw('district.Districtcode, district.Districtname')
            ->where('district.Langid', 1);
    }

    /**
     * @return Builder<ProjectMaster>
     */
    public function projectSearch(): Builder
    {
        $availabilityQuery = $this->getAvailabilityQuery();
        $plotAvailabilityQuery = $this->getPlotAvailabilityQuery();

        return $this->withLocation()
            ->registered()
            ->whereHas('certificateInfo')
            ->with([
                'images' => function ($hasMany) {
                    $hasMany->select('ID', 'ProjectID')
                        ->orderByRaw(
                            'CASE 
                        WHEN DocID = ' . ConsideredDocuments::COVER_PHOTO . ' THEN 2
                        WHEN DocID = ' . ConsideredDocuments::BROCHURE_PHOTO . ' THEN 1
                        ELSE 0
                     END DESC,
                     CreatedOn DESC'
                        );
                },
                'documents' => function ($hasMany) {
                    $hasMany->select('ID', 'ProjectID', 'DocID')
                        ->whereNotNull('FileName')
                        ->where('DocID', ConsideredDocuments::FORM_SIX);
                },
                'coverPhoto',
                'certificateInfo',
            ])
            ->withCount('buildings')
            ->leftJoinSub(
                $availabilityQuery,
                'apartment_info',
                fn(JoinClause $join) => $join->on('apartment_info.ProjectID', '=', 'tbl_Project.ID')
            )
            ->leftJoinSub(
                $plotAvailabilityQuery,
                'plot_info',
                fn(JoinClause $join) => $join->on('plot_info.ProjectID', '=', 'tbl_Project.ID')
            )
            ->leftJoin('tbl_CertificateP as certificateP', 'certificateP.ProjectID', '=', 'tbl_Project.ID')
            ->leftJoin('tbl_ProjectDefaults as Pd', 'Pd.ProjectId', '=', 'tbl_Project.ID')
            ->selectRaw(
                'apartment_info.apartment_count, apartment_info.booked_count, certificateP.ID as certificatePID'
                . ', plot_info.plot_count, plot_info.booked_plots, tbl_Project.*'
                . ', Pd.DefaultReason'
                . ', CASE WHEN ISNULL(Pd.DefaultReason, \'\') = \'\' THEN 0 ELSE 1 END AS IsDefault'
            );
    }

    /**
     * @return Builder<ProjectMaster>
     */
    public function withLocation(): Builder
    {
        return $this->with([
            'district' => function (BelongsTo $belongsTo) {
                $belongsTo->where('Langid', 1);
            },
            'taluk' => function (BelongsTo $belongsTo) {
                $belongsTo->where('Langid', 1);
            },
            'village' => function (BelongsTo $belongsTo) {
                $belongsTo->where('Langid', 1);
            },
            'promoter',
        ]);
    }
}
