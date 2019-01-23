import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from 'class-transformer'
import { IsString, MinLength } from 'class-validator'
import * as bcrypt from 'bcrypt'


@Entity()
export default class User extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:true})
  firstName: string

  @Column('text', {nullable:true})
  lastName: string

  @Column('text', {nullable:false})
  email: string

  @Column('text', {nullable:true})
  city: string

  @IsString()
  @MinLength(4)
  @Column('text', { nullable:true })
  @Exclude({toPlainOnly:true})
  password: string  

  async setPassword(rawPassword: string) {
    const hash = await bcrypt.hash(rawPassword, 10)
    this.password = hash
  }

  checkPassword(rawPassword: string): Promise<boolean> {
    return bcrypt.compare(rawPassword, this.password)
  }
}
