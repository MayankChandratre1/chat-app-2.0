/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DATABASE_URL: process.env.DATABASE_URL,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
      }
};

export default nextConfig;
