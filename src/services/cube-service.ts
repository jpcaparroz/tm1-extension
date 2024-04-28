import { TM1Service } from 'tm1js';
import { CubeItem, CubeItemProvider } from '../objects/cube-object';

export function loadTreeCube(tm1Service: TM1Service): CubeItemProvider {
    const cubeItemProvider = new CubeItemProvider(tm1Service);
    //cubeItemProvider.getChildren()
    cubeItemProvider.getChildren = () => Promise.resolve(cubeItemProvider.getCubes());

    return cubeItemProvider
}