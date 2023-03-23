import 'dotenv/config';
import { ExpoConfig } from "expo/config";

const config: ExpoConfig = {
  name: "gumy-app",
  slug: "gumy-app",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    apiUrl: process.env.API_URL,
    admCloudKey: process.env.ADM_CLOUD_KEY,
    apiKey: process.env.API_KEY,
    appId: process.env.APPID,
    roleId: process.env.ROLE_ID,
    roleName: process.env.ROLE_NAME,
    eas: {
        projectId: process.env.PROJECT_ID
    }
  }
};

export default config;
