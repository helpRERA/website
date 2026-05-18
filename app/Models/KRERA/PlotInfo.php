<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\PlotInfo
 *
 * @property int $ID
 * @property int|null $UserID
 * @property int|null $ProjectID
 * @property int|null $Division
 * @property string|null $PlotArea
 * @property string|null $NumberPlot
 * @property string|null $BookedPlots
 * @property int|null $CreatedBy
 * @property string|null $CreatedOn
 * @property int|null $ModifiedBy
 * @property string|null $ModifiedOn
 * @property bool|null $chkMortgageAreaForPlot
 * @property string|null $PlotNumberForPlotType
 * @property int|null $deleteProjectId
 * @property int|null $deleteUserId
 * @property string|null $Quoter
 * @property string|null $QuoterYear
 * @property int|null $TempBookedPlots
 * @property string|null $TempQuoter
 * @property int|null $TempQuoterYear
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo query()
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereBookedPlots($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereChkMortgageAreaForPlot($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereCreatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereDeleteProjectId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereDeleteUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereDivision($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereModifiedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereNumberPlot($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo wherePlotArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo wherePlotNumberForPlotType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereProjectID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereQuoter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereQuoterYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereTempBookedPlots($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereTempQuoter($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereTempQuoterYear($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PlotInfo whereUserID($value)
 * @mixin \Eloquent
 */
class PlotInfo extends Model
{
    public $timestamps = false;
    protected $table = 'tbl_Plots';
    protected $connection = 'k_rera';
}
