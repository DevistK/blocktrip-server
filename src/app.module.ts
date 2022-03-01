import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRootAsync({
    useFactory: async () =>
      Object.assign(await getConnectionOptions(), {
        autoLoadEntities: true,
      }),
  })],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
