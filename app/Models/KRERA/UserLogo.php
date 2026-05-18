<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Model;


/**
 * App\Models\KRERA\UserLogo
 *
 * @property int $logoID
 * @property int|null $UserID
 * @property mixed|null $LogoUploadContent
 * @property string|null $LogoImageType
 * @property string|null $LogoImagefileName
 * @method static \Illuminate\Database\Eloquent\Builder|UserLogo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserLogo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|UserLogo query()
 * @method static \Illuminate\Database\Eloquent\Builder|UserLogo whereLogoID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLogo whereLogoImageType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLogo whereLogoImagefileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLogo whereLogoUploadContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|UserLogo whereUserID($value)
 * @mixin \Eloquent
 */
class UserLogo extends Model
{
    public $timestamps = false;
    protected $connection = 'k_rera';
    public $table = 'tbl_userLOGO';
}
