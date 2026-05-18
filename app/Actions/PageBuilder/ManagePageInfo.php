<?php

namespace App\Actions\PageBuilder;

use App\Models\UIBuilder\Page;
use App\Repository\Page\PageRepository;
use Exception;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use PDO;

class ManagePageInfo
{

    public function __construct(private PageRepository $pageRepository)
    {
    }

    public function create(array $data): RedirectResponse
    {
        if (request()->filled('id')) {
            return $this->update(request()->id, $data);
        }
        $additionalInfo = [
            'created_by' => auth()->user()?->id,
            'updated_by' => auth()->user()?->id,
            'blocks' => [
                'lastUUID' => 1,
                'blocks' => []
            ]
        ];
        $record = array_merge($data, $additionalInfo);
        $page = $this->pageRepository->create($record);
        if ($page == null) {
            return redirect()->back()->with(['error' => 'Page could not be created']);
        }
        return redirect()->route('page-builder.show', $page->id)
            ->with(['success' => 'Page created successfully']);
    }

    private function update(string $id, array $data): RedirectResponse
    {
        try {
            Page::where('id', $id)->update($data);
        } catch (Exception $e) {
            return redirect()->back()->with(['error' => 'Page could not be Updated']);
        }
        return redirect()->route('page-builder.show', $id)
            ->with(['success' => 'Page Updated successfully']);
    }
}
