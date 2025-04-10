
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AgentResponse } from '@/lib/agents';

interface RecommendationsPanelProps {
  agentResponse: AgentResponse | null;
}

const RecommendationsPanel: React.FC<RecommendationsPanelProps> = ({ agentResponse }) => {
  if (!agentResponse) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <CardContent>
          <p className="text-muted-foreground">
            No recommendations available. Please select a profile to get started.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Recommendations</CardTitle>
        <CardDescription>
          Based on your profile and data analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-farm-green mb-2">Key Insights</h3>
          <ul className="list-disc pl-5 space-y-1">
            {agentResponse.insights.map((insight, index) => (
              <li key={index} className="text-sm text-muted-foreground">{insight}</li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold text-farm-green mb-2">Actionable Recommendations</h3>
          <ul className="list-disc pl-5 space-y-1">
            {agentResponse.recommendations.map((recommendation, index) => (
              <li key={index} className="text-sm text-muted-foreground">{recommendation}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationsPanel;
