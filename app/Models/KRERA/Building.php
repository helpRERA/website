<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\KRERA\Building
 *
 * @property int $ID
 * @property int|null $ProjectID
 * @property string|null $NoBasement
 * @property string|null $NoPlinth
 * @property string|null $NoPodium
 * @property string|null $NoSlab
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property int|null $ModifiedBy
 * @property string|null $ModifiedOn
 * @property int|null $Division
 * @property string|null $Name
 * @property string|null $NumberStilts
 * @property string|null $OpenParking
 * @property string|null $ClosedParking
 * @property string|null $CarpetArea
 * @property int|null $NoOfApartments
 * @property string|null $BookApartments
 * @property string|null $BuildingEndDate
 * @property int|null $TotalFloorCount
 * @property int|null $IsExcelFile
 * @property int|null $Delete_ProjectId
 * @property int|null $Delete_UserId
 * @property string|null $Quoter
 * @property int|null $QuoterYear
 * @property string|null $TempQuoter
 * @property int|null $TempQuoterYear
 * @property int|null $BuildingProgress
 * @property int|null $TempBuildingProgress
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KRERA\ApartmentType> $apartments
 * @property-read int|null $apartments_count
 * @method static \Illuminate\Database\Eloquent\Builder|Building newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Building newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Building query()
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereBookApartments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereBuildingEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereBuildingProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereCarpetArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereClosedParking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereCreatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereDeleteProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereDeleteUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereDivision($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereIsExcelFile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereModifiedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereNoBasement($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereNoOfApartments($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereNoPlinth($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereNoPodium($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereNoSlab($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereNumberStilts($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereOpenParking($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereProjectID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereQuoter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereQuoterYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereTempBuildingProgress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereTempQuoter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereTempQuoterYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereTotalFloorCount($value)
 * @mixin \Eloquent
 */
class Building extends Model
{
    use HasFactory;

    protected $table = 'tbl_Building';
    protected $connection = 'k_rera';

    /**
     * @return HasMany<ApartmentType>
     */
    public function apartments(): HasMany
    {
        return $this->hasMany(ApartmentType::class, 'BuidingID', 'ID');
    }
}
