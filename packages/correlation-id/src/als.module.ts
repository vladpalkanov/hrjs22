import { Module, Global } from '@nestjs/common';
import { ALSService } from './als.service';
import { IncomingInterceptor } from './interceptors/incoming.interceptor';
import { OutgoingInterceptor } from './interceptors/outgoing.interceptor';

@Global()
@Module({
  providers: [ALSService, IncomingInterceptor, OutgoingInterceptor],
  exports: [ALSService, IncomingInterceptor, OutgoingInterceptor],
})
export class ALSModule {}
