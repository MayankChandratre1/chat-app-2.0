"use server";
import prisma from "@repo/db/prisma";
const getRoom = async (roomId: string) => {
  const res = await prisma.room.findFirst({
    where: {
      id: roomId,
    },
    select: {
      messages: true,
      name: true,
      image: true,
      members: {
        select: {
          email: true,
          phone: true,
          username: true,
          profile_pic: true,
        },
      },
    },
  });
  return res;
};

export default getRoom;
