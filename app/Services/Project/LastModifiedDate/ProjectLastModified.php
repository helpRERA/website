<?php

namespace App\Services\Project\LastModifiedDate;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ProjectLastModified
{
    const LAST_MODIFIED_DATE_QUERY = "
    select
      (
        select
          Convert(
            varchar(10),
            [dbo].[fun_GetLastModifiedDate](p.id, p.userid),
            103
          )
      ) as lastModifiedDate
    from
      tbl_Project P with(nolock)
    where P.ID = ?
    ";

    /**
     * Get last modified date of project & days since last modification
     *
     * @param int|string $projectId
     * @return array{
     *     date: string,
     *     daysSinceLastModification: int
     * }|null
     */
    public function getLastModifiedDate(int|string $projectId): array|null
    {
        $result = DB::connection('k_rera')->select(
            self::LAST_MODIFIED_DATE_QUERY,
            [$projectId]
        );

        if (empty($result)) {
            return null;
        }

        $dateObj = Carbon::createFromFormat('d/m/Y', $result[0]->lastModifiedDate);

        return [
            'date' => $result[0]->lastModifiedDate,
            'daysSinceLastModification' => Carbon::now()->diffInDays($dateObj)
        ];
    }
}
