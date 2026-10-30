<?php

namespace Tests\Feature;

use Tests\TestCase;

class AgreementDefaultValidationTest extends TestCase
{
    public function test_invalid_default_counts_are_rejected_before_saving(): void
    {
        foreach (['two', '1.5', '-1'] as $value) {
            $payload = [
                'defaultConsecutiveDemands' => $value,
                'defaultConsecutiveMonths' => $value,
            ];
            $this->postJson('/agreements', $payload)
                ->assertUnprocessable()
                ->assertJsonValidationErrors(['defaultConsecutiveDemands', 'defaultConsecutiveMonths']);
            $this->putJson('/agreements/1', $payload)
                ->assertUnprocessable()
                ->assertJsonValidationErrors(['defaultConsecutiveDemands', 'defaultConsecutiveMonths']);
        }
    }
}
