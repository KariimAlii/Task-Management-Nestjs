﻿import { ApiProperty } from '@nestjs/swagger';

export class LoginVM {
  @ApiProperty()
  accessToken: string;
}