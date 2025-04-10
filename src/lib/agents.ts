
import { 
  getFarmData, 
  getMarketData, 
  getSustainabilityScoresByCrop, 
  getMarketTrends, 
  getWeatherImpact,
  FarmData,
  MarketData,
  FarmerProfile
} from './database';

// Agent response type
export interface AgentResponse {
  recommendations: string[];
  insights: string[];
  data?: any;
}

// Farmer Advisor Agent
export const farmerAdvisorAgent = (
  location: string,
  landSize: number,
  cropHistory: string[],
  financialGoal: string,
  sustainabilityGoal: string
): AgentResponse => {
  const farmData = getFarmData();
  const sustainabilityScores = getSustainabilityScoresByCrop();
  const weatherImpacts = getWeatherImpact();
  
  // Analyze land size and get suitable crops
  const suitableCrops = farmData
    .filter(farm => farm.sustainability_score > 50)
    .map(farm => farm.crop_type);
  
  // Get unique crops
  const uniqueCrops = [...new Set(suitableCrops)];
  
  // Generate insights based on crop history and goals
  const insights: string[] = [];
  const recommendations: string[] = [];
  
  // Analyze crop history
  const cropHistorySet = new Set(cropHistory);
  
  if (sustainabilityGoal.toLowerCase().includes('water')) {
    insights.push('Your goal to reduce water usage aligns with sustainable farming practices.');
    insights.push('Based on your location and land size, drought-resistant crops would be beneficial.');
    
    // Check if rice is in history (high water usage)
    if (cropHistorySet.has('Rice')) {
      insights.push('You\'ve grown rice before, which typically requires high water usage.');
      recommendations.push('Consider replacing rice with more water-efficient crops like wheat or specialized corn varieties.');
    }
    
    recommendations.push('Implement drip irrigation to optimize water usage.');
    recommendations.push('Consider drought-resistant crop varieties to maintain yield while using less water.');
  }
  
  if (financialGoal.toLowerCase().includes('profit') || financialGoal.toLowerCase().includes('income')) {
    insights.push('Your goal to increase profitability can be achieved through strategic crop selection and resource management.');
    
    // Get market trends
    const marketTrends = getMarketTrends();
    const risingCrops = Object.entries(marketTrends)
      .filter(([_, data]) => data.trend === 'Rising')
      .map(([crop, _]) => crop);
    
    if (risingCrops.length > 0) {
      insights.push(`Market trends show rising demand for: ${risingCrops.join(', ')}`);
      recommendations.push(`Consider allocating some of your ${landSize} acres to ${risingCrops[0]} to capitalize on market trends.`);
    }
  }
  
  // Location-specific insights
  if (location.toLowerCase() === 'california') {
    insights.push('California\'s climate is suitable for a variety of high-value crops but faces water scarcity challenges.');
    recommendations.push('Consider drought-tolerant crops like almonds, pistachios, or specialized wheat varieties.');
  } else if (location.toLowerCase() === 'iowa' || location.toLowerCase() === 'nebraska') {
    insights.push('Your location is ideal for corn and soybean production with good rainfall patterns.');
    recommendations.push('Rotating between corn and soybeans can help maintain soil health and reduce pest pressure.');
  }
  
  // Add general recommendations based on land size
  if (landSize < 10) {
    recommendations.push('Your small farm size could benefit from high-value specialty crops rather than commodity crops.');
    recommendations.push('Consider implementing crop diversity to minimize risk and enhance soil health.');
  } else {
    recommendations.push('Your larger farm allows for effective crop rotation strategies across fields.');
    recommendations.push('Consider dividing your land to try new profitable crops while maintaining your staple production.');
  }
  
  return {
    recommendations,
    insights,
    data: {
      sustainabilityScores,
      weatherImpacts,
    }
  };
};

