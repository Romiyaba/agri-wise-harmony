
// Mock database for farm and market data (in a real app, this would connect to SQLite)
import { faker } from '@faker-js/faker';

// Type definitions
export interface FarmData {
  farm_id: number;
  soil_ph: number;
  soil_moisture: number;
  temperature: number;
  rainfall_mm: number;
  crop_type: string;
  fertilizer_usage: number;
  pesticide_usage: number;
  crop_yield: number;
  sustainability_score: number;
}

export interface MarketData {
  market_id: number;
  product: string;
  market_price: number;
  demand_index: number;
  supply_index: number;
  competition_level: number;
  economic_factor: number;
  weather_impact: number;
  seasonality: string;
  consumer_trend_index: number;
}

export interface FarmerProfile {
  id: number;
  name: string;
  location: string;
  land_size: number;
  crop_history: string[];
  financial_goal: string;
  sustainability_goal: string;
}

// Sample data for the database (based on provided images)
const farmDataset: FarmData[] = [
  { farm_id: 1, soil_ph: 7.07, soil_moisture: 49.15, temperature: 26.67, rainfall_mm: 227.89, crop_type: 'Wheat', fertilizer_usage: 131.69, pesticide_usage: 2.96, crop_yield: 1.58, sustainability_score: 51.91 },
  { farm_id: 2, soil_ph: 6.24, soil_moisture: 21.5, temperature: 29.33, rainfall_mm: 244.02, crop_type: 'Soybean', fertilizer_usage: 136.37, pesticide_usage: 19.2, crop_yield: 3.82, sustainability_score: 47.16 },
  { farm_id: 3, soil_ph: 5.92, soil_moisture: 19.47, temperature: 17.67, rainfall_mm: 141.11, crop_type: 'Corn', fertilizer_usage: 99.73, pesticide_usage: 11.04, crop_yield: 1.13, sustainability_score: 50.15 },
  { farm_id: 4, soil_ph: 6.85, soil_moisture: 27.97, temperature: 17.19, rainfall_mm: 156.79, crop_type: 'Wheat', fertilizer_usage: 194.83, pesticide_usage: 8.81, crop_yield: 8.87, sustainability_score: 89.76 },
  { farm_id: 5, soil_ph: 6.93, soil_moisture: 33.64, temperature: 23.6, rainfall_mm: 77.85, crop_type: 'Corn', fertilizer_usage: 57.27, pesticide_usage: 3.75, crop_yield: 8.78, sustainability_score: 51.03 },
  { farm_id: 6, soil_ph: 6.13, soil_moisture: 15.94, temperature: 30.45, rainfall_mm: 296.62, crop_type: 'Rice', fertilizer_usage: 96.48, pesticide_usage: 3.27, crop_yield: 2.04, sustainability_score: 23.03 },
  { farm_id: 7, soil_ph: 7.41, soil_moisture: 41.56, temperature: 25.77, rainfall_mm: 54.35, crop_type: 'Soybean', fertilizer_usage: 159.21, pesticide_usage: 13.67, crop_yield: 6.18, sustainability_score: 88.87 },
  { farm_id: 8, soil_ph: 7.02, soil_moisture: 35.17, temperature: 22.72, rainfall_mm: 292.36, crop_type: 'Soybean', fertilizer_usage: 180.44, pesticide_usage: 18.57, crop_yield: 5.22, sustainability_score: 44.02 },
  { farm_id: 9, soil_ph: 5.53, soil_moisture: 12.67, temperature: 15.35, rainfall_mm: 183.93, crop_type: 'Wheat', fertilizer_usage: 191.53, pesticide_usage: 3.24, crop_yield: 7.8, sustainability_score: 80.16 },
  { farm_id: 10, soil_ph: 6.27, soil_moisture: 13.36, temperature: 23.03, rainfall_mm: 199.65, crop_type: 'Soybean', fertilizer_usage: 58.52, pesticide_usage: 13.67, crop_yield: 6.22, sustainability_score: 82.93 },
];

const marketDataset: MarketData[] = [
  { market_id: 1, product: 'Rice', market_price: 180.25, demand_index: 196.09, supply_index: 199.51, competition_level: 300.55, economic_factor: 1.09, weather_impact: 28.47, seasonality: 'Medium', consumer_trend_index: 148.47 },
  { market_id: 2, product: 'Rice', market_price: 420.53, demand_index: 188.45, supply_index: 150.79, competition_level: 492.1, economic_factor: 0.53, weather_impact: 70.98, seasonality: 'High', consumer_trend_index: 97.3 },
  { market_id: 3, product: 'Wheat', market_price: 457.26, demand_index: 171.18, supply_index: 78.99, competition_level: 323.0, economic_factor: 1.29, weather_impact: 80.85, seasonality: 'Low', consumer_trend_index: 131.11 },
  { market_id: 4, product: 'Soybean', market_price: 237.18, demand_index: 196.97, supply_index: 50.46, competition_level: 233.0, economic_factor: 0.63, weather_impact: 60.68, seasonality: 'Low', consumer_trend_index: 95.17 },
  { market_id: 5, product: 'Wheat', market_price: 324.03, demand_index: 113.17, supply_index: 145.88, competition_level: 312.43, economic_factor: 1.49, weather_impact: 45.38, seasonality: 'Low', consumer_trend_index: 130.3 },
  { market_id: 6, product: 'Corn', market_price: 389.65, demand_index: 123.09, supply_index: 190.91, competition_level: 181.94, economic_factor: 0.88, weather_impact: 81.37, seasonality: 'Low', consumer_trend_index: 77.25 },
  { market_id: 7, product: 'Rice', market_price: 155.9, demand_index: 70.2, supply_index: 96.27, competition_level: 265.92, economic_factor: 1.23, weather_impact: 88.33, seasonality: 'High', consumer_trend_index: 107.45 },
  { market_id: 8, product: 'Rice', market_price: 321.73, demand_index: 138.08, supply_index: 52.26, competition_level: 187.68, economic_factor: 1.48, weather_impact: 14.62, seasonality: 'Low', consumer_trend_index: 103.24 },
  { market_id: 9, product: 'Soybean', market_price: 447.41, demand_index: 188.32, supply_index: 171.83, competition_level: 210.5, economic_factor: 0.71, weather_impact: 29.15, seasonality: 'Low', consumer_trend_index: 141.32 },
  { market_id: 10, product: 'Corn', market_price: 218.13, demand_index: 58.5, supply_index: 92.44, competition_level: 428.67, economic_factor: 0.79, weather_impact: 78.89, seasonality: 'High', consumer_trend_index: 80.22 },
];

