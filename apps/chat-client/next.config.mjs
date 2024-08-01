/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DATABASE_URL: process.env.DATABASE_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        WEBSOCKET_URL: process.env.WEBSOCKET_URL,
      }
};

export default nextConfig;
