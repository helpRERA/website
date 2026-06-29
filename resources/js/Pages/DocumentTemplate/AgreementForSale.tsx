import React, { useState } from 'react';

import FormPanel from '../../Components/FormPanel/FormPanel';
import PreviewPanel from '../../Components/PreviewPanel/PreviewPanel';
import '../../index.css';
import { useAgreementData } from '../../hooks/useAgreementData';

import { Edit, FileText } from 'lucide-react';


function AgreementForSale(): React.ReactElement {


  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeView, setActiveView] =
    useState<'form' | 'preview'>('form');
  const {
    data,
    updateField,
    updateNestedField,
    resetData

  } = useAgreementData();

  return (
    <div
      className={`app-container view-${activeView}`}
    >
      <div className="view-toggle-bar">
        <button
          className={
            `toggle-view-btn 
                ${activeView === 'form' ? 'active' : ''}`
          }
          onClick={() =>
            setActiveView('form')
          }
        >
        <Edit size={16} />
          Edit Details
        </button>
        <button
          className={
            `toggle-view-btn 
                ${activeView === 'preview' ? 'active' : ''}`
          }
          onClick={() =>
            setActiveView('preview')
          }
        >
          <FileText size={16} />View Document
        </button>
      </div>
      <FormPanel 
        activeStep={activeStep} 
        setActiveStep={setActiveStep}  
        data={data}
        updateField={updateField}
        updateNestedField={updateNestedField}
        resetData={resetData}/>

      <PreviewPanel
        data={data}
        resetData={resetData}
        activeStep={activeStep} 
      />
    </div>
  );
}
export default AgreementForSale;