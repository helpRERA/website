import React, { useState } from 'react';
import axios from 'axios';
import FormPanel from '../../Components/FormPanel/FormPanel';
import PreviewPanel from '../../Components/PreviewPanel/PreviewPanel';
import { useAgreementData } from '../../hooks/useAgreementData';
import '../../index.css';
import { Edit, FileText } from 'lucide-react';


function App(): React.ReactElement {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeView, setActiveView] = useState<'form' | 'preview'>('form');
  const [activeField, setActiveField] = useState<string | null>(null);
  const { data, updateField, updateNestedField, resetData } = useAgreementData();
  const [agreementId, setAgreementId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);


  // Reset saved state whenever user edits any field
  const handleUpdateField = (field: keyof typeof data, value: any) => {
    setIsSaved(false);
    updateField(field, value);
  };

  const handleUpdateNestedField = (parentField: keyof typeof data, field: string, value: any) => {
    setIsSaved(false);
    updateNestedField(parentField, field, value);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      if (agreementId) {
        await axios.put(`/agreements/${agreementId}`, data);
      } else {
        const response = await axios.post('/agreements', data);
        setAgreementId(response.data.id);
      }
      setIsSaved(true);
    } catch (err) {
      alert('Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`app-container view-${activeView}`}>
      {/* Mobile View Toggle Bar */}
      <div className="view-toggle-bar">
        <button
          className={`toggle-view-btn ${activeView === 'form' ? 'active' : ''}`}
          onClick={() => setActiveView('form')}
        >
          <Edit size={16} /> Edit Details
        </button>
        <button
          className={`toggle-view-btn ${activeView === 'preview' ? 'active' : ''}`}
          onClick={() => setActiveView('preview')}
        >
          <FileText size={16} /> View Document
        </button>
      </div>

         <FormPanel
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          data={data}
          updateField={handleUpdateField}
          updateNestedField={handleUpdateNestedField}
          resetData={resetData}
          setActiveField={setActiveField}
          onSave={handleSave}
          isSaving={isSaving}
          isSaved={isSaved}
        />
      <PreviewPanel
        data={data}
        resetData={resetData}
        activeField={activeField}
        isSaved={isSaved}
      />
    </div>
  );
}

export default App;
