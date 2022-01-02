import axios from "axios";


const GetAllItems = async(url) =>
{
    return await axios.get(url);
}

const GetItem = async(url,id) =>
{
    return await axios.get(url + id);
}

const DeleteItem = async (url,id) =>
{
    return await axios.delete(url+id)
}

const UpdateItem = async (url,id,Obj) =>
{
    return await axios.put(url+id,Obj)
}

const CreateItem = async (url,Obj) =>
{
    return await axios.post(url,Obj);
}

export default {GetAllItems,GetItem,DeleteItem,UpdateItem,CreateItem}