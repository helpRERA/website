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
    public function index(Request $request)
    {
        $data = $request->data;

        $decoded = base64_decode($data);

        parse_str($decoded, $params);

        $projectId = $params['ProjectID'] ?? null;
        $userId = $params['UserID'] ?? null;


        $agreement = Agreement::with([
            'promoterCompany',
            'promoterIndividual',
            'promoterPartnership',
            'landJdas',
            'additionalDisclosures',
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
            'land_survey_nos' => $request->input('landSurveyNos'),
            'land_admeasuring' => $request->input('landAdmeasuring'),
            'land_situated_at' => $request->input('landSituatedAt'),
            'land_tehsil_district' => $request->input('landTehsilDistrict'),
            'land_title_deed_regno' => $request->input('landTitleDeedRegNo'),
            'land_title_deed_date' => $request->input('landTitleDeedDate'),
            'land_ownership_type' => $request->input('landOwnershipType'),
            'project_type' => $request->input('projectType'),
            'project_name' => $request->input('projectName'),
            'project_building_type' => $request->input('projectBuildingType'),
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
            'additional_terms' => $request->input('additionalTerms'),
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
                        'district' => $jda['tehsilDistrict'] ?? null,
                        'title_deed_date' => $jda['titleDeedDate'] ?? null,
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

                        'slot_no' => $garage['slotNo'] ?? null,
                        'area' => $garage['area'] ?? null,
                        'price' => $garage['price'] ?? null,

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
                    'district' => $jda['tehsilDistrict'] ?? null,
                    'title_deed_date' => $jda['titleDeedDate'] ?? null,
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
                    'slot_no' => $garage['slotNo'] ?? null,
                    'area' => $garage['area'] ?? null,
                    'price' => $garage['price'] ?? null,
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