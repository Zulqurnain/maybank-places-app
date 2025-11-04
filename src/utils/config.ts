import Constants from 'expo-constants';

export function getGooglePlacesApiKey(): string {
  const apiKey = Constants.expoConfig?.extra?.googlePlacesApiKey || 
                 process.env.EXPO_PUBLIC_GOOGLE_PLACES_API_KEY ||
                 '';
  
  if (!apiKey) {
    console.warn('Google Places API key not found');
  }
  
  return apiKey;
}
