<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\AgentManual
 *
 * @property float|null $SNo
 * @property string|null $RegistrationNumber
 * @property string|null $Agent_Name
 * @property string|null $PermanentAddress
 * @property string|null $Agent_Type
 * @property string|null $PhoneNumber
 * @property string|null $Certificate
 * @property string|null $Certificate_Path
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual query()
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual whereAgentName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual whereAgentType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual whereCertificate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual whereCertificatePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual wherePermanentAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual whereRegistrationNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|AgentManual whereSNo($value)
 * @mixin \Eloquent
 */
class AgentManual extends Model
{
    use HasFactory;

    protected $table = 'tbl_Agent_Manual';
    protected $connection = 'k_rera';
}
