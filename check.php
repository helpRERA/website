<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
foreach(App\Models\UIBuilder\Page::where('url', 'home')->first()->blocks['blocks'] as $b) echo $b['blockName'] . "\n";
