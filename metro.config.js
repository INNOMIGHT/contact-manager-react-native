module.exports = {
    resolver: {
      blacklistRE: /.*\/node_modules\/react-native\/.*/,
    },
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    },
    reporter: {
      suppressWarnings: true,
    },
  };
  