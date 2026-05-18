<?php

namespace App\Services\Complaints;

use App\Libs\ArrayPagination;
use DB;
use Illuminate\Pagination\LengthAwarePaginator;

class ComplaintsListService
{
    const RULING_BY_KRERA = 'Rulings of K-RERA Authority';

    const JUDGEMENT_BY_OFFICER = 'Judgements by Adjudicating Officers';

    public function getData(
        ?string $search,
        ?string $rulingBy,
        string $sort,
    ): LengthAwarePaginator {
        $queryParams = [];
        if ($search != null) {
            $queryParams = [
                '%'.$search.'%',
                '%'.$search.'%',
                '%'.$search.'%',
            ];
        }

        $list = DB::connection('k_rera')->select(
            ComplaintListQuery::QUERY.
            ($search == null
                ? ''
                : ' and (ComplaintNo like ? or RespondentName like ? or Projectname like ?)'
            )
            .($rulingBy === self::RULING_BY_KRERA ?
                ' and temptable_citizencomplaint.RulingByMaharera = 1' : ' '
            )
            .($rulingBy === self::JUDGEMENT_BY_OFFICER ?
                ' and temptable_citizencomplaint.JudgementByOfficer = 1' : ' '
            ).(
                $sort === 'newest' ?
                    ' order by CAST(ComplaintYear as INT) desc, CAST(ComplaintID as INT) desc' :
                    ' order by CAST(ComplaintYear as INT) asc, CAST(ComplaintID as INT) asc'
            ),
            $queryParams
        );

        $arrayPagination = new ArrayPagination($list, 20);

        return $arrayPagination->paginate();
    }
}
