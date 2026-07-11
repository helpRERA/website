<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$page = App\Models\UIBuilder\Page::where('url', 'home')->first();
$blocksData = $page->blocks;
$blocks = isset($blocksData['blocks']) ? $blocksData['blocks'] : $blocksData;

$newBlocks = [];
$pos = 1;
$verifyBlock = null;

// Keep only desired blocks and remove "Left Image" / "Right Image"
foreach($blocks as $b) {
    if ($b['blockName'] === 'Left Image' || $b['blockName'] === 'Right Image') {
        continue;
    }
    if ($b['blockName'] === 'Home Verify Project') {
        $verifyBlock = $b;
        continue;
    }
    
    // We want to insert Verify Project before Gallery
    if ($b['blockName'] === 'Home Gallery' && $verifyBlock) {
        $verifyBlock['position'] = $pos++;
        $newBlocks[] = $verifyBlock;
    }

    $b['position'] = $pos++;
    $newBlocks[] = $b;
}

// If it wasn't inserted (Gallery wasn't found), add it to the end
if ($verifyBlock && !in_array($verifyBlock, $newBlocks, true)) {
    $verifyBlock['position'] = $pos++;
    $newBlocks[] = $verifyBlock;
}

$blocksData['blocks'] = $newBlocks;
$page->blocks = $blocksData;
$page->save();
echo "Replaced blocks successfully!\n";
