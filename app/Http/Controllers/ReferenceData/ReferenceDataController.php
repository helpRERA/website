<?php

namespace App\Http\Controllers\ReferenceData;

use App\Actions\ReferenceData\CreateReferenceData;
use App\Actions\ReferenceData\DeleteReferenceData;
use App\Actions\ReferenceData\UpdateReferenceData;
use App\Actions\ReferenceData\FilterReferenceData;
use App\Http\Controllers\Controller;
use App\Http\Requests\ReferenceData\ReferenceDataFormRequest;
use App\Models\ReferenceData\ReferenceData;
use App\Models\ReferenceData\ReferenceDataDomain;
use App\Models\ReferenceData\ReferenceDataParameter;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ReferenceDataController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth');
    }


    public function index(Request $request, ReferenceDataDomain $domainService, FilterReferenceData $filterReferenceData): Response
    {
        return Inertia::render('ReferenceData/ReferenceDataList', [
            'domains' => fn () => $domainService->get(),
            'data' => $filterReferenceData->filter(
                (int)$request->domain,
                (int)$request->parameter
            )->paginate(20),
            'domainId' => $request->domain ?? '',
            'parameterId' => $request->parameter ?? ''
        ]);
    }

    public function create(Request $request, ReferenceDataDomain $domain_service): Response
    {
        return Inertia::render('ReferenceData/ReferenceDataCreate', [
            'domains' => $domain_service->get()
        ]);
    }

    public function store(ReferenceDataFormRequest $request, CreateReferenceData $create_service): RedirectResponse
    {
        return $create_service->create($request->all());
    }


    public function show($id)
    {
        //
    }


    public function edit(string $id, ReferenceDataDomain $domain_service): Response
    {
        $reference_code = ReferenceData::findOrFail($id);

        return Inertia::render('ReferenceData/ReferenceDataEdit', [
            'domains' => $domain_service->get(),
            'referenceData' => $reference_code
        ]);
    }


    public function update(ReferenceDataFormRequest $request, UpdateReferenceData $updateService, string $id): RedirectResponse
    {
        return $updateService->update((int)$id, $request->all());
    }


    public function destroy(string $id, DeleteReferenceData $deleteReferenceData)
    {
        return $deleteReferenceData->delete((int)$id);
    }

    public function parameters(string $domain_id): JsonResponse
    {
        $parameters = ReferenceDataParameter::where('domain_id', $domain_id)
            ->get();

        return response()->json($parameters);
    }
}
