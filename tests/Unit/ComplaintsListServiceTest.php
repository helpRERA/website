<?php

namespace Tests\Unit;

use App\Services\Complaints\ComplaintsListService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Mockery;
use Tests\TestCase;

class ComplaintsListServiceTest extends TestCase
{
    public function test_only_projects_with_listed_complaints_are_returned(): void
    {
        DB::shouldReceive('connection')->with('k_rera')->once()->andReturnSelf();
        DB::shouldReceive('select')->once()->with(Mockery::on(function ($sql) {
            return str_starts_with($sql, 'select distinct ProjectId from (')
                && str_contains($sql, \App\Services\Complaints\ComplaintListQuery::QUERY)
                && str_contains($sql, 'ProjectId in (?, ?)');
        }), [42, 43])->andReturn([(object) ['ProjectId' => 42]]);

        $this->assertSame(['42'], (new ComplaintsListService())->getProjectIdsWithComplaints([42, 43]));
    }

    public function test_empty_project_page_needs_no_complaint_query(): void
    {
        DB::shouldReceive('connection')->never();
        $this->assertSame([], (new ComplaintsListService())->getProjectIdsWithComplaints([]));
    }

    public function test_project_search_preserves_all_matches_and_filters_on_later_pages(): void
    {
        $this->app->instance('request', Request::create('/complaint-list', 'GET', [
            'project_id' => '42', 'search' => 'A & B', 'ruling_by' => 'all', 'page' => 2,
        ]));
        $rows = array_map(fn ($id) => (object) ['ID' => $id], range(1, 23));
        DB::shouldReceive('connection')->with('k_rera')->once()->andReturnSelf();
        DB::shouldReceive('select')->once()->with(Mockery::on(function ($sql) {
            return str_contains($sql, 'and temptable_citizencomplaint.ProjectId = ?')
                && !str_contains($sql, 'and temptable_citizencomplaint.RulingByMaharera = 1')
                && !str_contains($sql, 'and temptable_citizencomplaint.JudgementByOfficer = 1');
        }), ['%A & B%', '%A & B%', '%A & B%', '42'])->andReturn($rows);

        $results = (new ComplaintsListService())->getData('A & B', 'all', 'newest', '42');

        $this->assertSame(23, $results->total());
        $this->assertCount(3, $results->items());
        $this->assertSame(21, $results->items()[0]->ID);
        parse_str(parse_url($results->url(1), PHP_URL_QUERY), $query);
        $this->assertSame('42', $query['project_id']);
        $this->assertSame('A & B', $query['search']);
        $this->assertSame('all', $query['ruling_by']);
    }
}
