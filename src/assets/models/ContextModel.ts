import { Cube } from './CubeModel';
import { Process } from './ProcessModel';

export interface CubeContext {
    "@odata.context": string;
    value: Cube[];
}

export interface ProcessContext {
    "@odata.context": string;
    value: Process[];
}
