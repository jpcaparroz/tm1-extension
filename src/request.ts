
const baseUrl = `https://192.168.0.11:47909/api/v1/`
const user = 'admin'
const password = ''
const authorizationParams = {
    method: "GET",
    headers: {
        'Authorization': `Basic ${encodeCredentials(`${user}:${password}`)}`,
        'Content-Type': "application/json"
    }
}

//Function to encode credentials
function encodeCredentials(credentials:string) {
    const asciiPass = decodeURIComponent(encodeURIComponent(`${credentials}`));
    const base64Bytes = btoa(asciiPass);
    return(base64Bytes);
}

// Function to get list of all cubes
export const getAllCubes = async () => {
    const urlRequest = `${baseUrl}Cubes?$expand=Dimensions($select=Name)`
    const response = await fetch(urlRequest, authorizationParams)
    return await response.json()
}

// Function to get all dimensions
export const getAllDimensions = async () => {
    const urlRequest = `${baseUrl}Dimensions`
    const response = await fetch(urlRequest, authorizationParams)
    return await response.json()
}

// Function to get information about one cube
export const getCubeInfo = async (cubeName:string) => {
    const urlRequest = `${baseUrl}Cubes('${cubeName}')`
    const response = await fetch(urlRequest, authorizationParams)
    return await response.json()
}

// Function to get information about one cube
export const getCubeDimensions = async (cubeName:string) => {
    const urlRequest = `${baseUrl}Cubes('${cubeName}')/Dimensions`
    const response = await fetch(urlRequest, authorizationParams)
    return await response.json()
}

// Function to get information about one cube
export const getDimensionInfo = async (dimensionName:string) => {
    const urlRequest = `${baseUrl}Dimensions('${dimensionName}')`
    const response = await fetch(urlRequest, authorizationParams)
    return await response.json()
}

