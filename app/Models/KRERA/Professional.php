<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\Professional
 *
 * @property int $ProjectProfessionalID
 * @property int $ProjectID
 * @property int $ProjectProfessionalTypeID
 * @property string|null $RegistrationNo
 * @property string|null $Name
 * @property string|null $Address
 * @property string|null $AadhaarNo
 * @property string|null $Contact
 * @property string|null $Designation
 * @property bool $IsActive
 * @property int $CreatedBy
 * @property string $CreatedOn
 * @property int|null $UpdatedBy
 * @property string|null $UpdatedOn
 * @property string|null $COACertificateNo
 * @property string|null $EmailID
 * @property string|null $RegistrationNumberFromCouncilOfArchitects
 * @property string|null $RegistrationNumber
 * @property string|null $RegistrationNumberFromICAI
 * @property string|null $NameOfFirm
 * @property string|null $AddressOfFirm
 * @property string|null $YearOfEstablishent
 * @property string|null $NameOfPromotersAssociatedWith
 * @property string|null $KeyProjectsCompleted
 * @property int|null $ContractorType
 * @property string|null $ContractorDetails
 * @property string|null $TypeOfProfessional
 * @property int|null $deleteProjectId
 * @method static \Illuminate\Database\Eloquent\Builder|Professional newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Professional newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Professional query()
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereAadhaarNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereAddressOfFirm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereCOACertificateNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereContact($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereContractorDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereContractorType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereCreatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereDeleteProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereDesignation($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereEmailID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereIsActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereKeyProjectsCompleted($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereNameOfFirm($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereNameOfPromotersAssociatedWith($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereProjectID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereProjectProfessionalID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereProjectProfessionalTypeID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereRegistrationNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereRegistrationNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereRegistrationNumberFromCouncilOfArchitects($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereRegistrationNumberFromICAI($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereTypeOfProfessional($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereUpdatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereUpdatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Professional whereYearOfEstablishent($value)
 * @mixin \Eloquent
 */
class Professional extends Model
{
    use HasFactory;

    protected $table = 'tbl_ProjectProfessional';
    protected $connection = 'k_rera';
}
