import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User {
  
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column({ type:'varchar', unique: true })
  public email: string;

  @Column({ type:'varchar' })
  @Exclude()
  public password: string;

  @Column({ type:'varchar' })
  @Exclude()
  public remember_token: string;

  @Column('timestamp')
  public created_at: Timestamp;

  @Column('timestamp')
  public updated_at: Timestamp;
}