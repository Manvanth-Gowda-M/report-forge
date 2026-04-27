'use client';

import React from 'react';
import { useReportStore, TemplateType, DocumentType } from '@/store/useReportStore';
import { FileText, Users, FileSignature, LayoutTemplate } from 'lucide-react';

export const Dashboard = () => {
  const { 
    templateType, 
    documentType, 
    setTemplateType, 
    setDocumentType, 
    setIsEditing,
    loadSampleData
  } = useReportStore();

  const handleStart = () => {
    // Load appropriate sample data so user isn't starting from completely blank
    loadSampleData(templateType, documentType);
    setIsEditing(true);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center p-6">
      
      <div className="max-w-4xl w-full space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-4 bg-blue-100 dark:bg-blue-900/30 rounded-2xl mb-4">
            <LayoutTemplate className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight">ReportForge</h1>
          <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Create perfectly formatted VTU reports and synopses in minutes. Select your project configuration below to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Step 1: Project Type */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">1</span>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Select Project Type</h2>
            </div>
            
            <div className="grid gap-4">
              <button
                onClick={() => setTemplateType('single')}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  templateType === 'single'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${templateType === 'single' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                    <FileText size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Single Student</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">For individual assignments and mini-projects</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setTemplateType('team')}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  templateType === 'team'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${templateType === 'team' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Team Project</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">For major projects with multiple team members</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Step 2: Document Type */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-200 dark:border-gray-800 pb-2">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">2</span>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Select Document Type</h2>
            </div>
            
            <div className="grid gap-4">
              <button
                onClick={() => setDocumentType('report')}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  documentType === 'report'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${documentType === 'report' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                    <FileSignature size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Full Report</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Standard report with Certificate & Acknowledgement</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => setDocumentType('synopsis')}
                className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                  documentType === 'synopsis'
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${documentType === 'synopsis' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-500'}`}>
                    <LayoutTemplate size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Synopsis</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Initial project proposal or synopsis document</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="flex justify-center pt-8">
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center gap-3"
          >
            Start Editing Document
          </button>
        </div>

      </div>
    </div>
  );
};
