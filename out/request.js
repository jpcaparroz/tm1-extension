"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDimensionInfo = exports.getCubeDimensions = exports.getCubeInfo = exports.getAllDimensions = exports.getAllCubes = void 0;
const baseUrl = `https://192.168.0.11:47909/api/v1/`;
const user = 'admin';
const password = '';
const authorizationParams = {
    method: "GET",
    headers: {
        'Authorization': `Basic ${encodeCredentials(`${user}:${password}`)}`,
        'Content-Type': "application/json"
    }
};
//Function to encode credentials
function encodeCredentials(credentials) {
    const asciiPass = decodeURIComponent(encodeURIComponent(`${credentials}`));
    const base64Bytes = btoa(asciiPass);
    return (base64Bytes);
}
// Function to get list of all cubes
const getAllCubes = async () => {
    const urlRequest = `${baseUrl}Cubes?$expand=Dimensions($select=Name)`;
    const response = await fetch(urlRequest, authorizationParams);
    return await response.json();
};
exports.getAllCubes = getAllCubes;
// Function to get all dimensions
const getAllDimensions = async () => {
    const urlRequest = `${baseUrl}Dimensions`;
    const response = await fetch(urlRequest, authorizationParams);
    return await response.json();
};
exports.getAllDimensions = getAllDimensions;
// Function to get information about one cube
const getCubeInfo = async (cubeName) => {
    const urlRequest = `${baseUrl}Cubes('${cubeName}')`;
    const response = await fetch(urlRequest, authorizationParams);
    return await response.json();
};
exports.getCubeInfo = getCubeInfo;
// Function to get information about one cube
const getCubeDimensions = async (cubeName) => {
    const urlRequest = `${baseUrl}Cubes('${cubeName}')/Dimensions`;
    const response = await fetch(urlRequest, authorizationParams);
    return await response.json();
};
exports.getCubeDimensions = getCubeDimensions;
// Function to get information about one cube
const getDimensionInfo = async (dimensionName) => {
    const urlRequest = `${baseUrl}Dimensions('${dimensionName}')`;
    const response = await fetch(urlRequest, authorizationParams);
    return await response.json();
};
exports.getDimensionInfo = getDimensionInfo;
//# sourceMappingURL=request.js.map