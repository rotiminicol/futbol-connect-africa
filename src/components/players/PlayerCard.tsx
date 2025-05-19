
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { Player } from '@/data/mockData';

interface PlayerCardProps {
  player: Player;
}

const PlayerCard: React.FC<PlayerCardProps> = ({ player }) => {
  const navigate = useNavigate();

  const formatValue = (value: number): string => {
    if (value >= 1000000) {
      return `€${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `€${(value / 1000).toFixed(0)}K`;
    } else {
      return `€${value}`;
    }
  };

  return (
    <Card className="player-card overflow-hidden h-full flex flex-col">
      <div className="relative">
        <img 
          src={player.image} 
          alt={player.name} 
          className="w-full h-48 object-cover object-center"
        />
        {player.availableForTransfer && (
          <Badge className="absolute top-2 right-2 bg-nigerian-green-500">
            Available
          </Badge>
        )}
      </div>
      <CardContent className="flex-grow py-4">
        <h3 className="text-lg font-semibold mb-1">{player.name}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>{player.age} years</span>
          <span className="text-xs">•</span>
          <span>{player.position}</span>
          <span className="text-xs">•</span>
          <span>{player.nationality}</span>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div>
            <p className="text-xs text-gray-500">Height</p>
            <p className="font-medium">{player.height} cm</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Weight</p>
            <p className="font-medium">{player.weight} kg</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Pref. Foot</p>
            <p className="font-medium capitalize">{player.preferredFoot}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Value</p>
            <p className="font-medium">{formatValue(player.valueInEuros)}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-1 mb-2">
          <div className="text-center">
            <div className="text-xs">Pace</div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="bg-nigerian-green-500 h-1 rounded-full" 
                style={{ width: `${player.stats.pace}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs">Shoot</div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="bg-nigerian-green-500 h-1 rounded-full" 
                style={{ width: `${player.stats.shooting}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs">Pass</div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="bg-nigerian-green-500 h-1 rounded-full" 
                style={{ width: `${player.stats.passing}%` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-1">
          <div className="text-center">
            <div className="text-xs">Dribble</div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="bg-nigerian-green-500 h-1 rounded-full" 
                style={{ width: `${player.stats.dribbling}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs">Defend</div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="bg-nigerian-green-500 h-1 rounded-full" 
                style={{ width: `${player.stats.defending}%` }}
              ></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs">Physical</div>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-1 mt-1">
              <div 
                className="bg-nigerian-green-500 h-1 rounded-full" 
                style={{ width: `${player.stats.physical}%` }}
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          onClick={() => navigate(`/players/${player.id}`)}
          className="w-full bg-nigerian-green-500 hover:bg-nigerian-green-600"
        >
          View Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlayerCard;
