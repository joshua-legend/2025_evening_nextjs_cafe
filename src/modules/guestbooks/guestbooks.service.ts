import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGuestbookDto } from './dto/create-guestbook.dto';
import { UpdateGuestbookDto } from './dto/update-guestbook.dto';
import { UsersService } from '../users/users.service';
import { Guestbook } from './entities/guestbook.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GuestbooksService {
  constructor(
    @InjectRepository(Guestbook)
    private guestbooksRepository: Repository<Guestbook>,
    private usersService: UsersService,
  ) {}
  async create(createGuestbookDto: CreateGuestbookDto, userId: number) {
    const user = await this.usersService.findOne(userId);
    if (!user) throw new NotFoundException(`User with ID ${userId} not found`);
    const guestbook = this.guestbooksRepository.create({
      ...createGuestbookDto,
      user,
    });
    return this.guestbooksRepository.save(guestbook);
  }

  async findAll() {
    return this.guestbooksRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Guestbook> {
    const guestbook = await this.guestbooksRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!guestbook) {
      throw new NotFoundException(`Guestbook with ID ${id} not found`);
    }
    return guestbook;
  }

  update(id: number, updateGuestbookDto: UpdateGuestbookDto) {
    return `This action updates a #${id} guestbook`;
  }

  async remove(id: number): Promise<void> {
    const result = await this.guestbooksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Guestbook with ID ${id} not found`);
    }
  }
}
