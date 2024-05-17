import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const startNewSession = async ({
  player1,
  player2,
}: {
  player1: string;
  player2: string;
}) => {
  const session = await prisma.session.create({
    data: {},
  });

  await prisma.player.create({
    data: {
      name: player1,
      sessionId: session.id,
    },
  });

  await prisma.player.create({
    data: {
      name: player2,
      sessionId: session.id,
    },
  });

  return session;
};
