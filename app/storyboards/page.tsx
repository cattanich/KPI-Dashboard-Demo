'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { SearchBar } from '@/components/dashboard/search-bar';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

export default function StoryboardsPage() {
  // Sample storyboards
  const storyboards = [
    {
      id: 'story-1',
      name: 'Q2 2025 Executive Summary',
      description: 'Key performance highlights for Q2 2025 presented for the executive team',
      kpiCount: 5,
      createdBy: 'Emma Johnson',
      lastUpdated: '2025-05-15',
    },
    {
      id: 'story-2',
      name: 'Marketing ROI Analysis',
      description: 'Comprehensive analysis of marketing campaign ROI across different channels',
      kpiCount: 8,
      createdBy: 'Michael Chen',
      lastUpdated: '2025-06-02',
    },
    {
      id: 'story-3',
      name: 'Sales Performance by Region',
      description: 'Regional breakdown of sales performance with trend analysis',
      kpiCount: 6,
      createdBy: 'Sarah Williams',
      lastUpdated: '2025-05-28',
    },
    {
      id: 'story-4',
      name: 'Customer Satisfaction Metrics',
      description: 'Analysis of customer satisfaction metrics across product lines',
      kpiCount: 4,
      createdBy: 'John Smith',
      lastUpdated: '2025-06-10',
    },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Storyboards</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create and manage storyboards for data presentation
        </p>
      </div>
      
      <div className="mb-6">
        <SearchBar />
      </div>
      
      <div className="mb-6">
        <Button className="mb-6">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor" 
            className="w-5 h-5 mr-2"
          >
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
          </svg>
          Create New Storyboard
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {storyboards.map((storyboard) => (
          <Card 
            key={storyboard.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
          >
            <CardHeader>
              <CardTitle>{storyboard.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">{storyboard.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                <span>KPIs: {storyboard.kpiCount}</span>
                <span>Last updated: {storyboard.lastUpdated}</span>
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 flex justify-between">
              <span className="text-sm text-gray-500">Created by {storyboard.createdBy}</span>
              <Button variant="outline" size="sm">
                View
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
