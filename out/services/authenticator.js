"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const tm1js_1 = require("tm1js");
async function authenticate(config) {
    const { address, port, user, password, ssl } = config;
    const rest = new tm1js_1.RestService({ address, port, user, password, ssl });
    return tm1js_1.TM1Service.connect(rest);
}
exports.authenticate = authenticate;
//# sourceMappingURL=authenticator.js.map