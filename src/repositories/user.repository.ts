import { getRepository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateUserDto } from '../modules/user/dto/create.user.dto';

export class UserRepository {
  public async fetchAllRow() {
    return await getRepository(Member).createQueryBuilder().getMany();
  }

  public async fetchOneRow({ email }) {
    return await getRepository(Member)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  public async insertRow(createUserDto: CreateUserDto) {
    return await getRepository(Member)
      .createQueryBuilder('user')
      .insert()
      .into(Member)
      .values({
        email: createUserDto.email,
        password: createUserDto.password,
        hp: createUserDto.hp,
        birth: createUserDto.birth,
      })
      .execute();
  }
}
