import {Module} from "@nestjs/common";
import {PassportModule} from "@nestjs/passport";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";
import {AuthService} from "./auth.service";
import {LocalStrategy} from "./local.strategy";
import {LocalSerializer} from "./local.serializer";

@Module({
    imports: [
        PassportModule.register({session: true}),
        TypeOrmModule.forFeature([User])
    ],
    providers: [AuthService, LocalStrategy, LocalSerializer],
})
export class AuthModule {}