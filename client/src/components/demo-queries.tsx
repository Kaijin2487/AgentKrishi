import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  ChevronDown, 
  ChevronUp,
  BookOpen,
  Lightbulb
} from "lucide-react";
import { demoQueries, getCategorizedQueries, searchQueries, getRandomQuery } from "@/../../shared/demo-data";

export default function DemoQueries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedQuery, setSelectedQuery] = useState<any>(null);

  const categorizedQueries = getCategorizedQueries();
  const filteredQueries = searchTerm ? searchQueries(searchTerm) : null;

  const handleCategoryToggle = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleRandomQuery = () => {
    const randomQuery = getRandomQuery();
    setSelectedQuery(randomQuery);
  };

  const handleQuerySelect = (query: any) => {
    setSelectedQuery(query);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BookOpen className="text-agri-green mr-2" size={20} />
          <h3 className="font-semibold text-gray-900">Demo Q&A</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRandomQuery}
          className="text-agri-green border-agri-green hover:bg-agri-green hover:text-white"
          data-testid="button-random-query"
        >
          <Lightbulb size={16} className="mr-1" />
          Random
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" size={16} />
        <Input
          placeholder="Search demo questions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
          data-testid="input-search-queries"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100%-120px)]">
        {/* Categories/Search Results */}
        <ScrollArea className="h-full">
          <div className="space-y-2">
            {filteredQueries ? (
              // Show search results
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Found {filteredQueries.length} results
                </p>
                {filteredQueries.map((query) => (
                  <div
                    key={query.id}
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={() => handleQuerySelect(query)}
                    data-testid={`query-result-${query.id}`}
                  >
                    <Badge variant="secondary" className="mb-2 text-xs">
                      {query.category}
                    </Badge>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">
                      {query.question}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              // Show categories
              Object.entries(categorizedQueries).map(([category, queries]) => (
                <div key={category} className="border border-gray-200 rounded-lg">
                  <Button
                    variant="ghost"
                    onClick={() => handleCategoryToggle(category)}
                    className="w-full justify-between p-3 h-auto text-left font-medium"
                    data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-center">
                      <span className="text-gray-900">{category}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {queries.length}
                      </Badge>
                    </div>
                    {expandedCategory === category ? 
                      <ChevronUp size={16} /> : 
                      <ChevronDown size={16} />
                    }
                  </Button>

                  {expandedCategory === category && (
                    <div className="border-t border-gray-200">
                      {queries.map((query) => (
                        <div
                          key={query.id}
                          className="p-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 cursor-pointer transition-colors"
                          onClick={() => handleQuerySelect(query)}
                          data-testid={`query-item-${query.id}`}
                        >
                          <p className="text-sm text-gray-700 line-clamp-2">
                            {query.question}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Selected Query Details */}
        <div className="border border-gray-200 rounded-lg">
          {selectedQuery ? (
            <div className="p-4 h-full">
              <Badge variant="secondary" className="mb-3">
                {selectedQuery.category}
              </Badge>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Question:</h4>
                  <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                    {selectedQuery.question}
                  </p>
                </div>
                
                <Separator />
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Answer:</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {selectedQuery.answer}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-4 h-full flex items-center justify-center text-center">
              <div className="text-gray-500">
                <BookOpen size={48} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  Select a question from the categories to view the answer
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}