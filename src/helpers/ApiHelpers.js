import axios from 'axios';
import { Constants } from '../commonconfig';

const apiBaseUrl = Constants.API_BASE_URL;



export const postRequest = async( url, data ) => {
    return await axios
    .post( apiBaseUrl + url , data,{
            headers:
            {   
                'Content-Type':'application/json',
            }
        } 
    )
    .then( (response) => {
        if(response.data.status===1) {
            return {
              success: true,
              data: response.data,
              statusCode: response.status,
            };
        } else {
            return {
              success: false,
              data: response.data,
              statusCode: response.status,
            };
        }
    })
    .catch((error) => {
          return {
            success: false,
            data: error.response.data,
            statusCode: error.response.status,
        };
    });
}

export const postFormDataRequest = async( url, data ) => {
    console.log("Data: ",data)
    return await axios
    .post( apiBaseUrl + url,{
        headers:{          
            'Content-Type': 'multipart/form-data',
        },
        body:data
    })
    .then( (response) => {
        if(response.data.status===1) {
            return {
              success: true,
              data: response.data,
              statusCode: response.status,
            };
        } else {
            return {
              success: '123',
              data: response.data,
              statusCode: response.status,
            };
        }
    })
    .catch((error) => {
          return {
            success: false,
            data: error.response.data,
            statusCode: error.response.status,
        };
    });
}