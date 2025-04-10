
import React from 'react';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Users, TrendingUp, CloudRain } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto py-8">
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-farm-green-dark mb-4">
              Multi-Agent AI for Sustainable Farming
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Optimize your farming practices with our AI-powered system that balances profitability, 
              sustainability, and resource management.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Farmer Advisor</CardTitle>
                  <Users className="h-5 w-5 text-farm-green" />
                </div>
                <CardDescription>Land & crop analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Analyzes soil conditions and farmer goals to recommend optimal crop choices.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Market Researcher</CardTitle>
                  <TrendingUp className="h-5 w-5 text-farm-wheat" />
                </div>
                <CardDescription>Price & demand insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Analyzes market trends to identify profitable crop opportunities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Weather Analyst</CardTitle>
                  <CloudRain className="h-5 w-5 text-farm-water" />
                </div>
                <CardDescription>Climate predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Provides weather insights to optimize planting and harvesting schedules.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="space-y-0 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Sustainability Monitor</CardTitle>
                  <Leaf className="h-5 w-5 text-farm-green-light" />
                </div>
                <CardDescription>Environmental impact</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  Tracks sustainability metrics and suggests eco-friendly improvements.
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Dashboard />
        </div>
      </main>
      
      <footer className="bg-farm-green-dark text-white py-4 mt-12">
        <div className="container mx-auto text-center">
          <p>© 2025 AgriWise Harmony | A Multi-Agent AI System for Sustainable Farming</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
