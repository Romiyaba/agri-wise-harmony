
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface DataVisualizationsProps {
  sustainabilityScores?: Record<string, number>;
  marketTrends?: Record<string, { trend: string; price: number; demand: number }>;
  weatherImpacts?: Record<string, number>;
}

const DataVisualizations: React.FC<DataVisualizationsProps> = ({
  sustainabilityScores,
  marketTrends,
  weatherImpacts,
}) => {
  // Format data for visualization
  const sustainabilityData = sustainabilityScores
    ? Object.entries(sustainabilityScores).map(([crop, score]) => ({
        name: crop,
        sustainabilityScore: score,
      }))
    : [];

  const marketData = marketTrends
    ? Object.entries(marketTrends).map(([crop, data]) => ({
        name: crop,
        price: data.price,
        demand: data.demand,
      }))
    : [];

  const weatherData = weatherImpacts
    ? Object.entries(weatherImpacts).map(([crop, impact]) => ({
        name: crop,
        weatherImpact: impact,
      }))
    : [];

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data Analysis</CardTitle>
        <CardDescription>
          Visualizing key metrics for informed decision-making
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sustainability">
          <TabsList className="w-full mb-4">
            <TabsTrigger value="sustainability" className="w-1/3">
              Sustainability
            </TabsTrigger>
            <TabsTrigger value="market" className="w-1/3">
              Market Trends
            </TabsTrigger>
            <TabsTrigger value="weather" className="w-1/3">
              Weather Impact
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="sustainability" className="h-64">
            {sustainabilityData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sustainabilityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sustainabilityScore" fill="#4CAF50" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">No sustainability data available</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="market" className="h-64">
            {marketData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={marketData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="price" fill="#FFD54F" />
                  <Bar dataKey="demand" fill="#03A9F4" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">No market data available</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="weather" className="h-64">
            {weatherData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="weatherImpact" fill="#03A9F4" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">No weather impact data available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DataVisualizations;
