import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";

export function SwaggerConfigInit(app: INestApplication): void {
    const document = new DocumentBuilder()
        .setTitle("Termeh-Nasim")
        .setDescription("بک اند سامانه فنی و حرفه ای موسسه فرهنگی و هنری ترمه نسیم")
        .setVersion('v0.0.1')
        .addBearerAuth(swaggerAuthConfig(), "Authorization")
        .build();

    const swaggerDocument = SwaggerModule.createDocument(app, document);
    SwaggerModule.setup("/swagger", app, swaggerDocument)
}

function swaggerAuthConfig(): SecuritySchemeObject {
    return {
        type: 'http',
        bearerFormat: 'JWT',
        in: 'header',
        scheme: 'bearer'
    }
}