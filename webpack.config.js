module.exports = function override(config) {
  const oneOfRule = config.module.rules.find(rule => rule.oneOf);
  if (oneOfRule) {
    const fileLoaderRule = oneOfRule.oneOf.find(rule => rule.loader && rule.loader.includes('file-loader'));
    if (fileLoaderRule) {
      fileLoaderRule.exclude.push(/\.svg$/);
    }

    oneOfRule.oneOf.unshift({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false
              }
            }
          }
        }
      ]
    });
  }

  return config;
};