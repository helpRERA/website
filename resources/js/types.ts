
export enum PromoterType {
  COMPANY = "COMPANY",
  PARTNERSHIP = "PARTNERSHIP",
  INDIVIDUAL = "INDIVIDUAL"
}

export enum AllotteeType {
  COMPANY = "COMPANY",
  PARTNERSHIP = "PARTNERSHIP",
  INDIVIDUAL = "INDIVIDUAL",
  HUF = "HUF"
}

export enum ProjectType {
  RESIDENTIAL_MULTISTORIED = "RESIDENTIAL_MULTISTORIED",
  COMMERCIAL = "COMMERCIAL",
  PLOTTED_DEVELOPMENT = "PLOTTED_DEVELOPMENT"
}

export interface PromoterDetails {
  type: PromoterType;
  // Company details
  companyName: string;
  cin: string;
  companiesActYear: string; // 1956 or 2013
  registeredOffice: string;
  pan: string;
  authorizedSignatoryName: string;
  signatoryAadhaar: string;
  boardResolutionDate: string;
  // Partnership details
  partnershipName: string;
  partnershipRegAct: string;
  principalBusinessPlace: string;
  authorizedPartnerName: string;
  partnerAadhaar: string;
  partnerAuthorizedVide: string; // e.g. partnership deed date / resolution
  // Individual details
  individualName: string;
  individualAadhaar: string;
  parentName: string; // son/daughter of
  age: string;
  residenceAddress: string;
}

export interface AllotteeDetails {
  type: AllotteeType;
  // Company details
  companyName: string;
  cin: string;
  companiesActYear: string;
  registeredOffice: string;
  pan: string;
  authorizedSignatoryName: string;
  signatoryAadhaar: string;
  boardResolutionDate: string;
  // Partnership details
  partnershipName: string;
  partnershipRegAct: string;
  principalBusinessPlace: string;
  authorizedPartnerName: string;
  partnerAadhaar: string;
  partnerAuthorizedVide: string;
  // Individual details
  individualName: string;
  individualAadhaar: string;
  parentName: string;
  age: string;
  residenceAddress: string;
  // HUF details
  hufKartaName: string;
  hufKartaAadhaar: string;
  hufKartaParent: string;
  hufKartaAge: string;
  hufFamilyName: string;
  hufBusinessPlace: string;
  hufPan: string;
}

export interface AgreementDetails {
  // Document context
  executionDate: string;
  executionPlace: string;
  
  // Parties
  promoter: PromoterDetails;
  allottee: AllotteeDetails;
  otherAllotteesText: string; // Additional joint-buyers info

  // Land owner clause (absolute or development partner)
  landOwnerType: "ABSOLUTE" | "DEVELOPER";
  surveyNumbers: string;
  totalAdmeasuringSqM: string;
  tehsilAndDistrict: string;
  titleDeedDetails: string; // "sale deed dated ... registered as docs no ..."
  subRegistrarOffice: string;
  collaborationAgreementDetails: string; // If developer: date, doc number, sub-registrar details

  // Project details
  projectType: ProjectType;
  projectComprising: string; // e.g. "multistoried apartment buildings and commercial shops"
  otherComponents: string;
  projectName: string;

  // Approvals
  commencementAuthority: string;
  commencementDate: string;
  commencementBearingNo: string;
  layoutPlanAuthority: string;
  layoutPlanDate: string;
  reraRegOfficePlace: string; // Kerala State RERA, e.g., Trivandrum
  reraRegDate: string;
  reraRegistrationNumber: string;

  // Unit details
  unitNo: string;
  unitAllocatedDate: string;
  unitAllottedNo: string;
  carpetAreaSqFt: string;
  unitTypeDescription: string; // e.g. "Residential 3BHK"
  floorNo: string;
  towerOrBlock: string;
  garageClosedParkingNo: string; // Description/Count
  parkingDetailsText: string; // Custom location description e.g. "Basement 1, Slot 42"
  commonAreasProRataShare: string; // Percentage or description

  // Financial details
  totalPriceRupees: string;
  totalPriceWords: string;
  ratePerSqFt: string; // rate for carpet area
  breakdownCostCommonAreas: string;
  breakdownParkingPrice: string;
  breakdownTaxes: string;
  breakdownPreferentialCharges: string;
  bookingAmountRupees: string;
  bookingAmountWords: string;
  escrowAccountDetails: string; // A/c payee details, payable at

  // Code/Clauses specific details from the 21-page agreement
  rebateRatePercent: string; // rebate rate in %, e.g. "8%"
  consecutiveDemandsLimit: string; // consecutive demands limit in 9.3(i), e.g. "3"
  consecutiveMonthsLimit: string; // consecutive months limit in 9.3(ii), e.g. "2"
  offeredPossessionDays: string; // possession offer within ... days of OC in 7.2, e.g. "15"
  outsideAreasFacilities: string; // areas/facilities outside the project in 1.10
  outsideCompetentAuthority: string; // competent authority in 1.10
  outsideStateActName: string; // relevant State act in 1.10
  stateActLaws: string; // relevant state laws, e.g. "Kerala Real Estate (Regulation and Development) Rules, 2018"
  customAgreementTerms: string; // any custom terms added under clause 33

  // Dynamic tables for section 1.2
  priceTableRows: { col1: string; col2: string }[];
  garageParkingRows: { col1: string; col2: string }[];
  plotTableRows: { col1: string; col2: string }[];

  // Uploaded Passport Photos (Base64 data or filenames)
  promoterPhoto: string;
  allotteePhoto: string;
  jointAllotteePhoto: string;

  // Uploaded Signatures (Base64 data or drawn vectors)
  promoterSignature: string;
  allotteeSignature: string;
  jointAllotteeSignature: string;
  witness1Signature: string;
  witness2Signature: string;

  // Additional disclosures
  additionalDisclosures: string;
  possessionDeadlineDate: string;
  stateApartmentActName: string; // Kerala Apartment Ownership Act, 1983
  keralaStampActComplianceConfirmed?: boolean;
}
