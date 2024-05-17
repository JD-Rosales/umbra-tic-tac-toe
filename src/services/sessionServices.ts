import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const startNewSession = async ({
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

const loadSession = async (sessionId: string) => {
  try {
    const session = await prisma.session.findUniqueOrThrow({
      where: {
        id: sessionId,
        AND: {
          isEnded: false,
        },
      },
      select: {
        id: true,
        players: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return session;
  } catch (error) {
    throw new Error('Invalid game session.');
  }
};

export default {
  startNewSession,
  loadSession,
};
