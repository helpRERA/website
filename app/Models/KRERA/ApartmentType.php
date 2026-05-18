<?php

namespace App\Models\KRERA;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\KRERA\ApartmentType
 *
 * @property int $ID
 * @property int|null $UserID
 * @property int|null $ProjectID
 * @property int|null $DivisionID
 * @property int|null $BuidingID
 * @property string|null $ApartmentType
 * @property string|null $ApartmentCarpetArea
 * @property string|null $ApartmentNumber
 * @property string|null $BookedApartment
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property string|null $FloorId
 * @property bool|null $chkMortgageArea
 * @property string|null $AreaOfExclusiveVeranda
 * @property string|null $AreaOfExclusiveBalcony
 * @property string|null $AreaOfExclusiveOpenTerrace
 * @property string|null $ShareOfCommonArea
 * @property string|null $TotalArea
 * @property string|null $ApartmentTypeDD
 * @property string|null $AreaOfExternalWall
 * @property int|null $Delete_ProjectId
 * @property int|null $Delete_UserId
 * @property string|null $Quoter
 * @property string|null $QuoterYear
 * @property int|null $TempBookedApartment
 * @property string|null $TempQuoter
 * @property int|null $TempQuoterYear
 * @property-read \App\Models\KRERA\CommonDDMaster|null $apartmentType
 * @property-read \App\Models\KRERA\Building|null $building
 * @property-read \App\Models\KRERA\ProjectMaster|null $project
 *
 * @method static Builder|ApartmentType newModelQuery()
 * @method static Builder|ApartmentType newQuery()
 * @method static Builder|ApartmentType query()
 * @method static Builder|ApartmentType whereApartmentCarpetArea($value)
 * @method static Builder|ApartmentType whereApartmentNumber($value)
 * @method static Builder|ApartmentType whereApartmentType($value)
 * @method static Builder|ApartmentType whereApartmentTypeDD($value)
 * @method static Builder|ApartmentType whereAreaOfExclusiveBalcony($value)
 * @method static Builder|ApartmentType whereAreaOfExclusiveOpenTerrace($value)
 * @method static Builder|ApartmentType whereAreaOfExclusiveVeranda($value)
 * @method static Builder|ApartmentType whereAreaOfExternalWall($value)
 * @method static Builder|ApartmentType whereBookedApartment($value)
 * @method static Builder|ApartmentType whereBuidingID($value)
 * @method static Builder|ApartmentType whereChkMortgageArea($value)
 * @method static Builder|ApartmentType whereCreatedBy($value)
 * @method static Builder|ApartmentType whereCreatedOn($value)
 * @method static Builder|ApartmentType whereDeleteProjectId($value)
 * @method static Builder|ApartmentType whereDeleteUserId($value)
 * @method static Builder|ApartmentType whereDivisionID($value)
 * @method static Builder|ApartmentType whereFloorId($value)
 * @method static Builder|ApartmentType whereID($value)
 * @method static Builder|ApartmentType whereProjectID($value)
 * @method static Builder|ApartmentType whereQuoter($value)
 * @method static Builder|ApartmentType whereQuoterYear($value)
 * @method static Builder|ApartmentType whereShareOfCommonArea($value)
 * @method static Builder|ApartmentType whereTempBookedApartment($value)
 * @method static Builder|ApartmentType whereTempQuoter($value)
 * @method static Builder|ApartmentType whereTempQuoterYear($value)
 * @method static Builder|ApartmentType whereTotalArea($value)
 * @method static Builder|ApartmentType whereUserID($value)
 *
 * @mixin Eloquent
 */
class ApartmentType extends Model
{
    protected $table = 'tbl_BuildingApartmentType';

    protected $connection = 'k_rera';

    /**
     * @return Builder<ApartmentType>
     */
    public function fetchApartments(): Builder
    {
        return $this->with([
            'project' => function (BelongsTo $query) {
                $query->with('district', 'taluk');
            },
            'building',
        ]);
    }

    /**
     * @return HasOne<CommonDDMaster>
     */
    public function apartmentType(): HasOne
    {
        return $this->hasOne(CommonDDMaster::class, 'Id', 'ApartmentTypeDD');
    }

    /**
     * @return BelongsTo<ProjectMaster, ApartmentType>
     */
    public function project(): BelongsTo
    {
        return $this->belongsTo(ProjectMaster::class, 'ProjectID', 'ID');
    }

    /**
     * @return BelongsTo<Building, ApartmentType>
     */
    public function building(): BelongsTo
    {
        return $this->belongsTo(Building::class, 'BuidingID', 'ID');
    }
}
