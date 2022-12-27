import {Injectable} from '@nestjs/common';
import {PostCreateDto} from "./dto/post.create.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Post} from "./post.entity";
import {Repository} from "typeorm";
import {User} from "../users/user.entity";

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>
    ) {
    }

    async create(postCreateDto: PostCreateDto, user: User) {
        const {title, content, description} = postCreateDto;

        const createPost = new Post();
        createPost.title = title;
        createPost.content = content;
        createPost.description = description;
        createPost.user = user;

        return await this.postsRepository.save(createPost);
    }

    async read() {
        return await this.postsRepository.find()
    }
}
