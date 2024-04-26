import { TM1Service } from "tm1js";
import { connectToTM1 } from "./authenticator";
import * as credentials from '../assets/examples/applications.json';

export const TreeProvider = async (tm1: TM1Service) => {
    const cubes = await tm1.cubes.getAllNames()
    console.log(cubes);
    const dimensions = await tm1.dimensions.getAllNames()
    console.log(dimensions);
    const processses = await tm1.processes.getAllNames()
    console.log(processses);
    const modelCubes = await tm1.cubes.getModelCubes()
    console.log(modelCubes);
    const chores = await tm1.chores.getAllNames()
    console.log(chores);
}

