"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToTM1 = void 0;
const tm1js_1 = require("tm1js");
const tree_provider_1 = require("./tree-provider");
async function connectToTM1(config) {
    const { address, port, user, password, ssl } = config;
    const rest = new tm1js_1.RestService({ address, port, user, password, ssl });
    const tm1 = await tm1js_1.TM1Service.connect(rest);
    return (0, tree_provider_1.TreeProvider)(tm1);
}
exports.connectToTM1 = connectToTM1;
//# sourceMappingURL=authenticator.js.map