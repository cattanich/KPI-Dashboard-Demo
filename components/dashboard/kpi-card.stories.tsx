import type { Meta, StoryObj } from '@storybook/react';
import { KPICard } from './kpi-card';

const meta: Meta<typeof KPICard> = {
  title: 'Dashboard/KPICard',
  component: KPICard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof KPICard>;

export const Default: Story = {
  args: {
    kpi: {
      id: 'kpi-1',
      title: 'Revenue Growth Rate',
      description: 'Measures the revenue growth rate for the organization.',
      metricIds: ['metric-1', 'metric-2'],
      businessQuestions: [
        'How is our revenue trending over time?',
        'Which regions are growing fastest?'
      ],
      calculation: '((Current Period Revenue - Previous Period Revenue) / Previous Period Revenue) * 100',
      visualsAvailable: ['line', 'bar'],
      affiliateApplicability: ['US East', 'Europe', 'Asia Pacific'],
      createdAt: new Date(2024, 5, 15).toISOString(),
      updatedAt: new Date(2024, 5, 20).toISOString(),
      createdBy: 'John Smith',
      isFavorite: false,
    },
    onSelect: (kpi) => console.log('Selected KPI:', kpi),
  },
};

export const Favorite: Story = {
  args: {
    kpi: {
      id: 'kpi-2',
      title: 'Customer Acquisition Cost',
      description: 'Measures the average cost to acquire a new customer.',
      metricIds: ['metric-3', 'metric-4'],
      businessQuestions: [
        'How much are we spending to acquire new customers?',
        'Is our customer acquisition cost increasing or decreasing?'
      ],
      calculation: 'Total Marketing and Sales Costs / Number of New Customers',
      visualsAvailable: ['pie', 'card'],
      affiliateApplicability: ['US West', 'Latin America'],
      createdAt: new Date(2024, 4, 10).toISOString(),
      updatedAt: new Date(2024, 6, 1).toISOString(),
      createdBy: 'Emma Johnson',
      isFavorite: true,
    },
    onSelect: (kpi) => console.log('Selected KPI:', kpi),
  },
};

export const LongDescription: Story = {
  args: {
    kpi: {
      id: 'kpi-3',
      title: 'Customer Lifetime Value',
      description: 'This metric calculates the total expected revenue from a customer throughout their relationship with the company. It is a critical metric for understanding the long-term value of customer acquisition and retention strategies.',
      metricIds: ['metric-5', 'metric-6'],
      businessQuestions: [
        'What is the long-term value of our customers?',
        'How does customer lifetime value vary by segment?',
        'Is our customer lifetime value increasing or decreasing over time?'
      ],
      calculation: 'Average Revenue per Customer * Average Customer Lifespan',
      visualsAvailable: ['line', 'table', 'card'],
      affiliateApplicability: ['US East', 'US West', 'Europe', 'Asia Pacific'],
      createdAt: new Date(2024, 3, 20).toISOString(),
      updatedAt: new Date(2024, 5, 25).toISOString(),
      createdBy: 'Michael Chen',
      isFavorite: false,
    },
    onSelect: (kpi) => console.log('Selected KPI:', kpi),
  },
};
