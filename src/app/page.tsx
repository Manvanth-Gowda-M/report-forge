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
      {/* Left Sidebar */}
      <div className="w-full md:w-[400px] lg:w-[450px] flex-shrink-0 md:h-full shadow-xl z-20 md:border-r border-gray-200 dark:border-gray-800 md:overflow-y-auto">
        <SidebarForm />
      </div>
      
      {/* Right Preview */}
      <div className="w-full flex-1 md:h-full flex flex-col z-10 min-h-[600px] border-t-4 border-gray-200 md:border-t-0">
        <LivePreview />
      </div>
    </main>
  );
}
