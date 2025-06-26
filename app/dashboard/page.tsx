'use client';

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { SearchBar } from '@/components/dashboard/search-bar';
import { KPICard } from '@/components/dashboard/kpi-card';
import { AssetCard } from '@/components/dashboard/asset-card';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/store/app-store';
import { generateMockAssets, generateMockKPIs } from '@/lib/mock-data';
import { Asset, KPI } from '@/types';
import { LineChart, BarChart, DoughnutChart } from '@/components/charts/charts';

export default function DashboardPage() {
  const {
    assets,
    filteredAssets,
    kpis,
    filteredKpis,
    selectedAsset,
    selectedKpi,
    setAssets,
    setKpis,
    selectAsset,
    selectKpi,
    expandedAssetSection,
    toggleExpandedAssetSection,
  } = useAppStore();
  
  const [isLoading, setIsLoading] = useState(true);
  
  // Initialize with mock data
  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setIsLoading(true);
      try {
        // In a real app, these would be API calls
        const mockAssets = generateMockAssets(20);
        const mockKpis = generateMockKPIs(15);
        
        // Set data in store
        setAssets(mockAssets);
        setKpis(mockKpis);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [setAssets, setKpis]);
  
  // Handle asset selection
  const handleAssetSelect = (asset: Asset) => {
    selectAsset(asset);
  };
  
  // Handle KPI selection
  const handleKpiSelect = (kpi: KPI) => {
    selectKpi(kpi);
  };
  
  // Handle clear selection
  const handleClearSelection = () => {
    selectAsset(null);
    selectKpi(null);
  };

  // Mock data for charts
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    data: [65, 59, 80, 81, 56, 85],
  };

  const customerData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    data: [120, 135, 128, 145],
  };

  const marketShareData = {
    labels: ['Our Company', 'Competitor A', 'Competitor B', 'Competitor C', 'Others'],
    data: [45, 25, 15, 10, 5],
  };
  
  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Monitor and explore KPIs and assets
        </p>
      </div>
      
      <div className="mb-6">
        <SearchBar />
      </div>
      
      {selectedAsset || selectedKpi ? (
        <div className="mb-6">
          <Button 
            variant="outline" 
            onClick={handleClearSelection}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="w-5 h-5 mr-2"
            >
              <path 
                fillRule="evenodd" 
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Dashboard
          </Button>
        </div>
      ) : null}
      
      {/* Selected asset or KPI details */}
      {selectedAsset && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>{selectedAsset.title}</CardTitle>
                <span className="capitalize px-2 py-0.5 bg-gray-100 rounded-full text-xs font-medium">
                  {selectedAsset.type}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="mt-1 text-gray-600">{selectedAsset.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Details</h3>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Created By</h4>
                      <p className="text-sm text-gray-600">{selectedAsset.createdBy}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Created At</h4>
                      <p className="text-sm text-gray-600">{new Date(selectedAsset.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Updated At</h4>
                      <p className="text-sm text-gray-600">{new Date(selectedAsset.updatedAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">URL</h4>
                      <p className="text-sm text-primary-600 underline">{selectedAsset.url}</p>
                    </div>
                  </div>
                </div>
                
                {/* Asset Visualization */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Visualization</h3>
                  {selectedAsset.type === 'visualization' ? (
                    <div className="h-80">
                      <LineChart 
                        data={revenueData.data} 
                        labels={revenueData.labels} 
                        title="Revenue Trend" 
                        height={300}
                      />
                    </div>
                  ) : selectedAsset.type === 'dashboard' ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Revenue Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <LineChart 
                            data={revenueData.data} 
                            labels={revenueData.labels} 
                            title="Revenue Trend" 
                            height={200}
                          />
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Customer Growth</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <BarChart 
                            data={customerData.data} 
                            labels={customerData.labels} 
                            title="Customer Growth" 
                            height={200}
                          />
                        </CardContent>
                      </Card>
                    </div>
                  ) : (
                    <div className="p-4 bg-gray-50 rounded-md text-center">
                      <p className="text-gray-500">Preview not available for this asset type.</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {selectedKpi && (
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle>{selectedKpi.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium">Description</h3>
                  <p className="mt-1 text-gray-600">{selectedKpi.description}</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Business Questions</h3>
                  <ul className="mt-2 space-y-1 text-gray-600">
                    {selectedKpi.businessQuestions.map((question, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Calculation</h3>
                  <div className="mt-2 bg-gray-50 p-4 rounded-md">
                    <code className="text-sm font-mono">{selectedKpi.calculation}</code>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Available Visualizations</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedKpi.visualsAvailable.map((visual, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                      >
                        {visual.charAt(0).toUpperCase() + visual.slice(1)}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Affiliate Applicability</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedKpi.affiliateApplicability.map((affiliate, index) => (
                      <span 
                        key={index}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {affiliate}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium">Details</h3>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Created By</h4>
                      <p className="text-sm text-gray-600">{selectedKpi.createdBy}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Created At</h4>
                      <p className="text-sm text-gray-600">{new Date(selectedKpi.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Updated At</h4>
                      <p className="text-sm text-gray-600">{new Date(selectedKpi.updatedAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                {/* KPI Visualization */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Visualization</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedKpi.visualsAvailable.includes('line') && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Trend Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <LineChart 
                            data={revenueData.data} 
                            labels={revenueData.labels} 
                            title={selectedKpi.title} 
                            height={200}
                          />
                        </CardContent>
                      </Card>
                    )}
                    
                    {selectedKpi.visualsAvailable.includes('bar') && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Comparison</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <BarChart 
                            data={customerData.data} 
                            labels={customerData.labels} 
                            title={selectedKpi.title} 
                            height={200}
                          />
                        </CardContent>
                      </Card>
                    )}
                    
                    {selectedKpi.visualsAvailable.includes('pie') && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <DoughnutChart 
                            data={marketShareData.data} 
                            labels={marketShareData.labels} 
                            title={selectedKpi.title} 
                            height={200}
                          />
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Dashboard content */}
      {!selectedAsset && !selectedKpi && (
        <>
          {/* Charts section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Key Metrics Overview</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart 
                    data={revenueData.data} 
                    labels={revenueData.labels} 
                    title="Revenue Trend" 
                    height={200}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Customer Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <BarChart 
                    data={customerData.data} 
                    labels={customerData.labels} 
                    title="Customer Growth" 
                    height={200}
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Market Share</CardTitle>
                </CardHeader>
                <CardContent>
                  <DoughnutChart 
                    data={marketShareData.data} 
                    labels={marketShareData.labels} 
                    title="Market Share" 
                    height={200}
                  />
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Recent KPIs section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent KPIs</h2>
              <Button variant="outline">View All KPIs</Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {kpis.slice(0, 3).map((kpi) => (
                  <KPICard 
                    key={kpi.id} 
                    kpi={kpi} 
                    onSelect={handleKpiSelect}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Assets section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Assets</h2>
              <Button 
                variant="outline"
                onClick={toggleExpandedAssetSection}
              >
                {expandedAssetSection ? 'Show Less' : 'View More'}
              </Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mt-2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {assets.slice(0, expandedAssetSection ? 6 : 3).map((asset) => (
                  <AssetCard 
                    key={asset.id} 
                    asset={asset} 
                    onSelect={handleAssetSelect}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Quick Stats section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Total KPIs */}
              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total KPIs</p>
                    <p className="text-2xl font-bold text-gray-900">{kpis.length}</p>
                  </div>
                  <div className="rounded-full bg-blue-100 p-3 text-blue-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z" 
                        clipRule="evenodd" 
                      />
                      <path 
                        fillRule="evenodd" 
                        d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
              
              {/* Total Assets */}
              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Assets</p>
                    <p className="text-2xl font-bold text-gray-900">{assets.length}</p>
                  </div>
                  <div className="rounded-full bg-green-100 p-3 text-green-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                    >
                      <path 
                        d="M11.644 1.59a.75.75 0 01.712 0l9.75 5.25a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.712 0l-9.75-5.25a.75.75 0 010-1.32l9.75-5.25z" 
                      />
                      <path 
                        d="M3.265 10.602l7.668 4.129a2.25 2.25 0 002.134 0l7.668-4.13 1.37.739a.75.75 0 010 1.32l-9.75 5.25a.75.75 0 01-.71 0l-9.75-5.25a.75.75 0 010-1.32l1.37-.738z" 
                      />
                      <path 
                        d="M10.933 19.231l-7.668-4.13-1.37.739a.75.75 0 000 1.32l9.75 5.25c.221.12.489.12.71 0l9.75-5.25a.75.75 0 000-1.32l-1.37-.738-7.668 4.13a2.25 2.25 0 01-2.134-.001z" 
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
              
              {/* Favorites */}
              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Favorites</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {assets.filter(a => a.isFavorite).length + kpis.filter(k => k.isFavorite).length}
                    </p>
                  </div>
                  <div className="rounded-full bg-yellow-100 p-3 text-yellow-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
              
              {/* Recently Updated */}
              <Card>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Recently Updated</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {[...assets, ...kpis]
                        .filter(item => new Date(item.updatedAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
                        .length}
                    </p>
                  </div>
                  <div className="rounded-full bg-purple-100 p-3 text-purple-600">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-6 h-6"
                    >
                      <path 
                        fillRule="evenodd" 
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" 
                        clipRule="evenodd" 
                      />
                    </svg>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}
