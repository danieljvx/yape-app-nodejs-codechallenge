import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { AppDto } from './app.dto';

@Controller()
export class AppController {
  @Get()
  getApiMessages(@Res() res): Promise<AppDto> {
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'Yape Test by @danieljvx - Daniel Villanueva',
    });
  }
}
