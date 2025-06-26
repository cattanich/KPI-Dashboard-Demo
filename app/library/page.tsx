'use client';

import React, { useEffect, useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { SearchBar } from '@/components/dashboard/search-bar';
import { KPICard } from '@/components/dashboard/kpi-card';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useAppStore } from '@/store/app-store';
import { generateMockKPIs } from '@/lib/mock-data';
import { KPI, VisualType } from '@/types';
import { LineChart, BarChart, DoughnutChart } from '@/components/charts/charts';

export default function LibraryPage() {
  const {
    kpis,
    filteredKpis,
    selectedKpi,
    setKpis,
    selectKpi,
  } = useAppStore();
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'featured' | 'trending'>('featured');
  const [filterVisual, setFilterVisual] = useState<VisualType | null>(null);
  
  // Initialize with mock data
  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an API call
        const mockKpis = generateMockKPIs(15);
        
        // Set data in store
        setKpis(mockKpis);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [setKpis]);
  
  // Handle KPI selection
  const handleKpiSelect = (kpi: KPI) => {
    selectKpi(kpi);
  };
  
  // Handle clear selection
  const handleClearSelection = () => {
    selectKpi(null);
  };
  
  // Filter KPIs by visual type
  const filteredByVisualKpis = filterVisual
    ? kpis.filter(kpi => kpi.visualsAvailable.includes(filterVisual))
    : kpis;
  
  // Get featured KPIs (for this demo, we'll use the first 6)
  const featuredKpis = filteredByVisualKpis.slice(0, 6);
  
  // Get trending KPIs (for this demo, we'll use some with specific visual types)
  const trendingKpis = filteredByVisualKpis.filter(kpi => 
    kpi.visualsAvailable.includes('line') || kpi.visualsAvailable.includes('bar')
  ).slice(0, 6);
  
  // Displayed KPIs based on active tab
  const displayedKpis = activeTab === 'featured' ? featuredKpis : trendingKpis;
  
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
        <h1 className="text-3xl font-bold text-gray-900">KPI Library</h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse for KPIs created by your team
        </p>
      </div>
      
      <div className="mb-6">
        <SearchBar />
      </div>
      
      {selectedKpi ? (
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
            Back to Library
          </Button>
        </div>
      ) : null}
      
      {/* Selected KPI details */}
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
      
      {/* Library content */}
      {!selectedKpi && (
        <>
          {/* Top KPIs Overview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Top KPI Performance</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <LineChart 
                    data={revenueData.data} 
                    labels={revenueData.labels} 
                    title="Revenue Growth Rate" 
                    height={200}
                    color="#6d28d9"
                  />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Market Share Distribution</CardTitle>
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
          
          {/* Visualization filter */}
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900 mb-3">Filter by Visualization Type</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={filterVisual === null ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setFilterVisual(null)}
              >
                All
              </Button>
              {(['bar', 'line', 'pie', 'table', 'card'] as VisualType[]).map((type) => (
                <Button
                  key={type}
                  variant={filterVisual === type ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setFilterVisual(type)}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex -mb-px">
              <button
                className={`py-2 px-4 text-sm font-medium ${
                  activeTab === 'featured'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('featured')}
              >
                Featured
              </button>
              <button
                className={`ml-8 py-2 px-4 text-sm font-medium ${
                  activeTab === 'trending'
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }`}
                onClick={() => setActiveTab('trending')}
              >
                Trending
              </button>
            </div>
          </div>
          
          {/* KPI grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
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
          ) : displayedKpis.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedKpis.map((kpi) => (
                <KPICard 
                  key={kpi.id} 
                  kpi={kpi} 
                  onSelect={handleKpiSelect}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No KPIs found</h3>
              <p className="mt-1 text-sm text-gray-500">
                {filterVisual
                  ? `No KPIs with ${filterVisual} visualization are available.`
                  : 'No KPIs are available.'}
              </p>
              <div className="mt-6">
                <Button
                  onClick={() => setFilterVisual(null)}
                >
                  Clear Filter
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </MainLayout>
  );
}
