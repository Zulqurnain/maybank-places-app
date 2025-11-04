export interface Place {
  placeId: string;
  description: string;
  mainText: string;
  secondaryText: string;
  latitude?: number | null;
  longitude?: number | null;
}

export interface PlacesAutocompleteResponse {
  predictions: {
    place_id: string;
    description: string;
    structured_formatting: {
      main_text: string;
      secondary_text: string;
    };
  }[];
}

export interface PlaceDetails {
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  formatted_address: string;
}
