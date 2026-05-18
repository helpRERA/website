<?php

namespace App\Http\Controllers\Agent;

use App\Exports\AgentExport;
use App\Exports\ManualAgentExport;
use App\Http\Controllers\Controller;
use App\Models\KRERA\UserProfile;
use App\Repository\Agent\AgentManualRepository;
use App\Services\Agent\AgentCertificate;
use App\Services\Agent\AgentListService;
use App\Services\Agent\ExpiredAgentsList;
use App\Services\Locality\LocalityListService;
use App\Services\ProjectURLEncryption\ProjectLinkEncryption;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Maatwebsite\Excel\Facades\Excel;
use Symfony\Component\HttpFoundation\BinaryFileResponse;
use Symfony\Component\HttpFoundation\StreamedResponse;

class AgentListController extends Controller
{
    public function index(
        Request               $request,
        AgentListService      $listService,
        AgentManualRepository $agentManualRepository,
        LocalityListService   $localityListService,
        ExpiredAgentsList     $expiredAgentsList,
    ): Response
    {
        $section = $request->section ?? 'Registered Agents';

        $registeredAgents = $listService->getData(
            $request->agent_name,
            $request->district,
            $request->taluk,
            $request->village,
            $request->pincode,
            $request->registration_number,
        );


        $isSearchingLocation = $request->filled('taluk') || $request->filled('village') || $request->filled('district') || $request->filled('pincode');

        if ($isSearchingLocation) {
            $manualAgents = null;
        } else {
            $manualAgents = $agentManualRepository->search(
                $request->agent_name,
                $request->registration_number,
            )->paginate(20)
                ->withQueryString();
        }

        if ($isSearchingLocation || $request->filled('registration_number')) {
            $expiredAgents = null;
        } else {
            $expiredAgents = $expiredAgentsList->getAgents($request->input('agent_name'));
        }

        if ($section === 'Registered Agents' && $registeredAgents->count() === 0) {
            if ($manualAgents != null && $manualAgents->count() > 0) {
                $section = 'Manually Registered Agents';
            } elseif ($expiredAgents != null && $expiredAgents->count() > 0) {
                $section = 'Expired Agents';
            }
        } elseif ($section === 'Manually Registered Agents' && ($manualAgents == null || $manualAgents->count() === 0)) {
            if ($registeredAgents->count() > 0) {
                $section = 'Registered Agents';
            }
            if ($expiredAgents != null && $expiredAgents->count() > 0) {
                $section = 'Expired Agents';
            }
        } elseif ($section === 'Expired Agents' && ($expiredAgents == null || $expiredAgents->count() === 0)) {
            if ($registeredAgents->count() > 0) {
                $section = 'Registered Agents';
            }
            if ($manualAgents != null && $manualAgents->count() > 0) {
                $section = 'Manually Registered Agents';
            }
        }

        return Inertia::render('AgentList/AgentListPage', [
            'districts' => fn() => $localityListService->getDistricts(),
            'agents' => $registeredAgents,
            'manual' => $manualAgents,
            'section' => $section,
            'expiredAgents' => $expiredAgents,
            'oldAgentName' => $request->agent_name ?? '',
            'oldRegistrationNumber' => $request->registration_number ?? '',
            'oldDistrict' => $request->district ?? '',
            'oldTaluk' => $request->taluk ?? '',
            'oldVillage' => $request->village ?? '',
            'oldPincode' => $request->pincode ?? '',
        ]);
    }

    public function export(Request $request): BinaryFileResponse
    {
        if (
            $request->section == null || $request->section !== 'manually-registered-agents'
        ) {
            return Excel::download(
                new AgentExport(
                    $request->agent_name,
                    $request->registration_number,
                    $request->district,
                    $request->taluk,
                    $request->village,
                    $request->pincode,
                ),
                'agents.xlsx'
            );
        }

        return Excel::download(
            new ManualAgentExport($request->agent_name, $request->registration_number),
            'agents.xlsx'
        );
    }

    public function downloadCertificate(string $userId, AgentCertificate $agentCertificate): StreamedResponse
    {
        return $agentCertificate->download($userId);
    }

    public function printPageRedirect(string $userId, ProjectLinkEncryption $encryption): RedirectResponse
    {
        $user = UserProfile::where('UserID', $userId)
            ->where('RoleID', 2)
            ->firstOrFail();

        $encryptedParams = $encryption->getEncryptedLink(
            '0',
            $user->RoleID,
            $user->UserID,
            empty($user->IndivisualDivisionValue) ? $user->CompanyDivisionValue : $user->IndivisualDivisionValue,
            '3775'
        );

        return redirect()
            ->away('https://reraonline.kerala.gov.in/PrintPreview/PrintPreview?q=' . urlencode($encryptedParams));

    }
}
