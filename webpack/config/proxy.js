const proxyConfig = {
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      pathRewrite: { "^/api": "" },
      changeOrigin: true,
    },
  },
};

export default proxyConfig;
