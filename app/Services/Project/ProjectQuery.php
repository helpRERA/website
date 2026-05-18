<?php

namespace App\Services\Project;

class ProjectQuery
{
//    const PROJECT_COUNT_QUERY = "select count(*) as count from tbl_Project p inner join tbl_CertificateP c on p.id=c.ProjectID";
    const PROJECT_COUNT_QUERY = "select count(*) as count from tbl_Project p inner join tbl_CertificateP c on p.id=c.ProjectID";
}
