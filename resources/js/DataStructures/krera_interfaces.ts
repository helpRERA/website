export interface Project {
  ID: number
  Name: string
  ProposedDateOfCompletion: string | null
  NumberOfResidentialUnits: string | null
  NumberOfCommercialUnits: string | null
  BuildingCount: string | null
  ProjectRegistrationNumber: string | null
  Area: string | null
  Street: string | null
  Village: string | null
  Locality: string | null
  PType: string | null
  ProjectType: string | null
  booked_plots: number | null
  plot_count: number | null
  District: string
  ProjectStartDate: string | null
  ProjectEndDate: string | null
  ProjectYear?: string | null
  TotalFloorAreaOfProjectProposedForRegistration: string | null
  TotalFloorAreaUnderResidentialUse: string | null
  TotalFloorAreaUnderOtherUse: string | null
  district?: District
  taluk?: Taluk
  village?: Village
  buildings_count?: number
  images?: UploadedImage[]
  apartments?: ApartmentType[]
  facilities?: Facility[]
  documents?: ProjectDocument[]
  certificate?: Certificate
  promoter?: UserProfile
  cover_photo?: UploadedImage
  project_type?: CommonDDMaster
}

export interface CommonDDMaster {
  Id: string
  TypeName: string
}

export interface PlotInfo {
  ID: string | null
  ProjectID: number | string | null
  NumberPlot: string | number | null
  BookedPlots: string | number | null
}

export interface UserProfile {
  ID: number
  UserID: number
  RoleID: number
  IndivisualName: string | null
  IndivisualMName: string | null
  IndivisualLName: string | null
  InfoTypeValue: string | null
  CompanyName: string
  IndivisualHouseNo: string | null
  IndivisualBuilding: string | null
  IndivisualStreet: string | null
  IndivisualLocality: string | null
  companyHouseNo: string | null
  CompanyBuilding: string | null
  CompanyStreet: string | null
  CompanyLocality: string | null
  IndivisualPinCode: string | null
  CompanyPinCode: string | null
  IndivisualLandmark: string | null
  CompanyLandmark: string | null
  IndivisualEmailID: string | null
  IndivisualMobileNo: string | null
  CompanyEmailID: string | null
  CompanyMobileNo: string | null
  CertificateNo: string | null
  company_district?: District
  individual_district?: District
  partners?: Partial<Partner>[]
  CompanyHouseNo: string | null
  litigation?: Partial<Litigation>[]
  experience?: Partial<PromoterPastExperience>[]
  track_record?: Partial<PromoterTrackRecord>
  CreatedOn: string | null
  CompWebsiteURL: string | null
  project?: Partial<Project>[]
  org_type?: Partial<CommonDDMaster>
  logo?: {
    LogoImagefileName: string | null
  }
}

export interface HSM {
  DgnID: number
  ProjectID: number | null
}

export interface ProjectDocument {
  ID: number
  DocID: number | null
  ProjectId: number | null
  DocumentName: string | null
  CreatedOn?: string | null
}

export interface Certificate {
  RegistrationNo: string | null
  CertificateNo: string | null
}

export interface UploadedImage {
  ID: number
}

export interface Company {
  ID: number
  UserID: number
  RoleID: number
  CompanyName: string
  CompanyMobileNo: string
  CompanySecMobileNo: string
  CompanyEmailID: string
  CompanyOfficeNo: string
}

export interface District {
  Districtname: string
  Districtcode: string
  state?: {
    stateName: string
  }
}

export interface Village {
  Villagecode: string
  Villagename: string
}

export interface Taluk {
  Subdistrictcode: number
  SubDistrictname: string | null
}

export interface Facility {
  FDetailName: string | null
  Available: string | null
  Percent: string | null
  ID: number
}

