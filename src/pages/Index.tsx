
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import PlayerCard from '@/components/players/PlayerCard';
import EventCard from '@/components/events/EventCard';
import NewsCard from '@/components/news/NewsCard';
import { mockPlayers, mockEvents, mockNews } from '@/data/mockData';

const Index = () => {
  const featuredPlayers = mockPlayers.slice(0, 3);
  const upcomingEvents = mockEvents.slice(0, 3);
  const latestNews = mockNews.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative">
        <div 
          className="bg-cover bg-center h-[600px] flex flex-col justify-center items-center text-white"
          style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1575361204480-aadea25e6e68?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent"></div>
          <div className="container relative z-10 mx-auto px-6 flex flex-col items-start">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-3xl">
              Connect with Football Talent Across Nigeria
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              The premier platform for footballers, coaches, agents, and clubs to discover, connect, and prosper together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-nigerian-green-500 hover:bg-nigerian-green-600 text-white">
                  Join Now
                </Button>
              </Link>
              <Link to="/players">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  Explore Talents
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Futbol Connect Works</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Connecting talent, clubs, and opportunities through our comprehensive platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 card-hover">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-nigerian-green-100 dark:bg-nigerian-green-900 p-3 rounded-full">
                  <svg className="h-8 w-8 text-nigerian-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="7" r="4"/>
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Players, coaches, agents, and clubs create detailed profiles to showcase their skills and needs.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 card-hover">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-nigerian-green-100 dark:bg-nigerian-green-900 p-3 rounded-full">
                  <svg className="h-8 w-8 text-nigerian-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Opportunities</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse through potential matches and discover the right opportunities tailored to you.
              </p>
            </div>
            
            <div className="text-center p-6 rounded-lg bg-gray-50 dark:bg-gray-800 card-hover">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-nigerian-green-100 dark:bg-nigerian-green-900 p-3 rounded-full">
                  <svg className="h-8 w-8 text-nigerian-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Connections</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect directly with interested parties and take the next steps in your football journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Players */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Players</h2>
            <Link to="/players">
              <Button variant="outline" className="border-nigerian-green-500 text-nigerian-green-500 hover:bg-nigerian-green-500 hover:text-white">
                View All Players
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPlayers.map(player => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Upcoming Events</h2>
            <Link to="/events">
              <Button variant="outline" className="border-nigerian-green-500 text-nigerian-green-500 hover:bg-nigerian-green-500 hover:text-white">
                View All Events
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Latest News</h2>
            <Link to="/news">
              <Button variant="outline" className="border-nigerian-green-500 text-nigerian-green-500 hover:bg-nigerian-green-500 hover:text-white">
                View All News
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestNews.map(news => (
              <NewsCard key={news.id} news={news} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-nigerian-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Your Football Career to the Next Level?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of players, coaches, agents, and clubs across Nigeria who are using Futbol Connect to achieve their goals.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/signup">
              <Button size="lg" className="bg-white text-nigerian-green-500 hover:bg-gray-100">
                Sign Up Today
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                View Pricing Plans
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
