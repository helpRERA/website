<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Agreement;
use Illuminate\Support\Facades\DB;
use App\Models\PromoterCompany;
use App\Models\PromoterIndividual;
use App\Models\promoterPartnership;
use App\Models\PriceBreakdown;
use App\Models\GarageDetail;
use Illuminate\Support\Facades\Storage;


class AgreementForSaleController extends Controller
{
    /**
     * Normalize all user-supplied scalar values, including values in nested
     * arrays. SQL injection is prevented by Eloquent's parameter binding; this
     * additionally removes null bytes, HTML tags and surrounding whitespace.
     */
    private function sanitizeValue(mixed $value): mixed
    {
        if (is_array($value)) {
            return array_map(fn ($item) => $this->sanitizeValue($item), $value);
        }

        if (is_string($value)) {
            return trim(strip_tags(str_replace("\0", '', $value)));
        }

        return $value;
    }

    private function sanitizeRequest(Request $request): void
    {
        $request->merge($this->sanitizeValue($request->all()));
    }

    public function index(Request $request)
    {
        $data = $request->route('data');

        abort_unless(is_string($data) && $data !== '' && strlen($data) <= 4096, 422, 'Invalid request data.');

        $data = $this->sanitizeValue($data);

        $decoded = base64_decode($data, true);

        abort_if($decoded === false, 422, 'Invalid request data.');

        parse_str($decoded, $params);

        $projectId = $this->sanitizeValue($params['ProjectID'] ?? null);
        $userId = $this->sanitizeValue($params['UserID'] ?? null);

        abort_unless(is_scalar($projectId) && is_scalar($userId), 422, 'Invalid request data.');


        $agreement = Agreement::with([
            'promoterCompany',
            'promoterIndividual',
            'promoterPartnership',
            'landJdas',
            'landOwnerEntries',
            'additionalDisclosures',
            'maintenanceClauses',
            'additionalTerms',
            'PriceBreakdown',
            'garageDetails',
            'plotPricings',
            'witnesses',
        ])
            ->where('project_id', $projectId)
            ->where('user_id', $userId)
            ->first();



        return Inertia::render('DocumentTemplate/AgreementForSale', [
            'title' => 'Agreement for Sale - Document Generator',
            'projectId' => $projectId,
            'userId' => $userId,
            'agreement' => $agreement,
        ]);
    }

