import React, { useState, useEffect } from 'react';
import { ZoomIn, ZoomOut, Eye, Download, RefreshCw, Printer } from 'lucide-react';
import DocumentPages from '../../Components/DocumentPages/DocumentPages';
import { generatePDF } from '../../utils/pdfGenerator';
import { AgreementData } from '../../hooks/useAgreementData';

interface PreviewPanelProps {
    data: AgreementData;
    resetData: () => void;
    activeStep: number;
}



export default function PreviewPanel({ data, resetData, activeStep }: PreviewPanelProps) {

    useEffect(() => {
        document.querySelectorAll('.paper-page.section-active')
            .forEach(el => el.classList.remove('section-active'));

        const el = document.getElementById(`preview-section-${activeStep}`);
        if (el) {
            el.classList.add('section-active');
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [activeStep]);

    const [zoom, setZoom] = useState<number>(0.85);
    const [highlightMode, setHighlightMode] = useState<boolean>(true);
    const [isExporting, setIsExporting] = useState<boolean>(false);

    const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.05, 1.3));
    const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.05, 0.55));
    const handlePrint = () => window.print();

    const handleDownload = () => {
        setIsExporting(true);
        const unitTag = data.unitNo ? `_Apt_${data.unitNo}` : data.plotNo ? `_Plot_${data.plotNo}` : '';
        const filename = `Agreement_for_Sale${unitTag}.pdf`;
        const prevHighlight = highlightMode;
        setHighlightMode(false);

        setTimeout(() => {
            generatePDF('preview-content', filename)
                .catch((err: Error) => alert('Error generating PDF: ' + err.message))
                .finally(() => {
                    setHighlightMode(prevHighlight);
                    setIsExporting(false);
                });
        }, 400);
    };



    return (
        <div className="preview-panel">
            {/* Sticky Top Controls */}
            <div className="preview-controls">
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

                <div className="control-group">
                    <button className="control-btn" onClick={handlePrint} title="Print Document">
                        <Printer size={18} />
                    </button>
                </div>

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
            </div>

            {/* Pages Container with zoom scaling */}
            <div
                className={highlightMode ? 'highlight-fillable' : ''}
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
                    <DocumentPages data={data} />
                </div>
            </div>
        </div>
    );
}
