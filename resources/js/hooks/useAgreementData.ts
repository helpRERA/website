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
  landOwnershipType: 'owner' | 'developer';
  landJDA: LandJDA;
  projectType: 'apartment' | 'plotted';
  projectBuildingType: 'residential' | 'commercial' | 'mixed';
  projectComprising: string;
  projectName: string;
  projectOtherComponents: string;
  plotOtherComponents: string;

  // Approvals
  commencementAuthority: string;
  commencementNo: string;
  commencementDate: string;
  layoutAuthority: string;
  reraRegNo: string;
  reraRegDate: string;

  // Unit and Pricing Details
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
  priceBreakdown: PriceBreakdownItem[];

  // Payment Plan (Schedule C)
  paymentPlan: PaymentPlanItem[];

  // Terms & Timelines
  earlyPaymentRebate: string;
  delayInterestRate: string;
  possessionTargetMonth: string;
  gracePeriodDays: string;
  relevantStateAct: string;
  apartmentOwnershipAct: string;

  // Signatures & Witnesses
  witnesses: Witness[];
}

// ─── Initial Data ─────────────────────────────────────────────────────────────

const initialData: AgreementData = {
  dateDay: '23rd',
  dateMonth: 'June',
  dateYear: '2026',
  executionPlace: 'Thiruvananthapuram',

  promoterType: 'company',
  promoterCompany: {
    name: 'Travancore Builders Private Limited',
    cin: 'U45201KL2012PTC031234',
    registeredOffice: '12/456, M.G. Road, Thiruvananthapuram, Kerala - 695001',
    pan: 'AABCT1234P',
    authorizedSignatory: 'Mr. Rajesh Kumar',
    signatoryAadhaar: '1234 5678 9012',
    boardResolutionDate: '15/01/2026',
  },
  promoterPartnership: {
    name: 'Travancore Developers Partners',
    businessPlace: '45/2, MG Road, Ernakulam, Kerala - 682011',
    pan: 'AABFT5678Q',
    authorizedPartner: 'Mr. John Mathew',
    partnerAadhaar: '2345 6789 0123',
    authorizedVide: 'Partnership Resolution dated 10/12/2025',
  },
  promoterIndividual: {
    name: 'Mr. K. Madhavan Pillai',
    aadhaar: '3456 7890 1234',
    parentName: 'Mr. Krishna Pillai',
    parentType: 'son',
    age: '58',
    residing: 'Madhavan Layam, Kowdiar P.O., Thiruvananthapuram, Kerala - 695003',
    pan: 'APQPM9876C',
  },

  allotteeType: 'individual',
  allotteeCompany: {
    name: 'Technopark Solutions Ltd',
    cin: 'U72200KL2015PLC042111',
    registeredOffice: 'Module 240, Nila Building, Technopark, Trivandrum - 695581',
    pan: 'AABCT9999K',
    authorizedSignatory: 'Mr. Satheesh G.',
    signatoryAadhaar: '4567 8901 2345',
    boardResolutionDate: '22/02/2026',
  },
  allotteePartnership: {
    name: 'Apex Consulting Associates',
    businessPlace: 'Apex Chambers, Kaloor, Kochi - 682017',
    pan: 'AABFT2222R',
    authorizedPartner: 'Mrs. Shyla Thomas',
    partnerAadhaar: '5678 9012 3456',
    authorizedVide: 'Resolution dated 12/03/2026',
  },
  allotteeIndividual: {
    name: 'Mr. Sunil Varghese',
    aadhaar: '9876 5432 1098',
    parentName: 'Mr. K. Varghese',
    parentType: 'son',
    age: '42',
    residing: 'Flat 3B, Sunshine Apartments, Kakkanad, Kochi, Kerala - 682030',
    pan: 'ABCDE1234F',
  },
  allotteeHuf: {
    kartaName: 'Mr. Ramesh Chandran',
    kartaAadhaar: '6789 0123 4567',
    parentName: 'Mr. Chandran Pillai',
    age: '50',
    familyName: 'Chandran HUF',
    place: 'T.C. 15/45, Jagathy, Thiruvananthapuram - 695014',
    pan: 'AABHC1111E',
  },

  jointAllottees: [],

  landSurveyNos: '101/2, 101/3',
  landAdmeasuring: '4,050',
  landSituatedAt: 'Pattom',
  landTehsilDistrict: 'Thiruvananthapuram',
  landOwnershipType: 'owner',
  landJDA: {
    ownerName: 'Mrs. Leela Ramakrishnan',
    jdaDate: '12/08/2024',
    regNo: '2345/2024',
    subRegistrarOffice: 'Pattom SRO',
  },
  projectType: 'apartment',
  projectBuildingType: 'residential',
  projectComprising: 'a multistoried residential apartment building of 12 floors',
  projectName: 'Travancore Royal Residency',
  projectOtherComponents: 'a clubhouse, swimming pool, and health club',
  plotOtherComponents: 'roads, drains, street lighting, and open park space',

  commencementAuthority: 'Thiruvananthapuram Municipal Corporation',
  commencementNo: 'K-RERA/CC/2025/089',
  commencementDate: '10/11/2025',
  layoutAuthority: 'Trivandrum Development Authority (TRIDA)',
  reraRegNo: 'K-RERA/PRJ/TVM/045/2025',
  reraRegDate: '20/12/2025',

  unitNo: '5A',
  unitFloor: '5th',
  unitTower: 'Block B',
  unitCarpetArea: '1,150',
  garageDetails: [{ id: 1, no: 'G-12', area: '120', price: '2,50,000' }],
  plotNo: 'P-18',
  plotArea: '2,400',

  ratePerSqFt: '5,200',
  totalPrice: '66,00,000',
  totalPriceWords: 'Rupees Sixty-six Lakhs only',
  priceBreakdown: [
    { id: 1, description: 'Cost of Apartment (based on carpet area)', amount: '59,80,000' },
    { id: 2, description: 'Proportionate cost of common areas', amount: '3,00,000' },
    { id: 3, description: 'Taxes (GST, etc.)', amount: '3,20,000' },
  ],

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

  earlyPaymentRebate: '8',
  delayInterestRate: '10.5',
  possessionTargetMonth: 'December 2027',
  gracePeriodDays: '90',
  relevantStateAct: 'Real Estate (Regulation and Development) Act, 2016',
  apartmentOwnershipAct: 'Kerala Apartment Ownership Act, 1983',

  witnesses: [
    { id: 1, name: 'Mr. Anoop S.', address: 'TC 10/123, Sasthamangalam, Thiruvananthapuram' },
    { id: 2, name: 'Mrs. Meera Nair', address: 'Kailas, Kowdiar P.O., Thiruvananthapuram' },
  ],
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
