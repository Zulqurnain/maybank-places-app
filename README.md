# React Native Places Search App

A React Native mobile application built with Expo that integrates Google Places Autocomplete API for searching and displaying places on a map.

## Features

- Google Places Autocomplete integration for place search
- Display selected place information and coordinates
- Search history tracking with Redux
- Offline mode detection
- Clean, modular codebase with TypeScript

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI installed globally: `npm install -g expo-cli`
- Google Places API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd maybanktest1
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Create a `.env` file in the root directory
   - Add your Google Places API key:
   ```
   EXPO_PUBLIC_GOOGLE_PLACES_API_KEY=your_api_key_here
   ```

   Alternatively, you can add it to `app.json` under `extra.googlePlacesApiKey`

## Running the App

1. Start the Expo development server:
```bash
npm start
```

2. Run on iOS simulator:
```bash
npm run ios
```

3. Run on Android emulator:
```bash
npm run android
```

4. Or scan the QR code with Expo Go app on your device

## Configuration

### Google Places API Key Setup

1. Get your API key from [Google Cloud Console](https://console.cloud.google.com/)
2. Enable Places API in your project
3. Add the key to your `.env` file or `app.json` as mentioned above

Note: For assessment purposes, the `.env` file is included in the repository. In production, ensure `.env` is in `.gitignore`.

## Project Structure

```
src/
├── components/          # React components
├── redux/              # Redux store and slices
├── services/           # API services
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── screens/            # Screen components
DEMO/                   # Demo video and screenshots
```

## Known Limitations

- Map display shows placeholder in Expo Go. For full map functionality, a development build is required.
- The app requires an active internet connection for place search.
- Search history is limited to 20 most recent items.

## Demo

The `DEMO` folder contains:
- `demo.mov` - Video demonstration of the app
- `demoImage.png` - Screenshot showing the app interface

## Testing

Run tests with:
```bash
npm test
```

## Technologies Used

- React Native
- Expo
- Redux Toolkit
- Ant Design (React Native)
- TypeScript
- Jest

