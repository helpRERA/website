import { useState } from 'react';

// ─── Sub-types ────────────────────────────────────────────────────────────────

export interface PromoterCompany {
  name: string;
  cin: string;
  registeredOffice: string;
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
  ownerName: string;
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
  landJDA: LandJDA;
  projectType: 'apartment' | 'plotted';
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
  additionalTerms: string;
  apartmentOwnershipAct: string;

  // Signatures & Witnesses
  witnesses: Witness[];
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialData: AgreementData = {
  dateDay: 'XXXX',
  dateMonth: 'XXXX',
  dateYear: 'XXXX',
  executionPlace: 'XXXX',

  promoterType: 'company',
  promoterCompany: {
    name: 'XXXX',
    cin: 'XXXX',
    registeredOffice: 'XXXX',
    pan: 'XXXX',
    authorizedSignatory: 'XXXX',
    signatoryAadhaar: 'XXXX',
    boardResolutionDate: 'XX/XX/XXXX',
  },
  promoterPartnership: {
    name: 'XXXX',
    businessPlace: 'XXXX',
    pan: 'XXXX',
    authorizedPartner: 'XXXX',
    partnerAadhaar: 'XXXX',
    authorizedVide: 'XXXX',
  },
  promoterIndividual: {
    name: 'XXXX',
    aadhaar: 'XXXX',
    parentName: 'XXXX',
    parentType: 'son',
    age: 'XXXX',
    residing: 'XXXX',
    pan: 'XXXX',
  },

  allotteeType: 'individual',
  allotteeCompany: {
    name: '__________',
    cin: '__________',
    registeredOffice: '__________',
    pan: '__________',
    authorizedSignatory: '__________',
    signatoryAadhaar: '__________',
    boardResolutionDate: '__________',
  },
  allotteePartnership: {
    name: '__________',
    businessPlace: '__________',
    pan: '__________',
    authorizedPartner: '__________',
    partnerAadhaar: '__________',
    authorizedVide: '__________',
  },
  allotteeIndividual: {
    name: '__________',
    aadhaar: '__________',
    parentName: '__________',
    parentType: 'son',
    age: '__________',
    residing: '__________',
    pan: '__________',
  },
  allotteeHuf: {
    kartaName: '__________',
    kartaAadhaar: '__________',
    parentName: '__________',
    age: '____',
    familyName: '__________',
    place: '__________',
    pan: '__________',
  },

  jointAllottees: [],

  landSurveyNos: 'XXXX',
  landAdmeasuring: 'XXXX',
  landSituatedAt: 'XXXX',
  landTehsilDistrict: 'XXXX',
  landTitleDeedDate: 'XX/XX/XXXX',
  landTitleDeedRegNo: 'XXXX',
  landOwnershipType: 'owner',
  landJDA: {
    ownerName: 'XXXX',
    jdaDate: 'XX/XX/XXXX',
    regNo: 'XXXX',
    subRegistrarOffice: 'XXXX',
    additionalDetails: 'XXXX',
  },
  projectType: 'apartment',
  projectBuildingType: 'residential',
  projectComprising: 'XXXX',
  projectName: 'XXXX',
  projectOtherComponents: 'XXXX',
  plotOtherComponents: 'XXXX',
  basementLocation: 'XXXX',

  commencementAuthority: 'XXXX',
  commencementNo: 'XXXX',
  commencementDate: 'XX/XX/XXXX',
  layoutAuthority: 'XXXX',
  reraRegNo: 'XXXX',
  reraRegDate: 'XX/XX/XXXX',
  maintenanceClauses: '',
  facilitiesOutsideProject: '',
  competentAuthorityForDeclaration: '',
  relevantStateAct: '',

  applicationNo: '__________',
  applicationDate: '__________',
  apartmentType: '__________',
  unitNo: '__________',
  unitFloor: '__________',
  unitTower: '__________',
  unitCarpetArea: '__________',
  garageDetails: [],
  plotNo: 'XXXX',
  plotArea: 'XXXX',

  ratePerSqFt: 'XXXX',
  totalPrice: 'XXXX',
  totalPriceWords: 'XXXX',
  bookingAmount: '___',
  bookingAmountWords: 'XXXX',
  paymentFavourOf: 'XXXX',
  paymentPayableAt: 'XXXX',
  priceBreakdown: [],

  paymentPlan: [],

  earlyPaymentRebate: 'XX',
  delayInterestRate: 'XX',
  possessionTargetMonth: 'XXXX',
  gracePeriodDays: 'XX',
  defaultConsecutiveDemands: 'three',
  defaultConsecutiveMonths: 'three',
  additionalTerms: '',
  apartmentOwnershipAct: 'XXXX',

  witnesses: [],
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

  return { data, updateField, updateNestedField, setData, resetData };
}
