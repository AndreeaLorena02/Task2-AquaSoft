import { Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
    constructor(private readonly jwtService: JwtService) { }

    @Post('generate-token')
    generateToken() {
        const payload = { role: 'admin', sub: 'no-user' };
        const token = this.jwtService.sign(payload);

        return { access_token: token };
    }
}
