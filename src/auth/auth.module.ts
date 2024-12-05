import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { JwtStrategy } from '../jwt/jwt.strategy';

@Module({
    imports: [
        JwtModule.register({
            secret: 'secret-key',
            signOptions: { expiresIn: '1h' },
        }),
    ],
    controllers: [AuthController],
    providers: [JwtStrategy],
})
export class AuthModule { }
