import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class DelayMiddleware implements NestMiddleware {
  async use(req: any, res: any, next: () => void) {
    await new Promise((resolve) => setTimeout(resolve, 2000)); // Tạo độ trễ 2 giây
    next();
  }
}
