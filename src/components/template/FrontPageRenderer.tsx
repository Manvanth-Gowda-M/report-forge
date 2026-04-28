'use client';

import React, { forwardRef } from 'react';
import { useReportStore } from '@/store/useReportStore';
import styles from './FrontPage.module.css';

export const FrontPageRenderer = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    documentType,
    templateType,
    title,
    subtitle,
    degree,
    department,
    college,
    collegeAddress,
    vtuName,
    vtuAddress,
    fulfillmentText,
    academicYear,
    subjectName,
    subjectCode,
    students,
    guide,
    hod,
    includeHOD
  } = useReportStore();

  return (
    <div ref={ref} className={styles.a4Page}>
      <div className={styles.contentWrapper}>
        
        {/* Top Section */}
        <div className={styles.vtuName}>{vtuName || 'VISVESVARAYA TECHNOLOGICAL UNIVERSITY'}</div>
        <div className={styles.vtuAddress}>{vtuAddress || '“JNANA SANGAMA” BELGAUM – 590018'}</div>
        
        {/* VTU Logo */}
        <img src="/vtu_logo.jpeg" alt="VTU Logo" className={styles.vtuLogo} />
        
        <div className={styles.reportType}>{subtitle || (documentType === 'synopsis' ? 'A SYNOPSIS ON' : 'A COURSE PROJECT REPORT')}</div>
        <div className={styles.onText}>On</div>
        <div className={styles.title}>"{title || 'PROJECT TITLE'}"</div>

        {(subjectName || subjectCode) && (
          <div className={styles.subjectLine}>
            {subjectName}{subjectName && subjectCode ? ' ' : ''}{subjectCode ? `(${subjectCode})` : ''}
          </div>
        )}
        
        <div className={styles.fulfillment}>
          {fulfillmentText || `Submitted in partial fulfillment of the requirements for the award of ${degree || 'B.E.'} in Computer Science and Engineering Degree`}
        </div>
        
        {/* Submitted By */}
        <div className={styles.submittedBy}>SUBMITTED BY:</div>
        
        {templateType === 'single' ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2mm' }}>
            <div className={styles.studentName}>{students[0]?.name || 'STUDENT NAME'}</div>
            <div className={styles.studentUsn}>({students[0]?.usn || 'USN'})</div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2mm' }}>
            {students.map((student, index) => (
              <div key={student.id} className={styles.studentBlock}>
                <span className={styles.studentName}>{student.name || `STUDENT ${index + 1}`}</span>
                <span className={styles.studentUsn}>{student.usn || 'USN'}</span>
              </div>
            ))}
          </div>
        )}

        {/* Guide Section */}
        <div className={styles.guideSection}>
          <div className={styles.underGuide}>UNDER THE GUIDANCE OF</div>
          <div className={styles.guideGrid} style={{ justifyContent: 'center' }}>
            <div className={styles.guideCol}>
              <div className={styles.guideName}>{guide.name || 'GUIDE NAME'}</div>
              <div className={styles.guideDesig}>{guide.designation || 'Assistant Professor'}</div>
              <div className={styles.guideDesig}>Dept. of {department || 'CSE'}</div>
              <div className={styles.guideDesig}>{college || 'College'}</div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottomSection}>
          <img src="/college_logo.jpeg" alt="College Logo" className={styles.collegeLogo} />
          <div className={styles.deptRed}>DEPARTMENT OF {department || 'COMPUTER SCIENCE AND ENGINEERING'}</div>
          <div className={styles.collegeBlue}>{college || 'GOVERNMENT ENGINEERING COLLEGE'}</div>
          <div className={styles.collegeBlue} style={{ fontSize: '11pt' }}>{collegeAddress || 'B M ROAD, RAMANAGARA'}</div>
          <div className={styles.yearRed}>{academicYear || '2025-26'}</div>
        </div>

      </div>
    </div>
  );
});

FrontPageRenderer.displayName = 'FrontPageRenderer';
