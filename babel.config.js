module.exports = function (api) {
    api.cache(true);
  
    const presets = [
        [
            "@babel/preset-env",
            {
              "useBuiltIns": "entry"
            }
          ],
          "@babel/preset-react",
          "@babel/preset-typescript"
    ];
    const plugins = ["syntax-dynamic-import"];
  
    return {
      presets,
      plugins
    };
  }