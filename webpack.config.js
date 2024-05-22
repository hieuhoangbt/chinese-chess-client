module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      // Các quy tắc khác
    ],
  },
  // Các cấu hình khác
};
