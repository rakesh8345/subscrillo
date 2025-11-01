# 📱 Subscrillo



**"React Native app for tracking subscriptions with minimalistic UI/UX."**



## ✨ Features

-   **Subscription Tracking:** Easily add, view, and manage all your active and upcoming subscriptions in one place.
-   **Minimalistic UI/UX:** Enjoy a clutter-free and highly intuitive user experience focused on essential functionality.
-   **Payment Reminders:** Get timely notifications before a subscription renews, helping you avoid unexpected charges.
  
## 🛠️ Tech Stack

**Mobile:**

[![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)



**Styling:**

[![React Native StyleSheet](https://img.shields.io/badge/React_Native_StyleSheet-61DAFB?style=for-the-badge)](https://reactnative.dev/docs/stylesheet)

**Build Tools:**

[![Metro Bundler](https://img.shields.io/badge/Metro_Bundler-1A1A1A?style=for-the-badge&logo=react)](https://metrobundler.dev/)

**Persistence (assumed local storage):**

[![AsyncStorage](https://img.shields.io/badge/AsyncStorage-282C34?style=for-the-badge&logo=react)](https://react-native-async-storage.github.io/async-storage/) <!-- Assumed for local data persistence -->

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed on your development machine:

-   **Node.js**: [LTS version recommended](https://nodejs.org/en/download/) (v18.x or newer).
-   **npm** or **Yarn**: (npm comes with Node.js, or install Yarn globally: `npm install -g yarn`).
-   **React Native CLI**: `npm install -g react-native-cli`.
-   **JDK**: Java Development Kit (version 11 or newer).
-   **Android Studio**: For Android development (includes Android SDK, platform tools).
-   **Xcode**: For iOS development (macOS only, includes iOS SDK).
-   **Watchman**: (macOS only) `brew install watchman`.

For detailed setup instructions, refer to the [React Native Environment Setup Guide](https://reactnative.dev/docs/environment-setup).

3.  **Environment setup**
    This project does not currently use a `.env` file for configuration. All settings are within the source code.

## 📁 Project Structure

```
subscrillo/
├── src/
│   ├── assets/         # Static assets like images, fonts, icons
│   ├── components/     # Reusable UI components
│   ├── navigation/     # React Navigation setup (if used)
│   ├── screens/        # Main screens/pages of the application
│   ├── services/       # API calls or external service integrations (if any)
│   ├── store/          # State management (e.g., Context API, Redux, Zustand)
│   ├── utils/          # Utility functions and helpers
│   ├── App.tsx         # Main application component
│   └── index.ts        # Entry point of the application
├── android/            # Android native project files
├── ios/                # iOS native project files
├── .prettierrc.js      # Prettier configuration
├── app.json            # React Native app configuration
├── babel.config.js     # Babel configuration
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── metro.config.js     # Metro Bundler configuration
```

1.  Start the Metro bundler using `npm start`.
2.  In a separate terminal, run `npm run android` or `npm run ios` to launch the app.
3.  Changes to your JavaScript/TypeScript code will automatically reload in the app.
4.  Use `Ctrl+M` (Android) or `Cmd+D` (iOS Simulator) to open the developer menu for debugging options.


## 📄 License



## 🙏 Acknowledgments

-   Built with [React Native](https://reactnative.dev/) for cross-platform mobile development.
-   [TypeScript](https://www.typescriptlang.org/) for type safety and improved developer experience.
-   Thanks to the open-source community for providing excellent libraries and tools.


<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by [rakesh8345](https://github.com/rakesh8345)

</div>

