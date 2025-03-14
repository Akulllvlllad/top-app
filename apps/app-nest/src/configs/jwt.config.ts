import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const getGWTConfig = async (
  configService: ConfigService
): Promise<JwtModuleOptions> => {
  return {
    secret: configService.get<string>('JWT_SECRET'),
    signOptions: { expiresIn: '1h' },
  };
};
