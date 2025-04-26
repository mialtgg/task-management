import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TasksModule } from './tasks/tasks.module'
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entities';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'db.sqlite', // proje klasöründe dosya olacak
    entities: [Task],
    extra: {
      busyTimeout: 3000,  // 3 saniye bekle sonra hata ver
    },
    synchronize: true, // sadece development için true (otomatik tablo oluşturur)
  })
    ,AuthModule,TypeOrmModule.forFeature([Task]),ConfigModule.forRoot({
    isGlobal: true, // her yerde erişilebilir
  }), TasksModule,],
  
})
export class AppModule {}
