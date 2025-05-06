import { PartialType } from '@nestjs/mapped-types';
import { CreateGuestbookDto } from './create-guestbook.dto';

export class UpdateGuestbookDto extends PartialType(CreateGuestbookDto) {}