    private function mapData(Request $request)
    {
        return [
            'execution_place' => $request->input('executionPlace'),
            'date_day' => $request->input('dateDay'),
            'date_month' => $request->input('dateMonth'),
            'date_year' => $request->input('dateYear'),
            'promoter_type' => $request->input('promoterType'),
            'allottee_type' => $request->input('allotteeType'),
            //'land_survey_nos' => $request->input('landSurveyNos'),
            // 'land_resurvey_nos' => $request->input('landResurveyNos'),
            // 'land_admeasuring' => $request->input('landAdmeasuring'),
            // 'land_situated_at' => $request->input('landSituatedAt'),
            // 'land_tehsil' => $request->input('landTehsil'),
            //'land_district' => $request->input('landDistrict'),
            // 'land_deed_type' => $request->input('landDeedType'),
            //  'land_deed_sub_registrar_office' => $request->input('landDeedSubRegistrarOffice'),
            // 'land_title_deed_regno' => $request->input('landTitleDeedRegNo'),
            //  'land_title_deed_date' => $request->input('landTitleDeedDate'),
            'land_ownership_type' => $request->input('landOwnershipType'),
            'project_type' => $request->input('projectType'),
            'project_type_other' => $request->input('projectType') === 'other' ? $request->input('projectTypeOther') : null,
            'project_name' => $request->input('projectName'),
            'project_building_type' => $request->input('projectBuildingType'),
            'project_building_type_other' => $request->input('projectBuildingType') === 'other' ? $request->input('projectBuildingTypeOther') : null,
            'project_comprising' => $request->input('projectComprising'),
            'project_other_components' => $request->input('projectOtherComponents'),
            'plot_other_components' => $request->input('plotOtherComponents'),
            'commencement_authority' => $request->input('commencementAuthority'),
            'commencement_no' => $request->input('commencementNo'),
            'commencement_date' => $request->input('commencementDate'),
            'layout_authority' => $request->input('layoutAuthority'),
            'rera_reg_no' => $request->input('reraRegNo'),
            'rera_reg_date' => $request->input('reraRegDate'),
            'unit_no' => $request->input('unitNo'),
            'unit_floor' => $request->input('unitFloor'),
            'unit_tower' => $request->input('unitTower'),
            'unit_carpet_area' => $request->input('unitCarpetArea'),
            'plot_no' => $request->input('plotNo'),
            'plot_area' => $request->input('plotArea'),
            'rate_per_sqft' => is_numeric($request->input('ratePerSqFt')) ? $request->input('ratePerSqFt') : null,
            'total_price' => is_numeric($request->input('totalPrice')) ? $request->input('totalPrice') : null,
            'total_price_words' => $request->input('totalPriceWords'),
            'early_payment_rebate' => $request->input('earlyPaymentRebate'),
            'delay_interest_rate' => $request->input('delayInterestRate'),
            'possession_target_month' => $request->input('possessionTargetMonth'),
            'grace_period_days' => is_numeric($request->input('gracePeriodDays')) ? $request->input('gracePeriodDays') : null,
            'relevant_state_act' => $request->input('relevantStateAct'),
            'apartment_ownership_act' => $request->input('apartmentOwnershipAct'),
            'facilities_outside_project' => $request->input('facilitiesOutsideProject'),
            'competent_authority' => $request->input('competentAuthorityForDeclaration'),
            'prescribed_by_laws' => $request->input('prescribedByLaws'),
            'maintenance_clauses' => $request->input('maintenanceClauses'),
            'basement_location' => $request->input('basementLocation'),
           // 'additional_terms' => $request->input('additionalTerms'),
            'default_consecutive_demands' => $request->input('defaultConsecutiveDemands'),
            'default_consecutive_months' => $request->input('defaultConsecutiveMonths'),
            'place_of_execution' => $request->input('placeOfExecution'),
            'place_of_deemed_execution' => $request->input('placeOfDeemedExecution'),
            'payment_favour_of' => $request->input('paymentFavourOf'),
            'payment_payable_at' => $request->input('paymentPayableAt'),
            'has_encumbrances' => $request->input('hasEncumbrances'),
            'encumbrance_details' => $request->input('encumbranceDetails'),
            'schedule_a' => $request->input('scheduleA'),
            'schedule_b' => $request->input('scheduleB'),
            'schedule_c' => $request->input('scheduleC'),
            'schedule_d' => $request->input('scheduleD'),
            'project_id' => $request->input('projectId'),
            'user_id' => $request->input('userId'),
        ];
    }

