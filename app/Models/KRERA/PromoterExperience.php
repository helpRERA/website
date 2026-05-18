<?php

namespace App\Models\KRERA;

use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\KRERA\PromoterExperience
 *
 * @property int $ID
 * @property string|null $ProjectName
 * @property string|null $Address
 * @property int|null $ProjectTypeIDMain
 * @property string|null $LandArea
 * @property string|null $DetailsOfPaymentPending
 * @property string|null $ProjectCurrentStatus
 * @property string|null $ProjectDetailsLitigations
 * @property string|null $DateOfCommencement
 * @property string|null $ProposedDateOfCompletion
 * @property string|null $ActualCompletionDate
 * @property string|null $Remarks
 * @property string|null $OtherRelevantExperience
 * @property int|null $UserID
 * @property string|null $CreatedOn
 * @property int|null $CreatedBy
 * @property string|null $ModifiedOn
 * @property int|null $ModifiedBy
 * @property string|null $reraRegistrationNumber
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience query()
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereActualCompletionDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereCreatedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereDateOfCommencement($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereDetailsOfPaymentPending($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereID($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereLandArea($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereModifiedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereModifiedOn($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereOtherRelevantExperience($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereProjectCurrentStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereProjectDetailsLitigations($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereProjectName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereProjectTypeIDMain($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereProposedDateOfCompletion($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereRemarks($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereReraRegistrationNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PromoterExperience whereUserID($value)
 * @mixin \Eloquent
 */
class PromoterExperience extends Model
{
    public $timestamps = false;
    protected $table = 'tbl_PromoterExpDetailsNew';
    protected $connection = 'k_rera';
}
