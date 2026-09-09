<?php

namespace Tests\Unit;

use App\Http\Controllers\AgreementForSaleController;
use Illuminate\Http\Request;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;

class AgreementDataMappingTest extends TestCase
{
    /** @dataProvider maintenanceClausePayloads */
    public function test_maintenance_clauses_are_not_bound_to_an_agreement_text_column(array $payload): void
    {
        $request = new Request($payload + ['projectId' => '272', 'userId' => '30190']);
        $method = new ReflectionMethod(AgreementForSaleController::class, 'mapData');
        $method->setAccessible(true);

        $data = $method->invoke(new AgreementForSaleController(), $request);

        $this->assertArrayNotHasKey('maintenance_clauses', $data);
        foreach ($data as $column => $value) {
            $this->assertTrue($value === null || is_scalar($value), "$column must be a scalar SQL binding");
        }
        $this->assertSame('272', $data['project_id']);
        $this->assertNull($data['execution_place']);
        // The relationship-saving code must still receive the original clause list.
        $this->assertSame($payload['maintenanceClauses'] ?? null, $request->input('maintenanceClauses'));
    }

    public static function maintenanceClausePayloads(): array
    {
        return [
            'omitted' => [[]],
            'empty form' => [['maintenanceClauses' => []]],
            'blank clause' => [['maintenanceClauses' => [['id' => 1, 'text' => '']]]],
            'populated clauses' => [['maintenanceClauses' => [
                ['id' => 1, 'text' => 'Maintain common areas.'],
                ['id' => 2, 'text' => 'Service equipment annually.'],
            ]]],
        ];
    }
}
