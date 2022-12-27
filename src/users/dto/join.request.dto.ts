import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class JoinRequestDto {

    @IsEmail()
    @IsNotEmpty()
    public email: string;

    @IsNotEmpty()
    @IsString()
    public username: string;

    @IsNotEmpty()
    public password: string;
}