import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  User,
  Send,
  Settings,
  Mic,
  Volume2,
  Languages,
  Save
} from "lucide-react";
import ToolsSidebar from "./tools-sidebar";
import { demoQueries, searchQueries } from "@/../../shared/demo-data";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function ChatInterface() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "🙏 Welcome to AgentKrishi! I'm here to help you with all your agricultural needs. You can ask me about crops, weather, pests, fertilizers, or government schemes. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");

  const handleToolSelect = (tool: string) => {
    setSelectedTool(tool);
    console.log("Tool selected:", tool);
  };

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Search through our knowledge base
    const matchingQueries = searchQueries(userMessage);
    
    if (matchingQueries.length > 0) {
      // Return the first matching answer
      return matchingQueries[0].answer;
    }
    
    // Fallback responses based on keywords
    if (lowerMessage.includes("crop") || lowerMessage.includes("farming")) {
      return "For crop-related queries, I can help you with selection, diseases, and best practices. Could you be more specific about what crop or farming issue you're facing?";
    }
    
    if (lowerMessage.includes("weather") || lowerMessage.includes("rain")) {
      return "Weather planning is crucial for farming success. For specific weather advice, please mention your location and the farming activity you're planning.";
    }
    
    if (lowerMessage.includes("pest") || lowerMessage.includes("disease")) {
      return "Pest and disease management is essential for healthy crops. Could you describe the specific symptoms you're seeing in your plants?";
    }
    
    if (lowerMessage.includes("fertilizer") || lowerMessage.includes("nutrient")) {
      return "Proper fertilization is key to good yields. What crop are you growing and what stage is it in? This will help me recommend the right fertilizer schedule.";
    }
    
    if (lowerMessage.includes("government") || lowerMessage.includes("scheme") || lowerMessage.includes("subsidy")) {
      return "There are several government schemes available for farmers. Could you specify your state and the type of farming activity you need support for?";
    }
    
    return "I'd be happy to help you with your farming question. Could you provide more details so I can give you the best advice? I can assist with crops, weather, pests, fertilizers, and government schemes.";
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);

    // Generate and add bot response
    const botResponse = generateBotResponse(inputMessage);
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponse,
      sender: "bot",
      timestamp: new Date(),
    };

    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 500);

    setInputMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div id="chat-interface" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mb-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-[700px]">
        
        <ToolsSidebar 
          onToolSelect={handleToolSelect} 
          selectedTool={selectedTool} 
        />

        {/* Chat Window */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col max-h-[700px]">
          {/* Chat Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-agri-green rounded-full flex items-center justify-center mr-3">
                <Bot className="text-white" size={16} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900" data-testid="text-assistant-name">
                  AgentKrishi Assistant
                </h3>
                <p className="text-sm text-green-600" data-testid="status-online">
                  Online • Ready to help
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" data-testid="button-settings">
              <Settings className="text-gray-400 hover:text-gray-600" size={16} />
            </Button>
          </div>

          {/* Chat Messages */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex items-start space-x-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-agri-green rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="text-white" size={16} />
                    </div>
                  )}
                  
                  <div className={`flex-1 ${message.sender === 'user' ? 'flex flex-col items-end' : ''}`}>
                    <div className={`${message.sender === 'bot' ? 'bg-gray-100 rounded-2xl rounded-tl-md' : 'bg-agri-green rounded-2xl rounded-tr-md text-white'} p-4 max-w-lg`}>
                      <p className={message.sender === 'bot' ? 'text-gray-800' : 'text-white'}>
                        {message.text}
                      </p>
                    </div>
                    
                    {message.sender === 'bot' && (
                      <div className="flex items-center mt-2 space-x-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-gray-500 hover:text-agri-green"
                          data-testid={`button-translate-${message.id}`}
                        >
                          <Languages className="mr-1" size={12} />
                          Translate
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-gray-500 hover:text-agri-green"
                          data-testid={`button-read-aloud-${message.id}`}
                        >
                          <Volume2 className="mr-1" size={12} />
                          Read Aloud
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-gray-500 hover:text-agri-green"
                          data-testid={`button-save-offline-${message.id}`}
                        >
                          <Save className="mr-1" size={12} />
                          Save Offline
                        </Button>
                      </div>
                    )}
                  </div>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="text-gray-600" size={16} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <Textarea
                  placeholder="Ask about crops, weather, pests, fertilizers, or schemes..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="resize-none border border-gray-300 rounded-lg px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-agri-green focus:border-transparent max-h-32"
                  rows={1}
                  data-testid="input-message"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-3 top-3 p-1 text-gray-400 hover:text-agri-green"
                  data-testid="button-voice"
                >
                  <Mic size={16} />
                </Button>
              </div>

              <Button 
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                className="p-3 bg-agri-green hover:bg-agri-dark-green text-white rounded-lg transition-colors"
                data-testid="button-send"
              >
                <Send size={16} />
              </Button>
            </div>

            <p className="text-xs text-gray-500 mt-2 flex items-center" data-testid="text-input-help">
              <span className="mr-1">ℹ️</span>
              Ask questions about farming, and I'll provide helpful agricultural advice
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
