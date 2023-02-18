import bcrypt from "bcrypt";

export const generateHash = async (
    plaintextPassword: string
): Promise<string> => {
    return await bcrypt.hash(plaintextPassword, 10);
};

export const verifyHash = async (
    plaintextPassword: string,
    hash: string
): Promise<boolean> => {
    return await bcrypt.compare(plaintextPassword, hash);
};
