import type { Meta, StoryObj } from '@storybook/react';
import { AssetCard } from './asset-card';

const meta: Meta<typeof AssetCard> = {
  title: 'Dashboard/AssetCard',
  component: AssetCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AssetCard>;

export const Dashboard: Story = {
  args: {
    asset: {
      id: 'asset-1',
      title: 'Sales Performance Dashboard',
      description: 'A comprehensive dashboard for monitoring sales performance metrics and KPIs.',
      type: 'dashboard',
      url: '/assets/asset-1',
      createdAt: new Date(2024, 5, 15).toISOString(),
      updatedAt: new Date(2024, 5, 20).toISOString(),
      createdBy: 'John Smith',
      isFavorite: false,
    },
    onSelect: (asset) => console.log('Selected Asset:', asset),
  },
};

export const Report: Story = {
  args: {
    asset: {
      id: 'asset-2',
      title: 'Marketing Analysis Report',
      description: 'Detailed analysis of marketing performance with insights and recommendations.',
      type: 'report',
      url: '/assets/asset-2',
      createdAt: new Date(2024, 4, 10).toISOString(),
      updatedAt: new Date(2024, 6, 1).toISOString(),
      createdBy: 'Emma Johnson',
      isFavorite: true,
    },
    onSelect: (asset) => console.log('Selected Asset:', asset),
  },
};

export const Document: Story = {
  args: {
    asset: {
      id: 'asset-3',
      title: 'HR Strategy Document',
      description: 'Strategic plan and guidelines for HR initiatives.',
      type: 'document',
      url: '/assets/asset-3',
      createdAt: new Date(2024, 3, 20).toISOString(),
      updatedAt: new Date(2024, 5, 25).toISOString(),
      createdBy: 'Michael Chen',
      isFavorite: false,
    },
    onSelect: (asset) => console.log('Selected Asset:', asset),
  },
};

export const Visualization: Story = {
  args: {
    asset: {
      id: 'asset-4',
      title: 'Revenue Growth Visualization',
      description: 'Interactive visualization of revenue growth data and trends.',
      type: 'visualization',
      url: '/assets/asset-4',
      createdAt: new Date(2024, 2, 5).toISOString(),
      updatedAt: new Date(2024, 5, 10).toISOString(),
      createdBy: 'Sarah Williams',
      isFavorite: true,
    },
    onSelect: (asset) => console.log('Selected Asset:', asset),
  },
};
