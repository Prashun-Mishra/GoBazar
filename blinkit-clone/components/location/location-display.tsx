'use client';

import { MapPin, ChevronDown } from 'lucide-react';
import { useLocation } from '@/contexts/location-context';

export function LocationDisplay() {
  const { location, setIsLocationModalOpen } = useLocation();

  const getShortAddress = () => {
    if (!location) return 'Select Location';
    
    const parts = [];
    if (location.address.road) parts.push(location.address.road);
    if (location.address.suburb) parts.push(location.address.suburb);
    if (location.address.city) parts.push(location.address.city);
    
    return parts.slice(0, 2).join(', ') || location.displayName.split(',')[0];
  };

  return (
    <button
      onClick={() => setIsLocationModalOpen(true)}
      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors max-w-[250px]"
    >
      <MapPin className="h-5 w-5 text-green-600 flex-shrink-0" />
      <div className="flex-1 text-left min-w-0">
        <p className="text-xs text-gray-500">Delivery in 8 minutes</p>
        <p className="text-sm font-medium text-gray-900 truncate">
          {getShortAddress()}
        </p>
      </div>
      <ChevronDown className="h-4 w-4 text-gray-400 flex-shrink-0" />
    </button>
  );
}
