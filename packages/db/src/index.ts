import { PrismaClient } from "@prisma/client";

const singletonPrismaClient = () => {
    return new PrismaClient()
};

declare global {
    var prisma: undefined | ReturnType<typeof singletonPrismaClient>;
}

const prisma = global.prisma ?? singletonPrismaClient();

export default prisma

if( process.env.NODE_ENV !== "production" ) {
    global.prisma = prisma;
}