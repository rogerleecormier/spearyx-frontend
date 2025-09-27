/**
 * PDF export functionality using @react-pdf/renderer
 */

import React from 'react';

import type { ExportOptions, RaciKey, RaciState } from '../../../types/raci';
import { getActiveRaciKey } from '../matrix';

/**
 * Color palette for RACI values in PDF
 */
const RACI_COLORS: Record<RaciKey, string> = {
  R: '#90EE90', // Light green
  A: '#FFD700', // Light gold
  C: '#87CEEB', // Light sky blue
  I: '#D3D3D3', // Light gray
};

/**
 * PDF styles - will be created dynamically inside the function
 */

/**
 * RACI PDF Document Component - will be created inside the function
 */

/**
 * Exports RACI matrix to PDF
 */
export async function exportToPdf(
  state: RaciState,
  options: ExportOptions = {}
): Promise<Blob> {
  // Dynamic import to avoid SSR issues
  const { Document, Image, Page, StyleSheet, Text, View, pdf } = await import('@react-pdf/renderer');

  // Recreate styles object since StyleSheet is now imported dynamically
  const styles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 30,
      fontSize: 10,
      fontFamily: 'Helvetica',
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      paddingBottom: 10,
      borderBottomWidth: 2,
      borderBottomColor: '#4A5568',
    },
    logo: {
      width: 80,
      height: 40,
      marginRight: 15,
      objectFit: 'contain',
    },
    headerText: {
      flex: 1,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2D3748',
      marginBottom: 5,
    },
    subtitle: {
      fontSize: 10,
      color: '#718096',
    },
    tableContainer: {
      flexDirection: 'column',
      marginTop: 20,
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#4A5568',
      paddingVertical: 8,
      paddingHorizontal: 4,
    },
    tableHeaderCell: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: 9,
      textAlign: 'center',
      paddingVertical: 2,
      paddingHorizontal: 2,
    },
    taskHeaderCell: {
      width: '35%',
      textAlign: 'left',
      paddingLeft: 8,
    },
    roleHeaderCell: {
      flex: 1,
      textAlign: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderBottomColor: '#E2E8F0',
      paddingVertical: 6,
      paddingHorizontal: 4,
    },
    tableRowAlt: {
      backgroundColor: '#F7FAFC',
    },
    taskCell: {
      width: '35%',
      fontSize: 9,
      textAlign: 'left',
      paddingLeft: 8,
      paddingVertical: 4,
    },
    raciCell: {
      flex: 1,
      fontSize: 10,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingVertical: 4,
      marginHorizontal: 1,
      borderRadius: 2,
    },
    legend: {
      marginTop: 30,
      paddingTop: 15,
      borderTopWidth: 1,
      borderTopColor: '#E2E8F0',
    },
    legendTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#2D3748',
    },
    legendGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
      marginBottom: 5,
    },
    legendKey: {
      width: 20,
      height: 16,
      textAlign: 'center',
      fontSize: 9,
      fontWeight: 'bold',
      color: '#2D3748',
      marginRight: 8,
      paddingVertical: 2,
      borderRadius: 2,
    },
    legendDesc: {
      fontSize: 9,
      color: '#4A5568',
    },
  });

  // Create the PDF document component inside the function where imports are available
  const RaciPdfDocument: React.FC<{
    state: RaciState;
    options: ExportOptions;
  }> = ({ state, options }) => (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          {state.logo && <Image style={styles.logo} src={state.logo.dataUrl} />}
          <View style={styles.headerText}>
            <Text style={styles.title}>{state.title}</Text>
            {options.includeDate !== false && (
              <Text style={styles.subtitle}>
                Generated: {new Date().toLocaleDateString()}
              </Text>
            )}
          </View>
        </View>

        {/* RACI Matrix Table */}
        <View style={styles.tableContainer}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.taskHeaderCell]}>
              Task
            </Text>
            {state.roles.map((role) => (
              <Text
                key={role.id}
                style={[styles.tableHeaderCell, styles.roleHeaderCell]}
              >
                {role.name}
              </Text>
            ))}
          </View>

          {/* Table Rows */}
          {state.tasks.map((task, index) => (
            <View
              key={task.id}
              style={[
                styles.tableRow,
                ...(index % 2 === 1 ? [styles.tableRowAlt] : []),
              ]}
            >
              <Text style={styles.taskCell}>{task.name}</Text>
              {state.roles.map((role) => {
                const cellValue = state.matrix[task.id]?.[role.name];
                const activeKey = cellValue ? getActiveRaciKey(cellValue) : null;

                return (
                  <View key={role.id} style={styles.raciCell}>
                    <Text
                      style={{
                        backgroundColor: activeKey
                          ? RACI_COLORS[activeKey]
                          : 'transparent',
                        color: '#2D3748',
                        width: '100%',
                        textAlign: 'center',
                        paddingVertical: 2,
                        borderRadius: 2,
                      }}
                    >
                      {activeKey || ''}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>

        {/* Legend */}
        <View style={styles.legend}>
          <Text style={styles.legendTitle}>RACI Legend</Text>
          <View style={styles.legendGrid}>
            <View style={styles.legendItem}>
              <Text
                style={[styles.legendKey, { backgroundColor: RACI_COLORS.R }]}
              >
                R
              </Text>
              <Text style={styles.legendDesc}>Responsible - Does the work</Text>
            </View>
            <View style={styles.legendItem}>
              <Text
                style={[styles.legendKey, { backgroundColor: RACI_COLORS.A }]}
              >
                A
              </Text>
              <Text style={styles.legendDesc}>
                Accountable - Ultimately answerable
              </Text>
            </View>
            <View style={styles.legendItem}>
              <Text
                style={[styles.legendKey, { backgroundColor: RACI_COLORS.C }]}
              >
                C
              </Text>
              <Text style={styles.legendDesc}>Consulted - Provides input</Text>
            </View>
            <View style={styles.legendItem}>
              <Text
                style={[styles.legendKey, { backgroundColor: RACI_COLORS.I }]}
              >
                I
              </Text>
              <Text style={styles.legendDesc}>Informed - Needs to know</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );

  const doc = <RaciPdfDocument state={state} options={options} />;
  return await pdf(doc).toBlob();
}

/**
 * Downloads the PDF file
 */
export function downloadPdf(
  state: RaciState,
  options: ExportOptions = {}
): void {
  exportToPdf(state, options)
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = options.filename || 'raci.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error('Failed to export PDF:', error);
      throw error;
    });
}
