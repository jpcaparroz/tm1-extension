import { RestConfig, RestService, TM1Service } from "tm1js";
import { TreeProvider } from "./tree-provider";

export async function connectToTM1(config: RestConfig) {
    const { address, port, user, password, ssl } = config;
    const rest = new RestService({ address, port, user, password, ssl })
    const tm1 = await TM1Service.connect(rest)
    return TreeProvider(tm1)
}

