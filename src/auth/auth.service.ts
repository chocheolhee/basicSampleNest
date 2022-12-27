import {Injectable} from '@nestjs/common';
import bcrypt from "bcrypt";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class AuthService {
    constructor(@InjectRepository(User) private usersRepository: Repository<User>) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({
            where: {email}
        })
        console.log(email, password, user);

        if (!user) {
            return null;
        }

        const result = await bcrypt.compare(password, user.password);
        if (result) {
            const {password, ...userWithoutPassword} = user;
            return userWithoutPassword;
        }
        return null;
    }
}