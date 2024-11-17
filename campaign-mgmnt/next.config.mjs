/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: process.env.MONGO_URI,
        DB_NAME: process.env.DB_NAME,
        API_BASE_URL: process.env.API_BASE_URL,
      },
};

export default nextConfig;
