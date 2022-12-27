import {IsNotEmpty, IsString} from "class-validator";

export class PostCreateDto {

    @IsString()
    @IsNotEmpty()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public content: string;

    @IsNotEmpty()
    @IsString()
    public description: string;
}