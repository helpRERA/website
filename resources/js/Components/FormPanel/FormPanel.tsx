import React from 'react';
import { Plus, Trash2, ChevronRight, ChevronLeft } from 'lucide-react';
import { AgreementData, JointAllottee, GarageDetail, PriceBreakdownRow, PaymentMilestone, WitnessRow } from '../../hooks/useAgreementData';

interface FormPanelProps {
  activeStep: number;
  setActiveStep: (step: number) => void;
  data: AgreementData;
  updateField: (field: keyof AgreementData, value: any) => void;
  updateNestedField: (parentField: keyof AgreementData, field: string, value: any) => void;
  resetData: () => void;
}

export default function FormPanel({ activeStep, setActiveStep, data, updateField, updateNestedField, resetData }: FormPanelProps) {
  const steps = [
    { id: 0, label: 'Execution' },
    { id: 1, label: 'Promoter' },
    { id: 2, label: 'Allottee' },
    { id: 3, label: 'Property & Project' },
    { id: 4, label: 'Approvals' },
    { id: 5, label: 'Unit & Pricing' },
    { id: 6, label: 'Payment Plan' },
    { id: 7, label: 'Witnesses' }
  ];

  const handleNext = () => {
    if (activeStep < steps.length - 1) setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep(activeStep - 1);
  };

  // Helper for adding to lists
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
    const newBreakdown: PriceBreakdownRow[] = [
      ...data.priceBreakdown,
      { id: Date.now(), description: '', amount: '' }
    ];
    updateField('priceBreakdown', newBreakdown);
  };

  const removePriceBreakdown = (id: number) => {
    const newBreakdown = data.priceBreakdown.filter(b => b.id !== id);
    updateField('priceBreakdown', newBreakdown);
  };

  const updatePriceBreakdown = (id: number, field: keyof Omit<PriceBreakdownRow, 'id'>, value: string) => {
    const newBreakdown = data.priceBreakdown.map(b => {
      if (b.id === id) {
        return { ...b, [field]: value };
      }
      return b;
    });
    updateField('priceBreakdown', newBreakdown);
  };

  const addMilestone = () => {
    const newPlan: PaymentMilestone[] = [
      ...data.paymentPlan,
      { id: Date.now(), description: '', percentage: '', amount: '' }
    ];
    updateField('paymentPlan', newPlan);
  };

  const removeMilestone = (id: number) => {
    const newPlan = data.paymentPlan.filter(m => m.id !== id);
    updateField('paymentPlan', newPlan);
  };

  const updateMilestone = (id: number, field: keyof Omit<PaymentMilestone, 'id'>, value: string) => {
    const newPlan = data.paymentPlan.map(m => {
      if (m.id === id) {
        return { ...m, [field]: value };
      }
      return m;
    });
    updateField('paymentPlan', newPlan);
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
    const newWitnesses: WitnessRow[] = [
      ...data.witnesses,
      { id: Date.now(), name: '', address: '' }
    ];
    updateField('witnesses', newWitnesses);
  };

  const removeWitness = (id: number) => {
    const newWitnesses = data.witnesses.filter(w => w.id !== id);
    updateField('witnesses', newWitnesses);
  };

  const updateWitness = (id: number, field: keyof Omit<WitnessRow, 'id'>, value: string) => {
    const newWitnesses = data.witnesses.map(w => {
      if (w.id === id) {
        return { ...w, [field]: value };
      }
      return w;
    });
    updateField('witnesses', newWitnesses);
  };

  return (
    <div className="form-panel">
      <div className="form-header">
        <div className="logo-container">
          <span style={{ fontSize: '1.8rem', marginRight: '0.2rem' }}>⚖️</span>
          <div>
            <h1>K-RERA Doc Generator</h1>
            <p>Agreement for Sale Builder (Annexure 'A')</p>
          </div>
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

      <div className="form-content">
        {/* STEP 0: EXECUTION DETAILS */}
        {activeStep === 0 && (
          <div className="form-section">
            <h3 className="section-title">Agreement Execution</h3>
            <div className="form-group">
              <label>Execution Place / City</label>
              <input 
                type="text" 
                value={data.executionPlace} 
                onChange={(e) => updateField('executionPlace', e.target.value)} 
                placeholder="e.g. Thiruvananthapuram"
              />
            </div>
            <div className="form-group row-3">
              <div>
                <label>Day of Month</label>
                <input 
                  type="text" 
                  value={data.dateDay} 
                  onChange={(e) => updateField('dateDay', e.target.value)} 
                  placeholder="e.g. 23rd"
                />
              </div>
              <div>
                <label>Month</label>
                <input 
                  type="text" 
                  value={data.dateMonth} 
                  onChange={(e) => updateField('dateMonth', e.target.value)} 
                  placeholder="e.g. June"
                />
              </div>
              <div>
                <label>Year</label>
                <input 
                  type="text" 
                  value={data.dateYear} 
                  onChange={(e) => updateField('dateYear', e.target.value)} 
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
                    onChange={(e) => updateNestedField('promoterCompany', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>CIN</label>
                    <input 
                      type="text" 
                      value={data.promoterCompany.cin} 
                      onChange={(e) => updateNestedField('promoterCompany', 'cin', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>PAN</label>
                    <input 
                      type="text" 
                      value={data.promoterCompany.pan} 
                      onChange={(e) => updateNestedField('promoterCompany', 'pan', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Registered Office Address</label>
                  <textarea 
                    rows={2}
                    value={data.promoterCompany.registeredOffice} 
                    onChange={(e) => updateNestedField('promoterCompany', 'registeredOffice', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Authorized Signatory</label>
                    <input 
                      type="text" 
                      value={data.promoterCompany.authorizedSignatory} 
                      onChange={(e) => updateNestedField('promoterCompany', 'authorizedSignatory', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Aadhaar No</label>
                    <input 
                      type="text" 
                      value={data.promoterCompany.signatoryAadhaar} 
                      onChange={(e) => updateNestedField('promoterCompany', 'signatoryAadhaar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Board Resolution Date</label>
                  <input 
                    type="text" 
                    value={data.promoterCompany.boardResolutionDate} 
                    onChange={(e) => updateNestedField('promoterCompany', 'boardResolutionDate', e.target.value)}
                    placeholder="DD/MM/YYYY"
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
                    onChange={(e) => updateNestedField('promoterPartnership', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Principal Place of Business</label>
                  <textarea 
                    rows={2}
                    value={data.promoterPartnership.businessPlace} 
                    onChange={(e) => updateNestedField('promoterPartnership', 'businessPlace', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>PAN</label>
                  <input 
                    type="text" 
                    value={data.promoterPartnership.pan} 
                    onChange={(e) => updateNestedField('promoterPartnership', 'pan', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Represented by Partner</label>
                    <input 
                      type="text" 
                      value={data.promoterPartnership.authorizedPartner} 
                      onChange={(e) => updateNestedField('promoterPartnership', 'authorizedPartner', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Partner Aadhaar No</label>
                    <input 
                      type="text" 
                      value={data.promoterPartnership.partnerAadhaar} 
                      onChange={(e) => updateNestedField('promoterPartnership', 'partnerAadhaar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Authorized Vide (Document details)</label>
                  <input 
                    type="text" 
                    value={data.promoterPartnership.authorizedVide} 
                    onChange={(e) => updateNestedField('promoterPartnership', 'authorizedVide', e.target.value)}
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
                    onChange={(e) => updateNestedField('promoterIndividual', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Aadhaar No</label>
                    <input 
                      type="text" 
                      value={data.promoterIndividual.aadhaar} 
                      onChange={(e) => updateNestedField('promoterIndividual', 'aadhaar', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>PAN</label>
                    <input 
                      type="text" 
                      value={data.promoterIndividual.pan} 
                      onChange={(e) => updateNestedField('promoterIndividual', 'pan', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row-3">
                  <div>
                    <label>Parent Relationship</label>
                    <select 
                      value={data.promoterIndividual.parentType} 
                      onChange={(e) => updateNestedField('promoterIndividual', 'parentType', e.target.value)}
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
                      onChange={(e) => updateNestedField('promoterIndividual', 'parentName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Age (Years)</label>
                  <input 
                    type="number" 
                    value={data.promoterIndividual.age} 
                    onChange={(e) => updateNestedField('promoterIndividual', 'age', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Residential Address</label>
                  <textarea 
                    rows={2}
                    value={data.promoterIndividual.residing} 
                    onChange={(e) => updateNestedField('promoterIndividual', 'residing', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* STEP 2: ALLOTTEE DETAILS */}
        {activeStep === 2 && (
          <div className="form-section">
            <h3 className="section-title">Allottee Details</h3>
            <div className="form-group">
              <label>Allottee Type</label>
              <div className="toggle-group">
                <button 
                  className={`toggle-btn ${data.allotteeType === 'individual' ? 'active' : ''}`}
                  onClick={() => updateField('allotteeType', 'individual')}
                >
                  Individual
                </button>
                <button 
                  className={`toggle-btn ${data.allotteeType === 'company' ? 'active' : ''}`}
                  onClick={() => updateField('allotteeType', 'company')}
                >
                  Company
                </button>
                <button 
                  className={`toggle-btn ${data.allotteeType === 'partnership' ? 'active' : ''}`}
                  onClick={() => updateField('allotteeType', 'partnership')}
                >
                  Partnership
                </button>
                <button 
                  className={`toggle-btn ${data.allotteeType === 'huf' ? 'active' : ''}`}
                  onClick={() => updateField('allotteeType', 'huf')}
                >
                  HUF
                </button>
              </div>
            </div>

            {/* Individual Allottee */}
            {data.allotteeType === 'individual' && (
              <>
                <div className="form-group">
                  <label>Allottee Name</label>
                  <input 
                    type="text" 
                    value={data.allotteeIndividual.name} 
                    onChange={(e) => updateNestedField('allotteeIndividual', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Aadhaar No</label>
                    <input 
                      type="text" 
                      value={data.allotteeIndividual.aadhaar} 
                      onChange={(e) => updateNestedField('allotteeIndividual', 'aadhaar', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>PAN</label>
                    <input 
                      type="text" 
                      value={data.allotteeIndividual.pan} 
                      onChange={(e) => updateNestedField('allotteeIndividual', 'pan', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row-3">
                  <div>
                    <label>Relationship</label>
                    <select 
                      value={data.allotteeIndividual.parentType} 
                      onChange={(e) => updateNestedField('allotteeIndividual', 'parentType', e.target.value)}
                    >
                      <option value="son">Son of</option>
                      <option value="daughter">Daughter of</option>
                      <option value="wife">Wife of</option>
                    </select>
                  </div>
                  <div style={{ gridColumn: 'span 2' }}>
                    <label>Parent/Spouse Name</label>
                    <input 
                      type="text" 
                      value={data.allotteeIndividual.parentName} 
                      onChange={(e) => updateNestedField('allotteeIndividual', 'parentName', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Age (Years)</label>
                    <input 
                      type="number" 
                      value={data.allotteeIndividual.age} 
                      onChange={(e) => updateNestedField('allotteeIndividual', 'age', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Residential Address</label>
                  <textarea 
                    rows={2}
                    value={data.allotteeIndividual.residing} 
                    onChange={(e) => updateNestedField('allotteeIndividual', 'residing', e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Company Allottee */}
            {data.allotteeType === 'company' && (
              <>
                <div className="form-group">
                  <label>Company Name</label>
                  <input 
                    type="text" 
                    value={data.allotteeCompany.name} 
                    onChange={(e) => updateNestedField('allotteeCompany', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>CIN</label>
                    <input 
                      type="text" 
                      value={data.allotteeCompany.cin} 
                      onChange={(e) => updateNestedField('allotteeCompany', 'cin', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>PAN</label>
                    <input 
                      type="text" 
                      value={data.allotteeCompany.pan} 
                      onChange={(e) => updateNestedField('allotteeCompany', 'pan', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Registered Office Address</label>
                  <textarea 
                    rows={2}
                    value={data.allotteeCompany.registeredOffice} 
                    onChange={(e) => updateNestedField('allotteeCompany', 'registeredOffice', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Authorized Signatory</label>
                    <input 
                      type="text" 
                      value={data.allotteeCompany.authorizedSignatory} 
                      onChange={(e) => updateNestedField('allotteeCompany', 'authorizedSignatory', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Aadhaar No</label>
                    <input 
                      type="text" 
                      value={data.allotteeCompany.signatoryAadhaar} 
                      onChange={(e) => updateNestedField('allotteeCompany', 'signatoryAadhaar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Board Resolution Date</label>
                  <input 
                    type="text" 
                    value={data.allotteeCompany.boardResolutionDate} 
                    onChange={(e) => updateNestedField('allotteeCompany', 'boardResolutionDate', e.target.value)}
                    placeholder="DD/MM/YYYY"
                  />
                </div>
              </>
            )}

            {/* Partnership Allottee */}
            {data.allotteeType === 'partnership' && (
              <>
                <div className="form-group">
                  <label>Partnership Firm Name</label>
                  <input 
                    type="text" 
                    value={data.allotteePartnership.name} 
                    onChange={(e) => updateNestedField('allotteePartnership', 'name', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Principal Place of Business</label>
                  <textarea 
                    rows={2}
                    value={data.allotteePartnership.businessPlace} 
                    onChange={(e) => updateNestedField('allotteePartnership', 'businessPlace', e.target.value)}
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>PAN</label>
                    <input 
                      type="text" 
                      value={data.allotteePartnership.pan} 
                      onChange={(e) => updateNestedField('allotteePartnership', 'pan', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Represented by Partner</label>
                    <input 
                      type="text" 
                      value={data.allotteePartnership.authorizedPartner} 
                      onChange={(e) => updateNestedField('allotteePartnership', 'authorizedPartner', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Partner Aadhaar No</label>
                    <input 
                      type="text" 
                      value={data.allotteePartnership.partnerAadhaar} 
                      onChange={(e) => updateNestedField('allotteePartnership', 'partnerAadhaar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Authorized Vide</label>
                  <input 
                    type="text" 
                    value={data.allotteePartnership.authorizedVide} 
                    onChange={(e) => updateNestedField('allotteePartnership', 'authorizedVide', e.target.value)}
                  />
                </div>
              </>
            )}

            {/* HUF Allottee */}
            {data.allotteeType === 'huf' && (
              <>
                <div className="form-group row-2">
                  <div>
                    <label>Karta Name</label>
                    <input 
                      type="text" 
                      value={data.allotteeHuf.kartaName} 
                      onChange={(e) => updateNestedField('allotteeHuf', 'kartaName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Karta Aadhaar No</label>
                    <input 
                      type="text" 
                      value={data.allotteeHuf.kartaAadhaar} 
                      onChange={(e) => updateNestedField('allotteeHuf', 'kartaAadhaar', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Son of</label>
                    <input 
                      type="text" 
                      value={data.allotteeHuf.parentName} 
                      onChange={(e) => updateNestedField('allotteeHuf', 'parentName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>Age</label>
                    <input 
                      type="number" 
                      value={data.allotteeHuf.age} 
                      onChange={(e) => updateNestedField('allotteeHuf', 'age', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>HUF Family Name</label>
                    <input 
                      type="text" 
                      value={data.allotteeHuf.familyName} 
                      onChange={(e) => updateNestedField('allotteeHuf', 'familyName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label>HUF PAN</label>
                    <input 
                      type="text" 
                      value={data.allotteeHuf.pan} 
                      onChange={(e) => updateNestedField('allotteeHuf', 'pan', e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>HUF Place of Business/Residence</label>
                  <textarea 
                    rows={2}
                    value={data.allotteeHuf.place} 
                    onChange={(e) => updateNestedField('allotteeHuf', 'place', e.target.value)}
                  />
                </div>
              </>
            )}

            {/* Joint/Additional Allottees Section */}
            <div className="form-group" style={{ marginTop: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <label style={{ fontWeight: 'bold' }}>Joint/Additional Allottees</label>
                <button className="btn-secondary" onClick={addJointAllottee} style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}>
                  <Plus size={14} /> Add Joint Allottee
                </button>
              </div>

              {data.jointAllottees.length === 0 ? (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem', border: '1px dashed var(--border-ui)', borderRadius: '6px' }}>
                  No joint allottees added. Suitable for single buyer.
                </div>
              ) : (
                <div className="list-container">
                  {data.jointAllottees.map((ja, index) => (
                    <div key={ja.id} className="list-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.8rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-ui)', paddingBottom: '0.25rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--accent-gold)' }}>Allottee #{index + 2}</span>
                        <button className="btn-danger" onClick={() => removeJointAllottee(ja.id)} style={{ padding: '2px 6px' }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div className="form-group row-2">
                        <div>
                          <label>Full Name</label>
                          <input 
                            type="text" 
                            value={ja.name} 
                            onChange={(e) => updateJointAllottee(ja.id, 'name', e.target.value)} 
                          />
                        </div>
                        <div>
                          <label>Aadhaar</label>
                          <input 
                            type="text" 
                            value={ja.aadhaar} 
                            onChange={(e) => updateJointAllottee(ja.id, 'aadhaar', e.target.value)} 
                          />
                        </div>
                      </div>
                      <div className="form-group row-3">
                        <div>
                          <label>Relationship</label>
                          <select 
                            value={ja.parentType} 
                            onChange={(e) => updateJointAllottee(ja.id, 'parentType', e.target.value as any)}
                          >
                            <option value="son">Son of</option>
                            <option value="daughter">Daughter of</option>
                            <option value="wife">Wife of</option>
                          </select>
                        </div>
                        <div style={{ gridColumn: 'span 2' }}>
                          <label>Parent Name</label>
                          <input 
                            type="text" 
                            value={ja.parentName} 
                            onChange={(e) => updateJointAllottee(ja.id, 'parentName', e.target.value)} 
                          />
                        </div>
                      </div>
                      <div className="form-group row-2">
                        <div>
                          <label>Age</label>
                          <input 
                            type="number" 
                            value={ja.age} 
                            onChange={(e) => updateJointAllottee(ja.id, 'age', e.target.value)} 
                          />
                        </div>
                        <div>
                          <label>PAN</label>
                          <input 
                            type="text" 
                            value={ja.pan} 
                            onChange={(e) => updateJointAllottee(ja.id, 'pan', e.target.value)} 
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Residential Address</label>
                        <textarea 
                          rows={2} 
                          value={ja.residing} 
                          onChange={(e) => updateJointAllottee(ja.id, 'residing', e.target.value)} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* STEP 3: PROPERTY & RECITALS */}
        {activeStep === 3 && (
          <div className="form-section">
            <h3 className="section-title">Land & Project Details</h3>
            <div className="form-group row-2">
              <div>
                <label>Survey Numbers</label>
                <input 
                  type="text" 
                  value={data.landSurveyNos} 
                  onChange={(e) => updateField('landSurveyNos', e.target.value)} 
                  placeholder="e.g. 101/2, 101/3"
                />
              </div>
              <div>
                <label>Land Area (Sq. Meters)</label>
                <input 
                  type="text" 
                  value={data.landAdmeasuring} 
                  onChange={(e) => updateField('landAdmeasuring', e.target.value)} 
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
                  onChange={(e) => updateField('landSituatedAt', e.target.value)} 
                  placeholder="e.g. Pattom"
                />
              </div>
              <div>
                <label>Tehsil & District</label>
                <input 
                  type="text" 
                  value={data.landTehsilDistrict} 
                  onChange={(e) => updateField('landTehsilDistrict', e.target.value)} 
                  placeholder="e.g. Thiruvananthapuram"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Land Ownership Type</label>
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

            {data.landOwnershipType === 'developer' && (
              <div className="list-container">
                <label style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>Joint Development Agreement Details</label>
                <div className="form-group">
                  <label>Absolute Owner Name</label>
                  <input 
                    type="text" 
                    value={data.landJDA.ownerName} 
                    onChange={(e) => updateNestedField('landJDA', 'ownerName', e.target.value)} 
                  />
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>JDA Execution Date</label>
                    <input 
                      type="text" 
                      value={data.landJDA.jdaDate} 
                      onChange={(e) => updateNestedField('landJDA', 'jdaDate', e.target.value)} 
                  />
                  </div>
                  <div>
                    <label>JDA Registered Doc No</label>
                    <input 
                      type="text" 
                      value={data.landJDA.regNo} 
                      onChange={(e) => updateNestedField('landJDA', 'regNo', e.target.value)} 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Sub-Registrar Office where registered</label>
                  <input 
                    type="text" 
                    value={data.landJDA.subRegistrarOffice} 
                    onChange={(e) => updateNestedField('landJDA', 'subRegistrarOffice', e.target.value)} 
                  />
                </div>
              </div>
            )}

            <h3 className="section-title" style={{ marginTop: '1rem' }}>Project Details</h3>
            <div className="form-group row-2">
              <div>
                <label>Project Type</label>
                <select 
                  value={data.projectType} 
                  onChange={(e) => updateField('projectType', e.target.value as any)}
                >
                  <option value="apartment">Building / Apartment</option>
                  <option value="plotted">Plotted Development</option>
                </select>
              </div>
              <div>
                <label>Project Name</label>
                <input 
                  type="text" 
                  value={data.projectName} 
                  onChange={(e) => updateField('projectName', e.target.value)} 
                />
              </div>
            </div>

            {data.projectType === 'apartment' ? (
              <>
                <div className="form-group row-2">
                  <div>
                    <label>Building Type</label>
                    <select 
                      value={data.projectBuildingType} 
                      onChange={(e) => updateField('projectBuildingType', e.target.value as any)}
                    >
                      <option value="residential">Residential</option>
                      <option value="commercial">Commercial</option>
                      <option value="mixed">Mixed Use</option>
                    </select>
                  </div>
                  <div>
                    <label>Project Comprising (Details)</label>
                    <input 
                      type="text" 
                      value={data.projectComprising} 
                      onChange={(e) => updateField('projectComprising', e.target.value)} 
                      placeholder="e.g. multistoried apartment building..."
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Other Components (Amenities)</label>
                  <input 
                    type="text" 
                    value={data.projectOtherComponents} 
                    onChange={(e) => updateField('projectOtherComponents', e.target.value)} 
                    placeholder="e.g. club house, swimming pool..."
                  />
                </div>
              </>
            ) : (
              <div className="form-group">
                <label>Other Components of Plotted Development</label>
                <input 
                  type="text" 
                  value={data.plotOtherComponents} 
                  onChange={(e) => updateField('plotOtherComponents', e.target.value)} 
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
              <label>Commencement Competent Authority</label>
              <input 
                type="text" 
                value={data.commencementAuthority} 
                onChange={(e) => updateField('commencementAuthority', e.target.value)} 
                placeholder="e.g. Municipal Corporation..."
              />
            </div>
            <div className="form-group row-2">
              <div>
                <label>Commencement Certificate No</label>
                <input 
                  type="text" 
                  value={data.commencementNo} 
                  onChange={(e) => updateField('commencementNo', e.target.value)} 
                />
              </div>
              <div>
                <label>Approval Date</label>
                <input 
                  type="text" 
                  value={data.commencementDate} 
                  onChange={(e) => updateField('commencementDate', e.target.value)} 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Layout Plan Approvals Authority</label>
              <input 
                type="text" 
                value={data.layoutAuthority} 
                onChange={(e) => updateField('layoutAuthority', e.target.value)} 
                placeholder="e.g. TRIDA, Town Planner..."
              />
            </div>

            <h3 className="section-title" style={{ marginTop: '1rem' }}>K-RERA Registration</h3>
            <div className="form-group row-2">
              <div>
                <label>RERA Registration Number</label>
                <input 
                  type="text" 
                  value={data.reraRegNo} 
                  onChange={(e) => updateField('reraRegNo', e.target.value)} 
                  placeholder="e.g. K-RERA/PRJ/..."
                />
              </div>
              <div>
                <label>Registration Date</label>
                <input 
                  type="text" 
                  value={data.reraRegDate} 
                  onChange={(e) => updateField('reraRegDate', e.target.value)} 
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: UNIT & PRICING */}
        {activeStep === 5 && (
          <div className="form-section">
            <h3 className="section-title">Allotted Unit details</h3>
            {data.projectType === 'apartment' ? (
              <>
                <div className="form-group row-2">
                  <div>
                    <label>Apartment / Room No</label>
                    <input 
                      type="text" 
                      value={data.unitNo} 
                      onChange={(e) => updateField('unitNo', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label>Floor No</label>
                    <input 
                      type="text" 
                      value={data.unitFloor} 
                      onChange={(e) => updateField('unitFloor', e.target.value)} 
                    />
                  </div>
                </div>
                <div className="form-group row-2">
                  <div>
                    <label>Tower / Block / Building</label>
                    <input 
                      type="text" 
                      value={data.unitTower} 
                      onChange={(e) => updateField('unitTower', e.target.value)} 
                    />
                  </div>
                  <div>
                    <label>Carpet Area (Sq. Feet)</label>
                    <input 
                      type="text" 
                      value={data.unitCarpetArea} 
                      onChange={(e) => updateField('unitCarpetArea', e.target.value)} 
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
                    onChange={(e) => updateField('plotNo', e.target.value)} 
                  />
                </div>
                <div>
                  <label>Plot Area (Sq. Feet)</label>
                  <input 
                    type="text" 
                    value={data.plotArea} 
                    onChange={(e) => updateField('plotArea', e.target.value)} 
                  />
                </div>
              </div>
            )}

            {/* Garage Details List */}
            <div className="form-group" style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                <label style={{ fontWeight: '600' }}>Garages / Closed Parking Slots</label>
                <button className="btn-secondary" onClick={addGarage} style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                  <Plus size={12} /> Add Garage
                </button>
              </div>
              <div className="list-container" style={{ padding: '0.5rem' }}>
                {data.garageDetails.length === 0 ? (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center' }}>No parking slots allotted.</span>
                ) : (
                  data.garageDetails.map((g) => (
                    <div key={g.id} className="list-item" style={{ padding: '0.5rem', gap: '0.4rem', border: '1px solid var(--border-ui)' }}>
                      <div className="form-group row-3" style={{ flex: 1, gap: '0.4rem' }}>
                        <div>
                          <label style={{ fontSize: '0.7rem' }}>Slot No</label>
                          <input style={{ padding: '0.35rem' }} type="text" value={g.no} onChange={(e) => updateGarage(g.id, 'no', e.target.value)} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.7rem' }}>Area (Sq Ft)</label>
                          <input style={{ padding: '0.35rem' }} type="text" value={g.area} onChange={(e) => updateGarage(g.id, 'area', e.target.value)} />
                        </div>
                        <div>
                          <label style={{ fontSize: '0.7rem' }}>Price (Rs)</label>
                          <input style={{ padding: '0.35rem' }} type="text" value={g.price} onChange={(e) => updateGarage(g.id, 'price', e.target.value)} />
                        </div>
                      </div>
                      <button className="btn-danger" onClick={() => removeGarage(g.id)} style={{ padding: '0.4rem' }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <h3 className="section-title" style={{ marginTop: '1rem' }}>Pricing Breakdown</h3>
            <div className="form-group row-2">
              <div>
                <label>Rate Per Sq. Foot (Rs)</label>
                <input 
                  type="text" 
                  value={data.ratePerSqFt} 
                  onChange={(e) => updateField('ratePerSqFt', e.target.value)} 
                />
              </div>
              <div>
                <label>Total Price (Rs)</label>
                <input 
                  type="text" 
                  value={data.totalPrice} 
                  onChange={(e) => updateField('totalPrice', e.target.value)} 
                />
              </div>
            </div>
            <div className="form-group">
              <label>Total Price (In Words)</label>
              <input 
                type="text" 
                value={data.totalPriceWords} 
                onChange={(e) => updateField('totalPriceWords', e.target.value)} 
              />
            </div>

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
                        <input style={{ padding: '0.35rem' }} type="text" value={row.description} onChange={(e) => updatePriceBreakdown(row.id, 'description', e.target.value)} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <label style={{ fontSize: '0.7rem' }}>Amount (Rs)</label>
                        <input style={{ padding: '0.35rem' }} type="text" value={row.amount} onChange={(e) => updatePriceBreakdown(row.id, 'amount', e.target.value)} />
                      </div>
                    </div>
                    <button className="btn-danger" onClick={() => removePriceBreakdown(row.id)} style={{ padding: '0.4rem' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: PAYMENT PLAN & TERMS */}
        {activeStep === 6 && (
          <div className="form-section">
            <h3 className="section-title">Schedule 'C': Payment Plan</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
              <label>Milestones</label>
              <button className="btn-secondary" onClick={addMilestone} style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem' }}>
                <Plus size={12} /> Add Milestone
              </button>
            </div>
            
            <div className="list-container" style={{ padding: '0.5rem' }}>
              {data.paymentPlan.map((m) => (
                <div key={m.id} className="list-item" style={{ padding: '0.5rem', gap: '0.4rem', border: '1px solid var(--border-ui)' }}>
                  <div style={{ display: 'flex', flex: 1, gap: '0.4rem', flexWrap: 'wrap' }}>
                    <div style={{ flex: '2 1 120px' }}>
                      <label style={{ fontSize: '0.7rem' }}>Milestone description</label>
                      <input style={{ padding: '0.35rem' }} type="text" value={m.description} onChange={(e) => updateMilestone(m.id, 'description', e.target.value)} />
                    </div>
                    <div style={{ flex: '1 1 50px' }}>
                      <label style={{ fontSize: '0.7rem' }}>%</label>
                      <input style={{ padding: '0.35rem' }} type="text" value={m.percentage} onChange={(e) => updateMilestone(m.id, 'percentage', e.target.value)} />
                    </div>
                    <div style={{ flex: '1 1 80px' }}>
                      <label style={{ fontSize: '0.7rem' }}>Amount (Rs)</label>
                      <input style={{ padding: '0.35rem' }} type="text" value={m.amount} onChange={(e) => updateMilestone(m.id, 'amount', e.target.value)} />
                    </div>
                  </div>
                  <button className="btn-danger" onClick={() => removeMilestone(m.id)} style={{ padding: '0.4rem' }}>
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
            </div>

            <h3 className="section-title" style={{ marginTop: '1rem' }}>Terms & Rates</h3>
            <div className="form-group row-2">
              <div>
                <label>Early Payment Rebate (% p.a.)</label>
                <input 
                  type="text" 
                  value={data.earlyPaymentRebate} 
                  onChange={(e) => updateField('earlyPaymentRebate', e.target.value)} 
                />
              </div>
              <div>
                <label>Delay Interest Rate (% p.a.)</label>
                <input 
                  type="text" 
                  value={data.delayInterestRate} 
                  onChange={(e) => updateField('delayInterestRate', e.target.value)} 
                />
              </div>
            </div>
            <div className="form-group row-2">
              <div>
                <label>Target Possession Month</label>
                <input 
                  type="text" 
                  value={data.possessionTargetMonth} 
                  onChange={(e) => updateField('possessionTargetMonth', e.target.value)} 
                  placeholder="e.g. December 2027"
                />
              </div>
              <div>
                <label>Grace Period (Days)</label>
                <input 
                  type="number" 
                  value={data.gracePeriodDays} 
                  onChange={(e) => updateField('gracePeriodDays', e.target.value)} 
                />
              </div>
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
                    <input style={{ padding: '0.35rem' }} type="text" value={w.name} onChange={(e) => updateWitness(w.id, 'name', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ marginTop: '0.25rem' }}>
                    <label style={{ fontSize: '0.7rem' }}>Residential Address</label>
                    <input style={{ padding: '0.35rem' }} type="text" value={w.address} onChange={(e) => updateWitness(w.id, 'address', e.target.value)} />
                  </div>
                </div>
              ))}
            </div>

            <h3 className="section-title" style={{ marginTop: '1rem' }}>State Legislation References</h3>
            <div className="form-group">
              <label>Relevant RERA State Rules Act</label>
              <input 
                type="text" 
                value={data.relevantStateAct} 
                onChange={(e) => updateField('relevantStateAct', e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Apartment Ownership Act (State specific)</label>
              <input 
                type="text" 
                value={data.apartmentOwnershipAct} 
                onChange={(e) => updateField('apartmentOwnershipAct', e.target.value)} 
              />
            </div>

            <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'center' }}>
              <button className="btn-secondary" onClick={resetData} style={{ borderColor: '#ef4444', color: '#ef4444', backgroundColor: 'transparent' }}>
                Reset All Fields to Default
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="form-footer">
        <button 
          className="btn-secondary" 
          onClick={handleBack} 
          disabled={activeStep === 0}
          style={{ opacity: activeStep === 0 ? 0.4 : 1 }}
        >
          <ChevronLeft size={16} /> Back
        </button>
        <button 
          className="btn-secondary" 
          onClick={handleNext} 
          disabled={activeStep === steps.length - 1}
          style={{ opacity: activeStep === steps.length - 1 ? 0.4 : 1 }}
        >
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