// Sample farmer profiles
const farmerProfiles: FarmerProfile[] = [
  {
    id: 1,
    name: 'John Smith',
    location: 'California',
    land_size: 5,
    crop_history: ['Corn', 'Wheat', 'Soybean'],
    financial_goal: 'Increase profit by 15%',
    sustainability_goal: 'Reduce water usage by 20%'
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    location: 'Iowa',
    land_size: 12,
    crop_history: ['Corn', 'Soybean'],
    financial_goal: 'Stabilize income',
    sustainability_goal: 'Improve soil health'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    location: 'Nebraska',
    land_size: 8,
    crop_history: ['Wheat', 'Corn'],
    financial_goal: 'Maximize yield',
    sustainability_goal: 'Reduce carbon footprint'
  }
];

// Get all farm data
export const getFarmData = (): FarmData[] => {
  return farmDataset;
};

// Get all market data
export const getMarketData = (): MarketData[] => {
  return marketDataset;
};

// Get farmer profile by ID
export const getFarmerProfile = (id: number): FarmerProfile | undefined => {
  return farmerProfiles.find(farmer => farmer.id === id);
};

// Get all farmer profiles
export const getAllFarmerProfiles = (): FarmerProfile[] => {
  return farmerProfiles;
};

// Add a new farmer profile
export const addFarmerProfile = (profile: Omit<FarmerProfile, 'id'>): FarmerProfile => {
  const newProfile = {
    ...profile,
    id: farmerProfiles.length + 1
  };
  farmerProfiles.push(newProfile);
  return newProfile;
};

// Get market data for specific crop
export const getMarketDataForCrop = (cropType: string): MarketData[] => {
  return marketDataset.filter(data => data.product.toLowerCase() === cropType.toLowerCase());
};

// Get farm data for specific crop
export const getFarmDataForCrop = (cropType: string): FarmData[] => {
  return farmDataset.filter(data => data.crop_type.toLowerCase() === cropType.toLowerCase());
};

// Get sustainability score averages by crop type
export const getSustainabilityScoresByCrop = (): Record<string, number> => {
  const crops = [...new Set(farmDataset.map(farm => farm.crop_type))];
  const scores: Record<string, number> = {};
  
  crops.forEach(crop => {
    const farmDataForCrop = farmDataset.filter(farm => farm.crop_type === crop);
    const averageScore = farmDataForCrop.reduce((sum, farm) => sum + farm.sustainability_score, 0) / farmDataForCrop.length;
    scores[crop] = parseFloat(averageScore.toFixed(2));
  });
  
  return scores;
};

// Get market trends for each crop type (based on demand and price)
export const getMarketTrends = (): Record<string, { trend: string, price: number, demand: number }> => {
  const crops = [...new Set(marketDataset.map(market => market.product))];
  const trends: Record<string, { trend: string, price: number, demand: number }> = {};
  
  crops.forEach(crop => {
    const marketDataForCrop = marketDataset.filter(market => market.product === crop);
    const averagePrice = marketDataForCrop.reduce((sum, market) => sum + market.market_price, 0) / marketDataForCrop.length;
    const averageDemand = marketDataForCrop.reduce((sum, market) => sum + market.demand_index, 0) / marketDataForCrop.length;
    
    let trend = 'Stable';
    if (averageDemand > 150 && averagePrice > 300) {
      trend = 'Rising';
    } else if (averageDemand < 100 || averagePrice < 200) {
      trend = 'Declining';
    }
    
    trends[crop] = {
      trend,
      price: parseFloat(averagePrice.toFixed(2)),
      demand: parseFloat(averageDemand.toFixed(2))
    };
  });
  
  return trends;
};

// Get weather impact on crops
export const getWeatherImpact = (): Record<string, number> => {
  const crops = [...new Set(marketDataset.map(market => market.product))];
  const impacts: Record<string, number> = {};
  
  crops.forEach(crop => {
    const marketDataForCrop = marketDataset.filter(market => market.product === crop);
    const averageImpact = marketDataForCrop.reduce((sum, market) => sum + market.weather_impact, 0) / marketDataForCrop.length;
    impacts[crop] = parseFloat(averageImpact.toFixed(2));
  });
  
  return impacts;
};
