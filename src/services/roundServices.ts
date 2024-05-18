import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saveRoundEnd = async ({
  sessionId,
  winnerId,
}: {
  sessionId: string;
  winnerId?: string;
}) => {
  const roundEnd = await prisma.round.create({
    data: {
      sessionId,
      winnerId,
    },
  });

  return roundEnd;
};

export default { saveRoundEnd };
