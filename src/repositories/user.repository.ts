import { getRepository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from '../modules/user/dto/create.user.dto';

export class UserRepository {
  public async fetchAllRow() {
    return await getRepository(User).createQueryBuilder().getMany();
  }

  public async fetchOneRow({ email }) {
    return await getRepository(User)
      .createQueryBuilder('user')
      .where('user.email = :email', { email: email })
      .getOne();
  }

  public async insertRow(createUserDto: CreateUserDto) {
    return await getRepository(User)
      .createQueryBuilder('user')
      .insert()
      .into(User)
      .values({
        email: createUserDto.email,
        password: createUserDto.password,
        hp: createUserDto.hp,
        birth: createUserDto.birth,
      })
      .execute();
  }
}
