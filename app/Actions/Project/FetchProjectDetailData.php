<?php

namespace App\Actions\Project;

use App\Models\KRERA\ProjectDocument;
use App\Models\KRERA\ProjectMaster;
use App\Services\Project\ApartmentAvailabilityQuery;
use App\Services\Project\PlotAvailabilityQuery;
use App\Services\ProjectDocument\ConsideredDocuments;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Query\JoinClause;

class FetchProjectDetailData
{
    use ApartmentAvailabilityQuery;
    use PlotAvailabilityQuery;

    public function __construct(private ProjectMaster $projectMaster)
    {
    }

    public function getData(int $projectId): ProjectMaster
    {

        $availabilityQuery = $this->getAvailabilityQuery();

        /**
         * @var Builder<ProjectMaster> $query
         */
        $query = $this->projectMaster
            ->withLocation()
            ->registered()
            ->leftJoinSub(
                $availabilityQuery,
                'apartment_info',
                fn (JoinClause $join) => $join->on('apartment_info.ProjectID', '=', 'tbl_Project.ID')
            )
            ->leftJoinSub(
                $this->getPlotAvailabilityQuery(),
                'plot_info',
                fn (JoinClause $join) => $join->on('plot_info.ProjectID', '=', 'tbl_Project.ID')
            )
            ->with([
                'facilities',
                'coordinates',
                'certificateInfo',
                'promoter.companyDistrict',
                'promoter.individualDistrict',
            ])
            ->whereHas('certificateInfo')
            ->where('ID', $projectId)
            ->with([
                'hsm' => function ($hasOne) {
                    $hasOne->select('DgnID', 'ProjectID');
                },
            ]);

        $this->withImages($query);
        $this->withDocuments($query);
        $this->withBuilding($query);
        $this->withCompany($query);

        $query->selectRaw('tbl_Project.*, apartment_info.*, plot_info.*');

        return $query->firstOrFail();
    }

    /**
     * @param  Builder<ProjectMaster>  $builder
     */
    private function withImages(Builder $builder): void
    {
        $builder->with([
            'images' => function ($hasMany) {
                $hasMany->select('ID', 'ProjectID')
                    ->orderByRaw(
                        'CASE 
                        WHEN DocID = ' . ConsideredDocuments::COVER_PHOTO . ' THEN 2
                        WHEN DocID = ' . ConsideredDocuments::BROCHURE_PHOTO . ' THEN 1
                        ELSE 0
                     END DESC,
                     CreatedOn DESC'
                    );
            },
        ]);
    }

    /**
     * @param  Builder<ProjectMaster>  $builder
     * @return void
     */
    private function withDocuments(Builder $builder)
    {

        $queryMaxCreated = ProjectDocument::groupBy('DocId', 'ProjectID')
            ->selectRaw(
                'DocId, ProjectID, MAX(CreatedOn) as CreatedOn'
            )
            ->whereIn('DocID', ConsideredDocuments::DOCUMENT_ID_LIST);
    }

    /**
     * @param  Builder<ProjectMaster>  $builder
     */
    private function withBuilding(Builder $builder): void
    {
        $builder->with(
            [
                'buildings' => function ($query) {
                    $query->whereNull('Delete_UserId')
                        ->whereNUll('Delete_ProjectId')
                        ->with([
                            'apartments' => function (HasMany $hasMany) {
                                $hasMany->groupBy('TotalArea', 'ApartmentType', 'BuidingID')
                                    ->selectRaw(
                                        'TotalArea*10.7639 as TotalArea, ApartmentType, BuidingID, '
                                        .
                                        (config('database.connections')['k_rera']['driver'] == 'mysql' ?
                                            'SUM(ApartmentNumber) as apartment_count, SUM(BookedApartment) as booked_count'
                                            : 'SUM(cast(ApartmentNumber AS int)) as apartment_count, SUM(cast(BookedApartment AS int)) as booked_count')
                                    )
                                    ->whereNull('Delete_UserId')
                                    ->whereNull('Delete_ProjectId');
                            },
                        ]);
                },
            ]
        );
    }

    /**
     * @param  Builder<ProjectMaster>  $builder
     */
    private function withCompany(Builder $builder): void
    {
        $builder->with(
            [
                'company' => function ($query) {
                    $query->where('RoleID', 1);
                },
            ]
        );
    }
}
