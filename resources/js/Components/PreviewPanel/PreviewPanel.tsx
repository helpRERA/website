import React, { useState, useEffect, useRef } from 'react';
import { ZoomIn, ZoomOut, Eye, Download, Upload, RefreshCw, Printer } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import DocumentPages from '../../Components/DocumentPages/DocumentPages';
import { generatePDF } from '../../utils/pdfGenerator';
import { AgreementData } from '../../hooks/useAgreementData';
import { getAgreementFieldStep } from '../../utils/agreementFieldNavigation';

interface PreviewPanelProps {
  uploadUrl: string;
  data: AgreementData;
  resetData: () => void;
  activeField?: string | null;
  fieldFocusVersion?: number;
  isSaved: boolean;
  onFieldSelect?: (field: string) => void;
}

export default function PreviewPanel({ data, activeField, fieldFocusVersion, isSaved, onFieldSelect, uploadUrl }: PreviewPanelProps) {
  const [isUploading, setIsUploading] = useState(false);
  const uploadInProgress = useRef(false);
  const handleUpload = async () => {
    if (!isSaved || isExporting || uploadInProgress.current) return;
    uploadInProgress.current = true;
    setIsUploading(true);
    setIsExporting(true);
    try {
      const unitTag = data.unitNo ? `_Apt_${data.unitNo}` : data.plotNo ? `_Plot_${data.plotNo}` : '';
      const filename = `Agreement_for_Sale${unitTag}.pdf`;
      const file = await generatePDF('preview-content', filename,
        [data.scheduleA, data.scheduleB, data.scheduleC, data.scheduleD], 'blob');
      if (!file || file.size === 0 || file.size > 10 * 1024 * 1024) {
        toast.error('The generated PDF must be non-empty and no larger than 10 MB.');
        return;
      }
      const payload = new FormData();
      payload.append('file', file, filename);
      const response = await axios.post(uploadUrl, payload);
      toast.success(response.data.message, { autoClose: 5000 });
    } catch (error: any) {
      toast.error(error.response?.data?.errors?.file?.[0] || error.response?.data?.message || 'Upload could not be confirmed. Check the project documents before retrying.');
    } finally {
      uploadInProgress.current = false;
      setIsUploading(false);
      setIsExporting(false);
    }
  };
  const [zoom, setZoom] = useState<number>(0.85);
  const [highlightMode, setHighlightMode] = useState<boolean>(true);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const lastActiveField = useRef<string | null>(null);

  const handleFieldClick = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (isExporting || !(event.target instanceof Element)) return;
    if (window.getSelection()?.toString()) return;
    const target = event.target.closest<HTMLElement>('[data-edit-field], [data-field]');
    if (!target || !event.currentTarget.contains(target)) return;
    const field = target.dataset.editField || target.dataset.field;
    if (field && getAgreementFieldStep(field) !== undefined) {
      // Focusing the form should not scroll the preview away from the clicked value.
      lastActiveField.current = target.closest<HTMLElement>('[data-field]')?.dataset.field || field;
      onFieldSelect?.(field);
    }
  };

  useEffect(() => {
    // Keep document markup suitable for export; add editor affordances only in the live preview.
    panelRef.current?.querySelectorAll<HTMLElement>('[data-edit-field], [data-field]').forEach(target => {
      const field = target.dataset.editField || target.dataset.field;
      if (!field || getAgreementFieldStep(field) === undefined) return;
      // Individual values inside a group provide the more precise click targets.
      if (target.querySelector('[data-edit-field], [data-field]')) return;
      target.tabIndex = 0;
      target.setAttribute('role', 'button');
      target.title = 'Edit this value in the form';
      target.classList.add('preview-editable-field');
    });
  }, [data]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.05, 1.3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.05, 0.55));
  const handlePrint = () => window.print();


  const handleDownload = () => {
    setIsExporting(true);
    const unitTag = data.unitNo ? `_Apt_${data.unitNo}` : data.plotNo ? `_Plot_${data.plotNo}` : '';
    const filename = `Agreement_for_Sale${unitTag}.pdf`;
    const prevHighlight = highlightMode;
    const prevZoom = zoom;

    setHighlightMode(false);
    setZoom(1);

    setTimeout(() => {
      generatePDF('preview-content', filename, [data.scheduleA, data.scheduleB, data.scheduleC, data.scheduleD])
        .catch((err: Error) => alert('Error generating PDF: ' + err.message))
        .finally(() => {
          setHighlightMode(prevHighlight);
          setZoom(prevZoom);
          setIsExporting(false);
        });
    }, 400);
  };

  useEffect(() => {
    const skipScroll = activeField === lastActiveField.current;
    lastActiveField.current = null;
    if (!activeField) return;

    const panel = panelRef.current;
    if (!panel) return;

    panel.querySelectorAll('.field-focus-pulse').forEach(el => {
      el.classList.remove('field-focus-pulse');
    });

    const targets = panel.querySelectorAll<HTMLElement>(`[data-field="${activeField}"]`);
    if (targets.length === 0) return;

    if (!skipScroll) targets[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Restart the animation when the same field is clicked again.
    void targets[0].offsetWidth;
    targets.forEach(el => el.classList.add('field-focus-pulse'));

    const timer = setTimeout(() => {
      targets.forEach(el => el.classList.remove('field-focus-pulse'));
    }, 2000);

    return () => {
      clearTimeout(timer);
      targets.forEach(el => el.classList.remove('field-focus-pulse'));
    };
  }, [activeField, fieldFocusVersion]);

  return (
    <div className="preview-panel" ref={panelRef}>
      <div className="preview-controls" style={{ flexWrap: 'wrap', gap: '0.5rem' }}>
        <div className="control-group">
          <button className="control-btn" onClick={handleZoomOut} title="Zoom Out">
            <ZoomOut size={18} />
          </button>
          <span className="zoom-indicator">{Math.round(zoom * 100)}%</span>
          <button className="control-btn" onClick={handleZoomIn} title="Zoom In">
            <ZoomIn size={18} />
          </button>
        </div>

        <div className="control-group">
          <button
            className="control-btn"
            onClick={() => setHighlightMode(h => !h)}
            aria-pressed={highlightMode}
            style={{
              color: highlightMode ? 'var(--accent-gold)' : 'var(--text-secondary)',
              backgroundColor: highlightMode ? 'rgba(194, 149, 43, 0.1)' : 'transparent',
              padding: '0.4rem 0.8rem',
              gap: '0.4rem',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
            }}
            title="Toggle Highlight Mode"
          >
            <Eye size={16} /> Highlight Fields
          </button>
        </div>

        {/* <div className="control-group">
          <button className="control-btn" onClick={handlePrint} title="Print Document">
            <Printer size={18} />
          </button>
        </div> */}

        {isSaved ? (
          <button
            className="btn-primary"
            onClick={handleDownload}
            disabled={isExporting}
            style={{ opacity: isExporting ? 0.7 : 1 }}
          >
            {isExporting ? (
              <><RefreshCw size={16} /> Generating...</>
            ) : (
              <><Download size={16} /> Download PDF</>
            )}
          </button>
        ) : (
          <button
            className="btn-primary"
            disabled
            title="Save the agreement first"
            style={{ opacity: 0.4, cursor: 'not-allowed' }}
          >
            <Download size={16} /> Download PDF
          </button>
        )}
        <button
          type="button"
          className="btn-primary"
          disabled={!isSaved || isUploading || isExporting}
          onClick={() => void handleUpload()}
          title={isSaved ? 'Generate and upload the agreement PDF' : 'Save the agreement first'}
          style={!isSaved ? { opacity: 0.4, cursor: 'not-allowed' } : undefined}
        >
          <Upload size={16} /> {isUploading ? 'Uploading...' : 'Upload PDF'}
        </button>
      </div>

      <div
        className={highlightMode ? 'highlight-fillable' : ''}
        onClick={handleFieldClick}
        onKeyDown={event => {
          if (event.key === 'Enter' || event.key === ' ') {
            if (!(event.target instanceof HTMLElement) || !event.target.classList.contains('preview-editable-field')) return;
            event.preventDefault();
            handleFieldClick(event);
          }
        }}
        style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}
      >
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            width: '210mm',
            marginBottom: '4rem',
          }}
        >
          <DocumentPages data={data} activeField={activeField} />
        </div>
      </div>
    </div>
  );
}
