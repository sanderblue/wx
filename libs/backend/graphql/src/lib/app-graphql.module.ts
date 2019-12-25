import { Module } from '@nestjs/common';
import { SnowDepthResolver } from './snow-depth/snow-depth.resolver';
import { ServicesModule } from '@wx/backend/services';

@Module({
  imports: [ServicesModule],
  providers: [SnowDepthResolver],
})
export class AppGraphQLModule {}
