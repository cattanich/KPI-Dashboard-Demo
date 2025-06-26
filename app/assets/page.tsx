'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { SearchBar } from '@/components/dashboard/search-bar';
import { AssetCard } from '@/components/dashboard/asset-card';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/store/app-store';

export default function AssetsPage() {
  const { assets, filteredAssets, selectAsset } = useAppStore();
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Assets</h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse and explore available assets
        </p>
      </div>
      
      <div className="mb-6">
        <SearchBar />
      </div>
      
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium text-gray-900">All Assets</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              Filter
            </Button>
            <Button variant="outline" size="sm">
              Sort
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <AssetCard 
              key={asset.id} 
              asset={asset} 
              onSelect={selectAsset}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
