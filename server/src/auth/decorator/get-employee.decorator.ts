import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

const prisma = new PrismaService();

export const GetEmployee = createParamDecorator(
  async (data: unknown, context: ExecutionContext) => {
    const request = context?.switchToHttp()?.getRequest();
    const currentEmployer = await prisma?.company?.findUnique({
      where: { id: request.user.sub },
    });

    return currentEmployer.id;
  },
);
