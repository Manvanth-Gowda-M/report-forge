'use client';

import React, { forwardRef } from 'react';
import { useReportStore } from '@/store/useReportStore';
import styles from './Certificate.module.css';

export const CertificateRenderer = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    templateType,
    documentType,
    title,
    degree,
    department,
    college,
    collegeAddress,
    university,
    academicYear,
    students,
    guide,
    hod,
    principal,
    subjectName,
    subjectCode,
    includeHOD
  } = useReportStore();

  const studentNames = students.map(s => `${s.name}(${s.usn})`).join(', ');

  return (
    <div ref={ref} className={styles.a4Page}>
      <div className={styles.contentWrapper}>
        
        {/* Top Section with Logos */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '2mm', padding: '0 5mm', marginTop: '2mm' }}>
          <img src="/vtu_logo.jpeg" alt="VTU Logo" style={{ width: '22mm', height: '25mm', objectFit: 'contain' }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, textAlign: 'center', padding: '0 5mm' }}>
            <div className={styles.headerCollege}>{college || 'GOVERNMENT ENGINEERING COLLEGE'}</div>
            <div className={styles.headerAddress}>{collegeAddress || 'B M ROAD, RAMANAGARA-562159'}</div>
            <div className={styles.headerAffiliation}>Affiliated to {university || 'VTU'}, Belagavi, APPROVED by AICTE New Delhi</div>
          </div>
          <img src="/college_logo.jpeg" alt="College Logo" style={{ width: '25mm', height: '25mm', objectFit: 'contain' }} />
        </div>
        
        <div className={styles.deptRed}>DEPARTMENT OF {department || 'COMPUTER SCIENCE AND ENGINEERING'}</div>
        
        <div className={styles.certTitle}>CERTIFICATE</div>
        
        <div className={styles.certParagraph}>
          Certified that the {documentType === 'synopsis' ? 'synopsis' : 'course project'} entitled <span className={styles.boldText}>"{title || 'PROJECT TITLE'}"</span> carried out by <span className={styles.boldText}>{studentNames || 'STUDENT NAME(USN)'}</span> submitted in partial fulfillment of the requirements for the award of the degree of <span className={styles.boldText}>{degree || 'Bachelor of Engineering'} in {department || 'Computer Science and Engineering'}</span> of <span className={styles.boldText}>{university || 'Visvesvaraya Technological University'}, Belagavi</span> during the year {academicYear || '2025-2026'}. The {documentType === 'synopsis' ? 'synopsis' : 'report'} has been approved as it satisfies the academic requirements in respect to the {documentType === 'synopsis' ? 'project work' : 'course project'} prescribed for the said Degree.
        </div>

        {/* Signatures */}
        <div className={styles.signatureGrid} style={templateType === 'team' ? { justifyContent: 'space-between' } : {}}>
          <div className={styles.sigCol}>
            <div className={styles.sigLabel}>Name & Signature of Guide</div>
            <div className={styles.sigName}>{guide.name || 'GUIDE NAME'}</div>
            <div className={styles.sigDesig}>{guide.designation || 'Assistant Professor'}</div>
            <div className={styles.sigDesig}>Dept of {department ? department.split(' ').map(w => w[0]).join('') : 'CSE'}, {college ? college.split(' ').map(w => w[0]).join('') : 'GECR'}</div>
          </div>
          
          {includeHOD && (
            <div className={styles.sigCol}>
              <div className={styles.sigLabel}>Name & Signature of HOD</div>
              <div className={styles.sigName}>{hod.name || 'HOD NAME'}</div>
              <div className={styles.sigDesig}>{hod.designation || 'Head of the Department'}</div>
              <div className={styles.sigDesig}>Dept. of {department ? department.split(' ').map(w => w[0]).join('') : 'CSE'}, {college ? college.split(' ').map(w => w[0]).join('') : 'GECR'}</div>
            </div>
          )}

          {templateType === 'team' && (
            <div className={styles.sigCol}>
              <div className={styles.sigLabel}>Name & Signature of Principal</div>
              <div className={styles.sigName}>{principal || 'PRINCIPAL NAME'}</div>
              <div className={styles.sigDesig}>Principal</div>
              <div className={styles.sigDesig}>{college ? college.split(' ').map(w => w[0]).join('') : 'GECR'}</div>
            </div>
          )}
        </div>

        {/* Examiners Section — shown only for team reports */}
        {templateType === 'team' && (
        <div style={{ width: '100%', padding: '0 10mm', marginTop: '10mm', display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontWeight: 'bold', fontSize: '14pt', textAlign: 'left', marginBottom: '8mm' }}>Name of the Examiners</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div style={{ textAlign: 'left', fontSize: '14pt' }}>1.</div>
            <div style={{ textAlign: 'right', fontSize: '14pt' }}>Signature with Date</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '10mm' }}>
            <div style={{ textAlign: 'left', fontSize: '14pt' }}>2.</div>
            <div style={{ textAlign: 'right', fontSize: '14pt' }}>..........................................</div>
          </div>
        </div>
        )}

      </div>
    </div>
  );
});

CertificateRenderer.displayName = 'CertificateRenderer';
