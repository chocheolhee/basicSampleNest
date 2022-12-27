import {Body, Controller, Get, Post, Req, Res, UseGuards, UseInterceptors} from '@nestjs/common';
import {JoinRequestDto} from "./dto/join.request.dto";
import {UsersService} from "./users.service";
import {User} from "../common/decorators/user.decorator";
import {UndefinedToNullInterceptor} from "../common/interceptors/undefinedToNull.interceptor";
import {LocalAuthGuard} from "../auth/local-auth.guard";
import {LoggedInGuard} from "../auth/logged-in.guard";
import {NotLoggedInGuard} from "../auth/not-logged-in.guard";

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    /**
     * 모든 유저 가져오기
     * @param user
     */
    @Get()
    getUsers(@User() user) {
        return user || false;
    }

    /**
     * 회원가입
     * @param registerDto
     */
    @Post()
    @UseGuards(NotLoggedInGuard)
    async register(@Body() registerDto: JoinRequestDto) {
        console.log('data', registerDto);
        return await this.usersService.register(registerDto);
    }

    /**
     * 로그인
     * @param user
     */
    @Post('login')
    @UseGuards(LocalAuthGuard)
    login(@User() user) {
        return user;
    }

    /**
     * 로그아웃
     */
    @Post('logout')
    @UseGuards(LoggedInGuard)
    logOut(@Req() req, @Res() res) {
        req.logOut(() => {
            res.clearCookie('connect.sid', {httpOnly: true})
            res.send('ok');
        });
    }
}
