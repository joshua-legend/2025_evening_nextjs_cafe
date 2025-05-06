import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { GuestbooksService } from './guestbooks.service';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';
@Controller('guestbooks')
export class GuestbooksController {
  constructor(private readonly guestbooksService: GuestbooksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createGuestbookDto: CreateGuestbookDto, @Req() req) {
    console.log(req.user);
    const userId = req.user.sub;
    const guestbook = await this.guestbooksService.create(createGuestbookDto, userId);
    return { data: guestbook, message: '방명록 작성 성공' };
  }

  @Get()
  async findAll() {
    const guestbooks = await this.guestbooksService.findAll();
    return { data: guestbooks, message: '방명록이당' };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestbooksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestbookDto: UpdateGuestbookDto) {
    return this.guestbooksService.update(+id, updateGuestbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestbooksService.remove(+id);
  }
}
