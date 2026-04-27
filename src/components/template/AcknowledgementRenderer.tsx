'use client';

import React, { forwardRef } from 'react';
import { useReportStore } from '@/store/useReportStore';
import styles from './Acknowledgement.module.css';

export const AcknowledgementRenderer = forwardRef<HTMLDivElement>((props, ref) => {
  const {
    templateType,
    department,
    college,
    guide,
    hod,
    principal
  } = useReportStore();

  const isTeam = templateType === 'team';
  const P1_subj = isTeam ? 'We' : 'I';
  const P1_obj = isTeam ? 'us' : 'me';
  const P1_pos = isTeam ? 'our' : 'my';

  const getCollegeInitials = (name: string) => {
    if (!name) return 'GECR';
    return name.split(' ').map(w => w[0]).join('').toUpperCase();
  };
  
  const collegeInitials = getCollegeInitials(college);

  return (
    <div ref={ref} className={styles.a4Page}>
      <div className={styles.contentWrapper}>
        
        <div className={styles.title}>ACKNOWLEDGEMENT</div>
        
        <div className={styles.paragraph}>
          {P1_subj} consider it a privilege to whole heartedly express {P1_pos} gratitude and respect to each and every one who guided and helped {P1_obj} in the successful completion of this project.
        </div>
        
        <div className={styles.paragraph}>
          {P1_subj} would greatly mention the enthusiastic influence provided by <span className={styles.boldText}>{guide.name || 'GUIDE NAME'}</span>, {guide.designation || 'Assistant Professor'}, Dept. of {department ? department.split(' ').map(w=>w[0]).join('') : 'CSE'}, as {P1_pos} project Guide, for their ideas and co-operation showed on {P1_obj} during {P1_pos} venture and making this project great success.
        </div>

        <div className={styles.paragraph}>
          {P1_subj} {isTeam ? 'are' : 'am'} thankful to <span className={styles.boldText}>{hod.name || 'HOD NAME'}</span>, HOD, Department of {department || 'Computer Science'}, for their co-operation and encouragement at all moments of {P1_pos} approach.
        </div>

        <div className={styles.paragraph}>
          {P1_subj} {isTeam ? 'are' : 'am'} very thankful to the principal <span className={styles.boldText}>{principal || 'PRINCIPAL NAME'}</span> for being kind enough to providing {P1_obj} an opportunity to work on a project in this institution.
        </div>

        <div className={styles.paragraph}>
          {P1_subj} would also like to thank {P1_pos} parents and well-wishers as well as {P1_pos} classmates for their guidance and their kind co-operation.
        </div>

        <div className={styles.paragraph}>
          Finally, it is {P1_pos} pleasure and happiness to the friendly co-operation showed by all the staff members of {department || 'Computer Science'} Department, {collegeInitials}.
        </div>

      </div>
    </div>
  );
});

AcknowledgementRenderer.displayName = 'AcknowledgementRenderer';
