
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FarmerProfileForm from './FarmerProfileForm';
import AgentCard from './AgentCard';
import RecommendationsPanel from './RecommendationsPanel';
import DataVisualizations from './DataVisualizations';
import { FarmerProfile } from '@/lib/database';
import { AgentResponse, integrateAgentRecommendations } from '@/lib/agents';

const Dashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<string>('profile');
  const [farmerProfile, setFarmerProfile] = useState<FarmerProfile | null>(null);
  const [agentResponse, setAgentResponse] = useState<AgentResponse | null>(null);
  const [activeAgentType, setActiveAgentType] = useState<string | null>(null);

  const handleProfileSubmit = (profile: FarmerProfile) => {
    setFarmerProfile(profile);
    setSelectedTab('agents');
  };

  const handleAgentSelect = (type: string) => {
    setActiveAgentType(type);
    if (farmerProfile) {
      const integratedResponse = integrateAgentRecommendations(farmerProfile);
      setAgentResponse(integratedResponse);
      setSelectedTab('results');
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="w-full max-w-md mx-auto">
          <TabsTrigger value="profile" className="w-1/3">Profile</TabsTrigger>
          <TabsTrigger value="agents" className="w-1/3">Agents</TabsTrigger>
          <TabsTrigger value="results" className="w-1/3">Results</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile">
          <FarmerProfileForm onSubmit={handleProfileSubmit} />
        </TabsContent>
        
        <TabsContent value="agents">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AgentCard
              title="Farmer Advisor"
              description="Analyzes land data, crop preferences, and financial goals"
              type="farmer"
              active={activeAgentType === 'farmer'}
              onClick={() => handleAgentSelect('farmer')}
            />
            <AgentCard
              title="Market Researcher"
              description="Evaluates regional market trends, crop pricing, and demand forecasts"
              type="market"
              active={activeAgentType === 'market'}
              onClick={() => handleAgentSelect('market')}
            />
            <AgentCard
              title="Weather Analyst"
              description="Integrates real-time and historical weather data to advise on optimal planting/harvesting times"
              type="weather"
              active={activeAgentType === 'weather'}
              onClick={() => handleAgentSelect('weather')}
            />
            <AgentCard
              title="Sustainability Monitor"
              description="Tracks environmental metrics and suggests eco-friendly practices"
              type="sustainability"
              active={activeAgentType === 'sustainability'}
              onClick={() => handleAgentSelect('sustainability')}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="results">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RecommendationsPanel agentResponse={agentResponse} />
            <DataVisualizations 
              sustainabilityScores={agentResponse?.data?.sustainabilityScores} 
              marketTrends={agentResponse?.data?.marketTrends}
              weatherImpacts={agentResponse?.data?.weatherImpacts}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
