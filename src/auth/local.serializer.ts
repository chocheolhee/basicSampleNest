import {Injectable} from "@nestjs/common";
import {PassportSerializer} from "@nestjs/passport";
import {AuthService} from "./auth.service";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class LocalSerializer extends PassportSerializer {
    constructor(
        private readonly authService: AuthService,
        @InjectRepository(User) private usersRepository: Repository<User>
    ) {
        super();
    }

    serializeUser(user: User, done: CallableFunction): any {
        done(null, user.id);
    }

    async deserializeUser(userId: string, done: CallableFunction): Promise<any> {
        return await this.usersRepository.findOneOrFail({
            where: {id: +userId}
        }).then((user: User) => {
            console.log('user', user);
            done(null, user);
        }).catch((error) => done(error));
    }
}