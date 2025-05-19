
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { NewsItem } from '@/data/mockData';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  const navigate = useNavigate();
  
  // Format the date to display nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to determine the badge color based on news category
  const getBadgeColor = (category: string) => {
    switch (category) {
      case 'transfers':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'local':
        return 'bg-nigerian-green-500 hover:bg-nigerian-green-600';
      case 'international':
        return 'bg-violet-500 hover:bg-violet-600';
      case 'academy':
        return 'bg-amber-500 hover:bg-amber-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  return (
    <Card className="overflow-hidden flex flex-col h-full card-hover">
      <div className="relative">
        <img 
          src={news.image || '/placeholder.svg'} 
          alt={news.title} 
          className="w-full h-40 object-cover"
        />
        <Badge className={`absolute top-2 right-2 ${getBadgeColor(news.category)} capitalize`}>
          {news.category}
        </Badge>
      </div>
      <CardContent className="flex-grow py-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span>{formatDate(news.date)}</span>
          <span className="text-nigerian-green-500">{news.source}</span>
        </div>
        <h3 className="text-lg font-semibold mb-3">{news.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
          {news.content}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={() => navigate(`/news/${news.id}`)}
          className="w-full bg-nigerian-green-500 hover:bg-nigerian-green-600"
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default NewsCard;
