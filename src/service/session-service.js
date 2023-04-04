import Session from "../model/session-model.js";
import { sign } from "../utils/jwt-utils.js";
import config from "../config/config.js";

export async function createSession(userId, userAgent) {
    const session = await Session.create({ user: userId, userAgent });

    return session;
}

export function createAccessToken(user, session) {
    //build and return the new access token
    const payload = {
        user_id: user._id,
        user_name: user.name,
        user_email: user.email,
        session_id: session._id,
    };
    const accessToken = sign({ payload }, { expiresIn: config.token.accessTokenTtl });

    return accessToken;
}