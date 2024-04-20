import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { apiKey as apiKeyConfig } from 'config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const apiKey = request.headers['api-key']; // give the name you want

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing.');
    }

    // call your env. var the name you want
    if (apiKey !== apiKeyConfig) {
      throw new UnauthorizedException('Invalid API key.');
    }

    return true;
  }
}
