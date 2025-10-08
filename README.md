# 🎬 Quasar Streaming App

A modern React Native streaming application built with TypeScript and React Navigation, featuring a Netflix-like interface for browsing and discovering movies.

## 📱 Features

### Core Functionality
- **Featured Movie Hero Section** - Prominently displays trending content with play and add-to-list actions
- **Horizontal Movie Lists** - Smooth scrolling sections for "You Might Like", "My List", and "Upcoming"
- **Movie Details Modal** - Comprehensive movie information with expandable sections
- **Responsive Design** - Optimized for different screen sizes and orientations

### UI/UX Highlights
- **Netflix-inspired Dark Theme** - Sleek black interface with red accents
- **Smooth Animations** - Fluid transitions and interactions
- **Touch-friendly Navigation** - Intuitive bottom tab navigation
- **High-quality Images** - Optimized image loading with Expo Image
- **Typography & Spacing** - Consistent design language throughout

## 🛠 Technical Stack

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe development
- **React Navigation** - Native navigation with stack and tab navigators
- **Expo** - Development platform and tooling
- **Expo Image** - Optimized image component
- **Vector Icons** - Ionicons for consistent iconography

## 📂 Project Structure

```
├── components/           # Reusable UI components
│   ├── MovieCard.tsx    # Movie card with different layouts
│   ├── HorizontalList.tsx # Horizontal scrolling lists
│   └── ExpandableSection.tsx # Animated collapsible sections
├── screens/             # Main application screens
│   ├── HomeScreen.tsx   # Featured content and movie lists
│   ├── MovieDetailsScreen.tsx # Detailed movie information
│   └── ExploreScreen.tsx # Search and discovery (placeholder)
├── navigation/          # Navigation configuration
│   └── AppNavigator.tsx # Stack and tab navigation setup
├── types/              # TypeScript type definitions
│   └── movie.types.ts  # Movie data interfaces
├── data/               # Static data and API responses
│   └── movies.json     # Sample movie data
└── App.tsx            # Application entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (>= 20.19.4)
- npm or Yarn
- Expo CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/orellanamr/quasar-streaming.git
   cd quasar-streaming
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   yarn start
   # or
   npm start
   ```

4. **Run on your preferred platform**
   - **iOS**: Press `i` in the terminal or scan QR code with iOS device
   - **Android**: Press `a` in the terminal or scan QR code with Android device
   - **Web**: Press `w` in the terminal

## 📱 Screens & Navigation

### Home Screen
- **Hero Section**: Featured movie with prominent play button and metadata
- **Trending Badge**: "#1 in Movies Today" indicator
- **Action Buttons**: Play and "My List" options
- **Movie Categories**: Horizontal scrolling lists for different content types

### Movie Details Screen
- **Header Image**: Full-width movie poster with overlay information
- **Metadata Display**: Year, duration, rating, and quality information
- **Action Buttons**: Play, Add to List, and Download options
- **Expandable Sections**: Cast, Crew, Directors, Writers, and Classification details

### Navigation
- **Bottom Tab Navigation**: Home and Explore tabs
- **Modal Presentation**: Movie details presented as modal overlay
- **Type-safe Navigation**: Full TypeScript support for navigation parameters

## 🎨 Design System

### Colors
- **Primary Background**: `#000000` (Pure Black)
- **Primary Accent**: `#E50914` (Netflix Red)
- **Text Primary**: `#FFFFFF` (White)
- **Text Secondary**: `#CCCCCC` (Light Gray)
- **Text Muted**: `#999999` (Gray)

### Typography
- **Featured Title**: 36px, Bold
- **Section Titles**: 20px, Bold
- **Movie Titles**: 14px, Semi-bold
- **Metadata**: 14px, Regular
- **Buttons**: 16px, Bold

## 🔧 Development

### Architectural Decisions

1. **React Navigation over Expo Router**: Chosen to match technical requirements exactly
2. **TypeScript Throughout**: Comprehensive type safety for better development experience
3. **Component-based Architecture**: Reusable components for maintainability
4. **Responsive Design**: Flexible layouts that adapt to different screen sizes

## 📊 Data Structure

The application uses a well-defined JSON structure for movie data:

```typescript
interface Movie {
  id: string;
  title: string;
  year: number;
  duration: string;
  rating: string;
  quality: string;
  description: string;
  isTopMovie: boolean;
  posters: {
    portrait: { url: string; aspectRatio: string };
    landscape: { url: string; aspectRatio: string };
    thumbnail: { url: string; aspectRatio: string };
  };
  cast: Array<{ characterName: string; actorName: string }>;
  crew: {
    directors: string[];
    producers: string[];
    writers: string[];
  };
  classification: {
    rating: string;
    advisoryContent: string[];
  };
}
```

## 🧪 Testing

Run the linter to check code quality:
```bash
yarn lint
# or
npm run lint
```

## 📝 Git Workflow

This project follows conventional commit messages and organized development:

```
feat: add new feature
fix: bug fix
refactor: code refactoring
style: formatting changes
docs: documentation updates
chore: maintenance tasks
```

## 🔮 Future Enhancements

- **Search Functionality**: Implement movie search and filtering
- **User Authentication**: Add user profiles and personalized lists
- **Video Playback**: Integrate video player for movie streaming
- **Offline Support**: Cache movies for offline viewing
- **Push Notifications**: Notify users of new releases
- **Performance Optimization**: Implement lazy loading and image caching
- **Unit Testing**: Add comprehensive test coverage
- **Accessibility**: Improve accessibility features

## 📄 License

This project is part of a technical assessment for Quasar Solutions.

## 👨‍💻 Developer

**Maynor Orellana**  
Mobile Developer  
[GitHub](https://github.com/orellanamr)

---

*Built with ❤️ for Quasar Solutions Technical Assessment*
