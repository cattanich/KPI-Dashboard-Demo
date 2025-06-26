import { create } from 'zustand';
import { Asset, KPI, SearchFilters, AssetType } from '@/types';

interface AppState {
  // Assets
  assets: Asset[];
  filteredAssets: Asset[];
  selectedAsset: Asset | null;
  recentSearches: string[];
  searchFilters: SearchFilters;
  
  // KPIs
  kpis: KPI[];
  filteredKpis: KPI[];
  selectedKpi: KPI | null;
  
  // UI State
  isLoading: boolean;
  expandedAssetSection: boolean;
  
  // Actions
  setAssets: (assets: Asset[]) => void;
  setKpis: (kpis: KPI[]) => void;
  selectAsset: (asset: Asset | null) => void;
  selectKpi: (kpi: KPI | null) => void;
  updateSearchQuery: (query: string) => void;
  updateSearchFilters: (filters: Partial<SearchFilters>) => void;
  clearSearch: () => void;
  addRecentSearch: (query: string) => void;
  toggleAssetFavorite: (assetId: string) => void;
  toggleKpiFavorite: (kpiId: string) => void;
  toggleExpandedAssetSection: () => void;
}

// Initial filters state
const initialFilters: SearchFilters = {
  query: '',
  assetTypes: [],
  dateRange: {
    start: null,
    end: null,
  },
  creators: [],
  kpiIds: [],
};

export const useAppStore = create<AppState>((set) => ({
  // Initial state
  assets: [],
  filteredAssets: [],
  selectedAsset: null,
  recentSearches: [],
  searchFilters: initialFilters,
  
  kpis: [],
  filteredKpis: [],
  selectedKpi: null,
  
  isLoading: false,
  expandedAssetSection: false,
  
  // Actions
  setAssets: (assets) => {
    set({ assets, filteredAssets: assets });
  },
  
  setKpis: (kpis) => {
    set({ kpis, filteredKpis: kpis });
  },
  
  selectAsset: (asset) => {
    set({ selectedAsset: asset });
  },
  
  selectKpi: (kpi) => {
    set({ selectedKpi: kpi });
  },
  
  updateSearchQuery: (query) => {
    set((state) => {
      const newFilters = { ...state.searchFilters, query };
      
      // Filter assets based on query
      const filtered = state.assets.filter(asset => 
        asset.title.toLowerCase().includes(query.toLowerCase()) || 
        asset.description.toLowerCase().includes(query.toLowerCase())
      );
      
      return {
        searchFilters: newFilters,
        filteredAssets: filtered,
      };
    });
  },
  
  updateSearchFilters: (filters) => {
    set((state) => {
      const newFilters = { ...state.searchFilters, ...filters };
      
      // Apply all filters
      let filtered = state.assets;
      
      // Filter by query
      if (newFilters.query) {
        filtered = filtered.filter(asset => 
          asset.title.toLowerCase().includes(newFilters.query.toLowerCase()) || 
          asset.description.toLowerCase().includes(newFilters.query.toLowerCase())
        );
      }
      
      // Filter by asset type
      if (newFilters.assetTypes.length > 0) {
        filtered = filtered.filter(asset => 
          newFilters.assetTypes.includes(asset.type)
        );
      }
      
      // Filter by date range
      if (newFilters.dateRange.start || newFilters.dateRange.end) {
        filtered = filtered.filter(asset => {
          const assetDate = new Date(asset.updatedAt);
          const start = newFilters.dateRange.start ? new Date(newFilters.dateRange.start) : null;
          const end = newFilters.dateRange.end ? new Date(newFilters.dateRange.end) : null;
          
          if (start && end) {
            return assetDate >= start && assetDate <= end;
          }
          if (start) {
            return assetDate >= start;
          }
          if (end) {
            return assetDate <= end;
          }
          return true;
        });
      }
      
      // Filter by creators
      if (newFilters.creators.length > 0) {
        filtered = filtered.filter(asset => 
          newFilters.creators.includes(asset.createdBy)
        );
      }
      
      return {
        searchFilters: newFilters,
        filteredAssets: filtered,
      };
    });
  },
  
  clearSearch: () => {
    set((state) => ({
      searchFilters: initialFilters,
      filteredAssets: state.assets,
    }));
  },
  
  addRecentSearch: (query) => {
    set((state) => {
      // Add search to recent searches, prevent duplicates, and limit to 5
      const updatedSearches = [
        query,
        ...state.recentSearches.filter(s => s !== query)
      ].slice(0, 5);
      
      return { recentSearches: updatedSearches };
    });
  },
  
  toggleAssetFavorite: (assetId) => {
    set((state) => {
      const updatedAssets = state.assets.map(asset =>
        asset.id === assetId ? { ...asset, isFavorite: !asset.isFavorite } : asset
      );
      
      const updatedFilteredAssets = state.filteredAssets.map(asset =>
        asset.id === assetId ? { ...asset, isFavorite: !asset.isFavorite } : asset
      );
      
      // Update selected asset if it's the one being favorited
      let updatedSelectedAsset = state.selectedAsset;
      if (state.selectedAsset && state.selectedAsset.id === assetId) {
        updatedSelectedAsset = {
          ...state.selectedAsset,
          isFavorite: !state.selectedAsset.isFavorite
        };
      }
      
      return {
        assets: updatedAssets,
        filteredAssets: updatedFilteredAssets,
        selectedAsset: updatedSelectedAsset,
      };
    });
  },
  
  toggleKpiFavorite: (kpiId) => {
    set((state) => {
      const updatedKpis = state.kpis.map(kpi =>
        kpi.id === kpiId ? { ...kpi, isFavorite: !kpi.isFavorite } : kpi
      );
      
      const updatedFilteredKpis = state.filteredKpis.map(kpi =>
        kpi.id === kpiId ? { ...kpi, isFavorite: !kpi.isFavorite } : kpi
      );
      
      // Update selected KPI if it's the one being favorited
      let updatedSelectedKpi = state.selectedKpi;
      if (state.selectedKpi && state.selectedKpi.id === kpiId) {
        updatedSelectedKpi = {
          ...state.selectedKpi,
          isFavorite: !state.selectedKpi.isFavorite
        };
      }
      
      return {
        kpis: updatedKpis,
        filteredKpis: updatedFilteredKpis,
        selectedKpi: updatedSelectedKpi,
      };
    });
  },
  
  toggleExpandedAssetSection: () => {
    set((state) => ({
      expandedAssetSection: !state.expandedAssetSection
    }));
  }
}));
