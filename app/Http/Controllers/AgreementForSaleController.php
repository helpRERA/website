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
    public function index()
    {

        return Inertia::render('DocumentTemplate/AgreementForSale', [
            'title' => 'Agreement for Sale - Document Generator',
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
            'schedule_a' => $request->input('scheduleA'),
            'schedule_b' => $request->input('scheduleB'),
            'schedule_c' => $request->input('scheduleC'),
            'schedule_d' => $request->input('scheduleD'),
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
                    'amount'      => $row['amount'] ?? null,
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
                            'area'    => $garage['area'] ?? null,
                            'price'   => $garage['price'] ?? null,

                        ]);

                    }

                }



            /*
            |--------------------------------------------------------------------------
            | Save Garage Details
            |--------------------------------------------------------------------------
            */

            foreach ($request->garageDetails ?? [] as $garage) {

                $agreement->garageDetails()->create([

                    'slot_no' => $garage['slotNo'] ?? null,
                    'area' => $garage['area'] ?? null,
                    'price' => $garage['price'] ?? null,

                ]);

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
        $agreement = Agreement::findOrFail($id);
        $data = $this->mapData($request);

        // if ($request->filled('executionDate')) {
        //     $dateParts = explode('-', $request->input('executionDate'));
        //     if (count($dateParts) == 3) {
        //         $data['date_year'] = $dateParts[0];
        //         $data['date_month'] = $dateParts[1];
        //         $data['date_day'] = $dateParts[2];
        //     }
        // }

        $agreement->update($data);

        return response()->json(['success' => true]);
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