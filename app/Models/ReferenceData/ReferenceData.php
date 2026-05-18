<?php

namespace App\Models\ReferenceData;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Query\JoinClause;

/**
 * App\Models\ReferenceData\ReferenceData
 *
 * @property int $id
 * @property int $domain_id
 * @property int $parameter_id
 * @property int|null $sort_order
 * @property string $value_one
 * @property string|null $value_two
 * @property int|null $created_by
 * @property int|null $updated_by
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static Builder|ReferenceData newModelQuery()
 * @method static Builder|ReferenceData newQuery()
 * @method static Builder|ReferenceData onlyTrashed()
 * @method static Builder|ReferenceData query()
 * @method static Builder|ReferenceData whereCreatedAt($value)
 * @method static Builder|ReferenceData whereCreatedBy($value)
 * @method static Builder|ReferenceData whereDeletedAt($value)
 * @method static Builder|ReferenceData whereDomainId($value)
 * @method static Builder|ReferenceData whereId($value)
 * @method static Builder|ReferenceData whereParameterId($value)
 * @method static Builder|ReferenceData whereSortOrder($value)
 * @method static Builder|ReferenceData whereUpdatedAt($value)
 * @method static Builder|ReferenceData whereUpdatedBy($value)
 * @method static Builder|ReferenceData whereValueOne($value)
 * @method static Builder|ReferenceData whereValueTwo($value)
 * @method static Builder|ReferenceData withTrashed()
 * @method static Builder|ReferenceData withoutTrashed()
 * @mixin \Eloquent
 */
class ReferenceData extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = [
        'domain_id',
        'parameter_id',
        'sort_order',
        'value_one',
        'value_two',
        'created_by',
        'updated_by'
    ];

    /**
     * @return Builder
     */
    public function fullData(): Builder
    {
        return $this->joinedData()
            ->selectRaw('reference_data.*, parameter.parameter as parameter, domain.domain as domain');
    }

    /**
     * @return Builder
     */
    public function joinedData(): Builder
    {
        return $this->leftJoin(
            'reference_data_domains as domain',
            fn(JoinClause $join) => $join->on('domain.id', '=', 'reference_data.domain_id')
        )->leftJoin(
            'reference_data_parameters as parameter',
            fn(JoinClause $join) => $join->on('parameter.id', '=', 'reference_data.parameter_id')
        );
    }

    /**
     * Get Distinct Value_Twos From Domain, Parameter, and ValueOne
     *
     * @param string $domain_name
     * @param string $parameter_name
     * @param string $value_one
     *
     * @return Collection<0, ReferenceData>
     */
    public function getValueTwos(string $domain_name, string $parameter_name, string $value_one): Collection
    {
        return $this->joinedData()
            ->where('parameter.parameter', $parameter_name)
            ->where('domain.domain', $domain_name)
            ->where('value_one', $value_one)
            ->groupBy('value_two')
            ->select('value_two')
            ->get();
    }

    /**
     * Get Distinct Value_Twos From Domain, Parameter, and ValueOne
     *
     * @param string $domain_name
     * @param string $parameter_name
     * @param array $value_one
     *
     * @return Collection<ReferenceData>
     */
    public function getValueTwosIn(string $domain_name, string $parameter_name, array $value_one): Collection
    {
        return $this->joinedData()
            ->where('parameter.parameter', $parameter_name)
            ->where('domain.domain', $domain_name)
            ->whereIn('value_one', $value_one)
            ->groupBy('value_two')
            ->select('value_two')
            ->get();
    }
}
