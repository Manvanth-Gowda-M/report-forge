'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FrontPageRenderer } from './template/FrontPageRenderer';
import { CertificateRenderer } from './template/CertificateRenderer';
import { AcknowledgementRenderer } from './template/AcknowledgementRenderer';
import { Download, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { useReportStore } from '@/store/useReportStore';

export const LivePreview = () => {
  const printRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.8);
  const { documentType, includeCertificate, includeAcknowledgement } = useReportStore();

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: 'ReportForge_FrontPage',
    pageStyle: `
      @page { size: A4; margin: 0; }
      body { margin: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    `
  });

  // Auto-fit scale on mount
  useEffect(() => {
    const fitToScreen = () => {
      if (containerRef.current) {
        // A4 ratio is roughly 1:1.414, height is larger
        // We want to fit it into the container with some padding
        const containerHeight = containerRef.current.clientHeight;
        const containerWidth = containerRef.current.clientWidth;
        
        // A4 dimensions at 96dpi: 794px x 1123px (approx)
        const a4Height = 1123;
        const a4Width = 794;
        
        const scaleHeight = (containerHeight - 40) / a4Height;
        const scaleWidth = (containerWidth - 40) / a4Width;
        
        // Use the smaller scale to ensure it fits completely
        setScale(Math.min(scaleHeight, scaleWidth, 1));
      }
    };
    
    fitToScreen();
    window.addEventListener('resize', fitToScreen);
    return () => window.removeEventListener('resize', fitToScreen);
  }, []);

  return (
    <div className="w-full h-full flex flex-col bg-gray-100 dark:bg-gray-950">
      {/* Top Bar */}
      <div className="h-14 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setScale(s => Math.max(0.2, s - 0.1))}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <ZoomOut size={18} />
          </button>
          <span className="text-xs font-mono text-gray-500 min-w-[3rem] text-center">
            {Math.round(scale * 100)}%
          </span>
          <button 
            onClick={() => setScale(s => Math.min(2, s + 0.1))}
            className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <ZoomIn size={18} />
          </button>
          <button 
            onClick={() => setScale(0.8)} // Simple reset
            className="p-1.5 ml-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            title="Reset Zoom"
          >
            <Maximize size={16} />
          </button>
        </div>

        <button
          onClick={() => handlePrint()}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm"
        >
          <Download size={16} />
          Export PDF
        </button>
      </div>

      {/* Preview Area */}
      <div 
        ref={containerRef}
        className="flex-1 overflow-auto flex items-start justify-center p-4 md:p-8 custom-scrollbar relative"
      >
        <div 
          className="transition-transform duration-200 ease-out origin-top"
          style={{ transform: `scale(${scale})` }}
        >
          {/* We wrap the print components so we can pass the ref */}
          <div ref={printRef} className="flex flex-col gap-8 print:gap-0 pb-20">
            <FrontPageRenderer />
            {documentType !== 'synopsis' && (
              <>
                {includeCertificate && <CertificateRenderer />}
                {includeAcknowledgement && <AcknowledgementRenderer />}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
