
import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FilterProps {
  onFilterChange: (filters: any) => void;
}

const PlayerFilters: React.FC<FilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    position: '',
    ageRange: [16, 40],
    nationality: '',
    availableForTransfer: false,
    openToTrials: false,
    preferredFoot: '',
    valueRange: [0, 1000000],
  });

  const handleFilterChange = (key: string, value: any) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const positions = [
    { value: '', label: 'All Positions' },
    { value: 'Goalkeeper', label: 'Goalkeeper' },
    { value: 'Defender', label: 'Defender' },
    { value: 'Midfielder', label: 'Midfielder' },
    { value: 'Winger', label: 'Winger' },
    { value: 'Striker', label: 'Striker' },
  ];

  const preferredFeetOptions = [
    { value: '', label: 'Any' },
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
    { value: 'both', label: 'Both' },
  ];

  const resetFilters = () => {
    const defaultFilters = {
      position: '',
      ageRange: [16, 40],
      nationality: '',
      availableForTransfer: false,
      openToTrials: false,
      preferredFoot: '',
      valueRange: [0, 1000000],
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Filter Players</h3>
      
      <Accordion type="single" collapsible defaultValue="position">
        <AccordionItem value="position">
          <AccordionTrigger className="text-sm font-medium">Position</AccordionTrigger>
          <AccordionContent>
            <Select
              value={filters.position}
              onValueChange={(value) => handleFilterChange('position', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                {positions.map((position) => (
                  <SelectItem key={position.value} value={position.value}>
                    {position.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="age">
          <AccordionTrigger className="text-sm font-medium">Age Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">{filters.ageRange[0]} years</span>
                <span className="text-sm">{filters.ageRange[1]} years</span>
              </div>
              <Slider
                defaultValue={filters.ageRange}
                min={15}
                max={45}
                step={1}
                minStepsBetweenThumbs={1}
                onValueChange={(value) => handleFilterChange('ageRange', value)}
                className="mb-2"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="nationality">
          <AccordionTrigger className="text-sm font-medium">Nationality</AccordionTrigger>
          <AccordionContent>
            <Input 
              placeholder="Search by nationality" 
              value={filters.nationality}
              onChange={(e) => handleFilterChange('nationality', e.target.value)}
            />
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="foot">
          <AccordionTrigger className="text-sm font-medium">Preferred Foot</AccordionTrigger>
          <AccordionContent>
            <Select
              value={filters.preferredFoot}
              onValueChange={(value) => handleFilterChange('preferredFoot', value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select foot" />
              </SelectTrigger>
              <SelectContent>
                {preferredFeetOptions.map((foot) => (
                  <SelectItem key={foot.value} value={foot.value}>
                    {foot.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="availability">
          <AccordionTrigger className="text-sm font-medium">Availability</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="availableForTransfer"
                  checked={filters.availableForTransfer}
                  onChange={(e) => handleFilterChange('availableForTransfer', e.target.checked)}
                  className="rounded border-gray-300 text-nigerian-green-500 focus:ring-nigerian-green-500"
                />
                <label htmlFor="availableForTransfer" className="ml-2 text-sm">
                  Available for Transfer
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="openToTrials"
                  checked={filters.openToTrials}
                  onChange={(e) => handleFilterChange('openToTrials', e.target.checked)}
                  className="rounded border-gray-300 text-nigerian-green-500 focus:ring-nigerian-green-500"
                />
                <label htmlFor="openToTrials" className="ml-2 text-sm">
                  Open to Trials
                </label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="value">
          <AccordionTrigger className="text-sm font-medium">Value Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">€{(filters.valueRange[0] / 1000).toFixed(0)}k</span>
                <span className="text-sm">€{(filters.valueRange[1] / 1000).toFixed(0)}k</span>
              </div>
              <Slider
                defaultValue={filters.valueRange}
                min={0}
                max={1000000}
                step={10000}
                minStepsBetweenThumbs={10000}
                onValueChange={(value) => handleFilterChange('valueRange', value)}
                className="mb-2"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button
        variant="outline"
        onClick={resetFilters}
        className="w-full mt-4"
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default PlayerFilters;
