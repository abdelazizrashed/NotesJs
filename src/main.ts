import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Notes.js API')
        .setDescription(`
    The Note.js API represents a fundamental yet robust implementation of CRUD (Create, Read, Update, Delete) operations. 
    Serving as a testament to my adeptness in backend web development, this project underscores my versatility with various technologies. 
    It encompasses all essential components that one would expect in a production-ready Backend API. 
    Notably, to accomplish this, I acquired proficiency in NestJS and TypeScript, reinforcing my commitment to continuous learning and adapting to new technologies in pursuit of excellence in backend development.
                        `)
        .setVersion('1.0')
        .addTag('notes')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(8080, "0.0.0.0");
}
bootstrap();
