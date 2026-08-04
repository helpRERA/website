import { useState } from 'react';

// ─── Sub-types ────────────────────────────────────────────────────────────────

export interface PromoterCompany {
  name: string;
  cin: string;
  registeredOffice: string;
  corporateOffice: string;
  pan: string;
  authorizedSignatory: string;
  signatoryAadhaar: string;
  boardResolutionDate: string;
}

export interface PromoterPartnership {
  name: string;
  businessPlace: string;
  pan: string;
  authorizedPartner: string;
  partnerAadhaar: string;
  authorizedVide: string;
}

export interface PromoterIndividual {
  name: string;
  aadhaar: string;
  parentName: string;
  parentType: 'son' | 'daughter';
  age: string;
  residing: string;
  pan: string;
}

export interface AllotteeCompany {
  name: string;
  cin: string;
  registeredOffice: string;
  pan: string;
  authorizedSignatory: string;
  signatoryAadhaar: string;
  boardResolutionDate: string;
}

export interface AllotteePartnership {
  name: string;
  businessPlace: string;
  pan: string;
  authorizedPartner: string;
  partnerAadhaar: string;
  authorizedVide: string;
}

export interface AllotteeIndividual {
  name: string;
  aadhaar: string;
  parentName: string;
  parentType: 'son' | 'daughter' | 'wife';
  age: string;
  residing: string;
  pan: string;
}

export interface AllotteeHuf {
  kartaName: string;
  kartaAadhaar: string;
  parentName: string;
  age: string;
  familyName: string;
  place: string;
  pan: string;
}

export interface JointAllottee {
  id: number;
  name: string;
  aadhaar: string;
  parentType: 'son' | 'daughter' | 'wife';
  parentName: string;
  age: string;
  residing: string;
  pan: string;
}

export interface LandJDA {
  id: number;
  ownerName: string;
  surveyNos: string;
  admeasuring: string;
  situatedAt: string;
  tehsilDistrict: string;
  titleDeedDate: string;
  titleDeedRegNo: string;
  jdaDate: string;
  regNo: string;
  subRegistrarOffice: string;
  additionalDetails: string;
}

export interface GarageDetail {
  id: number;
  no: string;
  area: string;
  price: string;
}

export interface PlotPriceItem {
  id: number;
  plotNoType: string;
  ratePerSqFt: string;
}

export interface PriceBreakdownItem {
  id: number;
  description: string;
  amount: string;
}

export interface PaymentPlanItem {
  id: number;
  description: string;
  percentage: string;
  amount: string;
}

export interface Witness {
  id: number;
  name: string;
  address: string;
}

export interface DisclosureItem {
  id: number;
  text: string;
}



// ─── Main Data Type ───────────────────────────────────────────────────────────

export interface AgreementData {
  // General Info
  dateDay: string;
  dateMonth: string;
  dateYear: string;
  executionPlace: string;

  // Promoter Details
  promoterType: 'company' | 'partnership' | 'individual';
  promoterCompany: PromoterCompany;
  promoterPartnership: PromoterPartnership;
  promoterIndividual: PromoterIndividual;

  // Allottee Details
  allotteeType: 'company' | 'partnership' | 'individual' | 'huf';
  allotteeCompany: AllotteeCompany;
  allotteePartnership: AllotteePartnership;
  allotteeIndividual: AllotteeIndividual;
  allotteeHuf: AllotteeHuf;

  // Joint Allottees
  jointAllottees: JointAllottee[];

  // Property & Recitals Details
  landSurveyNos: string;
  landAdmeasuring: string;
  landSituatedAt: string;
  landTehsilDistrict: string;
  landTitleDeedDate: string;
  landTitleDeedRegNo: string;
  landOwnershipType: 'owner' | 'developer';
  landJDA: LandJDA[];
  projectType: 'commercial' | 'residential' | 'plotted' | 'other';
  projectBuildingType: 'residential' | 'commercial' | 'mixed';
  projectComprising: string;
  projectName: string;
  projectOtherComponents: string;
  plotOtherComponents: string;
  basementLocation: string;

  // Approvals
  commencementAuthority: string;
  commencementNo: string;
  commencementDate: string;
  layoutAuthority: string;
  reraRegNo: string;
  reraRegDate: string;
  maintenanceClauses: string;
  facilitiesOutsideProject: string;
  competentAuthorityForDeclaration: string;
  relevantStateAct: string;

  // Unit and Pricing Details
  applicationNo: string;
  applicationDate: string;
  apartmentType: string;
  unitNo: string;
  unitFloor: string;
  unitTower: string;
  unitCarpetArea: string;
  garageDetails: GarageDetail[];
  plotPricing: PlotPriceItem[];
  plotNo: string;
  plotArea: string;

  ratePerSqFt: string;
  totalPrice: string;
  totalPriceWords: string;
  bookingAmount: string;
  bookingAmountWords: string;
  paymentFavourOf: string;
  paymentPayableAt: string;
  priceBreakdown: PriceBreakdownItem[];

  // Payment Plan (Schedule C)
  paymentPlan: PaymentPlanItem[];

  // Terms & Timelines
  earlyPaymentRebate: string;
  delayInterestRate: string;
  possessionTargetMonth: string;
  gracePeriodDays: string;
  defaultConsecutiveDemands: string;
  defaultConsecutiveMonths: string;
  prescribedByLaws: string;
  additionalDisclosures: DisclosureItem[];
  additionalTerms: string;
  apartmentOwnershipAct: string;