// Market Researcher Agent
export const marketResearcherAgent = (
  cropTypes: string[],
  location: string,
  sustainabilityFocus: boolean
): AgentResponse => {
  const marketData = getMarketData();
  const marketTrends = getMarketTrends();
  
  const insights: string[] = [];
  const recommendations: string[] = [];
  
  // Analyze market data for requested crops
  const cropMarketData: Record<string, MarketData[]> = {};
  
  cropTypes.forEach(crop => {
    cropMarketData[crop] = marketData.filter(
      market => market.product.toLowerCase() === crop.toLowerCase()
    );
  });
  
  // Generate market insights
  cropTypes.forEach(crop => {
    const cropData = cropMarketData[crop] || [];
    
    if (cropData.length > 0) {
      // Calculate averages
      const avgPrice = cropData.reduce((sum, market) => sum + market.market_price, 0) / cropData.length;
      const avgDemand = cropData.reduce((sum, market) => sum + market.demand_index, 0) / cropData.length;
      const avgSupply = cropData.reduce((sum, market) => sum + market.supply_index, 0) / cropData.length;
      
      insights.push(`${crop} market analysis: Average price $${avgPrice.toFixed(2)}, demand index ${avgDemand.toFixed(1)}, supply index ${avgSupply.toFixed(1)}`);
      
      // Supply-demand relationship
      if (avgDemand > avgSupply * 1.2) {
        insights.push(`${crop} shows strong market potential with demand exceeding supply by ${((avgDemand / avgSupply - 1) * 100).toFixed(1)}%`);
        recommendations.push(`Consider increasing ${crop} production to capitalize on the favorable supply-demand gap`);
      } else if (avgSupply > avgDemand * 1.2) {
        insights.push(`${crop} market may be saturated with supply exceeding demand by ${((avgSupply / avgDemand - 1) * 100).toFixed(1)}%`);
        recommendations.push(`Consider reducing ${crop} production or finding specialty markets with better pricing`);
      }
      
      // Price trends
      const trend = marketTrends[crop]?.trend || 'Stable';
      insights.push(`${crop} price trend is currently: ${trend}`);
      
      // Consumer trends
      const consumerTrend = cropData.reduce((sum, market) => sum + market.consumer_trend_index, 0) / cropData.length;
      
      if (consumerTrend > 120) {
        insights.push(`${crop} has strong and growing consumer preference (index: ${consumerTrend.toFixed(1)})`);
      } else if (consumerTrend < 80) {
        insights.push(`${crop} has declining consumer preference (index: ${consumerTrend.toFixed(1)})`);
      }
    } else {
      insights.push(`No market data available for ${crop}`);
    }
  });
  
  // Location-specific market recommendations
  if (location.toLowerCase() === 'california') {
    recommendations.push('California markets favor high-value crops with strong export potential');
    recommendations.push('Local markets in California increasingly value sustainably grown produce');
  } else if (location.toLowerCase() === 'iowa' || location.toLowerCase() === 'nebraska') {
    recommendations.push('Midwest markets have strong established channels for corn, soy, and wheat');
    recommendations.push('Consider contracts with ethanol producers or specialty food manufacturers for premium pricing');
  }
  
  // Sustainability-focused recommendations
  if (sustainabilityFocus) {
    recommendations.push('Look into organic certification to access premium market segments');
    recommendations.push('Consider participating in sustainability certification programs that offer price premiums');
    insights.push('Markets increasingly reward sustainable farming practices with price premiums of 5-25%');
  }
  
  return {
    recommendations,
    insights,
    data: {
      marketTrends,
      cropSpecificData: cropMarketData
    }
  };
};

// Weather Analyst Agent - placeholder for future implementation
export const weatherAnalystAgent = (location: string): AgentResponse => {
  return {
    recommendations: [
      'Install soil moisture sensors to optimize irrigation timing',
      'Consider weather forecasts when planning fertilizer application'
    ],
    insights: [
      'Your region has shown increasing rainfall variability over the past 5 years',
      'Temperature patterns suggest an earlier planting season may be beneficial'
    ]
  };
};

// Sustainability Monitor Agent - placeholder for future implementation
export const sustainabilityMonitorAgent = (
  cropType: string,
  farmingPractices: string[]
): AgentResponse => {
  return {
    recommendations: [
      'Implement cover crops to improve soil health and reduce erosion',
      'Consider reduced tillage practices to preserve soil structure',
      'Optimize fertilizer application timing to reduce runoff'
    ],
    insights: [
      'Your current practices show good potential for carbon sequestration',
      'Water efficiency could be improved with targeted irrigation',
      'Biodiversity metrics indicate opportunity for beneficial insect habitat'
    ]
  };
};

// Integrate recommendations from all agents
export const integrateAgentRecommendations = (
  farmerProfile: FarmerProfile
): AgentResponse => {
  // Get recommendations from individual agents
  const farmerAdvisorResponse = farmerAdvisorAgent(
    farmerProfile.location,
    farmerProfile.land_size,
    farmerProfile.crop_history,
    farmerProfile.financial_goal,
    farmerProfile.sustainability_goal
  );
  
  const marketResearcherResponse = marketResearcherAgent(
    farmerProfile.crop_history,
    farmerProfile.location,
    farmerProfile.sustainability_goal.toLowerCase().includes('sustain')
  );
  
  const weatherResponse = weatherAnalystAgent(farmerProfile.location);
  const sustainabilityResponse = sustainabilityMonitorAgent(
    farmerProfile.crop_history[0] || 'Corn',
    []
  );
  
  // Combine insights and recommendations
  const combinedInsights = [
    ...farmerAdvisorResponse.insights,
    ...marketResearcherResponse.insights,
    ...weatherResponse.insights.slice(0, 1),
    ...sustainabilityResponse.insights.slice(0, 1)
  ];
  
  const combinedRecommendations = [
    ...farmerAdvisorResponse.recommendations,
    ...marketResearcherResponse.recommendations.slice(0, 2),
    ...weatherResponse.recommendations.slice(0, 1),
    ...sustainabilityResponse.recommendations.slice(0, 1)
  ];
  
  return {
    insights: combinedInsights,
    recommendations: combinedRecommendations,
    data: {
      sustainabilityScores: farmerAdvisorResponse.data?.sustainabilityScores,
      marketTrends: marketResearcherResponse.data?.marketTrends,
      weatherImpacts: farmerAdvisorResponse.data?.weatherImpacts
    }
  };
};
