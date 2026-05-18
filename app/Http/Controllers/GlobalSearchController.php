<?php

namespace App\Http\Controllers;

use App\Repository\Announcement\AnnouncementRepository;
use App\Services\GlobalSearch\GlobalSearchService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class GlobalSearchController extends Controller
{
    public function index(
        Request $request,
        GlobalSearchService $globalSearch
    ): Response {

        $results = $globalSearch->search(
            $request->section ?? 'Announcements',
            $request->search
        );

        $results['oldSearch'] = $request->search;
        $results['section'] = $request->section ?? 'Announcements';

        return Inertia::render('GlobalSearchPage', $results);
    }
}
