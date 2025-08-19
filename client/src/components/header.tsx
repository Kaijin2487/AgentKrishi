import { useState } from "react";
import { Button } from "@/components/ui/button";
import LanguageSelector from "./language-selector";
import { Leaf } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2" data-testid="logo">
            <div className="w-10 h-10 bg-agri-green rounded-lg flex items-center justify-center">
              <Leaf className="text-white text-xl" />
            </div>
            <span className="font-bold text-xl text-gray-900">AgentKrishi</span>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-agri-green transition-colors px-3 py-2 text-sm font-medium"
              data-testid="button-about"
            >
              About
            </Button>
            
            <Button 
              variant="ghost" 
              className="text-gray-600 hover:text-agri-green transition-colors px-3 py-2 text-sm font-medium"
              data-testid="button-help"
            >
              Help
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
