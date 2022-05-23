"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasRole = void 0;
// isAuthorized
const hasRole = (options) => {
    return (req, res, next) => {
        const { uid, email, role, patientId } = res.locals;
        const { userId } = req.params;
        if (email === process.env.SUPER_USER) {
            return next();
        }
        if (options.allowSameUser && userId && userId === uid) {
            return next();
        }
        if (!role) {
            return res.status(403).send();
        }
        if (options.roles.includes(role)) {
            return next();
        }
        return res.status(403).send();
    };
};
exports.hasRole = hasRole;
