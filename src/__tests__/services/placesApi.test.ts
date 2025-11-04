import { searchPlaces, getPlaceDetails } from '@/src/services/placesApi';

global.fetch = jest.fn();

describe('placesApi', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  describe('searchPlaces', () => {
    it('returns empty for empty query', async () => {
      const result = await searchPlaces('');
      expect(result).toEqual([]);
    });

    it('throws on network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
      await expect(searchPlaces('test')).rejects.toThrow();
    });

    it('converts response correctly', async () => {
      const mockResponse = {
        predictions: [
          {
            place_id: '123',
            description: 'Test Place',
            structured_formatting: {
              main_text: 'Test',
              secondary_text: 'Place',
            },
          },
        ],
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await searchPlaces('test');
      expect(result).toHaveLength(1);
      expect(result[0].placeId).toBe('123');
      expect(result[0].mainText).toBe('Test');
    });

    it('handles empty predictions', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ predictions: [] }),
      });
      const result = await searchPlaces('test');
      expect(result).toEqual([]);
    });

    it('throws on API error status', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
      });
      await expect(searchPlaces('test')).rejects.toThrow();
    });

    it('handles multiple predictions', async () => {
      const mockResponse = {
        predictions: [
          { place_id: '1', description: 'Place 1', structured_formatting: { main_text: 'Place 1', secondary_text: 'Addr 1' } },
          { place_id: '2', description: 'Place 2', structured_formatting: { main_text: 'Place 2', secondary_text: 'Addr 2' } },
        ],
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });
      const result = await searchPlaces('test');
      expect(result).toHaveLength(2);
    });
  });

  describe('getPlaceDetails', () => {
    it('throws on network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));
      await expect(getPlaceDetails('123')).rejects.toThrow();
    });

    it('parses place details', async () => {
      const mockResponse = {
        result: {
          place_id: '123',
          name: 'Test Place',
          formatted_address: '123 Test St',
          geometry: {
            location: {
              lat: 37.7749,
              lng: -122.4194,
            },
          },
        },
      };
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await getPlaceDetails('123');
      expect(result.placeId).toBe('123');
      expect(result.latitude).toBe(37.7749);
      expect(result.longitude).toBe(-122.4194);
    });

    it('throws when result not found', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({}),
      });
      await expect(getPlaceDetails('123')).rejects.toThrow();
    });
  });
});