    public function store(Request $request)
    {
        $this->sanitizeRequest($request);

        DB::beginTransaction();

        try {

            $data = $this->mapData($request);
            $agreement = Agreement::create($data);

            /*
            |--------------------------------------------------------------------------
            | Save Promoter Company
            |--------------------------------------------------------------------------
            */


            if ($request->filled('promoterCompany')) {


                $agreement->promoterCompany()->create([

                    'name' => $request->promoterCompany['name'] ?? null,
                    'cin' => $request->promoterCompany['cin'] ?? null,
                    'pan' => $request->promoterCompany['pan'] ?? null,
                    'registered_office' => $request->promoterCompany['registeredOffice'] ?? null,
                    'corporate_office' => $request->promoterCompany['corporateOffice'] ?? null,
                    'authorized_signatory' => $request->promoterCompany['authorizedSignatory'] ?? null,
                    'signatory_aadhaar' => $request->promoterCompany['signatoryAadhaar'] ?? null,
                    'board_resolution_date' => $request->promoterCompany['boardResolutionDate'] ?? null,

                ]);

            }

            /*
            |--------------------------------------------------------------------------
            | Save Promoter Individual
            |--------------------------------------------------------------------------
            */

            if ($request->filled('promoterIndividual')) {

                $agreement->promoterIndividual()->create([

                    'name' => $request->promoterIndividual['name'] ?? null,
                    'aadhaar' => $request->promoterIndividual['aadhaar'] ?? null,
                    'pan' => $request->promoterIndividual['pan'] ?? null,
                    'parent_type' => $request->promoterIndividual['parentType'] ?? null,
                    'parent_name' => $request->promoterIndividual['parentName'] ?? null,
                    'age' => $request->promoterIndividual['age'] ?? null,
                    'residing' => $request->promoterIndividual['residing'] ?? null,

                ]);

            }

            if ($request->filled('promoterPartnership')) {

                $agreement->promoterPartnership()->create([

                    'name' => $request->promoterPartnership['name'] ?? null,
                    'business_place' => $request->promoterPartnership['businessPlace'] ?? null,
                    'pan' => $request->promoterPartnership['pan'] ?? null,
                    'authorized_partner' => $request->promoterPartnership['authorizedPartner'] ?? null,
                    'partner_aadhaar' => $request->promoterPartnership['partnerAadhaar'] ?? null,
                    'authorized_vide' => $request->promoterPartnership['authorizedVide'] ?? null,

                ]);

            }



            /*
            |--------------------------------------------------------------------------
            | Save Land Owner Entries
            |--------------------------------------------------------------------------
            */
            if (!empty($request->landOwnerEntries)) {
                foreach ($request->landOwnerEntries as $entry) {
                    $agreement->landOwnerEntries()->create([
                        'survey_nos' => $entry['surveyNos'] ?? null,
                        'resurvey_nos' => $entry['resurveyNos'] ?? null,
                        'admeasuring' => $entry['admeasuring'] ?? null,
                        'situated_at' => $entry['situatedAt'] ?? null,
                        'tehsil' => $entry['tehsil'] ?? null,
                        'district' => $entry['district'] ?? null,
                        'title_deed_date' => $entry['titleDeedDate'] ?? null,
                        'title_deed_regno' => $entry['titleDeedRegNo'] ?? null,
                        'deed_type' => $entry['deedType'] ?? null,
                        'deed_sub_registrar_office' => $entry['deedSubRegistrarOffice'] ?? null,
                    ]);
                }
            }

            /*
            |--------------------------------------------------------------------------
            | Save Land JDA Details
            |--------------------------------------------------------------------------
            */

            if (!empty($request->landJDA)) {

                foreach ($request->landJDA as $jda) {

                    $agreement->landJdas()->create([

                        'owner_name' => $jda['ownerName'] ?? null,
                        'jda_date' => $jda['jdaDate'] ?? null,
                        'reg_no' => $jda['regNo'] ?? null,
                        'sub_registrar_office' => $jda['subRegistrarOffice'] ?? null,
                        'survey_nos' => $jda['surveyNos'] ?? null,
                        'area' => $jda['admeasuring'] ?? null,
                        'location' => $jda['situatedAt'] ?? null,
                        'tehsil' => $jda['tehsil'] ?? null,
                        'district' => $jda['district'] ?? null,
                        'title_deed_date' => $jda['titleDeedDate'] ?? null,
                        'deed_type' => $jda['deedType'] ?? null,
                        'deed_sub_registrar_office' => $jda['deedSubRegistrarOffice'] ?? null,
                        'additional_details' => $jda['additionalDetails'] ?? null,

                    ]);

                }
            }


            /*
            |--------------------------------------------------------------------------
            | Save Additional Disclosures
            |--------------------------------------------------------------------------
            */

            foreach ($request->additionalDisclosures ?? [] as $disclosure) {

                $agreement->additionalDisclosures()->create([

                    'disclosure' => $disclosure['text'] ?? null,

                ]);

            }


            /*
            |--------------------------------------------------------------------------
            | Save Maintenance Clauses
            |--------------------------------------------------------------------------
            */
            foreach ($request->maintenanceClauses ?? [] as $clause) {
                $agreement->maintenanceClauses()->create([
                    'clause' => $clause['text'] ?? null,
                ]);
            }


            /*
            |--------------------------------------------------------------------------
            | Save Additional Terms
            |--------------------------------------------------------------------------
            */
            foreach ($request->additionalTerms ?? [] as $term) {
                $agreement->additionalTerms()->create([
                    'term' => $term['text'] ?? null,
                ]);
            }


            /*
            |--------------------------------------------------------------------------
            | Save Payment Milestones
            |--------------------------------------------------------------------------
            */

            foreach ($request->priceBreakdown ?? [] as $row) {

                $agreement->PriceBreakdown()->create([

                    'description' => $row['description'] ?? null,
                    'amount' => $row['amount'] ?? null,
                ]);

            }



            /*
               |--------------------------------------------------------------------------
               | Save Garage Details
               |--------------------------------------------------------------------------
               */

            if (!empty($request->garageDetails)) {

                foreach ($request->garageDetails as $garage) {
                    $agreement->garageDetails()->create([
                        'no' => $garage['no'] ?? null,
                        'area' => $garage['area'] ?? null,
                    ]);
                }
            }


            /*
            |--------------------------------------------------------------------------
            | Save Plot Pricing
            |--------------------------------------------------------------------------
            */

            if (!empty($request->plotPricing)) {
                foreach ($request->plotPricing as $plot) {
                    $agreement->plotPricings()->create([
                        'plot_no_type' => $plot['plotNoType'] ?? null,
                        'rate_per_sqft' => $plot['ratePerSqFt'] ?? null,

                    ]);
                }
            }

            /*
            |--------------------------------------------------------------------------
            | Save Witnesses
            |--------------------------------------------------------------------------
            */

            if (!empty($request->witnesses)) {
                foreach ($request->witnesses as $witness) {
                    $agreement->witnesses()->create([
                        'name' => $witness['name'] ?? null,
                        'address' => $witness['address'] ?? null,
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'id' => $agreement->id,
                'message' => 'Agreement saved successfully.'
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);

        }
    }

    public function update(Request $request, $id)
    {
        $this->sanitizeRequest($request);
        abort_unless(filter_var($id, FILTER_VALIDATE_INT) !== false, 422, 'Invalid agreement ID.');

        DB::beginTransaction();

        try {
            $agreement = Agreement::findOrFail($id);
            $data = $this->mapData($request);
            $agreement->update($data);

            /*
            |--------------------------------------------------------------------------
            | Update Promoter Company
            |--------------------------------------------------------------------------
            */
            if ($request->filled('promoterCompany')) {
                $agreement->promoterCompany()->updateOrCreate(
                    ['agreement_id' => $agreement->id],
                    [
                        'name' => $request->promoterCompany['name'] ?? null,
                        'cin' => $request->promoterCompany['cin'] ?? null,
                        'pan' => $request->promoterCompany['pan'] ?? null,
                        'registered_office' => $request->promoterCompany['registeredOffice'] ?? null,
                        'corporate_office' => $request->promoterCompany['corporateOffice'] ?? null,
                        'authorized_signatory' => $request->promoterCompany['authorizedSignatory'] ?? null,
                        'signatory_aadhaar' => $request->promoterCompany['signatoryAadhaar'] ?? null,
                        'board_resolution_date' => $request->promoterCompany['boardResolutionDate'] ?? null,
                    ]
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Update Promoter Individual
            |--------------------------------------------------------------------------
            */
            if ($request->filled('promoterIndividual')) {
                $agreement->promoterIndividual()->updateOrCreate(
                    ['agreement_id' => $agreement->id],
                    [
                        'name' => $request->promoterIndividual['name'] ?? null,
                        'aadhaar' => $request->promoterIndividual['aadhaar'] ?? null,
                        'pan' => $request->promoterIndividual['pan'] ?? null,
                        'parent_type' => $request->promoterIndividual['parentType'] ?? null,
                        'parent_name' => $request->promoterIndividual['parentName'] ?? null,
                        'age' => $request->promoterIndividual['age'] ?? null,
                        'residing' => $request->promoterIndividual['residing'] ?? null,
                    ]
                );
            }

            /*
            |--------------------------------------------------------------------------
            | Update Promoter Partnership
            |--------------------------------------------------------------------------
            */
            if ($request->filled('promoterPartnership')) {
                $agreement->promoterPartnership()->updateOrCreate(
                    ['agreement_id' => $agreement->id],
                    [
                        'name' => $request->promoterPartnership['name'] ?? null,
                        'business_place' => $request->promoterPartnership['businessPlace'] ?? null,
                        'pan' => $request->promoterPartnership['pan'] ?? null,
                        'authorized_partner' => $request->promoterPartnership['authorizedPartner'] ?? null,
                        'partner_aadhaar' => $request->promoterPartnership['partnerAadhaar'] ?? null,
                        'authorized_vide' => $request->promoterPartnership['authorizedVide'] ?? null,
                    ]
                );
            }


            /*
            |--------------------------------------------------------------------------
            | Replace Land Owner Entries
            |--------------------------------------------------------------------------
            */
            $agreement->landOwnerEntries()->delete();
            foreach ($request->landOwnerEntries ?? [] as $entry) {
                $agreement->landOwnerEntries()->create([
                    'survey_nos' => $entry['surveyNos'] ?? null,
                    'resurvey_nos' => $entry['resurveyNos'] ?? null,
                    'admeasuring' => $entry['admeasuring'] ?? null,
                    'situated_at' => $entry['situatedAt'] ?? null,
                    'tehsil' => $entry['tehsil'] ?? null,
                    'district' => $entry['district'] ?? null,
                    'title_deed_date' => $entry['titleDeedDate'] ?? null,
                    'title_deed_regno' => $entry['titleDeedRegNo'] ?? null,
                    'deed_type' => $entry['deedType'] ?? null,
                    'deed_sub_registrar_office' => $entry['deedSubRegistrarOffice'] ?? null,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Replace Land JDA Details
            |--------------------------------------------------------------------------
            */
            $agreement->landJdas()->delete();
            foreach ($request->landJDA ?? [] as $jda) {
                $agreement->landJdas()->create([
                    'owner_name' => $jda['ownerName'] ?? null,
                    'jda_date' => $jda['jdaDate'] ?? null,
                    'reg_no' => $jda['regNo'] ?? null,
                    'sub_registrar_office' => $jda['subRegistrarOffice'] ?? null,
                    'survey_nos' => $jda['surveyNos'] ?? null,
                    'area' => $jda['admeasuring'] ?? null,
                    'location' => $jda['situatedAt'] ?? null,
                    'tehsil' => $jda['tehsil'] ?? null,
                    'district' => $jda['district'] ?? null,
                    'title_deed_date' => $jda['titleDeedDate'] ?? null,
                    'deed_type' => $jda['deedType'] ?? null,
                    'deed_sub_registrar_office' => $jda['deedSubRegistrarOffice'] ?? null,
                    'additional_details' => $jda['additionalDetails'] ?? null,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Replace Additional Disclosures
            |--------------------------------------------------------------------------
            */
            $agreement->additionalDisclosures()->delete();
            foreach ($request->additionalDisclosures ?? [] as $disclosure) {
                $agreement->additionalDisclosures()->create([
                    'disclosure' => $disclosure['text'] ?? null,
                ]);
            }


            /*
            |--------------------------------------------------------------------------
            | Replace Maintenance Clauses
            |--------------------------------------------------------------------------
            */
                $agreement->maintenanceClauses()->delete();
                foreach ($request->maintenanceClauses ?? [] as $clause) {
                    $agreement->maintenanceClauses()->create([
                        'clause' => $clause['text'] ?? null,
                    ]);
                }


            /*
            |--------------------------------------------------------------------------
            | Replace Additional Terms
            |--------------------------------------------------------------------------
            */
            $agreement->additionalTerms()->delete();
            foreach ($request->additionalTerms ?? [] as $term) {
                $agreement->additionalTerms()->create([
                    'term' => $term['text'] ?? null,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Replace Price Breakdown
            |--------------------------------------------------------------------------
            */
            $agreement->PriceBreakdown()->delete();
            foreach ($request->priceBreakdown ?? [] as $row) {
                $agreement->PriceBreakdown()->create([
                    'description' => $row['description'] ?? null,
                    'amount' => $row['amount'] ?? null,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Replace Garage Details
            |--------------------------------------------------------------------------
            */

            $agreement->garageDetails()->delete();
            foreach ($request->garageDetails ?? [] as $garage) {
                $agreement->garageDetails()->create([
                    'no' => $garage['no'] ?? null,
                    'area' => $garage['area'] ?? null,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Replace Plot Pricing
            |--------------------------------------------------------------------------
            */
            $agreement->plotPricings()->delete();
            foreach ($request->plotPricing ?? [] as $plot) {
                $agreement->plotPricings()->create([
                    'plot_no_type' => $plot['plotNoType'] ?? null,
                    'rate_per_sqft' => $plot['ratePerSqFt'] ?? null,
                ]);
            }

            /*
            |--------------------------------------------------------------------------
            | Replace Witnesses
            |--------------------------------------------------------------------------
            */
            $agreement->witnesses()->delete();
            foreach ($request->witnesses ?? [] as $witness) {
                $agreement->witnesses()->create([
                    'name' => $witness['name'] ?? null,
                    'address' => $witness['address'] ?? null,
                ]);
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Agreement updated successfully.',
            ]);

        } catch (\Exception $e) {

            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    public function uploadSchedule(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf|max:5240',
        ]);

        $path = $request->file('file')->store('schedules', 'public');

        return response()->json([
            'success' => true,
            'url' => Storage::url($path),
        ]);
    }
}
