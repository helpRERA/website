<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
$blocks = App\Models\UIBuilder\Page::where('url', 'home')->first()->blocks['blocks'];
usort($blocks, function($a, $b) {
    return $a['position'] <=> $b['position'];
});
foreach($blocks as $b) {
    echo $b['position'] . ' - ' . $b['blockName'] . "\n";
}
