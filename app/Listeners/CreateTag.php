<?php

namespace App\Listeners;

use App\Events\TagAttached;
use App\Models\Tag;

class CreateTag
{
    /**
     * Create the event listener.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function handle(TagAttached $event): void
    {
        $oldRecord = Tag::where('tag', $event->tag)->first();
        if ($oldRecord) {
            return;
        }

        Tag::create([
            'tag' => $event->tag,
            'created_by' => auth()->id(),
            'updated_by' => auth()->id(),
        ]);
    }
}
