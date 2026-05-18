<?php

namespace App\Http\Controllers\Announcement;

use App\Actions\Announcement\AnnouncementAddTag;
use App\Actions\Announcement\AnnouncementDeleteTag;
use App\Http\Controllers\Controller;
use App\Http\Requests\Announcement\AnnouncementTagCreateRequest;
use App\Models\Announcement\AnnouncementTag;
use App\Repository\Announcement\AnnouncementTagRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class AnnouncementTagsController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(
        AnnouncementTagCreateRequest $request,
        AnnouncementAddTag $announcementAddTag
    ): RedirectResponse {
        return $announcementAddTag->addTag($request->validated());
    }

    public function destroy(string $tagId, AnnouncementDeleteTag $tagDelete): RedirectResponse
    {
        return $tagDelete->deleteTag((int) $tagId);
    }
}
