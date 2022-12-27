import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {HttpExceptionFilter} from "./common/exceptions/httpException.filter";
import {ValidationPipe} from "@nestjs/common";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const port = process.env.PORT || 4000;

    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalPipes(new ValidationPipe());

    app.use(cookieParser());
    app.use(
        session({
            resave: false,
            saveUninitialized: false,
            secret: process.env.COOKIE_SECRET,
            cookie: {
                httpOnly: true,
            }
        })
    )
    app.use(passport.initialize());
    app.use(passport.session());

    await app.listen(4000);
    console.log(`listening on port ${port}`);
}

bootstrap();
