import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

const prisma = new PrismaService();

export const GetCandidate = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context?.switchToHttp()?.getRequest();
    const currentCandidate = await prisma?.user?.findUnique({
      where: { id: request.user.sub },
    });
    return currentCandidate.id;
  },
);
