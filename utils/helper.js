import bcrypt from 'bcryptjs';
import e from 'cors';

export const hashPassword = (password) => {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
};

export const comparePassword = (raw, hash) => {
    return bcrypt.compareSync(raw, hash);
};

export const compareString = (str1, str2) => {
    if (str1 === str2) return true;
    else return false;
}