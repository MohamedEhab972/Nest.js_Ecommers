import { Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service.js";





@Controller('auth')
export class AuthController {

constructor(private readonly authService: AuthService) {}

@Get('login')
login() {
    const data = this.authService.login();
    return {
        status: 'success',
        data,
    };
}

@Post('register')
register() {
    return {
        status: 'success',
        message: 'Registration successful',
    };
}

}