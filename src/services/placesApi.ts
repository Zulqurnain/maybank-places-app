import { Place, PlacesAutocompleteResponse } from '@/src/types';
import { getGooglePlacesApiKey } from '@/src/utils/config';

const API_BASE_URL = 'https://maps.googleapis.com/maps/api';

export const searchPlaces = async (query: string): Promise<Place[]> => {
  if (!query.trim()) {
    return [];
  }

  const apiKey = getGooglePlacesApiKey();
  if (!apiKey) {
    throw new Error('Google Places API key is not configured');
  }

  const url = `${API_BASE_URL}/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${apiKey}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  const data: PlacesAutocompleteResponse = await response.json();
  
  if (!data.predictions) {
    return [];
  }

  return data.predictions.map((prediction) => ({
    placeId: prediction.place_id,
    description: prediction.description,
    mainText: prediction.structured_formatting.main_text,
    secondaryText: prediction.structured_formatting.secondary_text,
  }));
};

export const getPlaceDetails = async (placeId: string): Promise<Place> => {
  const apiKey = getGooglePlacesApiKey();
  if (!apiKey) {
    throw new Error('Google Places API key is not configured');
  }

  const url = `${API_BASE_URL}/place/details/json?place_id=${placeId}&fields=place_id,geometry,name,formatted_address&key=${apiKey}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch place details: ${response.status}`);
  }

  const result: any = await response.json();
  
  if (!result.result) {
    throw new Error('Place details not found');
  }

  return {
    placeId: result.result.place_id,
    description: result.result.formatted_address,
    mainText: result.result.name,
    secondaryText: result.result.formatted_address,
    latitude: result.result.geometry.location.lat,
    longitude: result.result.geometry.location.lng,
  };
};
