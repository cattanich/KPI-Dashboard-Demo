import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { KPI } from '@/types';
import { formatDate } from '@/lib/utils';
import { useAppStore } from '@/store/app-store';

interface KPICardProps {
  kpi: KPI;
  onSelect?: (kpi: KPI) => void;
}

export const KPICard: React.FC<KPICardProps> = ({ kpi, onSelect }) => {
  const { toggleKpiFavorite } = useAppStore();
  
  // Handle favorite toggle
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleKpiFavorite(kpi.id);
  };
  
  // Handle card click
  const handleCardClick = () => {
    if (onSelect) {
      onSelect(kpi);
    }
  };
  
  return (
    <Card 
      isHoverable 
      className="cursor-pointer transition-all duration-200 hover:translate-y-[-2px]"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{kpi.title}</CardTitle>
          <button 
            onClick={handleFavoriteToggle}
            className="text-gray-400 hover:text-yellow-500"
            aria-label={kpi.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {kpi.isFavorite ? (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
                className="w-6 h-6 text-yellow-500"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" 
                  clipRule="evenodd" 
                />
              </svg>
            ) : (
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" 
                />
              </svg>
            )}
          </button>
        </div>
        <CardDescription className="mt-1">{kpi.description}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-4">
          {/* Business Questions */}
          {kpi.businessQuestions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-1">Business Questions:</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {kpi.businessQuestions.map((question, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Calculation */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Calculation:</h4>
            <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">{kpi.calculation}</p>
          </div>
          
          {/* Available Visualizations */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Available Visualizations:</h4>
            <div className="flex flex-wrap gap-2">
              {kpi.visualsAvailable.map((visual, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                >
                  {visual.charAt(0).toUpperCase() + visual.slice(1)}
                </span>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="justify-between text-xs text-gray-500 border-t pt-4">
        <div>Created by {kpi.createdBy}</div>
        <div>Updated {formatDate(kpi.updatedAt)}</div>
      </CardFooter>
    </Card>
  );
};
