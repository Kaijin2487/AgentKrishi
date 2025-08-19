import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  Sprout, 
  CloudSun, 
  Bug, 
  Building2, 
  Wifi,
  WifiOff
} from "lucide-react";
import { useState } from "react";

interface ToolsSidebarProps {
  onToolSelect: (tool: string) => void;
  selectedTool: string | null;
}

const quickQuestions = [
  "Best fertilizer for wheat?",
  "How to control rice pests?",
  "Today's rainfall prediction?"
];

export default function ToolsSidebar({ onToolSelect, selectedTool }: ToolsSidebarProps) {
  const [isOffline, setIsOffline] = useState(false);

  const tools = [
    { id: "crop", name: "Crop Advice", icon: Sprout, color: "text-agri-green", bgColor: "bg-agri-green/10 hover:bg-agri-green/20" },
    { id: "weather", name: "Weather Forecast", icon: CloudSun, color: "text-blue-500", bgColor: "hover:bg-gray-50" },
    { id: "pest", name: "Pest Detection", icon: Bug, color: "text-red-500", bgColor: "hover:bg-gray-50" },
    { id: "schemes", name: "Govt Schemes", icon: Building2, color: "text-purple-500", bgColor: "hover:bg-gray-50" },
  ];

  const handleQuestionClick = (question: string) => {
    // This would typically set the input field value
    console.log("Quick question selected:", question);
  };

  return (
    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center" data-testid="text-tools-header">
        <span className="mr-2 text-agri-green">🔧</span>
        Quick Tools
      </h3>
      
      <div className="space-y-3">
        {tools.map((tool) => {
          const IconComponent = tool.icon;
          const isSelected = selectedTool === tool.id;
          
          return (
            <Button
              key={tool.id}
              variant="ghost"
              className={`w-full flex items-center p-3 text-left ${isSelected ? tool.bgColor : 'hover:bg-gray-50'} rounded-lg transition-colors group justify-start`}
              onClick={() => onToolSelect(tool.id)}
              data-testid={`button-tool-${tool.id}`}
            >
              <IconComponent className={`${tool.color} mr-3 group-hover:scale-110 transition-transform`} size={20} />
              <span className="text-gray-700 font-medium">{tool.name}</span>
            </Button>
          );
        })}
      </div>

      {/* Offline Status */}
      <div className="mt-6 p-3 bg-green-50 border border-green-200 rounded-lg" data-testid="status-offline">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <span className="text-sm text-green-700 font-medium">
            {isOffline ? "Offline Mode Active" : "Offline Mode Ready"}
          </span>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-6">
        <h4 className="text-sm font-medium text-gray-600 mb-3" data-testid="text-quick-questions">
          Quick Questions
        </h4>
        <div className="space-y-2">
          {quickQuestions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              className="w-full text-left text-xs bg-gray-50 hover:bg-gray-100 p-2 rounded text-gray-600 transition-colors justify-start h-auto"
              onClick={() => handleQuestionClick(question)}
              data-testid={`button-quick-question-${index}`}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
