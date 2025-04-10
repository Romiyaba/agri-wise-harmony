
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FarmerProfile, addFarmerProfile } from '@/lib/database';
import { useToast } from '@/components/ui/use-toast';

interface FarmerProfileFormProps {
  onSubmit: (profile: FarmerProfile) => void;
}

const FarmerProfileForm: React.FC<FarmerProfileFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [location, setLocation] = useState('California');
  const [landSize, setLandSize] = useState(5);
  const [cropHistory, setCropHistory] = useState<string[]>(['Corn']);
  const [financialGoal, setFinancialGoal] = useState('Increase profit by 15%');
  const [sustainabilityGoal, setSustainabilityGoal] = useState('Reduce water usage by 20%');
  
  const handleAddCrop = (crop: string) => {
    if (!cropHistory.includes(crop)) {
      setCropHistory([...cropHistory, crop]);
    }
  };
  
  const handleRemoveCrop = (crop: string) => {
    setCropHistory(cropHistory.filter(c => c !== crop));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive"
      });
      return;
    }
    
    if (cropHistory.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one crop",
        variant: "destructive"
      });
      return;
    }
    
    const profile = addFarmerProfile({
      name,
      location,
      land_size: landSize,
      crop_history: cropHistory,
      financial_goal: financialGoal,
      sustainability_goal: sustainabilityGoal
    });
    
    toast({
      title: "Profile Created",
      description: "Your farmer profile has been created successfully"
    });
    
    onSubmit(profile);
  };
  
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Farmer Profile</CardTitle>
        <CardDescription>
          Enter your information to get personalized recommendations from our AI agents
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="California">California</SelectItem>
                  <SelectItem value="Iowa">Iowa</SelectItem>
                  <SelectItem value="Nebraska">Nebraska</SelectItem>
                  <SelectItem value="Kansas">Kansas</SelectItem>
                  <SelectItem value="Texas">Texas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="land-size">Land Size (acres)</Label>
              <Input 
                id="land-size" 
                type="number" 
                min="1" 
                value={landSize} 
                onChange={(e) => setLandSize(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Crop History</Label>
            <div className="flex flex-wrap gap-2">
              {cropHistory.map((crop) => (
                <div key={crop} className="bg-farm-green-light text-white px-3 py-1 rounded-full flex items-center">
                  <span>{crop}</span>
                  <button 
                    type="button" 
                    className="ml-2 text-white hover:text-farm-wheat-light"
                    onClick={() => handleRemoveCrop(crop)}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
            
            <Select onValueChange={handleAddCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Add crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Corn">Corn</SelectItem>
                <SelectItem value="Wheat">Wheat</SelectItem>
                <SelectItem value="Soybean">Soybean</SelectItem>
                <SelectItem value="Rice">Rice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="financial-goal">Financial Goal</Label>
            <Textarea 
              id="financial-goal" 
              placeholder="E.g., Increase profit by 15%" 
              value={financialGoal} 
              onChange={(e) => setFinancialGoal(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="sustainability-goal">Sustainability Goal</Label>
            <Textarea 
              id="sustainability-goal" 
              placeholder="E.g., Reduce water usage by 20%" 
              value={sustainabilityGoal} 
              onChange={(e) => setSustainabilityGoal(e.target.value)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="bg-farm-green hover:bg-farm-green-dark w-full">
            Get Recommendations
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default FarmerProfileForm;
