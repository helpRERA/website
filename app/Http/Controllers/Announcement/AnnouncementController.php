<?php

namespace App\Http\Controllers\Announcement;

use App\Actions\Announcement\AnnouncementCreate;
use App\Actions\Announcement\AnnouncementDelete;
use App\Actions\Announcement\AnnouncementFileDelete;
use App\Actions\Announcement\AnnouncementUpdate;
use App\Actions\Announcement\AttachAnnouncementFile;
use App\Http\Controllers\Controller;
use App\Http\Requests\Announcement\AddAnnouncementFileRequest;
use App\Http\Requests\Announcement\AnnouncementForm;
use App\Models\Announcement\Announcement;
use App\Models\Announcement\AnnouncementFile;
use App\Repository\Announcement\AnnouncementRepository;
use App\Repository\Announcement\AnnouncementTagRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class AnnouncementController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }


    public function index(
        AnnouncementRepository $announcementRepository,
        Request                $request
    ): Response
    {
        $announcements = $announcementRepository->search(
            $request->search,
            $request->type,
            $request->sub_type,
            $request->sortBy,
            $request->sortOrder,
            $request->from_date,
            $request->to_date,
            false
        )->paginate(20);

        return Inertia::render('Announcements/AnnouncementList', [
            'announcements' => $announcements,
            'oldSearch' => $request->search ?? '',
            'oldType' => $request->type ?? '',
            'oldSubType' => $request->subType ?? '',
            'oldSortBy' => $request->sortBy ?? '',
            'oldSortOrder' => $request->sortOrder ?? '',
            'oldFrom' => $request->from_date ?? '',
            'oldTo' => $request->to_date ?? '',
        ]);
    }

    public function store(AnnouncementForm $request, AnnouncementCreate $createService): RedirectResponse
    {
        return $createService->create($request->all());
    }

    public function create(): Response
    {
        return Inertia::render('Announcements/AnnouncementCreate');
    }

    public function show(string $announcementId, AnnouncementTagRepository $announcementTagRepository): Response
    {
        $announcement = Announcement::where('id', $announcementId)
            ->with('tags')
            ->firstOrFail();

        $files = AnnouncementFile::where('announcement_id', $announcement->id)
            ->with('document')
            ->get();

        return Inertia::render('Announcements/AnnouncementShow', [
            'announcement' => $announcement,
            'files' => $files
        ]);
    }

    public function edit(string $announcementId): Response
    {
        $announcement = Announcement::where('id', $announcementId)
            ->firstOrFail();

        return Inertia::render('Announcements/AnnouncementEdit', [
            'announcement' => $announcement
        ]);
    }

    public function update(AnnouncementForm $request, AnnouncementUpdate $updateService, string $announcementId): RedirectResponse
    {
        return $updateService->update($request->all(), (int)$announcementId);
    }


    public function destroy(string $announcementId, AnnouncementDelete $announcementDelete): RedirectResponse
    {
        $announcement = Announcement::where('id', $announcementId)
            ->firstOrFail();

        return $announcementDelete->delete($announcement);
    }


    public function removeFile(
        AnnouncementFile       $file,
        AnnouncementFileDelete $fileDelete
    ): RedirectResponse
    {
        return $fileDelete->remove($file);
    }

    public function attachFile(
        AttachAnnouncementFile     $attachFile,
        AddAnnouncementFileRequest $request
    ): RedirectResponse
    {
        $validated = $request->all();
        return $attachFile->add($validated['announcement_id'], $validated['document_id']);
    }

    public function latestAnnouncements(
        Request                $request,
        AnnouncementRepository $repo
    ): JsonResponse
    {
        $type = $request->type;
        return response()->json($repo->latest($type));
    }
}
