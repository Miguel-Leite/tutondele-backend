import { resolve } from 'node:path';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { DatabaseModule } from '@infra/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: resolve(process.cwd(), 'src/schema.gql'),
    }),
  ],
  providers: [
    
  ],
})
export class HttpModule {}
