<?php

namespace App\Http\Controllers;

use App\Models\Announcement\Announcement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class FrontPageController extends Controller
{
    public function index(): Response
    {
        $announcements = Announcement::limit(6)->get();
        return Inertia::render('Welcome', [
            'announcements' => $announcements
        ]);
    }
}
