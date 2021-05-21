import jwt from "jsonwebtoken";
const SECRET = "IsImlhdCI6MTYyMTMyM";
export function verifyToken(socket, next) {
    const token = socket.handshake.auth.token;
    next();
};

export function issueToken(username) {
    const token = jwt.sign({ username: 'username' }, SECRET);
}