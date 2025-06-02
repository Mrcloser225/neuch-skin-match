
import { supabase } from '@/integrations/supabase/client';

export interface AIRecommendation {
  brand: string;
  productName: string;
  shade: string;
  match: number;
  confidence: number;
  reasons: string[];
  pricePoint: string;
  specialFeatures: string[];
  color: string;
}

export interface UserPreferences {
  budget?: 'drugstore' | 'mid-range' | 'high-end' | 'luxury';
  coverage?: 'light' | 'medium' | 'full';
  finish?: 'matte' | 'satin' | 'dewy' | 'natural';
  ethical?: boolean;
  crueltyFree?: boolean;
  vegan?: boolean;
}

export const getAIRecommendations = async (
  skinTone: string,
  undertone: string,
  skinConditions: string[] = [],
  preferences: UserPreferences = {}
): Promise<AIRecommendation[]> => {
  try {
    const { data, error } = await supabase.functions.invoke('ai-makeup-recommendations', {
      body: {
        skinTone,
        undertone,
        skinConditions,
        preferences
      }
    });

    if (error) {
      console.error('Error calling AI recommendations:', error);
      throw new Error('Failed to get AI recommendations');
    }

    return data.recommendations || [];
  } catch (error) {
    console.error('Error in getAIRecommendations:', error);
    throw error;
  }
};

export const getPricePointLabel = (pricePoint: string): string => {
  const labels: Record<string, string> = {
    '$': 'Drugstore',
    '$$': 'Mid-Range',
    '$$$': 'High-End',
    '$$$$': 'Luxury'
  };
  return labels[pricePoint] || 'Unknown';
};

export const getPricePointColor = (pricePoint: string): string => {
  const colors: Record<string, string> = {
    '$': 'bg-green-100 text-green-800',
    '$$': 'bg-blue-100 text-blue-800', 
    '$$$': 'bg-purple-100 text-purple-800',
    '$$$$': 'bg-amber-100 text-amber-800'
  };
  return colors[pricePoint] || 'bg-gray-100 text-gray-800';
};
