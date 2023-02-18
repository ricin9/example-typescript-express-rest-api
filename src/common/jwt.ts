import jwt from "jsonwebtoken";

export const generateToken = (userId: number) => {
    const token = jwt.sign({ sub: userId }, process.env.JWT_SECRET as string, {
        expiresIn: "30d",
    });

    return token;
};

export const verifyToken = async (token: string): Promise<jwt.JwtPayload> => {
    try {
        const payload = (await jwt.verify(
            token,
            process.env.JWT_SECRET as string
        )) as jwt.JwtPayload;

        return payload;
    } catch (err) {
        throw err;
    }
};
