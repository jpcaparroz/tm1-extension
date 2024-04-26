"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeProvider = void 0;
const TreeProvider = async (tm1) => {
    const cubes = await tm1.cubes.getAllNames();
    console.log(cubes);
    const dimensions = await tm1.dimensions.getAllNames();
    console.log(dimensions);
    const processses = await tm1.processes.getAllNames();
    console.log(processses);
    const modelCubes = await tm1.cubes.getModelCubes();
    console.log(modelCubes);
    const chores = await tm1.chores.getAllNames();
    console.log(chores);
};
exports.TreeProvider = TreeProvider;
//# sourceMappingURL=tree-provider.js.map