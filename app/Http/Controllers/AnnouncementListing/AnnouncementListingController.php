<?php

namespace App\Http\Controllers\AnnouncementListing;

use App\Http\Controllers\Controller;
use App\Models\Announcement\Announcement;
use App\Repository\Announcement\AnnouncementRepository;
use App\Services\Announcement\AnnouncementFilterService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementListingController extends Controller
{
    public function index(Request $request, AnnouncementFilterService $filterService): Response
    {
        $announcements = $filterService->search($request->all())->paginate(20)
            ->withQueryString();

        return Inertia::render('AnnouncementListing/AnnouncementListingPage', [
            'announcements' => $announcements,
            'oldSearch' => $request->search ?? '',
            'oldFrom' => $request->from_date ?? '',
            'oldTo' => $request->to_date ?? '',
            'oldType' => $request->type ?? '',
            'oldSubType' => $request->sub_type ?? '',
            'oldSort' => $request->sort ?? 'newest',
        ]);
    }

    public function show(string $announcementId): Response
    {
        $record = Announcement::where('id', $announcementId)
            ->with('documents.document')
            ->firstOrFail();
        return Inertia::render('AnnouncementListing/AnnouncementViewPage', [
            'announcement' => $record
        ]);
    }

    public function latestAnnouncements(
        Request $request,
        AnnouncementRepository $repo
    ): JsonResponse {
        $type = $request->type;
        return response()->json($repo->latest($type));
    }
}
