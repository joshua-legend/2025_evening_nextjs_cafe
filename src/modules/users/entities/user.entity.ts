import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Guestbook } from '../../guestbooks/entities/guestbook.entity';
import { RefreshToken } from 'src/modules/auth/entities/refresh-token.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @OneToMany(() => Guestbook, (guestbook) => guestbook.user)
  guestbooks: Guestbook[];

  @OneToMany(() => RefreshToken, (token) => token.user, {
    cascade: ['remove'],
  })
  refreshTokens: RefreshToken[];
}
