<?php

namespace App\Actions\NavMenu;

use App\Models\UIBuilder\NavMenuItem;
use App\Repository\NavMenu\NavMenuRepository;
use Exception;
use Illuminate\Http\RedirectResponse;

class NavMenuItemCreate
{

    public function __construct(private NavMenuRepository $navMenuRepository)
    {
    }


    /**
     * Undocumented function
     *
     * @param array{
     *  section: string,
     *  items: array,
     *  created_by: string|null,
     *  updated_by: string|null,
     * } $data
     *
     * @return RedirectResponse
     */
    public function create(array $data): RedirectResponse
    {
        $alreadyExists = $this->navMenuRepository->fetchSection($data['section'])
            ->first();

        if ($alreadyExists == null) {
            return $this->addNewItem($data);
        }

        return $this->updateItem($alreadyExists->id, $data);
    }

    /**
     * Undocumented function
     *
     * @param array{
     *  section: string,
     *  items: array,
     *  created_by: string|null,
     *  updated_by: string|null,
     * } $data
     *
     * @return RedirectResponse
     */
    private function addNewItem(array $data): RedirectResponse
    {
        $record = $this->navMenuRepository->create($data);
        if ($record == null) {
            return redirect()
                ->back()
                ->with(['error' => 'Failed To Create Record']);
        }
        return redirect()
            ->back()
            ->with(['message' => 'Added Nav Menu Section: ' . $data['section']]);
    }

    /**
     * Undocumented function
     *
     * @param array{
     *  section: string,
     *  items: array,
     *  created_by: string|null,
     *  updated_by: string|null,
     * } $data
     * @param int $menuItemId
     *
     * @return RedirectResponse
     */
    private function updateItem(int $menuItemId, array $data): RedirectResponse
    {
        try {
            $this->navMenuRepository->update($menuItemId, $data);
        } catch (Exception $e) {
            return redirect()
                ->back()
                ->with(['error' => $e->getMessage()]);
        }
        return redirect()
            ->back()
            ->with(['message' => 'Updated Nav Menu Section: ' . $data['section']]);
    }
}
