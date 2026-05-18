<?php

namespace App\Http\Controllers;

use App\Actions\Project\FetchProjectDetailData;
use App\Actions\Property\PropertySearch;
use App\Models\KRERA\ProjectDocument;
use App\Models\KRERA\ProjectMaster;
use App\Repository\Project\ProjectDocumentRepository;
use App\Services\ExtensionCertificate\ExtensionCertificateService;
use App\Services\ExtensionCertificate\ExtensionOrderService;
use App\Services\Locality\LocalityListService;
use App\Services\Project\GetKRERADocumentService;
use App\Services\Project\GetKRERAImageService;
use App\Services\Project\GetKRERASignedCertificate;
use App\Services\Project\LastModifiedDate\ProjectLastModified;
use App\Services\ProjectDocument\ConsideredDocuments;
use App\Services\ProjectURLEncryption\ProjectLinkEncryption;
use App\Services\RegistrationOrder\RegistrationOrderService;
use Illuminate\Database\Query\JoinClause;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\StreamedResponse;

class ExploreProjectController extends Controller
{
    public function index(
        Request $request,
        PropertySearch $propertySearch,
        LocalityListService $localityListService
    ) {
        $projects = $propertySearch->search($request->all());

        return Inertia::render('ExploreProjectsPage', [
            'projects' => $projects,
            'districts' => fn () => $localityListService->getDistricts(),
            'oldSearch' => $request->search ?? '',
            'oldDistrict' => $request->district ?? '',
            'oldTaluk' => $request->taluk ?? '',
            'oldVillage' => $request->village ?? '',
            'oldProjectType' => $request->project_type ?? '',
            'oldBuildingType' => $request->building_type ?? '',
            'oldAmenities' => $request->amenities ?? '',
            'oldMinimumUnits' => $request->filled('minimum_units') ? (int) $request->minimum_units : 0,
            'oldMaximumUnits' => $request->filled('maximum_units') ? (int) $request->maximum_units : 300,
            'oldMinimumAvailableUnits' => $request->filled('minimum_available_units')
                ? (int) $request->minimum_available_units : 0,
            'oldMaximumAvailableUnits' => $request->filled('maximum_available_units')
                ? (int) $request->maximum_available_units : 300,
            'oldStatus' => $request->status ?? '',
            'oldSortOrder' => $request->sort_order ?? 'desc',
            'oldSortBy' => $request->sort_by ?? 'certificatePID',
            'today' => now()->toDateString(),
        ]);
    }

    public function details(
        string $projectId,
        FetchProjectDetailData $fetchProject,
        ProjectDocumentRepository $docRepo,
        ExtensionCertificateService $extensionCert,
        ExtensionOrderService $extensionOrder,
        RegistrationOrderService $registrationOrder,
        ProjectLastModified $lastModifiedService,
        ProjectLinkEncryption $projectLinkEncryption
    ) {

        $project = $fetchProject->getData((int) $projectId);

        $prevUrl = str_replace(url('/'), '', url()->previous());

        $hasForm6 = ProjectDocument::where('ProjectID', $project->ID)
            ->where('DocID', ConsideredDocuments::FORM_SIX)
            ->hasContent()
            ->exists();

        return Inertia::render('ProjectDetails', [
            'today' => now()->toDateString(),
            'project' => $project,
            'projectHash' => $projectLinkEncryption->getEncryptedLink(
                $project->ID,
                $project->RoleID,
                $project->UserID,
                $project->Division,
                '1106'
            ),
            'lastModified' => $lastModifiedService->getLastModifiedDate((int) $projectId),
            'documents' => [
                ...$docRepo->getDocumentCount($project->ID),
                ...$docRepo->getLatestDateCount($project->ID),
            ],
            'orders' => $extensionOrder->getOrders((int) $projectId),
            'hasForm6' => $hasForm6,
            'extensionCertificate' => $extensionCert->getCertificate((int) $projectId),
            'extensionOrder' => $extensionOrder->getExtensionOrder((int) $projectId),
            'registrationOrder' => $registrationOrder->getRegistrationOrder((int) $projectId),
            'prevUrl' => str_starts_with($prevUrl, '/explore-projects') ? $prevUrl : '/explore-projects',
        ]);
    }

    public function imageDownload(string $imageId): StreamedResponse
    {
        $service = new GetKRERAImageService((int) $imageId);

        return $service->downloadImage();
    }

    public function documentDownload(string $documentId): StreamedResponse
    {
        $service = new GetKRERADocumentService((int) $documentId);

        return $service->download();
    }

    public function hsmDownload(string $dgnId): StreamedResponse
    {
        $service = new GetKRERASignedCertificate((int) $dgnId);

        return $service->download();
    }

    public function projectsByDistrict(): JsonResponse
    {
        $projects = ProjectMaster::groupBy('a.Districtname')
            ->leftJoin('mstDistrict as a', function (JoinClause $joinClause) {
                $joinClause->on('a.Districtcode', '=', 'tbl_Project.District')
                    ->where('LangId', 1);
            })
            ->selectRaw('a.Districtname as district, COUNT(*) as count')
            ->get();

        return response()->json($projects);
    }

    public function extensionOrderDownload(
        string $documentId,
        ExtensionOrderService $orderService
    ): ?StreamedResponse {
        return $orderService->downloadOrder((int) $documentId);
    }

    public function registrationOrderDownload(
        string $documentId,
        RegistrationOrderService $orderService
    ): ?StreamedResponse {
        return $orderService->downloadOrder((int) $documentId);
    }

    public function extensionCertificateDownload(
        string $documentId,
        ExtensionCertificateService $certService
    ): StreamedResponse {
        return $certService->downloadCertificate((int) $documentId);
    }
}
