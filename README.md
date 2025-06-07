# Otaku Realm Expo

A modern anime discovery and tracking application built with React Native and Expo, powered by the AniList API.

## Features

- 🎯 Trending Anime
- 📺 Seasonal Anime
- 🔍 Advanced Search
- 🏆 Top 100 Anime
- 🎨 Genre-based Browsing
- 📱 Beautiful UI/UX
- 🌙 Dark Mode Support
- 🔄 Real-time Updates

## Tech Stack

- React Native
- Expo
- Redux Toolkit
- TypeScript
- AniList GraphQL API
- React Navigation
- Expo Router

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/otaku-realm-expo.git
cd otaku-realm-expo
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create a `.env` file in the root directory and add your AniList token:
```env
ANILIST_TOKEN=your_anilist_token_here
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Run on your preferred platform:
```bash
# For iOS
npm run ios
# For Android
npm run android
# For web
npm run web
```

## Project Structure

```
otaku-realm-expo/
├── app/                 # Expo Router app directory
├── assets/             # Static assets (images, fonts)
├── components/         # Reusable React components
├── constants/          # App constants and theme
├── hooks/             # Custom React hooks
├── lib/               # Library code and API queries
├── redux/             # Redux store and API slices
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Environment Variables

The following environment variables are required:

- `ANILIST_TOKEN`: Your AniList API token

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [AniList](https://anilist.co/) for providing the API
- [Expo](https://expo.dev/) for the amazing development platform
- [React Native](https://reactnative.dev/) for the framework

## Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter)

Project Link: [https://github.com/yourusername/otaku-realm-expo](https://github.com/yourusername/otaku-realm-expo)
