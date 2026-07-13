<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;


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
        ];
    }

    public function store(Request $request)
    {
        $data = $this->mapData($request);
        
        // Date mapping logic since frontend uses executionDate (e.g. YYYY-MM-DD)
        if ($request->filled('executionDate')) {
            $dateParts = explode('-', $request->input('executionDate'));
            if (count($dateParts) == 3) {
                $data['date_year'] = $dateParts[0];
                $data['date_month'] = $dateParts[1];
                $data['date_day'] = $dateParts[2];
            }
        }
        
        $agreement = \App\Models\Agreement::create($data);
        
        return response()->json(['success' => true, 'id' => $agreement->id]);
    }

    public function update(Request $request, $id)
    {
        $agreement = \App\Models\Agreement::findOrFail($id);
        $data = $this->mapData($request);
        
        if ($request->filled('executionDate')) {
            $dateParts = explode('-', $request->input('executionDate'));
            if (count($dateParts) == 3) {
                $data['date_year'] = $dateParts[0];
                $data['date_month'] = $dateParts[1];
                $data['date_day'] = $dateParts[2];
            }
        }
        
        $agreement->update($data); 
        
        return response()->json(['success' => true]);
    }
}