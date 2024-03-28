import { Dimension } from "./DimensionModel";

export interface Cube {
    "@odata.etag": string;
    "Name": string;
    "Rules": string;
    "DrillthroughRules": boolean;
    "LastSchemaUpdate": string;
    "LastDataUpdate": string;
    "Attributes": {
        "Name": string;
    }
    "Dimensions": Dimension[];
}
