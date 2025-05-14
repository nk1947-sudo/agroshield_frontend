declare module 'recharts' {
  export interface AreaProps {
    type?: string;
    dataKey?: string;
    stackId?: string;
    stroke?: string;
    fill?: string;
  }

  export interface CartesianGridProps {
    strokeDasharray?: string;
    stroke?: string;
  }

  export interface XAxisProps {
    dataKey?: string;
    stroke?: string;
  }

  export interface YAxisProps {
    stroke?: string;
  }

  export interface TooltipProps {
    contentStyle?: React.CSSProperties;
  }

  export const ResponsiveContainer: React.FC<{
    width?: string | number;
    height?: string | number;
    children?: React.ReactNode;
  }>;

  export const AreaChart: React.FC<{
    data?: any[];
    children?: React.ReactNode;
  }>;

  export const Area: React.FC<AreaProps>;
  export const XAxis: React.FC<XAxisProps>;
  export const YAxis: React.FC<YAxisProps>;
  export const CartesianGrid: React.FC<CartesianGridProps>;
  export const Tooltip: React.FC<TooltipProps>;
}
