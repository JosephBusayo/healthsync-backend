import axios from 'axios';

export const make_get_request = async(url) =>{
    try{
        const response = await axios.get(url)
        return response;
    }catch(error){
        console.log(error);
        return error
    }
}

export const make_post_request = async(url) =>{
    try{
        const response = await axios.get(url)
        return response;
    }catch(error){
        return err
    }

}