export interface ApartmentType {
  ID: number
  ApartmentType: string | null
  ProjectID: number | null
  TotalArea: string | null
  BookedApartment: string | null
  project?: Project
  ApartmentNumber: string | null
  apartment_type?: CommonDDMaster
}

export interface Building {
  ID: number
}

export interface Coordinate {
  Latitude: string | null
  Longitude: string | null
}

export interface OrderFile {
  DocID: number
  FileName: string
}

export interface ExtensionCert {
  DgnID: number
  FileName: string
}

export interface Partner {
  ID: string | null
  Userid: string | null
  MDMID: string | null
  RoleID: string | null
  FName: string | null
  MName: string | null
  LName: string | null
  Designation: string | null
  MimeType: string | null
  FileName: string | null
  PanNo: string | null
  HouseNo: string | null
  Building: string | null
  Street: string | null
  Locality: string | null
  Landmark: string | null
  StateID: string | null
  DivisionID: string | null
  DistrictID: string | null
  TalukaID: string | null
  VillageID: string | null
  PinCode: string | null
  CreatedBy: string | null
  CreatedOn: string | null
  ModifiedBy: string | null
  ModifiedOn: string | null
  AadharNo: string | null
  MemberType: string | null
  other: string | null
  MobileNo: string | null
  OfficeNo: string | null
  FaxNo: string | null
  EmailID: string | null
  ContactPerson: string | null
  ContactPersonDesignation: string | null
  MemberOtherTaluka: string | null
  MemberOtherVillage: string | null
  OtherVillage: string | null
  SecondaryMobileNo: string | null
  deleteUserId: string | null
  district?: District
  member_designation?: {
    Designation: string | null
  } | null
}

export interface PromoterTrackRecord {
  ID: string | null
  UserID: string | null
  RoleID: string | null
  StateExperianceYearCount: string | null
  UTExperianceYearCount: string | null
  NumberofProjectExperianceCount: string | null
  ProjectAreaConstructed: string | null
  OngoingPoroject: string | null
  AreatobeConstructed: string | null
  CreatedOn: string | null
  CreatedBy: string | null
  ModifiedOn: string | null
  ModifiedBY: string | null
}

export interface PromoterPastExperience {
  ID: string | null
  ProjectName: string | null
  Address: string | null
  ProjectTypeIDMain: string | null
  LandArea: string | null
  DetailsOfPaymentPending: string | null
  ProjectCurrentStatus: string | null
  ProjectDetailsLitigations: string | null
  DateOfCommencement: string | null
  ProposedDateOfCompletion: string | null
  ActualCompletionDate: string | null
  Remarks: string | null
  OtherRelevantExperience: string | null
  UserID: string | null
  CreatedOn: string | null
  CreatedBy: string | null
  ModifiedOn: string | null
  ModifiedBy: string | null
  reraRegistrationNumber: string | null
}

export interface Litigation {
  AlreadyRegisteredComplaintsId: string | null
  SlNo: string | null
  ComplaintNo: string | null
  Complainant: string | null
  Respondent: string | null
  ProjRegNo: string | null
  ProjectName: string | null
  OrderTypeId: string | null
  OrderIsValue: string | null
  DocName: string | null
  DocType: string | null
  DocUpload: string | null
  IPAddress: string | null
  CreatedBy: string | null
  UpdatedBy: string | null
  CreatedDate: string | null
  UpdatedDate: string | null
  ComplaintYear: string | null
  addby: string | null
  ComplaintTypeId: string | null
  isDisposed: string | null
  DateofFiling: string | null
  ReliefSought: string | null
  Bench: string | null
  Orderspassed: string | null
  RemarksStatus: string | null
  EpDetails: string | null
  AvailableReliefSought: string | null
  AvailableReliefSoughtId: string | null
  ProjectId: string | null
  AlreadyRegisteredProject: string | null
}

export interface ProjectStatusType {
  Id: number
  TypeName: string
}

export interface ReliefSought {
  Id: number
  Relief_Sought: string
}
