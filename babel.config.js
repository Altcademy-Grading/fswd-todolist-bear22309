module.exports = function(api) {
  api.cache(true);

  const isDevelopmentEnv = api.env('development');
  const isProductionEnv = api.env('production');

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          loose: true,  // Ensure 'loose' mode is set globally if needed
          useBuiltIns: 'usage',
          corejs: 3,
        }
      ],
      '@babel/preset-react'
    ],
    plugins: [
      [
        '@babel/plugin-proposal-class-properties',
        {
          loose: true
        }
      ],
      [
        '@babel/plugin-proposal-private-methods',
        {
          loose: true
        }
      ],
      [
        '@babel/plugin-proposal-private-property-in-object',
        {
          loose: true
        }
      ]
    ]
  };
};
