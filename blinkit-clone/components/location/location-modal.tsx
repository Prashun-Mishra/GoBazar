'use client';

import { useState, useEffect } from 'react';
import { MapPin, Search, X, Loader2, Navigation } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/contexts/location-context';

interface Location {
  id?: string;
  displayName: string;
  address: {
    road?: string;
    suburb?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

interface PopularLocation {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  latitude: number;
  longitude: number;
}

export function LocationModal() {
  const { isLocationModalOpen, setIsLocationModalOpen, setLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const [popularLocations, setPopularLocations] = useState<PopularLocation[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [activeTab, setActiveTab] = useState<'detect' | 'search'>('detect');

  // Fetch popular locations on mount
  useEffect(() => {
    if (isLocationModalOpen) {
      fetchPopularLocations();
    }
  }, [isLocationModalOpen]);

  // Search locations with debounce
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    const timer = setTimeout(() => {
      searchLocations(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const fetchPopularLocations = async () => {
    try {
      const response = await fetch('/api/location/popular');
      const data = await response.json();
      if (data.success) {
        setPopularLocations(data.data);
      }
    } catch (error) {
      console.error('Error fetching popular locations:', error);
    }
  };

  const searchLocations = async (query: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/location/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      if (data.success) {
        setSearchResults(data.data);
      }
    } catch (error) {
      console.error('Error searching locations:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const detectCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          const response = await fetch(
            `/api/location/current?latitude=${latitude}&longitude=${longitude}`
          );
          const data = await response.json();
          
          if (data.success) {
            handleLocationSelect(data.data);
          }
        } catch (error) {
          console.error('Error getting current location:', error);
          alert('Failed to detect location');
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        alert('Failed to get your location. Please enable location services.');
        setIsDetecting(false);
      }
    );
  };

  const handleLocationSelect = (location: Location | PopularLocation) => {
    // Convert PopularLocation to Location format if needed
    const formattedLocation: Location = 'displayName' in location 
      ? location 
      : {
          displayName: `${location.name}, ${location.city}`,
          address: {
            city: location.city,
            state: location.state,
            postcode: '',
            country: 'India',
          },
          coordinates: {
            latitude: location.latitude,
            longitude: location.longitude,
          },
        };

    setLocation(formattedLocation);
    setIsLocationModalOpen(false);
  };

  return (
    <Dialog open={isLocationModalOpen} onOpenChange={setIsLocationModalOpen}>
      <DialogContent className="sm:max-w-[500px] p-0 gap-0 bg-white">
        <DialogHeader className="p-6 pb-4 bg-white">
          <DialogTitle className="text-xl font-semibold text-gray-900">Change Location</DialogTitle>
        </DialogHeader>

        {/* Tabs */}
        <div className="flex border-b bg-white">
          <button
            onClick={() => setActiveTab('detect')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'detect'
                ? 'text-green-600 border-b-2 border-green-600 bg-white'
                : 'text-gray-600 hover:text-gray-900 bg-white'
            }`}
          >
            Detect my location
          </button>
          <button
            onClick={() => setActiveTab('search')}
            className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
              activeTab === 'search'
                ? 'text-green-600 border-b-2 border-green-600 bg-white'
                : 'text-gray-600 hover:text-gray-900 bg-white'
            }`}
          >
            Search delivery location
          </button>
        </div>

        <div className="p-6 bg-white">
          {activeTab === 'detect' ? (
            <div className="space-y-4">
              {/* Detect Location Button */}
              <Button
                onClick={detectCurrentLocation}
                disabled={isDetecting}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-6"
              >
                {isDetecting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Detecting...
                  </>
                ) : (
                  <>
                    <Navigation className="mr-2 h-5 w-5" />
                    Use Current Location
                  </>
                )}
              </Button>

              {/* Popular Locations */}
              {popularLocations.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Locations</h3>
                  <div className="space-y-2">
                    {popularLocations.map((location) => (
                      <button
                        key={location.id}
                        onClick={() => handleLocationSelect(location)}
                        className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                      >
                        <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{location.name}</p>
                          <p className="text-sm text-gray-500 truncate">{location.address}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for area, street name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-6"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="h-5 w-5 text-gray-400" />
                  </button>
                )}
              </div>

              {/* Search Results */}
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-green-600" />
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {searchResults.map((location, index) => (
                    <button
                      key={location.id || index}
                      onClick={() => handleLocationSelect(location)}
                      className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
                    >
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 line-clamp-1">
                          {location.address.road || location.address.suburb || location.address.city}
                        </p>
                        <p className="text-sm text-gray-500 line-clamp-2">{location.displayName}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.length >= 3 ? (
                <div className="text-center py-8 text-gray-500">
                  No locations found
                </div>
              ) : null}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
