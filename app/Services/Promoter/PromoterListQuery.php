<?php

namespace App\Services\Promoter;

class PromoterListQuery
{
    const QUERY = "
     select
    District,
    PromoterName,
    Address,
    Landmark,
    IndivisualEmailID,
    IndivisualMobileNo,
    CompanyEmailID,
    CompanyMobileNo,
    MemberName,
    MemberAddress,
    MobileNo,
    SecondaryMobileNo,
    EmailID
from
(
        select
            case
                when (UP.InfoTypeValue in (1)) then (
                    isnull(UP.IndivisualName, '') + ' ' + isnull(UP.IndivisualMName, '') + ' ' + isnull(UP.IndivisualLName, '')
                )
                WHEN isnull(UP.CompanyName, '') = '' THEN (
                    isnull(UP.IndivisualName, '') + ' ' + isnull(UP.IndivisualMName, '') + ' ' + isnull(UP.IndivisualLName, '')
                )
                else isnull(UP.CompanyName, '')
            end as PromoterName,
            case
                when (UP.InfoTypeValue in (1)) then d.Districtname
                else d1.Districtname
            end DistrictName,
            case
                when (UP.InfoTypeValue in (1)) then IndivisualHouseNo + ', ' + IndivisualBuilding + ', ' + IndivisualStreet + ', ' + IndivisualLocality
                else companyHouseNo + ', ' + CompanyBuilding + ', ' + CompanyStreet + ', ' + CompanyLocality
            end Address,
            case
                when (UP.InfoTypeValue in (1)) then IndivisualLandmark
                else CompanyLandmark
            end Landmark,
            IndivisualEmailID,
            IndivisualMobileNo,
            CompanyEmailID,
            CompanyMobileNo,
            --(isnull(m.FName,'')+' '+isnull(m.MName,'')+' '+isnull(m.LName,''))MemberName,
            (
                SELECT
                    STRING_AGG(
                        (
                            isnull(m.FName, '') + ' ' + isnull(m.MName, '') + ' ' + isnull(m.LName, '')
                        ),
                        ', '
                    )
                FROM
                    tbl_MemberDetails m
                where
                    m.userId = UP.userid
                GROUP BY
                    m.userId
            ) MemberName,
            (
                SELECT
                    STRING_AGG(
                        (
                            isnull(m.HouseNo, '') + ',' + isnull(m.Building, '') + ',' + isnull(m.Street, '') + ',' + isnull(m.Locality, '') + ',' + isnull(d2.Districtname, '') + ',' + isnull(s.statename, '') + ',' + isnull(m.PinCode, '')
                        ),
                        ' - '
                    )
                FROM
                    tbl_MemberDetails m
                    left join mstDistrict d2 on m.DistrictID = d2.Districtcode
                    and d2.Langid = 1
                    left join mstState s on d2.Statecode = s.statecode
                where
                    m.userId = UP.userid
                GROUP BY
                    m.userId
            ) MemberAddress,
            (
                SELECT
                    STRING_AGG(isnull(m.MobileNo, ''), ', ')
                FROM
                    tbl_MemberDetails m
                where
                    m.userId = UP.userid
                GROUP BY
                    m.userId
            ) MobileNo,
            (
                SELECT
                    STRING_AGG(isnull(m.SecondaryMobileNo, ''), ', ')
                FROM
                    tbl_MemberDetails m
                where
                    m.userId = UP.userid
                GROUP BY
                    m.userId
            ) SecondaryMobileNo,
            (
                SELECT
                    STRING_AGG(isnull(m.EmailID, ''), ', ')
                FROM
                    tbl_MemberDetails m
                where
                    m.userId = UP.userid
                GROUP BY
                    m.userId
            ) EmailID,
            isnull(d.Districtname, d1.Districtname) District
        from
            tbl_Project p
            inner join tbl_CertificateP c on p.id = c.ProjectID
            INNER JOIN tbl_UserProfile UP on p.UserID = UP.UserID
            left join tbl_MemberDetails md on up.UserID = md.Userid
            left join mstDistrict d on UP.IndivisualDistrictValue = d.Districtcode
            and d.Langid = 1
            left join mstDistrict d1 on UP.CompanyDistrictValue = d1.Districtcode
            and d1.Langid = 1 --left join mstDistrict d2 on UP.IndivisualDistrictValue=d2.Districtcode and d2.Langid=1
            --left join mstState s on d2.Statecode=s.statecode
        where
            p.RoleID = 1
            and p.District in(598, 596, 600, 599, 601)
    ) t
group by
    District,
    PromoterName,
    Address,
    Landmark,
    IndivisualEmailID,
    IndivisualMobileNo,
    CompanyEmailID,
    CompanyMobileNo,
    MemberName,
    MemberAddress,
    MobileNo,
    SecondaryMobileNo,
    EmailID
order by
    PromoterName
    ";
}
