<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$page = App\Models\UIBuilder\Page::where('url', 'home')->first();
$blocksData = $page->blocks;
$blocks = isset($blocksData['blocks']) ? $blocksData['blocks'] : $blocksData;

$newBlocks = [];
$pos = 1;

foreach($blocks as $b) {
    if ($b['blockName'] === 'Home Leadership') {
        continue;
    }
    
    $b['position'] = $pos++;
    $newBlocks[] = $b;
}

$blocksData['blocks'] = $newBlocks;
$page->blocks = $blocksData;
$page->save();
echo "Removed Leadership blocks successfully!\n";
