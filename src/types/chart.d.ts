// chart.d.ts
export interface ChartDataPoint {
  [key: string]: string | number | Date;
}

// Performance Data
export interface PerformanceData extends ChartDataPoint {
  month: string;
  inspections: number;
  violations: number;
  seizures: number;
}

// Officer Performance
export interface OfficerPerformanceData extends ChartDataPoint {
  name: string;
  inspections: number;
  seizures: number;
  compliance: number;
}

// Hotspot Data
export interface HotspotData extends ChartDataPoint {
  area: string;
  riskLevel: number;
  violations: number;
}

// Time Series Data
export interface TimeSeriesData extends ChartDataPoint {
  date: string | Date;
  value: number;
  category?: string;
}

// Bar Chart Data
export interface BarChartData extends ChartDataPoint {
  label: string;
  value: number;
  category?: string;
}

// Pie Chart Data
export interface PieChartData {
  name: string;
  value: number;
  color?: string;
}

// Multi Series Line Chart Data
export interface MultiSeriesData {
  name: string;
  series: TimeSeriesData[];
}

// Heatmap Data
export interface HeatmapData {
  x: string;
  y: string;
  value: number;
}

// Radar Chart Data
export interface RadarChartData {
  category: string;
  [key: string]: string | number;
}