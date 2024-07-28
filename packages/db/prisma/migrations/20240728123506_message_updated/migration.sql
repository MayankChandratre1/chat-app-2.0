-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profile_pic" SET DEFAULT 'https://avatar.iran.liara.run/public/boy';
