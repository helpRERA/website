import React, { useState, useRef, useEffect } from 'react';
import { Plus, Trash2, ChevronRight, ChevronLeft, RefreshCw } from 'lucide-react';
import { AgreementData, JointAllottee, GarageDetail, PriceBreakdownItem, PaymentPlanItem, Witness, DisclosureItem, LandJDA, PlotPriceItem } from '../../hooks/useAgreementData';
import logoUrl from '../../../../public/imge/logonew.svg';
import { toast } from 'react-toastify';
import axios from 'axios';



interface FormPanelProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  data: AgreementData;
  updateField: (field: keyof AgreementData, value: any) => void;
  updateNestedField: (parentField: keyof AgreementData, field: string, value: any) => void;
  resetData: () => void;
  resetFields?: (fields: (keyof AgreementData)[]) => void;
  setActiveField: (field: string | null) => void;
  onSave: () => Promise<void>;
  isSaving: boolean;
  isSaved: boolean;
}

export default function FormPanel({ activeStep, setActiveStep, data, updateField, updateNestedField, resetData, resetFields, setActiveField, onSave, isSaving, isSaved }: FormPanelProps) {
  const steps = [
    { id: 0, label: 'Execution' },
    { id: 1, label: 'Promoter' },
    { id: 3, label: 'Property & Project' },
    { id: 4, label: 'Approvals' },
    { id: 5, label: 'Unit & Pricing' },
    { id: 6, label: 'Payment Plan' },
    { id: 7, label: 'Witnesses' },
    { id: 8, label: 'Schedules' }
  ];

  const [unitPricingTab, setUnitPricingTab] = useState<'garage' | 'plot'>('garage');
  const totalSteps = steps.length;
  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === activeStep);
    if (currentIndex >= 0 && currentIndex < steps.length - 1) {
      setActiveStep(steps[currentIndex + 1].id);
    }
  };


  const formContentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (formContentRef.current) {
      formContentRef.current.scrollTop = 0;
      const firstField = formContentRef.current.querySelector<HTMLElement>(
        'input, select, textarea'
      );
      firstField?.focus();
    }
  }, [activeStep]);

  const handleBack = () => {
    const currentIndex = steps.findIndex(s => s.id === activeStep);
    if (currentIndex > 0) {
      setActiveStep(steps[currentIndex - 1].id);
    }
  };

  const [uploadingSchedule, setUploadingSchedule] = useState<Record<string, boolean>>({});
  const uploadScheduleFile = async (slot: 'scheduleA' | 'scheduleB' | 'scheduleC' | 'scheduleD', file: File) => {
    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files are allowed');
      return;
    }

    setUploadingSchedule(prev => ({ ...prev, [slot]: true }));

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('/schedules/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data.success) {
        updateField(slot, response.data.url);
        toast.success('Schedule uploaded successfully', { autoClose: 2000 });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload schedule');
    } finally {
      setUploadingSchedule(prev => ({ ...prev, [slot]: false }));
    }
  };

  const stepFieldsMap: Record<number, (keyof AgreementData)[]> = {
    0: ['dateDay', 'dateMonth', 'dateYear', 'executionPlace'],
    1: ['promoterType', 'promoterCompany', 'promoterPartnership', 'promoterIndividual'],
    2: ['allotteeType', 'allotteeCompany', 'allotteePartnership', 'allotteeIndividual', 'allotteeHuf', 'jointAllottees'],
    3: ['landSurveyNos', 'landAdmeasuring', 'landSituatedAt', 'landTehsilDistrict', 'landTitleDeedDate', 'landTitleDeedRegNo', 'landOwnershipType', 'landJDA', 'projectType', 'projectBuildingType', 'projectComprising', 'projectName', 'projectOtherComponents', 'plotOtherComponents', 'basementLocation'],
    4: ['commencementAuthority', 'commencementNo', 'commencementDate', 'layoutAuthority', 'reraRegNo', 'reraRegDate', 'maintenanceClauses', 'facilitiesOutsideProject', 'competentAuthorityForDeclaration', 'relevantStateAct'],
    5: ['applicationNo', 'applicationDate', 'apartmentType', 'unitNo', 'unitFloor', 'unitTower', 'unitCarpetArea', 'plotNo', 'plotArea', 'garageDetails', 'ratePerSqFt', 'totalPrice', 'totalPriceWords', 'bookingAmount', 'bookingAmountWords', 'paymentFavourOf', 'paymentPayableAt', 'priceBreakdown', 'plotPricing'],
    6: ['earlyPaymentRebate', 'delayInterestRate', 'possessionTargetMonth', 'gracePeriodDays', 'defaultConsecutiveDemands', 'defaultConsecutiveMonths', 'prescribedByLaws', 'additionalTerms', 'additionalDisclosures', 'paymentPlan'],
    7: ['witnesses', 'apartmentOwnershipAct'],
    8: ['scheduleA', 'scheduleB', 'scheduleC', 'scheduleD'],
  };

  const resetCurrentStep = () => {
    const fields = stepFieldsMap[activeStep] || [];
    if (!resetFields || fields.length === 0) return;

    const toastId = 'reset-page-confirm';

    toast(
      ({ closeToast }) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.85rem' }}>
            Reset all fields on this page? This can't be undone.
          </span>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button
              onClick={closeToast}
              className="btn-secondary"
              style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                resetFields(fields);
                closeToast?.();
                toast.success('Page reset successfully', { autoClose: 3000 });
              }}
              className="btn-danger"
              style={{ padding: '0.3rem 0.75rem', fontSize: '0.75rem' }}
            >
              Reset
            </button>
          </div>
        </div>
      ),
      { toastId, closeButton: true }
    );
  };


  const addGarage = () => {
    const newGarages: GarageDetail[] = [
      ...data.garageDetails,
      { id: Date.now(), no: '', area: '', price: '' }
    ];
    updateField('garageDetails', newGarages);
  };

  const removeGarage = (id: number) => {
    const newGarages = data.garageDetails.filter(g => g.id !== id);
    updateField('garageDetails', newGarages);
  };

  const updateGarage = (id: number, field: keyof Omit<GarageDetail, 'id'>, value: string) => {
    const newGarages = data.garageDetails.map(g => {
      if (g.id === id) {
        return { ...g, [field]: value };
      }
      return g;
    });
    updateField('garageDetails', newGarages);
  };

  const addPriceBreakdown = () => {
    const newBreakdown: PriceBreakdownItem[] = [
      ...data.priceBreakdown,
      { id: Date.now(), description: '', amount: '' }
    ];
    updateField('priceBreakdown', newBreakdown);
  };

  const removePriceBreakdown = (id: number) => {
    const newBreakdown = data.priceBreakdown.filter(b => b.id !== id);
    updateField('priceBreakdown', newBreakdown);
  };

  const updatePriceBreakdown = (id: number, field: keyof Omit<PriceBreakdownItem, 'id'>, value: string) => {
    const newBreakdown = data.priceBreakdown.map(b => {
      if (b.id === id) {
        return { ...b, [field]: value };
      }
      return b;
    });
    updateField('priceBreakdown', newBreakdown);
  };



  const addJointAllottee = () => {
    const newAllottees: JointAllottee[] = [
      ...data.jointAllottees,
      {
        id: Date.now(),
        name: '',
        aadhaar: '',
        parentType: 'son',
        parentName: '',
        age: '',
        residing: '',
        pan: ''
      }
    ];
    updateField('jointAllottees', newAllottees);
  };

  const removeJointAllottee = (id: number) => {
    const newAllottees = data.jointAllottees.filter(a => a.id !== id);
    updateField('jointAllottees', newAllottees);
  };

  const updateJointAllottee = (id: number, field: keyof Omit<JointAllottee, 'id'>, value: string) => {
    const newAllottees = data.jointAllottees.map(a => {
      if (a.id === id) {
        return { ...a, [field]: value };
      }
      return a;
    });
    updateField('jointAllottees', newAllottees);
  };

  const addWitness = () => {
    const newWitnesses: Witness[] = [
      ...data.witnesses,
      { id: Date.now(), name: '', address: '' }
    ];
    updateField('witnesses', newWitnesses);
  };

  const removeWitness = (id: number) => {
    const newWitnesses = data.witnesses.filter(w => w.id !== id);
    updateField('witnesses', newWitnesses);
  };

  const updateWitness = (id: number, field: keyof Omit<Witness, 'id'>, value: string) => {
    const newWitnesses = data.witnesses.map(w => {
      if (w.id === id) {
        return { ...w, [field]: value };
      }
      return w;
    });
    updateField('witnesses', newWitnesses);
  };

  const addDisclosure = () => {
    const newDisclosures: DisclosureItem[] = [
      ...data.additionalDisclosures,
      { id: Date.now(), text: '' }
    ];
    updateField('additionalDisclosures', newDisclosures);
  };

  const removeDisclosure = (id: number) => {
    const newDisclosures = data.additionalDisclosures.filter(d => d.id !== id);
    updateField('additionalDisclosures', newDisclosures);
  };

  const updateDisclosure = (id: number, value: string) => {
    const newDisclosures = data.additionalDisclosures.map(d => {
      if (d.id === id) {
        return { ...d, text: value };
      }
      return d;
    });
    updateField('additionalDisclosures', newDisclosures);
  };

  const addJDA = () => {
    const newJDAs: LandJDA[] = [
      ...data.landJDA,
      {
        id: Date.now(),
        ownerName: '',
        surveyNos: '',
        admeasuring: '',
        situatedAt: '',
        tehsilDistrict: '',
        titleDeedDate: '',
        titleDeedRegNo: '',
        jdaDate: '',
        regNo: '',
        subRegistrarOffice: '',
        additionalDetails: ''
      }
    ];
    updateField('landJDA', newJDAs);
  };

  const removeJDA = (id: number) => {
    const newJDAs = data.landJDA.filter(j => j.id !== id);
    updateField('landJDA', newJDAs);
  };

  const updateJDA = (id: number, field: keyof Omit<LandJDA, 'id'>, value: string) => {
    const newJDAs = data.landJDA.map(j => {
      if (j.id === id) {
        return { ...j, [field]: value };
      }
      return j;
    });
    updateField('landJDA', newJDAs);
  };

  const addPlotPricing = () => {
    const newPlots: PlotPriceItem[] = [
      ...data.plotPricing,
      { id: Date.now(), plotNoType: '', ratePerSqFt: '' }
    ];
    updateField('plotPricing', newPlots);
  };

  const removePlotPricing = (id: number) => {
    const newPlots = data.plotPricing.filter(p => p.id !== id);
    updateField('plotPricing', newPlots);
  };

  const updatePlotPricing = (id: number, field: keyof Omit<PlotPriceItem, 'id'>, value: string) => {
    const newPlots = data.plotPricing.map(p => {
      if (p.id === id) {
        return { ...p, [field]: value };
      }
      return p;
    });
    updateField('plotPricing', newPlots);
  };


  const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
  const formatPAN = (value: string) => value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
  const isPANValid = (pan: string) => pan === '' || PAN_REGEX.test(pan);

  const PANError = ({ pan }: { pan: string }) =>
    pan.length > 0 && !isPANValid(pan) ? (
      <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>
        Invalid PAN format (e.g. ABCDE1234F)
      </span>
    ) : null;

  const AADHAAR_REGEX = /^[2-9][0-9]{11}$/;
  const formatAadhaar = (value: string) =>
    value.replace(/[^0-9]/g, '').slice(0, 12);
  const isAadhaarValid = (aadhaar: string) =>
    aadhaar === '' || AADHAAR_REGEX.test(aadhaar);

  const AadhaarError = ({ aadhaar }: { aadhaar: string }) =>
    aadhaar.length > 0 && !isAadhaarValid(aadhaar) ? (
      <span style={{ color: '#ef4444', fontSize: '0.7rem' }}>
        Aadhaar must be 12 digits and not start with 0 or 1
      </span>
    ) : null;

  const formatDecimalNumber = (value: string) => {
    let cleaned = value.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) {
      cleaned = parts[0] + '.' + parts.slice(1).join('');
    }
    return cleaned;
  };

  return (
    <div className="form-panel">
      <div className="form-header">
        <div className="logo-container">
          <img src={logoUrl} alt="K-RERA Logo" style={{ width: '345px', height: 'auto', objectFit: 'contain' }} />
        </div>
      </div>

      {/* Horizontal Scrollable Tabs */}
      <div className="steps-nav">
        {steps.map((step) => {
          return (
            <button
              key={step.id}
              className={`step-tab ${activeStep === step.id ? 'active' : ''}`}
              onClick={() => setActiveStep(step.id)}
              title={step.label}
            >
              {step.label}
            </button>
          );
        })}
      </div>

      <div className="form-content" ref={formContentRef}>
        {/* STEP 0: EXECUTION DETAILS */}
        {activeStep === 0 && (
          <div className="form-section">
            <h3 className="section-title">Agreement Execution</h3>
            <div className="form-group">
              <label>Execution Place / City</label>
              <input
                type="text"
                value={data.executionPlace}
                onFocus={() => setActiveField('executionPlace')} onChange={(e) => updateField('executionPlace', e.target.value)}
                placeholder="e.g. Thiruvananthapuram"
              />
            </div>
            <div className="form-group row-3">
              <div>
                <label>Day of Month</label>
                <input
                  type="text"
                  value={data.dateDay}
                  onFocus={() => setActiveField('dateDay')} onChange={(e) => updateField('dateDay', e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                  placeholder="e.g. 23rd"
                />
              </div>
              <div>
                <label>Month</label>
                <input
                  type="text"
                  value={data.dateMonth}
                  onFocus={() => setActiveField('dateMonth')} onChange={(e) => updateField('dateMonth', e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                  placeholder="e.g. June"
                />
              </div>
              <div>
                <label>Year</label>
                <input
                  type="text"
                  value={data.dateYear}
                  onFocus={() => setActiveField('dateYear')} onChange={(e) => updateField('dateYear', e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                  placeholder="e.g. 2026"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: PROMOTER DETAILS */}
        {activeStep === 1 && (
          <div className="form-section">
            <h3 className="section-title">Promoter Details</h3>
            <div className="form-group">
              <label>Promoter Entity Type</label>
              <div className="toggle-group">
                <button
                  className={`toggle-btn ${data.promoterType === 'company' ? 'active' : ''}`}
                  onClick={() => updateField('promoterType', 'company')}
                >
                  Company
                </button>
                <button
                  className={`toggle-btn ${data.promoterType === 'partnership' ? 'active' : ''}`}
                  onClick={() => updateField('promoterType', 'partnership')}
                >
                  Partnership
                </button>
                <button
                  className={`toggle-btn ${data.promoterType === 'individual' ? 'active' : ''}`}
                  onClick={() => updateField('promoterType', 'individual')}
                >
                  Individual
                </button>
              </div>
            </div>

            {/* Company Fields */}
            {data.promoterType === 'company' && (
              <>
                <div className="form-group">
                  <label>Company Name</label>
                  <input
                    type="text"
                    value={data.promoterCompany.name}
                    onFocus={() => setActiveField('promoterCompany.name')} onChange={(e) => updateNestedField('promoterCompany', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>CIN</label>
                    <input
                      type="text"
                      value={data.promoterCompany.cin}
                      onFocus={() => setActiveField('promoterCompany.cin')} onChange={(e) => updateNestedField('promoterCompany', 'cin', e.target.value.replace(/[^a-zA-Z0-9\s]/g, ''))}
                    />
                  </div>
                  <div>
                    <label>PAN</label>
                    <input
                      type="text"
                      maxLength={10}
                      value={data.promoterCompany.pan}
                      onFocus={() => setActiveField('promoterCompany.pan')}
                      onChange={(e) => updateNestedField('promoterCompany', 'pan', formatPAN(e.target.value))}
                      style={{
                        borderColor: data.promoterCompany.pan.length > 0 && !isPANValid(data.promoterCompany.pan)
                          ? '#ef4444'
                          : undefined
                      }}
                    />
                    <PANError pan={data.promoterCompany.pan} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Registered Office Address</label>
                  <textarea
                    rows={2}
                    value={data.promoterCompany.registeredOffice}
                    onFocus={() => setActiveField('promoterCompany.registeredOffice')} onChange={(e) => updateNestedField('promoterCompany', 'registeredOffice', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Corporate Office Address</label>
                  <textarea
                    rows={2}
                    value={data.promoterCompany.corporateOffice}
                    onFocus={() => setActiveField('promoterCompany.corporateOffice')} onChange={(e) => updateNestedField('promoterCompany', 'corporateOffice', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Authorized Signatory</label>
                    <input
                      type="text"
                      value={data.promoterCompany.authorizedSignatory}
                      onFocus={() => setActiveField('promoterCompany.authorizedSignatory')} onChange={(e) => updateNestedField('promoterCompany', 'authorizedSignatory', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Aadhaar No</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={12}
                      value={data.promoterCompany.signatoryAadhaar}
                      onFocus={() => setActiveField('promoterCompany.signatoryAadhaar')}
                      onChange={(e) =>
                        updateNestedField('promoterCompany', 'signatoryAadhaar', formatAadhaar(e.target.value))
                      }
                      style={{
                        borderColor:
                          data.promoterCompany.signatoryAadhaar.length > 0 &&
                            !isAadhaarValid(data.promoterCompany.signatoryAadhaar)
                            ? '#ef4444'
                            : undefined
                      }}
                    />
                    <AadhaarError aadhaar={data.promoterCompany.signatoryAadhaar} />
                  </div>
                </div>
                <div className="form-group">
                  <label>Board Resolution Date</label>
                  <input
                    type="date"
                    value={data.promoterCompany.boardResolutionDate}
                    onFocus={() => setActiveField('promoterCompany.boardResolutionDate')} onChange={(e) => updateNestedField('promoterCompany', 'boardResolutionDate', e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Partnership Fields */}
            {data.promoterType === 'partnership' && (
              <>
                <div className="form-group">
                  <label>Partnership Firm Name</label>
                  <input
                    type="text"
                    value={data.promoterPartnership.name}
                    onFocus={() => setActiveField('promoterPartnership.name')} onChange={(e) => updateNestedField('promoterPartnership', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Principal Place of Business</label>
                  <textarea
                    rows={2}
                    value={data.promoterPartnership.businessPlace}
                    onFocus={() => setActiveField('promoterPartnership.businessPlace')} onChange={(e) => updateNestedField('promoterPartnership', 'businessPlace', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>PAN</label>
                  <input
                    type="text"
                    value={data.promoterPartnership.pan}
                    onFocus={() => setActiveField('promoterPartnership.pan')} onChange={(e) => updateNestedField('promoterPartnership', 'pan', e.target.value.replace(/[^a-zA-Z0-9]/g, ''))}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Represented by Partner</label>
                    <input
                      type="text"
                      value={data.promoterPartnership.authorizedPartner}
                      onFocus={() => setActiveField('promoterPartnership.authorizedPartner')} onChange={(e) => updateNestedField('promoterPartnership', 'authorizedPartner', e.target.value)}
                    />
                  </div>

                  <div>
                    <label>Partner Aadhaar No</label>
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={12}
                      value={data.promoterPartnership.partnerAadhaar}
                      onFocus={() => setActiveField('promoterPartnership.partnerAadhaar')}
                      onChange={(e) => updateNestedField('promoterPartnership', 'partnerAadhaar', formatAadhaar(e.target.value))}
                      style={{
                        borderColor:
                          data.promoterPartnership.partnerAadhaar.length > 0 &&
                            !isAadhaarValid(data.promoterPartnership.partnerAadhaar)
                            ? '#ef4444'
                            : undefined
                      }}
                    />
                    <AadhaarError aadhaar={data.promoterPartnership.partnerAadhaar} />
                  </div>

                </div>
                <div className="form-group">
                  <label>Authorized Vide (Document details)</label>
                  <input
                    type="text"
                    value={data.promoterPartnership.authorizedVide}
                    onFocus={() => setActiveField('promoterPartnership.authorizedVide')} onChange={(e) => updateNestedField('promoterPartnership', 'authorizedVide', e.target.value)}
                    placeholder="e.g. resolution dated 10/12/2025"
                  />
                </div>
              </>
            )}

            {/* Individual Fields */}
            {data.promoterType === 'individual' && (
              <>
                <div className="form-group">
                  <label>Promoter Name (Mr/Ms)</label>
                  <input
                    type="text"
                    value={data.promoterIndividual.name}
                    onFocus={() => setActiveField('promoterIndividual.name')} onChange={(e) => updateNestedField('promoterIndividual', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Aadhaar No</label>
                    <input
                      type="text"
                      value={data.promoterIndividual.aadhaar}
                      onFocus={() => setActiveField('promoterIndividual.aadhaar')} onChange={(e) => updateNestedField('promoterIndividual', 'aadhaar', formatAadhaar(e.target.value))}
                      style={{
                        borderColor:
                          data.promoterIndividual.aadhaar.length > 0 &&
                            !isAadhaarValid(data.promoterIndividual.aadhaar)
                            ? '#ef4444'
                            : undefined
                      }}
                    />
                    <AadhaarError aadhaar={data.promoterIndividual.aadhaar} />
                  </div>
                  <div>
                    <label>PAN</label>
                    <input
                      type="text"
                      value={data.promoterIndividual.pan}
                      onFocus={() => setActiveField('promoterIndividual.pan')} onChange={(e) => updateNestedField('promoterIndividual', 'pan', formatPAN(e.target.value))}
                      style={{
                        borderColor: data.promoterIndividual.pan.length > 0 && !isPANValid(data.promoterIndividual.pan)
                          ? '#ef4444'
                          : undefined
                      }}
                    />
                    <PANError pan={data.promoterIndividual.pan} />
                  </div>
                </div>
                <div className="form-group row-3">
                  <div>
                    <label>Parent Relationship</label>
                    <select
                      value={data.promoterIndividual.parentType}
                      onFocus={() => setActiveField('promoterIndividual.parentType')} onChange={(e) => updateNestedField('promoterIndividual', 'parentType', e.target.value)}
                    >
                      <option value="son">Son of</option>
                      <option value="daughter">Daughter of</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label>Parent Name</label>
                    <input
                      type="text"
                      value={data.promoterIndividual.parentName}
                      onFocus={() => setActiveField('promoterIndividual.parentName')} onChange={(e) => updateNestedField('promoterIndividual', 'parentName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Age (Years)</label>
                  <input
                    type="number"
                    value={data.promoterIndividual.age}
                    onFocus={() => setActiveField('promoterIndividual.age')} onChange={(e) => updateNestedField('promoterIndividual', 'age', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Residential Address</label>
                  <textarea
                    rows={2}
                    value={data.promoterIndividual.residing}
                    onFocus={() => setActiveField('promoterIndividual.residing')} onChange={(e) => updateNestedField('promoterIndividual', 'residing', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 3: PROPERTY & RECITALS */}
        {activeStep === 3 && (
          <div className="form-section">
            {/* TAB SWITCH */}
            <div className="form-group">
              <div className="toggle-group">
                <button
                  className={`toggle-btn ${data.landOwnershipType === 'owner' ? 'active' : ''}`}
                  onClick={() => updateField('landOwnershipType', 'owner')}
                >
                  Promoter is Owner
                </button>
                <button
                  className={`toggle-btn ${data.landOwnershipType === 'developer' ? 'active' : ''}`}
                  onClick={() => updateField('landOwnershipType', 'developer')}
                >
                  JDA (Developer)
                </button>
              </div>
            </div>

            {/* TAB PANEL: Promoter is Owner → Land & Project Details fields */}
            {data.landOwnershipType === 'owner' && (
              <>
                <h3 className="section-title">Land & Project Details</h3>
                <div className="form-group row-2">
                  <div>
                    <label>Survey Numbers</label>
                    <input
                      type="text"
                      value={data.landSurveyNos}
                      onFocus={() => setActiveField('landSurveyNos')} onChange={(e) => updateField('landSurveyNos', e.target.value)}
                      placeholder="e.g. 101/2, 101/3"
                    />
                  </div>
                  <div>
                    <label>Land Area (Sq. Meters)</label>
                    <input
                      type="text"
                      value={data.landAdmeasuring}
                      onFocus={() => setActiveField('landAdmeasuring')} onChange={(e) => updateField('landAdmeasuring', e.target.value)}
                      placeholder="e.g. 4,050"
                    />
                  </div>
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Situated at (Location)</label>
                    <input
                      type="text"
                      value={data.landSituatedAt}
                      onFocus={() => setActiveField('landSituatedAt')} onChange={(e) => updateField('landSituatedAt', e.target.value)}
                      placeholder="e.g. Pattom"
                    />
                  </div>
                  <div>
                    <label>Tehsil & District</label>
                    <input
                      type="text"
                      value={data.landTehsilDistrict}
                      onFocus={() => setActiveField('landTehsilDistrict')} onChange={(e) => updateField('landTehsilDistrict', e.target.value)}
                      placeholder="e.g. Thiruvananthapuram"
                    />
                  </div>
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Title Deed Date</label>
                    <input
                      type="date"
                      value={data.landTitleDeedDate}
                      onFocus={() => setActiveField('landTitleDeedDate')} onChange={(e) => updateField('landTitleDeedDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Document No.</label>
                    <input
                      type="text"
                      value={data.landTitleDeedRegNo}
                      onFocus={() => setActiveField('landTitleDeedRegNo')} onChange={(e) => updateField('landTitleDeedRegNo', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* TAB PANEL: JDA (Developer) */}
            {data.landOwnershipType === 'developer' && (
              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{ fontWeight: '600' }}>Joint Development Agreement Details</label>
                  <button className="btn-secondary" onClick={addJDA} style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                    <Plus size={12} /> Add JDA
                  </button>
                </div>
                <div className="list-container" style={{ padding: '0.5rem' }}>
                  {data.landJDA.length === 0 ? (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      No JDA details added.
                    </span>
                  ) : (
                    data.landJDA.map((jda, idx) => (
                      <div key={jda.id} className="list-item" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '0.5rem', border: '1px solid var(--border-ui)', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>JDA #{idx + 1}</span>
                          <button className="btn-danger" onClick={() => removeJDA(jda.id)} style={{ padding: '2px 6px' }}>
                            <Trash2 size={12} />
                          </button>
                        </div>
                        <div className="form-group">
                          <label style={{ fontSize: '0.7rem' }}>Absolute Owner Name</label>
                          <input
                            style={{ padding: '0.35rem' }}
                            type="text"
                            value={jda.ownerName}
                            onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'ownerName', e.target.value)}
                          />
                        </div>

                        <div className="form-group row-2">
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>Survey Numbers</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="text"
                              value={jda.surveyNos}
                              onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'surveyNos', e.target.value)}
                              placeholder="e.g. 101/2, 101/3"
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>Land Area (Sq. Meters)</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="text"
                              value={jda.admeasuring}
                              onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'admeasuring', e.target.value)}
                              placeholder="e.g. 4,050"
                            />
                          </div>
                        </div>



                        <div className="form-group row-2">
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>Situated at (Location)</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="text"
                              value={jda.situatedAt}
                              onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'situatedAt', e.target.value)}
                              placeholder="e.g. Pattom"
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>Tehsil & District</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="text"
                              value={jda.tehsilDistrict}
                              onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'tehsilDistrict', e.target.value)}
                              placeholder="e.g. Thiruvananthapuram"
                            />
                          </div>
                        </div>

                        <div className="form-group row-2">
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>Title Deed Date</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="date"
                              value={jda.titleDeedDate}
                              onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'titleDeedDate', e.target.value)}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>Document No.</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="text"
                              value={jda.titleDeedRegNo}
                              onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'titleDeedRegNo', e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="form-group row-2">
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>JDA Execution Date</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="date"
                              value={jda.jdaDate}
                              onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'jdaDate', e.target.value)}
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>JDA Registered Doc No</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="text"
                              value={jda.regNo}
                              onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'regNo', e.target.value)}
                            />
                          </div>
                        </div>


                        <div className="form-group">
                          <label style={{ fontSize: '0.7rem' }}>Sub-Registrar Office where registered</label>
                          <input
                            style={{ padding: '0.35rem' }}
                            type="text"
                            value={jda.subRegistrarOffice}
                            onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'subRegistrarOffice', e.target.value)}
                          />
                        </div>
                        <div className="form-group">
                          <label style={{ fontSize: '0.7rem' }}>Additional Details</label>
                          <textarea
                            style={{ padding: '0.35rem' }}
                            rows={2}
                            value={jda.additionalDetails}
                            onFocus={() => setActiveField('landJDA')} onChange={(e) => updateJDA(jda.id, 'additionalDetails', e.target.value)}
                            placeholder="Enter any additional details to appear after Sub-Registrar..."
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            <h3 className="section-title" style={{ marginTop: '1rem' }}>Project Details</h3>
            <div className="form-group row-2">
              <div>
                <label>Project Type</label>
                <select
                  value={data.projectType}
                  onFocus={() => setActiveField('projectType')} onChange={(e) => updateField('projectType', e.target.value as any)}
                >
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="plotted">Plotted Development</option>
                  <option value="other">Any Other Type</option>
                </select>
              </div>
              <div>
                <label>Project Name</label>
                <input
                  type="text"
                  value={data.projectName}
                  onFocus={() => setActiveField('projectName')} onChange={(e) => updateField('projectName', e.target.value)}
                />
              </div>
            </div>



            <div className="form-group row-2">
              <div>
                <label>Building Type</label>
                <select
                  value={data.projectBuildingType}
                  onFocus={() => setActiveField('projectBuildingType')} onChange={(e) => updateField('projectBuildingType', e.target.value as any)}
                >
                  <option value="commercial">Commercial</option>
                  <option value="residential">Residential</option>
                  <option value="plotted">Plotted Development</option>
                  <option value="other">Any Other Type</option>
                </select>
              </div>
              <div>
                <label>Project Comprising (Details)</label>
                <input
                  type="text"
                  value={data.projectComprising}
                  onFocus={() => setActiveField('projectComprising')} onChange={(e) => updateField('projectComprising', e.target.value)}
                  placeholder="e.g. multistoried apartment building..."
                />
              </div>
            </div>

            {data.projectType !== 'plotted' ? (
              <div className="form-group">
                <label>Any other components of the project</label>
                <input
                  type="text"
                  value={data.projectOtherComponents}
                  onFocus={() => setActiveField('projectOtherComponents')} onChange={(e) => updateField('projectOtherComponents', e.target.value)}
                  placeholder="e.g. club house, swimming pool..."
                />
              </div>

            ) : (
              <div className="form-group">
                <label>Other Components of Plotted Development</label>
                <input
                  type="text"
                  value={data.plotOtherComponents}
                  onFocus={() => setActiveField('plotOtherComponents')} onChange={(e) => updateField('plotOtherComponents', e.target.value)}
                  placeholder="e.g. roads, lighting, open space..."
                />
              </div>
            )}


          </div>
        )}

        {/* STEP 4: APPROVALS & REGISTRATION */}
        {activeStep === 4 && (
          <div className="form-section">
            <h3 className="section-title">Regulatory Approvals</h3>
            <div className="form-group">
              <label>Local body</label>
              <input
                type="text"
                value={data.commencementAuthority}
                onFocus={() => setActiveField('commencementAuthority')} onChange={(e) => updateField('commencementAuthority', e.target.value)}
                placeholder="e.g. Municipality, Corporation..."
              />
            </div>
            <div className="form-group row-2">

              <div>
                <label>Approval Date</label>
                <input
                  type="date"
                  value={data.commencementDate}
                  onFocus={() => setActiveField('commencementDate')} onChange={(e) => updateField('commencementDate', e.target.value)}
                />
              </div>
              <div>
                <label>Permit No</label>
                <input
                  type="text"
                  value={data.commencementNo}
                  onFocus={() => setActiveField('commencementNo')} onChange={(e) => updateField('commencementNo', e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label>Layout Plan Approvals Authority</label>
              <input
                type="text"
                value={data.layoutAuthority}
                onFocus={() => setActiveField('layoutAuthority')} onChange={(e) => updateField('layoutAuthority', e.target.value)}
                placeholder="e.g. TRIDA, Town Planner..."
              />
            </div>

            {/* <h3 className="section-title" style={{ marginTop: '1rem' }}>K-RERA Registration</h3>
            <div className="form-group row-2">
              <div>
                <label>RERA Registration Number</label>
                <input
                  type="text"
                  value={data.reraRegNo}
                  onFocus={() => setActiveField('reraRegNo')} onChange={(e) => updateField('reraRegNo', e.target.value)}
                  placeholder="e.g. K-RERA/PRJ/..."
                />
              </div>
              <div>
                <label>Registration Date</label>
                <input
                  type="date"
                  value={data.reraRegDate}
                  onFocus={() => setActiveField('reraRegDate')} onChange={(e) => updateField('reraRegDate', e.target.value)}
                />
              </div>
            </div> */}



            <h3 className="section-title" style={{ marginTop: '1rem' }}>Disclosures (Clause I)</h3>
            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <label style={{ fontWeight: '600' }}>Additional Disclosures/Details</label>
                <button className="btn-secondary" onClick={addDisclosure} style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                  <Plus size={12} /> Add
                </button>
              </div>
              <div className="list-container" style={{ padding: '0.5rem' }}>
                {data.additionalDisclosures.length === 0 ? (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                    No disclosures added.
                  </span>
                ) : (
                  data.additionalDisclosures.map((item, idx) => (
                    <div key={item.id} className="list-item" style={{ padding: '0.5rem', gap: '0.4rem', border: '1px solid var(--border-ui)', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 'bold', paddingTop: '0.4rem', minWidth: '1.5rem' }}>
                        {idx + 1}.
                      </span>
                      <textarea
                        style={{ flex: 1, padding: '0.35rem' }}
                        rows={2}
                        value={item.text}
                        onFocus={() => setActiveField('additionalDisclosures')}
                        onChange={(e) => updateDisclosure(item.id, e.target.value)}
                        placeholder="Enter disclosure detail"
                      />
                      <button className="btn-danger" onClick={() => removeDisclosure(item.id)} style={{ padding: '0.4rem' }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>




          </div>
        )}

        {/* STEP 5: UNIT & PRICING */}
        {activeStep === 5 && (
          <div className="form-section">
            {/* <h3 className="section-title">Allotted Unit details</h3>
            <div className="form-group row-2">
              <div>
                <label>Application No</label>
                <input
                  type="text"
                  value={data.applicationNo}
                  onFocus={() => setActiveField('applicationNo')} onChange={(e) => updateField('applicationNo', e.target.value)}
                />
              </div>
              <div>
                <label>Application Date</label>
                <input
                  type="date"
                  value={data.applicationDate}
                  onFocus={() => setActiveField('applicationDate')} onChange={(e) => updateField('applicationDate', e.target.value)}
                />
              </div>
            </div> */}

            {/* {data.projectType === 'apartment' ? (
              <>
                <div className="form-group">
                  <label>Apartment Type</label>
                  <input
                    type="text"
                    value={data.apartmentType}
                    onFocus={() => setActiveField('apartmentType')} onChange={(e) => updateField('apartmentType', e.target.value)}
                    placeholder="e.g. 2BHK, 3BHK..."
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Apartment / Room No</label>
                    <input
                      type="text"
                      value={data.unitNo}
                      onFocus={() => setActiveField('unitNo')} onChange={(e) => updateField('unitNo', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Floor No</label>
                    <input
                      type="text"
                      value={data.unitFloor}
                      onFocus={() => setActiveField('unitFloor')} onChange={(e) => updateField('unitFloor', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Tower / Block / Building</label>
                    <input
                      type="text"
                      value={data.unitTower}
                      onFocus={() => setActiveField('unitTower')} onChange={(e) => updateField('unitTower', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Carpet Area (Sq. Feet)</label>
                    <input
                      type="text"
                      value={data.unitCarpetArea}
                      onFocus={() => setActiveField('unitCarpetArea')} onChange={(e) => updateField('unitCarpetArea', e.target.value)}
                    />
                  </div>
                </div>
              </>
            ) : (
              <div className="form-group row-2">
                <div>
                  <label>Plot Number</label>
                  <input
                    type="text"
                    value={data.plotNo}
                    onFocus={() => setActiveField('plotNo')} onChange={(e) => updateField('plotNo', e.target.value)}
                  />
                </div>
                <div>
                  <label>Plot Area (Sq. Feet)</label>
                  <input
                    type="text"
                    value={data.plotArea}
                    onFocus={() => setActiveField('plotArea')} onChange={(e) => updateField('plotArea', e.target.value)}
                  />
                </div>
              </div>
            )} */}


            <h3 className="section-title" style={{ marginTop: '1rem' }}>Pricing Breakdown</h3>
            <div className="form-group row-2">

              <div>
                <label>Total Price (Rs)</label>
                <input
                  type="text"
                  value={data.totalPrice}
                  onFocus={() => setActiveField('totalPrice')} onChange={(e) => updateField('totalPrice', e.target.value)}
                />
              </div>
              <div>
                <label>Total Price (In Words)</label>
                <input
                  type="text"
                  value={data.totalPriceWords}
                  onFocus={() => setActiveField('totalPriceWords')} onChange={(e) => updateField('totalPriceWords', e.target.value)}
                />
              </div>
            </div>
            {/* <div className="form-group">

              <div>
                <label>Rate Per Sq. Feet (Rs)</label>
                <input
                  type="text"
                  value={data.ratePerSqFt}
                  onFocus={() => setActiveField('ratePerSqFt')} onChange={(e) => updateField('ratePerSqFt', e.target.value)}
                />
              </div>
              
              
            </div> */}


            {/* Custom pricing breakdown list */}
            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <label style={{ fontWeight: '600' }}>Breakup of Amounts</label>
                <button className="btn-secondary" onClick={addPriceBreakdown} style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                  <Plus size={12} /> Add Breakdown Row
                </button>
              </div>
              <div className="list-container" style={{ padding: '0.5rem' }}>
                {data.priceBreakdown.map((row) => (
                  <div key={row.id} className="list-item" style={{ padding: '0.5rem', gap: '0.4rem', border: '1px solid var(--border-ui)' }}>
                    <div style={{ display: 'flex', flex: 1, gap: '0.4rem' }}>
                      <div style={{ flex: 2 }}>
                        <label style={{ fontSize: '0.7rem' }}>Description</label>
                        <input style={{ padding: '0.35rem' }} type="text" value={row.description} onFocus={() => setActiveField('priceBreakdown')} onChange={(e) => updatePriceBreakdown(row.id, 'description', e.target.value)} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.7rem' }}>Amount (Rs)</label>
                        <input style={{ padding: '0.35rem' }} type="text" value={row.amount} onFocus={() => setActiveField('priceBreakdown')} onChange={(e) => updatePriceBreakdown(row.id, 'amount', formatDecimalNumber(e.target.value))} />
                      </div>
                    </div>
                    <button className="btn-danger" onClick={() => removePriceBreakdown(row.id)} style={{ padding: '0.4rem' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* TAB SWITCH: Garage vs Plot Pricing */}
            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <div className="toggle-group">
                <button
                  className={`toggle-btn ${unitPricingTab === 'garage' ? 'active' : ''}`}
                  onClick={() => setUnitPricingTab('garage')}
                >
                  Garages / Closed Parking Slots
                </button>
                <button
                  className={`toggle-btn ${unitPricingTab === 'plot' ? 'active' : ''}`}
                  onClick={() => setUnitPricingTab('plot')}
                >
                  Plot No. / Type
                </button>
              </div>
            </div>

            {/* TAB PANEL: Garages */}
            {unitPricingTab === 'garage' && (
              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{ fontWeight: '600' }}>Garages / Closed Parking Slots</label>
                  <button className="btn-secondary" onClick={addGarage} style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                    <Plus size={12} /> Add Garage
                  </button>
                </div>
                <div className="list-container" style={{ padding: '0.5rem' }}>
                  {data.garageDetails.length === 0 ? (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>No parking slots allotted.</span>
                  ) : (
                    data.garageDetails.map((g, idx) => (
                      <div key={g.id} className="list-item" style={{ padding: '0.5rem', gap: '0.4rem', border: '1px solid var(--border-ui)' }}>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label style={{ fontSize: '0.7rem' }}>Price (Rs) - Garage {idx + 1}</label>
                          <input style={{ padding: '0.35rem' }} type="text" value={g.price} onFocus={() => setActiveField('garagePrice')} onChange={(e) => updateGarage(g.id, 'price', formatDecimalNumber(e.target.value))} />
                        </div>
                        <button className="btn-danger" onClick={() => removeGarage(g.id)} style={{ padding: '0.4rem' }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* TAB PANEL: Plot Pricing */}
            {unitPricingTab === 'plot' && (
              <div className="form-group" style={{ marginTop: '0.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                  <label style={{ fontWeight: '600' }}>Plot No. / Type</label>
                  <button className="btn-secondary" onClick={addPlotPricing} style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                    <Plus size={12} /> Add Plot
                  </button>
                </div>
                <div className="list-container" style={{ padding: '0.5rem' }}>
                  {data.plotPricing.length === 0 ? (
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>No plots added.</span>
                  ) : (
                    data.plotPricing.map((p, idx) => (
                      <div key={p.id} className="list-item" style={{ padding: '0.5rem', gap: '0.4rem', border: '1px solid var(--border-ui)' }}>
                        <div className="form-group row-2" style={{ flex: 1, gap: '0.4rem' }}>
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>Plot No. / Type</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="text"
                              value={p.plotNoType}
                              onFocus={() => setActiveField('plotPricing')}
                              onChange={(e) => updatePlotPricing(p.id, 'plotNoType', e.target.value)}
                              placeholder="e.g. Plot No. 12, Residential"
                            />
                          </div>
                          <div>
                            <label style={{ fontSize: '0.7rem' }}>Rate of Plot per Sq. Feet</label>
                            <input
                              style={{ padding: '0.35rem' }}
                              type="text"
                              value={p.ratePerSqFt}
                              onFocus={() => setActiveField('plotPricing')}
                              onChange={(e) => updatePlotPricing(p.id, 'ratePerSqFt', formatDecimalNumber(e.target.value))}
                              placeholder="e.g. 2500"
                            />
                          </div>
                        </div>
                        <button className="btn-danger" onClick={() => removePlotPricing(p.id)} style={{ padding: '0.4rem' }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            <div className="form-group row-2">
              <div>
                <label>Early Payment Rebate (% p.a.)</label>
                <input
                  type="text"
                  value={data.earlyPaymentRebate}
                  onFocus={() => setActiveField('earlyPaymentRebate')} onChange={(e) => updateField('earlyPaymentRebate', formatDecimalNumber(e.target.value))}
                />
              </div>
              <div>
                <label>Delay Interest Rate (% p.a.)</label>
                <input
                  type="text"
                  value={data.delayInterestRate}
                  onFocus={() => setActiveField('delayInterestRate')} onChange={(e) => updateField('delayInterestRate', formatDecimalNumber(e.target.value))}
                />
              </div>
            </div>


            <h3 className="section-title" style={{ marginTop: '1rem' }}>Terms 1.10</h3>
            <div className="form-group">
              <label>Facilities outside the Project (namely...)</label>
              <input
                type="text"
                value={data.facilitiesOutsideProject}
                onFocus={() => setActiveField('facilitiesOutsideProject')} onChange={(e) => updateField('facilitiesOutsideProject', e.target.value)}
                placeholder="e.g. Club House, Park"
              />
            </div>
            <div className="form-group row-2">
              <div>
                <label>Competent Authority </label>
                <input
                  type="text"
                  value={data.competentAuthorityForDeclaration}
                  onFocus={() => setActiveField('competentAuthorityForDeclaration')} onChange={(e) => updateField('competentAuthorityForDeclaration', e.target.value)}
                />
              </div>
              <div>
                <label>Relevant State Act</label>
                <input
                  type="text"
                  value={data.relevantStateAct}
                  onFocus={() => setActiveField('relevantStateAct')} onChange={(e) => updateField('relevantStateAct', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row-2">
              <div>
                <label>Booking Amount (Rs)</label>
                <input
                  type="text"
                  value={data.bookingAmount}
                  onFocus={() => setActiveField('bookingAmount')} onChange={(e) => updateField('bookingAmount', formatDecimalNumber(e.target.value))}
                />
              </div>
              <div>
                <label>Booking Amount (In Words)</label>
                <input
                  type="text"
                  value={data.bookingAmountWords}
                  onFocus={() => setActiveField('bookingAmountWords')} onChange={(e) => updateField('bookingAmountWords', e.target.value)}
                />
              </div>
            </div>





            <h3 className="section-title" style={{ marginTop: '1rem' }}>Mode of Payment</h3>
            <div className="form-group row-2">
              <div>
                <label>Payment in favour of</label>
                <input
                  type="text"
                  value={data.paymentFavourOf}
                  onFocus={() => setActiveField('paymentFavourOf')} onChange={(e) => updateField('paymentFavourOf', e.target.value)}
                />
              </div>
              <div>
                <label>Payable at</label>
                <input
                  type="text"
                  value={data.paymentPayableAt}
                  onFocus={() => setActiveField('paymentPayableAt')} onChange={(e) => updateField('paymentPayableAt', e.target.value)}
                />
              </div>
            </div>






          </div>
        )}

        {/* STEP 6: PAYMENT PLAN & TERMS */}
        {activeStep === 6 && (
          <div className="form-section">
            <h3 className="section-title">Terms & Rates</h3>

            <div className="form-group">
              <label>Laws Prescribing Norms (Clause 6)</label>
              <input
                type="text"
                value={data.prescribedByLaws}
                onFocus={() => setActiveField('prescribedByLaws')} onChange={(e) => updateField('prescribedByLaws', e.target.value)}
                placeholder="e.g. State Government"
              />
            </div>

            <div className="form-group row-2">
              <div>
                <label>Target Possession Month</label>
                <input
                  type="text"
                  value={data.possessionTargetMonth}
                  onFocus={() => setActiveField('possessionTargetMonth')} onChange={(e) => updateField('possessionTargetMonth', e.target.value)}
                  placeholder="e.g. December 2027"
                />
              </div>
              <div>
                <label>Grace Period (Days)</label>
                <input
                  type="number"
                  value={data.gracePeriodDays}
                  onFocus={() => setActiveField('gracePeriodDays')} onChange={(e) => updateField('gracePeriodDays', e.target.value)}
                />
              </div>
            </div>

            <h3 className="section-title" style={{ marginTop: '1rem' }}>Default Conditions</h3>
            <div className="form-group row-2">
              <div>
                <label>Consecutive unpaid demands (Count)</label>
                <input
                  type="text"
                  value={data.defaultConsecutiveDemands}
                  onFocus={() => setActiveField('defaultConsecutiveDemands')} onChange={(e) => updateField('defaultConsecutiveDemands', e.target.value)}
                  placeholder="e.g. three"
                />
              </div>
              <div>
                <label>Consecutive unpaid months (Count)</label>
                <input
                  type="text"
                  value={data.defaultConsecutiveMonths}
                  onFocus={() => setActiveField('defaultConsecutiveMonths')} onChange={(e) => updateField('defaultConsecutiveMonths', e.target.value)}
                  placeholder="e.g. three"
                />
              </div>
            </div>


            <h3 className="section-title" style={{ marginTop: '1rem' }}>Maintenance Clauses</h3>
            <div className="form-group">
              <label>Additional Maintenance Clauses</label>
              <textarea
                value={data.maintenanceClauses}
                onFocus={() => setActiveField('maintenanceClauses')} onChange={(e) => updateField('maintenanceClauses', e.target.value)}
                rows={3}
                placeholder="(Insert any other clauses in relation to maintenance of project, infrastructure and equipment)"
              />
            </div>


            <h3 className="section-title" style={{ marginTop: '1rem' }}>State Legislation References</h3>

            <div className="form-group row-1">
              <div>
                <label>Basement and Service Areas Location</label>
                <input
                  type="text"
                  value={data.basementLocation}
                  onFocus={() => setActiveField('basementLocation')} onChange={(e) => updateField('basementLocation', e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row-1">
              <div>
                <label>Apartment Ownership Act (State specific)</label>
                <input
                  type="text"
                  value={data.apartmentOwnershipAct}
                  onFocus={() => setActiveField('apartmentOwnershipAct')} onChange={(e) => updateField('apartmentOwnershipAct', e.target.value)}
                />
              </div>
            </div>

            <h3 className="section-title" style={{ marginTop: '1rem' }}>Additional Terms</h3>

            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <label>Other Terms & Conditions (Optional)</label>
              <textarea
                value={data.additionalTerms}
                onFocus={() => setActiveField('additionalTerms')} onChange={(e) => updateField('additionalTerms', e.target.value)}
                rows={4}
                placeholder="(Please insert any other terms and conditions as per the contractual understanding between the parties...)"
              />
            </div>
          </div>
        )}

        {/* STEP 7: WITNESSES & ACTS */}
        {activeStep === 7 && (
          <div className="form-section">
            <h3 className="section-title">Witnesses Details</h3>

            <div className="list-container" style={{ padding: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <label>Witness List</label>
                <button className="btn-secondary" onClick={addWitness} style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                  <Plus size={12} /> Add Witness
                </button>
              </div>

              {data.witnesses.map((w, idx) => (
                <div key={w.id} className="list-item" style={{ flexDirection: 'column', alignItems: 'stretch', padding: '0.5rem', border: '1px solid var(--border-ui)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 'bold' }}>Witness #{idx + 1}</span>
                    <button className="btn-danger" onClick={() => removeWitness(w.id)} style={{ padding: '2px 6px' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                  <div className="form-group">
                    <label style={{ fontSize: '0.7rem' }}>Full Name</label>
                    <input style={{ padding: '0.35rem' }} type="text" value={w.name} onFocus={() => setActiveField('witnesses')} onChange={(e) => updateWitness(w.id, 'name', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginTop: '0.25rem' }}>
                    <label style={{ fontSize: '0.7rem' }}>Residential Address</label>
                    <input style={{ padding: '0.35rem' }} type="text" value={w.address} onFocus={() => setActiveField('witnesses')} onChange={(e) => updateWitness(w.id, 'address', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* STEP 8: SCHEDULES */}
          {activeStep === 8 && (
            <div className="form-section">
              <h3 className="section-title">Schedule Attachments</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Upload PDF files for each schedule. These will be appended to the end of the final agreement PDF.
              </p>

              {(['scheduleA', 'scheduleB', 'scheduleC', 'scheduleD'] as const).map((slot, idx) => {
                const label = `Schedule ${String.fromCharCode(65 + idx)}`; 
                const currentUrl = data[slot];
                const isUploading = uploadingSchedule[slot];

                return (
                  <div key={slot} className="form-group" style={{ marginBottom: '1rem' }}>
                    <label>{label}</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <input
                        type="file"
                        accept="application/pdf,.pdf"
                        disabled={isUploading}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) uploadScheduleFile(slot, file);
                          e.target.value = ''; 
                        }}
                      />
                      {isUploading && <RefreshCw size={16} className="spin" />}
                    </div>
                    {currentUrl && !isUploading && (
                      <div style={{ marginTop: '0.4rem', fontSize: '0.8rem' }}>
                        <a href={currentUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-gold)' }}>
                          View uploaded PDF
                        </a>
                        <button
                          onClick={() => updateField(slot, '')}
                          className="btn-danger"
                          style={{ marginLeft: '0.75rem', padding: '2px 8px', fontSize: '0.7rem' }}
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}


      </div>

      <div className="form-footer">
        <button
          className="btn-secondary"
          onClick={handleBack}
          disabled={activeStep === steps[0].id}
          style={{ opacity: activeStep === steps[0].id ? 0.4 : 1 }}
        >
          <ChevronLeft size={16} /> Back
        </button>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button
            className="btn-secondary"
            onClick={resetCurrentStep}
            style={{ borderColor: '#ef4444', color: '#ef4444', backgroundColor: 'transparent' }}
          >
            Reset Page
          </button>

          <button className="btn-primary" onClick={onSave} disabled={isSaving} style={{ opacity: isSaving ? 0.7 : 1 }}>
            {
              isSaving ? (<><RefreshCw size={16} /> Saving...</>) : isSaved ? (
                <> Saved</>) : (
                <> Save Agreement</>
              )}
          </button>
        </div>

        <button
          className="btn-secondary"
          onClick={handleNext}
          disabled={activeStep === steps[steps.length - 1].id}
          style={{ opacity: activeStep === steps[steps.length - 1].id ? 0.4 : 1 }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
