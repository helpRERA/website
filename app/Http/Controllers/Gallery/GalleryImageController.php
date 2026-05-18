<?php

namespace App\Http\Controllers\Gallery;

use App\Actions\Gallery\AddAlbumImage;
use App\Http\Controllers\Controller;
use App\Models\Gallery\GalleryImage;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class GalleryImageController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }

    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }


    public function store(AddAlbumImage $addAlbumImage): RedirectResponse
    {
        return $addAlbumImage->add();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(string $id): RedirectResponse
    {
        if (GalleryImage::destroy($id)) {
            return redirect()
                ->back()
                ->with(['message' => 'Removed Image From Gallery']);
        }

        return redirect()
            ->back()
            ->with(['message' => 'Failed To Remove Image From Gallery']);
    }
}
