import { PrismaClient } from "@prisma/client";

const singletonPrismaClient = () => {
    return new PrismaClient()
};

declare global {
    var prisma: undefined | ReturnType<typeof singletonPrismaClient>;
}

export const prisma = global.prisma ?? singletonPrismaClient();

if( process.env.NODE_ENV !== "production" ) {
    global.prisma = prisma;
}