import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class School {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  address: string;
}
