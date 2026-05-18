export interface MeasureUnit {
  measurement: string
  unit: string
  axis: 'right' | 'left'
}

export type ChartTableRow = Record<string, string | number | undefined | null>
