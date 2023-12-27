const { withContentlayer } = require("next-contentlayer");

/** @type {import('next').NextConfig} */
const config = {
  sassOptions: {
    prependData: `@import "app/styles/variables.scss"; @import "app/styles/mixins.scss";`,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/post",
        permanent: true,
      },
    ];
  },
  webpack: (config) => {
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };
    return config;
  },
};

module.exports = withContentlayer(config);
