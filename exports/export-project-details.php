<?php

// CLI only: php exports/export-project-details.php
if (PHP_SAPI !== 'cli') {
    http_response_code(404);
    exit;
}

require __DIR__ . '/../vendor/autoload.php';
$app = require __DIR__ . '/../bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();
ini_set('memory_limit', '2048M');
set_time_limit(0);

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Cell\DataType;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

try {
    $pdo = Illuminate\Support\Facades\DB::connection('k_rera')->getPdo();
    echo "Database connected.\n";
    $sql = file_get_contents(__DIR__ . '/all-active-project-details.sql');
    $db = config('database.connections.k_rera.database');
    $docs = config('database.connections.k_rera_docs.database');
    $quote = static fn ($name) => '[' . str_replace(']', ']]', $name) . ']';
    $sql = str_replace(
        ['USE [Kerala_RERA]', 'Kerala_RERA_Docs.dbo.', "'Kerala_RERA_Docs'", "'Kerala_RERA'"],
        ['USE ' . $quote($db), $quote($docs) . '.dbo.', "'" . str_replace("'", "''", $docs) . "'", "'" . str_replace("'", "''", $db) . "'"],
        $sql
    );
    $statement = $pdo->prepare($sql);
    $statement->execute();
    $book = new Spreadsheet();
    $book->removeSheetByIndex(0);
    $names = ['Projects', 'Promoters', 'Buildings', 'Apartment breakdown',
        'Certificates', 'Defaults', 'Facilities', 'Coordinates', 'Plots',
        'Extensions', 'Extension mappings', 'Extension HSM certificates',
        'Extension digital certificates', 'Photos', 'Documents', 'HSM certificates',
        'Registration orders', 'Extension orders', 'Correction orders', 'Complaints'];
    $index = 0;
    do {
        $count = $statement->columnCount();
        if ($count === 0) {
            continue;
        }
        $sheet = $book->createSheet();
        $sheet->setTitle($names[$index] ?? ('Result ' . ($index + 1)));
        $headers = [];
        for ($col = 0; $col < $count; $col++) {
            $headers[] = $statement->getColumnMeta($col)['name'];
        }
        $sheet->fromArray($headers, null, 'A1');
        $rowNumber = 2;
        while ($row = $statement->fetch(PDO::FETCH_NUM)) {
            if ($rowNumber > 1048576) {
                throw new RuntimeException('Excel sheet row limit exceeded.');
            }
            foreach ($row as $col => $value) {
                if ($value === null) {
                    continue;
                }
                // Explicit text preserves IDs, leading zeros and prevents formulas.
                $sheet->setCellValueExplicitByColumnAndRow($col + 1, $rowNumber,
                    (string) $value, DataType::TYPE_STRING);
            }
            $rowNumber++;
        }
        $lastColumn = PhpOffice\PhpSpreadsheet\Cell\Coordinate::stringFromColumnIndex($count);
        $sheet->getStyle('A1:' . $lastColumn . '1')->getFont()->setBold(true);
        $sheet->freezePane('A2');
        $sheet->setAutoFilter('A1:' . $lastColumn . max(1, $rowNumber - 1));
        echo $sheet->getTitle() . ': ' . ($rowNumber - 2) . " rows\n";
        $index++;
    } while ($statement->nextRowset());
    if ($index !== count($names)) {
        throw new RuntimeException('Unexpected result set count; workbook was not saved.');
    }
    $book->setActiveSheetIndex(0);
    $path = __DIR__ . '/all-active-project-details.xlsx';
    (new Xlsx($book))->save($path);
    echo 'Saved: ' . $path . "\n";
} catch (Throwable $error) {
    // Avoid printing connection strings, credentials or record data.
    fwrite(STDERR, 'Export failed (' . get_class($error) . ', code ' . $error->getCode() . ").\n");
    if ($error instanceof PDOException && isset($error->errorInfo[0])) {
        fwrite(STDERR, 'SQLSTATE: ' . $error->errorInfo[0] . "\n");
        $detail = $error->errorInfo[2] ?? '';
        foreach (['k_rera', 'k_rera_docs'] as $connection) {
            $password = config('database.connections.' . $connection . '.password');
            if (is_string($password) && $password !== '') {
                $detail = str_replace($password, '[redacted]', $detail);
            }
        }
        fwrite(STDERR, $detail . "\n");
    }
    exit(1);
}
