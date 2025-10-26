// app.config.js
export default {
  expo: {
    name: "Amigo do Cristão",
    slug: "amigo-do-cristao",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    assetBundlePatterns: ["**/*"],
    updates: {
      fallbackToCacheTimeout: 0
    },
    platforms: ["ios", "android", "web"],
    android: {
  package: "area.crista2",
  versionCode: 1,
  googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
  adaptiveIcon: {
    foregroundImage: "./assets/adaptive-icon.png",
    backgroundColor: "#FFFFFF"
  }
},
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.seunome.amigodocristao"
    },
    extra: {
      eas: {
        projectId: "644b25ac-8b07-46b3-b64b-09ee8f37a51d"
      }
    }
  }
};
