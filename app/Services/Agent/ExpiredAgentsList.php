<?php

namespace App\Services\Agent;

use App\Libs\ArrayPagination;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class ExpiredAgentsList
{
    public function getAgents(?string $search): LengthAwarePaginator
    {

        $searchExpression = $search == null ? "" : "dbo.fun_GetPromoterName(u.UserID) like '%$search%' and";

        $data = DB::connection('k_rera')->select("
        select dbo.fun_GetPromoterName(u.UserID)AgentName, AgentRegValidDate,
            case when isnull(AgentRegValidDate,'')<>'' then dateadd (DD,1826,convert(date,AgentRegValidDate))
            else dateadd (DD,1826,convert(date,c.Createdon))end ExpiredOn,convert(date,c.Createdon) CreatedOn
    from tbl_UserProfile u
        inner join tbl_CertificateA c on u.UserID=c.UserID
        inner join tbl_UserStatusSubMapping s on u.UserID=s.UserID
        where $searchExpression case when isnull(AgentRegValidDate,'')<>'' then dateadd (DD,1826,convert(date,AgentRegValidDate))
            else dateadd (DD,1826,convert(date,c.Createdon)) end <convert(date,getdate())
        ");


        $pagination = new ArrayPagination($data, 20);

        return $pagination->paginate();
    }
}
