<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$page = App\Models\UIBuilder\Page::where('url', 'home')->first();
$blocksData = $page->blocks;
$blocks = isset($blocksData['blocks']) ? $blocksData['blocks'] : $blocksData;

// The exact desired order
$order = [
    'Banner Right Image',
    'Home Announcement Ticker',
    'About Us',
    'Home Action Carousel',
    'Home Latest Announcements',
    'Browse Projects',
    'Home Map Block',
    'Alt Action Carousel'
];

$existingBlocks = [];
foreach($blocks as $b) {
    if (isset($b['blockName'])) {
        $existingBlocks[$b['blockName']][] = $b;
    }
}

$newBlocks = [];
$pos = 1;

// Add the ordered blocks
foreach($order as $blockName) {
    if (isset($existingBlocks[$blockName]) && count($existingBlocks[$blockName]) > 0) {
        $b = array_shift($existingBlocks[$blockName]);
        $b['position'] = $pos++;
        $newBlocks[] = $b;
    } else {
        // Create it if it doesn't exist
        $newBlocks[] = [
            'blockName' => $blockName,
            'position' => $pos++,
            'id' => rand(1000, 9999)
        ];
    }
}

// Keep Home Gallery at the end
if (isset($existingBlocks['Home Gallery'])) {
    $b = array_shift($existingBlocks['Home Gallery']);
    $b['position'] = $pos++;
    $newBlocks[] = $b;
}

// Keep all other remaining blocks at the very end
foreach($existingBlocks as $bName => $bArray) {
    foreach($bArray as $b) {
        $b['position'] = $pos++;
        $newBlocks[] = $b;
    }
}

if (isset($blocksData['blocks'])) {
    $blocksData['blocks'] = $newBlocks;
} else {
    $blocksData = $newBlocks;
}

$page->blocks = $blocksData;
$page->save();

echo "Reordered successfully!\n";
