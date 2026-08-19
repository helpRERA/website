export type ProjectStatus = 'Ongoing' | 'New';

export interface FeeCalculatorFormData {
  land_area: string;
  project_status: ProjectStatus | '';
  residential_area: string;
  commercial_area: string;
}

export interface FeeBreakdown {
  landFee: number;
  residentialFee: number;
  commercialFee: number;
  totalFee: number;
}

/**
 * Client-side preview calculation. Mirrors app/Services/FeeCalculatorService.php.
 * This is for instant UI feedback only — the authoritative amount is always
 * (re)computed server-side before anything is saved or charged.
 */
export function calculateFee(data: {
  landArea: number;
  projectStatus: ProjectStatus | '';
  residentialArea: number;
  commercialArea: number;
}): FeeBreakdown {
  const { landArea, projectStatus, residentialArea, commercialArea } = data;

  const landFee = (landArea || 0) * 10;

  let residentialRate = 0;
  if (residentialArea > 0) {
    residentialRate = projectStatus === 'New' ? 50 : 25; // default/Ongoing = 25
  }
  const residentialFee = (residentialArea || 0) * residentialRate;

  const commercialFee = (commercialArea || 0) * 100;

  return {
    landFee,
    residentialFee,
    commercialFee,
    totalFee: landFee + residentialFee + commercialFee,
  };
}