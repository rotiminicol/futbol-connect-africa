
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, ArrowRight, Calendar } from "lucide-react";
import { useNavigate } from 'react-router-dom';

// Mock data for news articles
const newsArticles = [
  {
    id: "1",
    title: "Nigerian Wonderkid Signs with Premier League Club",
    excerpt: "18-year-old midfielder from Lagos United FC has completed a dream move to the English Premier League after impressive performances.",
    date: "2025-05-15",
    category: "transfers",
    image: "/placeholder.svg",
    author: "Adebayo Johnson",
    source: "Nigerian Football News"
  },
  {
    id: "2",
    title: "National Team Announces Squad for African Cup Qualifiers",
    excerpt: "The head coach has revealed his 23-man squad for the upcoming qualifiers, with several surprise inclusions from the local league.",
    date: "2025-05-12",
    category: "national-team",
    image: "/placeholder.svg",
    author: "Chioma Obi",
    source: "Sports Daily"
  },
  {
    id: "3",
    title: "New Football Academy Opens in Abuja with State-of-the-Art Facilities",
    excerpt: "A new youth development academy has opened its doors, promising to nurture the next generation of Nigerian football talent.",
    date: "2025-05-10",
    category: "development",
    image: "/placeholder.svg",
    author: "Emmanuel Adeyemi",
    source: "Football Development Monitor"
  },
  {
    id: "4",
    title: "Local League Set for Broadcast Deal Worth Millions",
    excerpt: "The Nigerian Professional Football League is close to signing a landmark broadcasting deal that could transform the financial landscape of clubs.",
    date: "2025-05-08",
    category: "local-football",
    image: "/placeholder.svg",
    author: "Funke Adebayo",
    source: "Business of Football"
  },
  {
    id: "5",
    title: "Rising Star Wins Young Player of the Year Award",
    excerpt: "Promising striker from Kano Pillars has been named the Young Player of the Year after an outstanding season with 22 goals.",
    date: "2025-05-05",
    category: "awards",
    image: "/placeholder.svg",
    author: "Tunde Adeleke",
    source: "Football Awards Committee"
  },
  {
    id: "6",
    title: "Coaching Workshop to Be Hosted by Former International Stars",
    excerpt: "A series of coaching workshops will be held across Nigeria, led by former international players now working in European leagues.",
    date: "2025-05-03",
    category: "development",
    image: "/placeholder.svg",
    author: "Joseph Yobo",
    source: "Coaching Excellence Initiative"
  }
];

const NewsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredNews = newsArticles.filter(article => {
    // Filter by search query
    const matchesQuery = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
    
    return matchesQuery && matchesCategory;
  });

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Layout>
      <div className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-theme-700 dark:text-blue-theme-400 mb-4">Football News</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl">
              Stay updated with the latest news from Nigerian football, including transfers, match reports, and development stories.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="relative w-full md:w-1/2 lg:w-1/3">
              <Search className="absolute left-3 top-3 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search news articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Badge 
                variant={selectedCategory === null ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Badge>
              <Badge 
                variant={selectedCategory === "transfers" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedCategory("transfers")}
              >
                Transfers
              </Badge>
              <Badge 
                variant={selectedCategory === "national-team" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedCategory("national-team")}
              >
                National Team
              </Badge>
              <Badge 
                variant={selectedCategory === "local-football" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedCategory("local-football")}
              >
                Local Football
              </Badge>
              <Badge 
                variant={selectedCategory === "development" ? "default" : "outline"} 
                className="cursor-pointer"
                onClick={() => setSelectedCategory("development")}
              >
                Development
              </Badge>
            </div>
          </div>

          <Tabs defaultValue="latest" className="mb-8">
            <TabsList>
              <TabsTrigger value="latest">Latest News</TabsTrigger>
              <TabsTrigger value="featured">Featured</TabsTrigger>
              <TabsTrigger value="popular">Most Read</TabsTrigger>
            </TabsList>
            
            <TabsContent value="latest" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.length > 0 ? (
                  filteredNews.map((article) => (
                    <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-48 object-cover"
                      />
                      <CardContent className="pt-4">
                        <div className="flex items-center gap-2 text-sm text-blue-theme-500 mb-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(article.date)}</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <span>{article.author}</span>
                          <span>{article.source}</span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button 
                          className="w-full bg-blue-theme-600 hover:bg-blue-theme-700 text-white"
                          onClick={() => navigate(`/news/${article.id}`)}
                        >
                          Read More
                          <ArrowRight size={16} />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-500">No news articles match your search criteria.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="featured" className="mt-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <p className="text-center text-gray-600 dark:text-gray-400">Featured news articles will be shown here.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="mt-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <p className="text-center text-gray-600 dark:text-gray-400">Most popular news articles will be shown here.</p>
              </div>
            </TabsContent>
          </Tabs>

          <div className="bg-blue-theme-50 dark:bg-blue-theme-900/30 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-theme-700 dark:text-blue-theme-400 mb-4">Subscribe to Newsletter</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get the latest football news and updates delivered directly to your inbox. Stay informed about transfers, events, and opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Your email address"
                className="flex-grow"
              />
              <Button 
                className="bg-blue-theme-600 hover:bg-blue-theme-700 text-white whitespace-nowrap"
              >
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewsPage;
