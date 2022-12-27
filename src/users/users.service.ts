import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {JoinRequestDto} from "./dto/join.request.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {
    }

    async register(registerDto: JoinRequestDto) {
        const {email, username, password} = registerDto;

        if (!email) {
            // 이메일 없다고 에러
            throw new BadRequestException('이메일을 입력해주세요.');
        }
        if (!username) {
            // 이름 없다고 에러
            throw new BadRequestException('이름을 입력해주세요.');
        }

        const user = await this.usersRepository.findOne({where: {email}});
        if (user) {
            // 이미 존재하는 유저 에러 return
            throw new UnauthorizedException('이미 존재하는 유저입니다.');
        }

        const hashedPassword = await bcrypt.hash(password, 6);
        return await this.usersRepository.save({
            email, username, password: hashedPassword,
        });
    }
}
