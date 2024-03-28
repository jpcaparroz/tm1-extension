import { Parameter } from './ParameterModel';
import { Variable } from './VariableModel';

export interface Process {
    "@odata.etag": string;
    "Name": string;
    "PrologProcedure": string;
    "MetadataProcedure": boolean;
    "DataProcedure": string;
    "EpilogProcedure": string;
    "DataSource": {
        "Type": string;
        "dataSourceNameForClient": string;
        "dataSourceNameForServer": string;
        "password": string;
        "query": string;
        "userName": string;
        "usesUnicode": boolean;
    }
    "Parameters": Parameter[];
    "Variables": Variable[];
}
