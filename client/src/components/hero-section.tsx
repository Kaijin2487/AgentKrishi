import { Button } from "@/components/ui/button";
import { MessageCircle, Languages, CloudSun, Bug, WifiOff } from "lucide-react";

export default function HeroSection() {
  const scrollToChat = () => {
    const chatSection = document.getElementById("chat-interface");
    chatSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 min-h-[600px] flex items-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            AgentKrishi – An AI-Powered Multilingual Agricultural Advisor for India
          </h1>
          <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
            Get intelligent answers for your farming questions with our agricultural knowledge assistant
          </p>
          
          <Button 
            onClick={scrollToChat}
            size="lg"
            className="inline-flex items-center justify-center px-8 py-4 bg-agri-amber hover:bg-yellow-500 text-white font-semibold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            data-testid="button-start-chat"
          >
            <MessageCircle className="mr-3" />
            Start Chat
          </Button>
          
          {/* Features Preview */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center text-green-100 text-sm" data-testid="feature-languages">
              <Languages className="mr-2 w-4 h-4" />
              10+ Indian Languages
            </div>
            <div className="flex items-center text-green-100 text-sm" data-testid="feature-weather">
              <CloudSun className="mr-2 w-4 h-4" />
              Weather Forecasts
            </div>
            <div className="flex items-center text-green-100 text-sm" data-testid="feature-pest">
              <Bug className="mr-2 w-4 h-4" />
              Pest Detection
            </div>
            <div className="flex items-center text-green-100 text-sm" data-testid="feature-offline">
              <WifiOff className="mr-2 w-4 h-4" />
              Offline Mode
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
