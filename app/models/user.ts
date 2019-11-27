/* eslint-disable new-cap */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export interface UserDTO {
  username: string;
}

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  username: string;

  constructor(userData: UserDTO) {
    this.username = userData && userData.username;
  }
}
