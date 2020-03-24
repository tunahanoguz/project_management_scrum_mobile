module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      "module-resolver",
      {
        extensions: [".ios.js", ".android.js", ".js", ".json"],
        alias: {
          "components": "./src/components",
          "screens": "./src/screens",
          "actions": "./src/actions",
          "reducers": "./src/reducers",
          "navigation": "./src/navigation",
        }
      }
    ]
  ]
};
