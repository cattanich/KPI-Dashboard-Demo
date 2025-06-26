'use client';

import React from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { SearchBar } from '@/components/dashboard/search-bar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function DataModelsPage() {
  // Sample data models
  const dataModels = [
    {
      id: 'model-1',
      name: 'Sales Data Model',
      description: 'Core data model for sales analytics and reporting',
      endpoints: ['sales/transactions', 'sales/customers', 'sales/products'],
    },
    {
      id: 'model-2',
      name: 'Marketing Performance Model',
      description: 'Data model for marketing campaign performance analysis',
      endpoints: ['marketing/campaigns', 'marketing/channels', 'marketing/audience'],
    },
    {
      id: 'model-3',
      name: 'Customer Insights Model',
      description: 'Comprehensive customer data for segmentation and analysis',
      endpoints: ['customers/profiles', 'customers/behavior', 'customers/feedback'],
    },
    {
      id: 'model-4',
      name: 'Operations Data Model',
      description: 'Operational metrics and performance indicators',
      endpoints: ['operations/efficiency', 'operations/resources', 'operations/timeline'],
    },
  ];

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Data Models</h1>
        <p className="mt-2 text-sm text-gray-600">
          Explore and manage data models for KPI calculation
        </p>
      </div>
      
      <div className="mb-6">
        <SearchBar />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dataModels.map((model) => (
          <Card key={model.id} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>{model.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-gray-600">{model.description}</p>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">Available Endpoints:</h4>
                <ul className="space-y-1">
                  {model.endpoints.map((endpoint, index) => (
                    <li key={index} className="text-sm text-gray-600 bg-gray-50 py-1 px-2 rounded">
                      {endpoint}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </MainLayout>
  );
}
