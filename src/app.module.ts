import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { CharacterModule } from './character/character.module';
import { WeaponModule } from './weapon/weapon.module';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloError } from 'apollo-server-express';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    CharacterModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      formatError: (error: GraphQLError) => {
        if (error.originalError instanceof ApolloError) {
          return error;
        }
        return new GraphQLError(error.message);
      },
    }),
    WeaponModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
