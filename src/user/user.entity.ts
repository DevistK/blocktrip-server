import {
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ length: 30, comment: '유저 아이디(이메일)' })
    email: string;

    @Column({ length: 255, comment: '유저 패스워드' })
    password: string;

    @Column({ comment: '유저 연락처' })
    hp: string;

    @Column({ comment: '유저 생년월일' })
    birth: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;
}