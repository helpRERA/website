import React, { useState, useMemo } from 'react';
import axios from 'axios';
import FormPanel from '../../Components/FormPanel/FormPanel';
import PreviewPanel from '../../Components/PreviewPanel/PreviewPanel';
import { useAgreementData } from '../../hooks/useAgreementData';
import '../../index.css';
import { Edit, FileText } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import { mapAgreementFromServer } from '../../utils/mapAgreementFromServer';



class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: any, errorInfo: any }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    this.setState({ errorInfo });
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#fdd', color: '#900', height: '100vh', overflow: 'auto' }}>
          <h2>Something went wrong in the React App.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Click for error details</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo?.componentStack}
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}

function MainApp({ projectId, userId, agreement }: {
  projectId: string | null;
  userId: string | null;
  agreement: any | null;
}): React.ReactElement {
  
  const [activeStep, setActiveStep] = useState<number>(0);
  const [activeView, setActiveView] = useState<'form' | 'preview'>('form');
  const [activeField, setActiveField] = useState<string | null>(null);
  const initialFormData = useMemo(() => mapAgreementFromServer(agreement), [agreement]);
  const { data, updateField, updateNestedField, resetData, resetFields } = useAgreementData(initialFormData);
  const [agreementId, setAgreementId] = useState<number | null>(agreement?.id ?? null);

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
      const payload = { ...data, projectId, userId };

      if (agreementId) {
        const response = await axios.put(`/agreements/${agreementId}`, payload);
        toast.success(response.data.message || "Agreement updated successfully", { autoClose: 3000 });
      } else {
        const response = await axios.post('/agreements', payload);
        if (response.data.success) {
          setAgreementId(response.data.id);
          toast.success(response.data.message || "Agreement saved successfully", { autoClose: 3000 });
          setIsSaved(true);
        }
      }
      setIsSaved(true);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to save agreement", { autoClose: 5000 });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={`app-container view-${activeView}`}>
      <ToastContainer position="top-center" autoClose={false} closeOnClick={false} />
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
        resetFields={resetFields}
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

export default function App({ projectId, userId, agreement }: {
  projectId: string | null;
  userId: string | null;
  agreement: any | null;
}) {
  return (
    <ErrorBoundary>
      <MainApp projectId={projectId} userId={userId} agreement={agreement} />
    </ErrorBoundary>
  );
}