import {httpClient} from "../config/AxiosHelper.js";

export const createRoom = async (roomDetail)=>{
    const response = await httpClient.post('/api/v1/rooms', roomDetail, {
        headers:{
            'Content-Type': 'text/plain',
        }
    });
    return response.data;
};

