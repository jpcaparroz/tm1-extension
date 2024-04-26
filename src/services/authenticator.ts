import { RestConfig, RestService, TM1Service } from "tm1js";

export async function authenticate(config: RestConfig): Promise<TM1Service> {
    const { address, port, user, password, ssl } = config;
    const rest = new RestService({ address, port, user, password, ssl });
    return TM1Service.connect(rest);
}