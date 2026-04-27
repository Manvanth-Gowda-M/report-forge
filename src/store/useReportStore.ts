import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type TemplateType = 'single' | 'team';
export type DocumentType = 'report' | 'synopsis';

export interface Student {
  id: string;
  name: string;
  usn: string;
}

export interface Guide {
  name: string;
  designation: string;
}

export interface ReportState {
  isEditing: boolean;
  templateType: TemplateType;
  documentType: DocumentType;
  
  // Customization fields
  includeCertificate: boolean;
  includeAcknowledgement: boolean;
  includeHOD: boolean;
  vtuName: string;
  vtuAddress: string;
  title: string;
  subtitle: string; // e.g., 'A COURSE PROJECT REPORT' or 'A SYNOPSIS ON'
  fulfillmentText: string;
  degree: string;
  department: string;
  college: string;
  collegeAddress: string;
  university: string;
  academicYear: string;
  principal: string;
  subjectName: string;
  subjectCode: string;
  
  students: Student[];
  guide: Guide;
  hod: Guide;
  
  // Actions
  setIsEditing: (isEditing: boolean) => void;
  setTemplateType: (type: TemplateType) => void;
  setDocumentType: (type: DocumentType) => void;
  updateField: (field: keyof Omit<ReportState, 'isEditing' | 'templateType' | 'documentType' | 'students' | 'guide' | 'hod' | 'setIsEditing' | 'setTemplateType' | 'setDocumentType' | 'updateField' | 'updateGuide' | 'updateHOD' | 'addStudent' | 'updateStudent' | 'removeStudent' | 'moveStudent' | 'loadSampleData'>, value: string | boolean) => void;
  updateGuide: (field: keyof Guide, value: string) => void;
  updateHOD: (field: keyof Guide, value: string) => void;
  addStudent: () => void;
  updateStudent: (id: string, field: keyof Omit<Student, 'id'>, value: string) => void;
  removeStudent: (id: string) => void;
  moveStudent: (dragIndex: number, hoverIndex: number) => void;
  loadSampleData: (type: TemplateType, docType?: DocumentType) => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialGuide: Guide = { name: '', designation: '' };
const initialHod: Guide = { name: '', designation: '' };

const getSampleSubtitle = (docType: DocumentType) => docType === 'synopsis' ? 'A SYNOPSIS ON' : 'A COURSE PROJECT REPORT';
const getSampleFulfillment = (docType: DocumentType) => docType === 'synopsis' 
  ? 'Submitted in partial fulfillment of the requirements for the award of B.E. in Computer Science and Engineering Degree'
  : 'Submitted in partial fulfillment of the requirements for the award of B.E. in Computer Science and Engineering Degree';

const createSampleSingle = (docType: DocumentType = 'report') => ({
  templateType: 'single' as TemplateType,
  documentType: docType,
  includeCertificate: true,
  includeAcknowledgement: true,
  includeHOD: false,
  vtuName: 'VISVESVARAYA TECHNOLOGICAL UNIVERSITY',
  vtuAddress: '“JNANA SANGAMA” BELGAUM – 590018',
  title: 'ARTIFICIAL INTELLIGENCE BASED DIAGNOSIS SYSTEM',
  subtitle: getSampleSubtitle(docType),
  fulfillmentText: getSampleFulfillment(docType),
  degree: 'Bachelor of Engineering',
  department: 'Computer Science and Engineering',
  college: 'GOVERNMENT ENGINEERING COLLEGE',
  collegeAddress: 'B M ROAD, RAMANAGARA - 562159',
  university: 'Visvesvaraya Technological University',
  academicYear: '2023-2024',
  principal: 'Dr. John Doe',
  subjectName: 'Artificial Intelligence',
  subjectCode: '18CS71',
  students: [
    { id: generateId(), name: 'JOHN DOE', usn: '1XY20CS001' }
  ],
  guide: { name: 'Dr. Jane Smith', designation: 'Professor' },
  hod: { name: 'Dr. Alan Turing', designation: 'Professor & Head' }
});

const createSampleTeam = (docType: DocumentType = 'report') => ({
  templateType: 'team' as TemplateType,
  documentType: docType,
  includeCertificate: true,
  includeAcknowledgement: true,
  includeHOD: true,
  vtuName: 'VISVESVARAYA TECHNOLOGICAL UNIVERSITY',
  vtuAddress: '“JNANA SANGAMA” BELGAUM – 590018',
  title: 'MACHINE LEARNING FOR PREDICTIVE MAINTENANCE',
  subtitle: getSampleSubtitle(docType),
  fulfillmentText: getSampleFulfillment(docType),
  degree: 'Bachelor of Engineering',
  department: 'Computer Science and Engineering',
  college: 'GOVERNMENT ENGINEERING COLLEGE',
  collegeAddress: 'B M ROAD, RAMANAGARA - 562159',
  university: 'Visvesvaraya Technological University',
  academicYear: '2023-2024',
  principal: 'Dr. John Doe',
  subjectName: 'Machine Learning',
  subjectCode: '18CS72',
  students: [
    { id: generateId(), name: 'ALICE BROWN', usn: '1XY20CS001' },
    { id: generateId(), name: 'BOB SMITH', usn: '1XY20CS002' },
    { id: generateId(), name: 'CHARLIE DAVIS', usn: '1XY20CS003' },
    { id: generateId(), name: 'DIANA EVANS', usn: '1XY20CS004' }
  ],
  guide: { name: 'Dr. Robert Clark', designation: 'Associate Professor' },
  hod: { name: 'Dr. Alan Turing', designation: 'Professor & Head' }
});

export const useReportStore = create<ReportState>()(
  persist(
    (set) => ({
      isEditing: false,
      templateType: 'single',
      documentType: 'report',
      
      includeCertificate: true,
      includeAcknowledgement: true,
      includeHOD: true,
      vtuName: 'VISVESVARAYA TECHNOLOGICAL UNIVERSITY',
      vtuAddress: '“JNANA SANGAMA” BELGAUM – 590018',
      title: '',
      subtitle: 'A COURSE PROJECT REPORT',
      fulfillmentText: 'Submitted in partial fulfillment of the requirements for the award of B.E. in Computer Science and Engineering Degree',
      degree: 'Bachelor of Engineering',
      department: '',
      college: '',
      collegeAddress: '',
      university: 'Visvesvaraya Technological University',
      academicYear: '2023-2024',
      principal: '',
      subjectName: '',
      subjectCode: '',
      students: [{ id: generateId(), name: '', usn: '' }],
      guide: { ...initialGuide },
      hod: { ...initialHod },

      setIsEditing: (isEditing) => set({ isEditing }),
      
      setTemplateType: (type) => set((state) => ({ 
        templateType: type,
        // If switching to team and only have 1 student, add a blank one
        students: type === 'team' && state.students.length === 1 
          ? [...state.students, { id: generateId(), name: '', usn: '' }] 
          : state.students
      })),
      
      setDocumentType: (type) => set((state) => ({
        documentType: type,
        subtitle: type === 'synopsis' ? 'A SYNOPSIS ON' : 'A COURSE PROJECT REPORT'
      })),
      
      updateField: (field, value) => set({ [field]: value } as any),
      
      updateGuide: (field, value) => set((state) => ({
        guide: { ...state.guide, [field]: value }
      })),

      updateHOD: (field, value) => set((state) => ({
        hod: { ...state.hod, [field]: value }
      })),
      
      addStudent: () => set((state) => ({
        students: [...state.students, { id: generateId(), name: '', usn: '' }]
      })),
      
      updateStudent: (id, field, value) => set((state) => ({
        students: state.students.map((student) => 
          student.id === id ? { ...student, [field]: value } : student
        )
      })),
      
      removeStudent: (id) => set((state) => ({
        students: state.students.filter((student) => student.id !== id)
      })),

      moveStudent: (dragIndex, hoverIndex) => set((state) => {
        const newStudents = [...state.students];
        const draggedStudent = newStudents[dragIndex];
        newStudents.splice(dragIndex, 1);
        newStudents.splice(hoverIndex, 0, draggedStudent);
        return { students: newStudents };
      }),
      
      loadSampleData: (type, docType) => set((state) => {
        const finalDocType = docType || state.documentType;
        return type === 'single' ? createSampleSingle(finalDocType) : createSampleTeam(finalDocType);
      }),
    }),
    {
      name: 'report-forge-storage',
    }
  )
);
