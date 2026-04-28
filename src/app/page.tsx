'use client';

import { useState } from 'react';
import { SidebarForm } from '@/components/SidebarForm';
import { LivePreview } from '@/components/LivePreview';
import { Dashboard } from '@/components/Dashboard';
import { useReportStore } from '@/store/useReportStore';
import { Edit3, Eye } from 'lucide-react';

export default function Home() {
  const isEditing = useReportStore((state) => state.isEditing);
  const [mobileTab, setMobileTab] = useState<'edit' | 'preview'>('edit');

  if (!isEditing) {
    return <Dashboard />;
  }

  return (
    <main className="flex min-h-screen w-screen bg-white dark:bg-gray-950 flex-col md:flex-row md:h-screen md:overflow-hidden overflow-x-hidden">
      {/* Mobile Tab Bar */}
      <div className="flex md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-30">
        <button
          onClick={() => setMobileTab('edit')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileTab === 'edit'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Edit3 size={16} />
          Editor
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-colors ${
            mobileTab === 'preview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          <Eye size={16} />
          Preview
        </button>
      </div>

      {/* Left Sidebar */}
      <div className={`w-full md:w-[400px] lg:w-[450px] flex-shrink-0 md:h-full shadow-xl z-20 md:border-r border-gray-200 dark:border-gray-800 md:overflow-y-auto ${mobileTab === 'edit' ? 'block' : 'hidden md:block'}`}>
        <SidebarForm />
      </div>
      
      {/* Right Preview */}
      <div className={`w-full flex-1 md:h-full flex flex-col z-10 min-h-[600px] md:border-t-0 ${mobileTab === 'preview' ? 'block' : 'hidden md:flex'}`}>
        <LivePreview />
      </div>
    </main>
  );
}
