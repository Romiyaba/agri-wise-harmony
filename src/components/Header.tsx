
import React from 'react';
import { Leaf } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-farm-green-dark text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Leaf className="h-8 w-8 text-farm-wheat" />
          <h1 className="text-2xl font-bold">AgriWise Harmony</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <nav className="flex items-center space-x-6">
            <a href="#" className="hover:text-farm-wheat-light transition-colors">Dashboard</a>
            <a href="#" className="hover:text-farm-wheat-light transition-colors">Agents</a>
            <a href="#" className="hover:text-farm-wheat-light transition-colors">Reports</a>
            <a href="#" className="hover:text-farm-wheat-light transition-colors">Settings</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
