<?php

namespace App\Services\PageBuilder;

use App\Models\Announcement\Announcement;
use App\Models\Gallery\Gallery;
use App\Models\Gallery\GalleryVideo;
use App\Repository\Agent\UserProfileRepository;
use App\Repository\Announcement\AnnouncementRepository;
use App\Repository\Gallery\GalleryRepository;
use App\Repository\Gallery\VideoRepository;
use App\Repository\Locality\DistrictRepository;
use App\Services\Complaints\ComplaintListQuery;
use App\Services\Project\ProjectListService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Collection as SupportCollection;
use Illuminate\Support\Facades\DB;
use InvalidArgumentException;
use App\Actions\Property\PropertySearch;
use App\Services\Locality\LocalityListService;
use Illuminate\Support\Facades\Crypt;

use Illuminate\Support\Facades\App;


class FetchDataDependencyService
{
    public function registeredProjects(): int
    {
        try {
            $result = DB::connection('k_rera')
                ->select(ProjectListService::PROJECT_COUNT_QUERY);

            if ($result == null || count($result) < 1) {
                return 0;
            }

            return $result[0]->count;
        } catch (\Exception $e) {
            return 0;
        }
    }

    public function promotersCount(): int
    {
        try {
            $result = DB::connection('k_rera')->select(
                'select count(*) as count from tbl_UserMaster um
                        where roleid=1 and  UserID IN(
                        select distinct p.UserID from  tbl_Project p
                        inner join tbl_CertificateP cp on p.id=cp.ProjectID
                        inner join tbl_UserStatusSubMapping s on p.id=s.ProjectID and isnull(s.IsWithdraw,0)=0)'
            );

            if ($result == null || count($result) < 1) {
                return 0;
            }

            return $result[0]->count;
        } catch (\Exception $e) {
            return 0;
        }
    }

    public function registeredAgents(): int
    {
        try {
            $districtRepository = new DistrictRepository();
            $repo = new UserProfileRepository($districtRepository);
            return $repo->registeredAgents();
        } catch (\Exception $e) {
            return 0;
        }
    }

    /**
     * @return Collection<int, Announcement>
     */
    public function latestAnnouncements(): Collection
    {
        $repo = new AnnouncementRepository();
        return $repo->latest();
    }

    /**
     * Undocumented function
     *
     * @return Collection<int, Gallery>
     */
    public function latestAlbums(): Collection
    {
        $repo = new GalleryRepository();
        return $repo->latestAlbums();
    }

    /**
     *
     * @return Collection<int, GalleryVideo>
     */
    public function latestVideos(): Collection
    {
        $repo = new VideoRepository();
        return $repo->latestVideos();
    }

    /**
     * @return Collection<Announcement>
     * @throws InvalidArgumentException
     */
    public function announcementTicker(): Collection
    {
        $repo = new AnnouncementRepository();
        return $repo->ticker();
    }

    public function complaintsCount(): int
    {
        try {
            $result = DB::connection('k_rera')->select(ComplaintListQuery::COMPLAINTS_COUNT_QUERY);

            if ($result == null || count($result) < 1) {
                return 0;
            }

            return $result[0]->count;
        } catch (\Exception $e) {
            return 0;
        }
    }

    public function browseProjects(): SupportCollection
    {
        try {
            $propertySearch = App::make(PropertySearch::class);
            $result = $propertySearch->search([
                'sort_by' => 'certificatePID',
                'sort_order' => 'desc',
                'per_page' => 8,
            ]);

            $projects = collect($result->items ?? $result->getCollection());

            //dd($projects->first()->getRelations());

            return $projects->map(fn($p) => [
                'ID' => $p->ID,
                'Name' => $p->Name,
                'DistrictName' => $p->district->Districtname ?? '',
                'Area' => $p->Area,
                'ImageId' => $p->images[0]->ID ?? null,
                'CertificateNo' => $p->certificateInfo->CertificateNo ?? null,
                'certificatePID' => $p->certificatePID,
                'NumberOfResidentialUnits' => $p->NumberOfResidentialUnits,
                'NumberOfCommercialUnits' => $p->NumberOfCommercialUnits,
                'apartment_count' => (int) $p->apartment_count,
                'booked_count' => (int) $p->booked_count,
            ]);
        } catch (\Exception $e) {
            return collect();
        }
    }


    public function districtList(): SupportCollection
    {
        try {
            $service = app(LocalityListService::class);
            $districts = collect($service->getDistricts());

            return $districts->map(function ($d) {
                return [
                    'Districtcode' => $this->encodeDistrictToken($d->Districtcode ?? $d['Districtcode']),
                    'Districtname' => $d->Districtname ?? $d['Districtname'],
                ];
            });
        } catch (\Exception $e) {
            return collect();
        }
    }

    private function encodeDistrictToken($code): string
    {
        $encrypted = Crypt::encryptString((string) $code);
        return rtrim(strtr($encrypted, '+/', '-_'), '=');
    }
}