  // Signatures & Witnesses
  witnesses: Witness[];

  scheduleA: string;
  scheduleB: string;
  scheduleC: string;
  scheduleD: string;
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialData: AgreementData = {
  dateDay: '',
  dateMonth: '',
  dateYear: '',
  executionPlace: '',

  promoterType: 'company',
  promoterCompany: {
    name: '',
    cin: '',
    registeredOffice: '',
    corporateOffice: '',
    pan: '',
    authorizedSignatory: '',
    signatoryAadhaar: '',
    boardResolutionDate: '',
  },
  promoterPartnership: {
    name: '',
    businessPlace: '',
    pan: '',
    authorizedPartner: '',
    partnerAadhaar: '',
    authorizedVide: '',
  },
  promoterIndividual: {
    name: '',
    aadhaar: '',
    parentName: '',
    parentType: 'son',
    age: '',
    residing: '',
    pan: '',
  },

  allotteeType: 'individual',
  allotteeCompany: {
    name: '',
    cin: '',
    registeredOffice: '',
    pan: '',
    authorizedSignatory: '',
    signatoryAadhaar: '',
    boardResolutionDate: '',
  },
  allotteePartnership: {
    name: '',
    businessPlace: '',
    pan: '',
    authorizedPartner: '',
    partnerAadhaar: '',
    authorizedVide: '',
  },
  allotteeIndividual: {
    name: '',
    aadhaar: '',
    parentName: '',
    parentType: 'son',
    age: '',
    residing: '',
    pan: '',
  },
  allotteeHuf: {
    kartaName: '',
    kartaAadhaar: '',
    parentName: '',
    age: '',
    familyName: '',
    place: '',
    pan: '',
  },

  jointAllottees: [],

  landSurveyNos: '',
  landAdmeasuring: '',
  landSituatedAt: '',
  landTehsilDistrict: '',
  landTitleDeedDate: '',
  landTitleDeedRegNo: '',
  landOwnershipType: 'owner',
  landJDA: [],
  projectType: 'commercial',
  projectBuildingType: 'residential',
  projectComprising: '',
  projectName: '',
  projectOtherComponents: '',
  plotOtherComponents: '',
  basementLocation: '',

  commencementAuthority: '',
  commencementNo: '',
  commencementDate: '',
  layoutAuthority: '',
  reraRegNo: '',
  reraRegDate: '',
  maintenanceClauses: '',
  facilitiesOutsideProject: '',
  competentAuthorityForDeclaration: '',
  relevantStateAct: '',

  applicationNo: '',
  applicationDate: '',
  apartmentType: '',
  unitNo: '',
  unitFloor: '',
  unitTower: '',
  unitCarpetArea: '',
  garageDetails: [],
  plotPricing: [],
  plotNo: '',
  plotArea: '',

  ratePerSqFt: '',
  totalPrice: '',
  totalPriceWords: '',
  bookingAmount: '',
  bookingAmountWords: '',
  paymentFavourOf: '',
  paymentPayableAt: '',
  priceBreakdown: [],

  paymentPlan: [
    { id: 1, description: 'Booking amount (paid at time of application)', percentage: '10', amount: '6,60,000' },
    { id: 2, description: 'On execution of Agreement for Sale', percentage: '10', amount: '6,60,000' },
    { id: 3, description: 'On completion of Foundation', percentage: '15', amount: '9,90,000' },
    { id: 4, description: 'On completion of Plinth', percentage: '10', amount: '6,60,000' },
    { id: 5, description: 'On completion of Slabs (proportionate per slab)', percentage: '30', amount: '19,80,000' },
    { id: 6, description: 'On completion of Internal Plastering', percentage: '10', amount: '6,60,000' },
    { id: 7, description: 'On completion of Flooring and Sanitary fittings', percentage: '10', amount: '6,60,000' },
    { id: 8, description: 'On Handover of Possession', percentage: '5', amount: '3,30,000' },
  ],

  earlyPaymentRebate: '',
  delayInterestRate: '',
  possessionTargetMonth: '',
  gracePeriodDays: '',
  defaultConsecutiveDemands: '',
  defaultConsecutiveMonths: '',
  prescribedByLaws: '',
  additionalDisclosures: [],
  additionalTerms: '',
  apartmentOwnershipAct: '',

  witnesses: [],

  scheduleA: '',
  scheduleB: '',
  scheduleC: '',
  scheduleD: '',
 

};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAgreementData() {
  const [data, setData] = useState<AgreementData>(initialData);

  const updateField = <K extends keyof AgreementData>(field: K, value: AgreementData[K]): void => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const updateNestedField = <
    P extends keyof AgreementData,
    F extends keyof AgreementData[P]
  >(
    parentField: P,
    field: F,
    value: AgreementData[P][F]
  ): void => {
    setData((prev) => ({
      ...prev,
      [parentField]: {
        ...(prev[parentField] as object),
        [field]: value,
      },
    }));
  };

  const resetData = (): void => {
    setData(initialData);
  };

  const resetFields = (fields: (keyof AgreementData)[]): void => {
    setData((prev) => {
      const updated = { ...prev };
      fields.forEach((field) => {
        updated[field] = initialData[field] as any;
      });
      return updated;
    });
  };

  return { data, updateField, updateNestedField, setData, resetData, resetFields  };
}
