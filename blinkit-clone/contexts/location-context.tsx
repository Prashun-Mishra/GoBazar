'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { isAreaServiceable, getCurrentLocation, type LocationData } from '@/lib/location-service';

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

interface LocationContextType {
  location: Location | null;
  setLocation: (location: Location) => void;
  isLocationModalOpen: boolean;
  setIsLocationModalOpen: (open: boolean) => void;
  saveLocationToBackend: (location: Location, token?: string) => Promise<void>;
  isServiceable: boolean;
  checkLocationServiceability: () => Promise<boolean>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<Location | null>(null);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isServiceable, setIsServiceable] = useState(false);

  // Load location from localStorage on mount
  useEffect(() => {
    const savedLocation = localStorage.getItem('userLocation');
    if (savedLocation) {
      try {
        setLocationState(JSON.parse(savedLocation));
      } catch (error) {
        console.error('Error parsing saved location:', error);
      }
    } else {
      // Show modal if no location is saved
      setIsLocationModalOpen(true);
    }
  }, []);

  const setLocation = (newLocation: Location) => {
    setLocationState(newLocation);
    localStorage.setItem('userLocation', JSON.stringify(newLocation));
  };

  const saveLocationToBackend = async (location: Location, token?: string) => {
    if (!token) {
      console.log('No token provided, skipping backend save');
      return;
    }

    try {
      const response = await fetch('/api/location/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ location }),
      });

      const data = await response.json();
      if (!data.success) {
        console.error('Failed to save location to backend:', data.error);
      }
    } catch (error) {
      console.error('Error saving location to backend:', error);
    }
  };

  const checkLocationServiceability = async (): Promise<boolean> => {
    if (!location) return false;
    
    // Check if current location is serviceable
    const area = location.address?.suburb || location.address?.city || '';
    const serviceable = isAreaServiceable(area);
    setIsServiceable(serviceable);
    return serviceable;
  };

  return (
    <LocationContext.Provider
      value={{
        location,
        setLocation,
        isLocationModalOpen,
        setIsLocationModalOpen,
        saveLocationToBackend,
        isServiceable,
        checkLocationServiceability,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}
