<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\CertificateExtension
 *
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateExtension newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateExtension newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CertificateExtension query()
 * @mixin \Eloquent
 */
class CertificateExtension extends Model
{
    public $timestamps = false;
    protected $table = 'ExtensionDigitalSignCert';
    protected $connection = 'k_rera';
}
