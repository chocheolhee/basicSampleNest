import {Body, Controller, Get, Post, UseGuards, UseInterceptors} from '@nestjs/common';
import {UndefinedToNullInterceptor} from "../common/interceptors/undefinedToNull.interceptor";
import {PostsService} from "./posts.service";
import {PostCreateDto} from "./dto/post.create.dto";
import {User} from "../common/decorators/user.decorator";
import {LoggedInGuard} from "../auth/logged-in.guard";

@UseInterceptors(UndefinedToNullInterceptor)
@Controller('api/posts')
export class PostsController {
    constructor(private postsService: PostsService) {
    }

    /**
     * 게시글 CREATE
     */
    @Post()
    @UseGuards(LoggedInGuard)
    async create(@Body() postCreateDto:PostCreateDto, @User() user) {
        console.log('postCreateDto, user', postCreateDto, user);
        return await this.postsService.create(postCreateDto, user);
    }

    @Get()
    async read() {
        return await this.postsService.read()
    }
}
