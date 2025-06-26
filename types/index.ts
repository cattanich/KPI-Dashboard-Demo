// KPI Model Types
export interface KPI {
  id: string;
  title: string;
  description: string;
  metricIds: string[];
  businessQuestions: string[];
  calculation: string;
  visualsAvailable: VisualType[];
  affiliateApplicability: string[];
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isFavorite: boolean;
}

export type VisualType = 'bar' | 'line' | 'pie' | 'table' | 'card';

// Data Model Types
export interface DataModel {
  id: string;
  name: string;
  description: string;
  apiEndpoints: string[];
  kpiPriorities: string[];
}

// Asset Model Types
export interface Asset {
  id: string;
  title: string;
  description: string;
  type: AssetType;
  url: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  isFavorite: boolean;
}

export type AssetType = 'dashboard' | 'report' | 'document' | 'visualization';

// Layout Model Types
export interface LayoutModel {
  id: string;
  name: string;
  pageCount: number;
  kpisUsed: string[];
  previewUrl: string;
}

// Storyboard Model Types
export interface StoryboardModel {
  id: string;
  name: string;
  kpiFilters: string[];
  affiliates: string[];
}

// Search and Filter Types
export interface SearchFilters {
  query: string;
  assetTypes: AssetType[];
  dateRange: {
    start: string | null;
    end: string | null;
  };
  creators: string[];
  kpiIds: string[];
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  affiliateId: string;
}

export type UserRole = 'admin' | 'editor' | 'viewer';
