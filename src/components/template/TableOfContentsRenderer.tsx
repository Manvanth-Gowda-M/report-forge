'use client';

import React, { forwardRef } from 'react';
import { useReportStore } from '@/store/useReportStore';
import styles from './TableOfContents.module.css';

export const TableOfContentsRenderer = forwardRef<HTMLDivElement>((props, ref) => {
  const { tocEntries } = useReportStore();

  return (
    <div ref={ref} className={styles.a4Page}>
      <div className={styles.contentWrapper}>

        <div className={styles.title}>TABLE OF CONTENTS</div>

        <table className={styles.table}>
          <thead>
            <tr className={styles.headerRow}>
              <th className={styles.colChapter}>CHAPTER NO.</th>
              <th className={styles.colContent}>CONTENT</th>
              <th className={styles.colPages}>PAGE NO.</th>
            </tr>
          </thead>
          <tbody>
            {tocEntries.map((entry) => (
              <tr key={entry.id}>
                <td className={styles.colChapter}>{entry.chapter}</td>
                <td className={styles.colContent}>{entry.content}</td>
                <td className={styles.colPages}>{entry.pages}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
});

TableOfContentsRenderer.displayName = 'TableOfContentsRenderer';
