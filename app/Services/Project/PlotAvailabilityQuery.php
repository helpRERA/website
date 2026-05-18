<?php

namespace App\Services\Project;

use App\Models\KRERA\PlotInfo;

trait PlotAvailabilityQuery
{
    public function getPlotAvailabilityQuery()
    {
        return PlotInfo::groupBy('ProjectID')
            ->selectRaw(
                'SUM(cast(NumberPlot AS int)) as plot_count, '
                . 'SUM(cast(BookedPlots AS int)) as booked_plots, '
                . 'ProjectID  '
            );
    }
}
