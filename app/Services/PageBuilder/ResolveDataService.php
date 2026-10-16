<?php

namespace App\Services\PageBuilder;

use App\Models\UIBuilder\Page;

class ResolveDataService
{

    public function __construct(private FetchDataDependencyService $fetchData)
    {
    }

    /**
     * @return array<string|int, mixed>
     */
    public function getData(Page $page): array
    {
        $result = [];
        if (!isset($page->blocks)) {
            return $result;
        }

       
        foreach ($page->blocks['blocks'] as $block) {
      
            $dependencies = $block['dependencies'] ?? [];
            if (($block['blockName'] ?? '') === 'Browse Projects') {
                $dependencies = array_unique(array_merge($dependencies, ['browseProjects', 'districtList']));
            }
            foreach ($dependencies as $dependency) {
                if (!isset($result[$dependency])) {
                    $result[$dependency] = $this->fetchData->$dependency();
                }
            }
        }

     
        return $result; 
    }
}
