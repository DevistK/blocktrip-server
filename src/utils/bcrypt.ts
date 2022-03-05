import * as bcrypt from 'bcrypt';

/**
 * 비밀번호를 암호화합니다.
 * @param password 
 */
export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(password, salt);
}


export const hashPasswordCompare = async (password, hashPassword): Promise<boolean> => {
    return await bcrypt.compare(password, hashPassword);
};