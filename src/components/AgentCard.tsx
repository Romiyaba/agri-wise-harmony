
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, TrendingUp, CloudRain, Leaf } from 'lucide-react';

interface AgentCardProps {
  title: string;
  description: string;
  type: 'farmer' | 'market' | 'weather' | 'sustainability';
  active: boolean;
  onClick: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ title, description, type, active, onClick }) => {
  const getIcon = () => {
    switch (type) {
      case 'farmer':
        return <Users className="h-6 w-6 text-farm-green" />;
      case 'market':
        return <TrendingUp className="h-6 w-6 text-farm-wheat" />;
      case 'weather':
        return <CloudRain className="h-6 w-6 text-farm-water" />;
      case 'sustainability':
        return <Leaf className="h-6 w-6 text-farm-green-light" />;
      default:
        return <Users className="h-6 w-6" />;
    }
  };

  const getBorderColor = () => {
    if (!active) return 'border-gray-200';
    
    switch (type) {
      case 'farmer':
        return 'border-farm-green';
      case 'market':
        return 'border-farm-wheat';
      case 'weather':
        return 'border-farm-water';
      case 'sustainability':
        return 'border-farm-green-light';
      default:
        return 'border-gray-200';
    }
  };

  return (
    <Card 
      className={`cursor-pointer transition-all hover:shadow-md ${getBorderColor()} ${active ? 'border-2' : 'border'}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          {getIcon()}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {active ? 'Currently active' : 'Click to activate'}
        </p>
      </CardContent>
    </Card>
  );
};

export default AgentCard;
