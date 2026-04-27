'use client';

import React, { useState } from 'react';
import { useReportStore, TemplateType, DocumentType } from '@/store/useReportStore';
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight, ArrowLeft } from 'lucide-react';

const AccordionItem = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden bg-white dark:bg-gray-850">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">{title}</span>
        {isOpen ? <ChevronDown size={16} className="text-gray-500" /> : <ChevronRight size={16} className="text-gray-500" />}
      </button>
      {isOpen && (
        <div className="p-4 space-y-4 border-t border-gray-200 dark:border-gray-800">
          {children}
        </div>
      )}
    </div>
  );
};

export const SidebarForm = () => {
  const store = useReportStore();

  return (
    <div className="w-full bg-white dark:bg-gray-900 flex flex-col min-h-full">
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur z-20 flex flex-col gap-3">
        <button 
          onClick={() => store.setIsEditing(false)}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors w-fit"
        >
          <ArrowLeft size={16} /> Dashboard
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Editor</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{store.templateType} • {store.documentType}</p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => store.loadSampleData(store.templateType, store.documentType)}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Reset Sample
            </button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* Core Settings */}
        <AccordionItem title="Core Configuration" defaultOpen={true}>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Project Configuration</label>
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                <button
                  onClick={() => store.setTemplateType('single')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                    store.templateType === 'single' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Single
                </button>
                <button
                  onClick={() => store.setTemplateType('team')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                    store.templateType === 'team' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Team
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Document Type</label>
              <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-md">
                <button
                  onClick={() => store.setDocumentType('report')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                    store.documentType === 'report' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Report
                </button>
                <button
                  onClick={() => store.setDocumentType('synopsis')}
                  className={`flex-1 py-1.5 text-xs font-medium rounded transition-colors ${
                    store.documentType === 'synopsis' ? 'bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Synopsis
                </button>
              </div>
            </div>
            <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">Include Sections</label>
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={store.includeCertificate}
                    onChange={(e) => store.updateField('includeCertificate', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Certificate
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={store.includeAcknowledgement}
                    onChange={(e) => store.updateField('includeAcknowledgement', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Acknowledgement
                </label>
              </div>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem title="Header Details (VTU)">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">University Name</label>
              <input
                type="text"
                value={store.vtuName}
                onChange={(e) => store.updateField('vtuName', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">University Address</label>
              <input
                type="text"
                value={store.vtuAddress}
                onChange={(e) => store.updateField('vtuAddress', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </AccordionItem>

        {/* Project Details */}
        <AccordionItem title="Project Details" defaultOpen={true}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Project Title</label>
              <textarea
                value={store.title}
                onChange={(e) => store.updateField('title', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y min-h-[60px]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Subtitle (e.g. A COURSE PROJECT REPORT)</label>
              <input
                type="text"
                value={store.subtitle}
                onChange={(e) => store.updateField('subtitle', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Fulfillment Text</label>
              <textarea
                value={store.fulfillmentText}
                onChange={(e) => store.updateField('fulfillmentText', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-y min-h-[80px]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Subject Name</label>
              <input
                type="text"
                value={store.subjectName}
                onChange={(e) => store.updateField('subjectName', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Subject Code</label>
              <input
                type="text"
                value={store.subjectCode}
                onChange={(e) => store.updateField('subjectCode', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </AccordionItem>

        {/* Institution Section */}
        <AccordionItem title="Institution Details">
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Degree</label>
              <input
                type="text"
                value={store.degree}
                onChange={(e) => store.updateField('degree', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Department</label>
              <input
                type="text"
                value={store.department}
                onChange={(e) => store.updateField('department', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">College Name</label>
              <input
                type="text"
                value={store.college}
                onChange={(e) => store.updateField('college', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">College Address</label>
              <input
                type="text"
                value={store.collegeAddress}
                onChange={(e) => store.updateField('collegeAddress', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">University Footer Text</label>
              <input
                type="text"
                value={store.university}
                onChange={(e) => store.updateField('university', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Academic Year</label>
              <input
                type="text"
                value={store.academicYear}
                onChange={(e) => store.updateField('academicYear', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1">Principal Name</label>
              <input
                type="text"
                value={store.principal}
                onChange={(e) => store.updateField('principal', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </AccordionItem>

        {/* Students Section */}
        <AccordionItem title="Students" defaultOpen={true}>
          <div className="space-y-3">
            {store.students.map((student, index) => (
              <div key={student.id} className="flex gap-2 items-start bg-gray-50 dark:bg-gray-800/50 p-2 rounded border border-gray-200 dark:border-gray-700">
                <div className="mt-2 text-gray-400 cursor-move">
                  <GripVertical size={14} />
                </div>
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={student.name}
                    onChange={(e) => store.updateStudent(student.id, 'name', e.target.value)}
                    placeholder={`Student ${index + 1} Name`}
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white uppercase focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    value={student.usn}
                    onChange={(e) => store.updateStudent(student.id, 'usn', e.target.value)}
                    placeholder="USN (e.g. 1XY20CS001)"
                    className="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white uppercase focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                {store.templateType === 'team' && store.students.length > 1 && (
                  <button onClick={() => store.removeStudent(student.id)} className="mt-2 text-red-500 hover:text-red-700 p-1">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
            {store.templateType === 'team' && (
              <button
                onClick={store.addStudent}
                className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-700 rounded text-xs flex justify-center items-center gap-1 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
              >
                <Plus size={14} /> Add Student
              </button>
            )}
          </div>
        </AccordionItem>

        {/* Staff Section */}
        <AccordionItem title={`Guide ${store.templateType === 'team' ? '& HOD' : 'Details'}`}>
          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Guide</h4>
              <input
                type="text"
                value={store.guide.name}
                onChange={(e) => store.updateGuide('name', e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                value={store.guide.designation}
                onChange={(e) => store.updateGuide('designation', e.target.value)}
                placeholder="Designation"
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            
            <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-800">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">HOD</h4>
                <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={store.includeHOD}
                    onChange={(e) => store.updateField('includeHOD', e.target.checked)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  Include
                </label>
              </div>
              <input
                type="text"
                value={store.hod.name}
                onChange={(e) => store.updateHOD('name', e.target.value)}
                placeholder="Name"
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <input
                type="text"
                value={store.hod.designation}
                onChange={(e) => store.updateHOD('designation', e.target.value)}
                placeholder="Designation"
                className="w-full px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </AccordionItem>

      </div>
    </div>
  );
};
