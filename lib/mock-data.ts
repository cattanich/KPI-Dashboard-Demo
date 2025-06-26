import { Asset, KPI, AssetType, VisualType } from '@/types';

// Generate random date within the past year
const getRandomDate = () => {
  const now = new Date();
  const pastYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  const randomTime = pastYear.getTime() + Math.random() * (now.getTime() - pastYear.getTime());
  return new Date(randomTime).toISOString();
};

// Generate random creator name
const creators = [
  'John Smith', 
  'Emma Johnson', 
  'Michael Chen', 
  'Sarah Williams', 
  'David Rodriguez'
];

const getRandomCreator = () => {
  return creators[Math.floor(Math.random() * creators.length)];
};

// Generate random asset type
const assetTypes: AssetType[] = ['dashboard', 'report', 'document', 'visualization'];

const getRandomAssetType = () => {
  return assetTypes[Math.floor(Math.random() * assetTypes.length)];
};

// Generate random visual types
const visualTypes: VisualType[] = ['bar', 'line', 'pie', 'table', 'card'];

const getRandomVisualTypes = () => {
  const count = Math.floor(Math.random() * 4) + 1; // 1 to 4 visual types
  const result: VisualType[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomType = visualTypes[Math.floor(Math.random() * visualTypes.length)];
    if (!result.includes(randomType)) {
      result.push(randomType);
    }
  }
  
  return result;
};

// Generate random affiliates
const affiliates = [
  'US East', 
  'US West', 
  'Europe', 
  'Asia Pacific', 
  'Latin America', 
  'Middle East'
];

const getRandomAffiliates = () => {
  const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 affiliates
  const result: string[] = [];
  
  for (let i = 0; i < count; i++) {
    const randomAffiliate = affiliates[Math.floor(Math.random() * affiliates.length)];
    if (!result.includes(randomAffiliate)) {
      result.push(randomAffiliate);
    }
  }
  
  return result;
};

// Generate random business questions
const businessQuestions = [
  'How is our market share trending over time?',
  'What is the revenue growth compared to last year?',
  'Which regions are performing above target?',
  'What is our customer retention rate?',
  'How does our product performance compare to competitors?',
  'What is the ROI of our marketing campaigns?',
  'Which customer segments are most profitable?',
  'What is our operational efficiency ratio?',
  'How effective are our sales channels?',
  'What is the impact of price changes on demand?'
];

const getRandomBusinessQuestions = () => {
  const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 questions
  const result: string[] = [];
  const availableQuestions = [...businessQuestions];
  
  for (let i = 0; i < count; i++) {
    if (availableQuestions.length === 0) break;
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    result.push(availableQuestions[randomIndex]);
    availableQuestions.splice(randomIndex, 1);
  }
  
  return result;
};

// Generate random business domain
const businessDomains = [
  'Sales', 
  'Marketing', 
  'Finance', 
  'Operations', 
  'HR', 
  'R&D', 
  'Customer Service', 
  'Supply Chain',
  'Product', 
  'Market'
];

const getRandomBusinessDomain = () => {
  return businessDomains[Math.floor(Math.random() * businessDomains.length)];
};

// Generate mock assets
export const generateMockAssets = (count: number = 20): Asset[] => {
  const assets: Asset[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = `asset-${i + 1}`;
    const type = getRandomAssetType();
    const createdAt = getRandomDate();
    const updatedAt = new Date(new Date(createdAt).getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
    
    let title = '';
    let description = '';
    
    switch (type) {
      case 'dashboard':
        title = `${getRandomBusinessDomain()} Performance Dashboard`;
        description = `A comprehensive dashboard for monitoring ${getRandomBusinessDomain().toLowerCase()} performance metrics and KPIs.`;
        break;
      case 'report':
        title = `${getRandomBusinessDomain()} Analysis Report`;
        description = `Detailed analysis of ${getRandomBusinessDomain().toLowerCase()} performance with insights and recommendations.`;
        break;
      case 'document':
        title = `${getRandomBusinessDomain()} Strategy Document`;
        description = `Strategic plan and guidelines for ${getRandomBusinessDomain().toLowerCase()} initiatives.`;
        break;
      case 'visualization':
        title = `${getRandomBusinessDomain()} Data Visualization`;
        description = `Interactive visualization of ${getRandomBusinessDomain().toLowerCase()} data and trends.`;
        break;
    }
    
    assets.push({
      id,
      title,
      description,
      type,
      url: `/assets/${id}`,
      createdAt,
      updatedAt,
      createdBy: getRandomCreator(),
      isFavorite: Math.random() > 0.8, // 20% chance of being a favorite
    });
  }
  
  return assets;
};

// Generate mock KPIs
export const generateMockKPIs = (count: number = 15): KPI[] => {
  const kpis: KPI[] = [];
  
  const kpiTitles = [
    'Revenue Growth Rate',
    'Customer Acquisition Cost',
    'Customer Lifetime Value',
    'Net Promoter Score',
    'Gross Profit Margin',
    'Market Share',
    'Employee Turnover Rate',
    'Return on Investment',
    'Operating Cash Flow',
    'Product Defect Rate',
    'Sales Conversion Rate',
    'Website Traffic Growth',
    'Brand Awareness Index',
    'Customer Satisfaction Score',
    'Supply Chain Efficiency'
  ];

  const kpiCalculations = [
    '((Current Period Revenue - Previous Period Revenue) / Previous Period Revenue) * 100',
    'Total Marketing and Sales Costs / Number of New Customers',
    'Average Revenue per Customer * Average Customer Lifespan',
    '(% Promoters - % Detractors)',
    '((Revenue - Cost of Goods Sold) / Revenue) * 100',
    '(Company Sales / Total Market Sales) * 100',
    '(Number of Employees who Left / Average Total Employees) * 100',
    '(Net Profit / Cost of Investment) * 100',
    'Net Income + Depreciation - Capital Expenditures - Change in Working Capital',
    '(Number of Defective Units / Total Units Produced) * 100',
    '(Number of Sales / Number of Leads) * 100',
    '((Current Period Traffic - Previous Period Traffic) / Previous Period Traffic) * 100',
    'Weighted average of awareness metrics from market research',
    'Average rating on a 1-10 scale from customer surveys',
    'Order Fulfillment Time + Inventory Turnover Rate'
  ];
  
  for (let i = 0; i < count; i++) {
    const id = `kpi-${i + 1}`;
    const titleIndex = i % kpiTitles.length;
    const createdAt = getRandomDate();
    const updatedAt = new Date(new Date(createdAt).getTime() + Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
    
    kpis.push({
      id,
      title: kpiTitles[titleIndex],
      description: `Measures the ${kpiTitles[titleIndex].toLowerCase()} for the organization.`,
      metricIds: [`metric-${Math.floor(Math.random() * 20) + 1}`, `metric-${Math.floor(Math.random() * 20) + 1}`],
      businessQuestions: getRandomBusinessQuestions(),
      calculation: kpiCalculations[titleIndex],
      visualsAvailable: getRandomVisualTypes(),
      affiliateApplicability: getRandomAffiliates(),
      createdAt,
      updatedAt,
      createdBy: getRandomCreator(),
      isFavorite: Math.random() > 0.8, // 20% chance of being a favorite
    });
  }
  
  return kpis;
};
