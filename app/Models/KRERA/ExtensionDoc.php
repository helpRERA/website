<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\ExtensionDoc
 *
 * @property int $DgnID
 * @property int|null $UserID
 * @property string|null $AppId
 * @property int|null $ProjectID
 * @property int|null $Division
 * @property int|null $RoleID
 * @property string|null $FileName
 * @property mixed|null $DigitalCert
 * @property int|null $ServiceID
 * @property string|null $ContentType
 * @property string|null $CreatedDate
 * @property string|null $SignatureStatus
 * @property int|null $ModifiedBy
 * @property string|null $ModifiedOn
 * @property int|null $SecondModifiedBy
 * @property string|null $SecondModifiedOn
 * @property mixed|null $AppPreview
 * @property mixed|null $AppPublicPreview
 * @property int|null $IsScheduledCertGen
 * @property bool|null $IsDigitalSign
 * @property int|null $t_SignatureOffsetX
 * @property int|null $t_SignatureOffsetY
 * @property int|null $eSign_pageNo
 * @property string|null $OrderFileName
 * @property mixed|null $OrderContent
 * @property string|null $OrderFileType
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc query()
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereAppId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereAppPreview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereAppPublicPreview($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereContentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereCreatedDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereDgnID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereDigitalCert($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereDivision($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereESignPageNo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereIsDigitalSign($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereIsScheduledCertGen($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereModifiedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereOrderContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereOrderFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereOrderFileType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereProjectID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereRoleID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereSecondModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereSecondModifiedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereServiceID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereSignatureStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereTSignatureOffsetX($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereTSignatureOffsetY($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ExtensionDoc whereUserID($value)
 * @mixin \Eloquent
 */
class ExtensionDoc extends Model
{
    use HasFactory;
    protected $table = 'ExtensionDigitalSignCert';
    protected $connection = 'k_rera_docs';
}
