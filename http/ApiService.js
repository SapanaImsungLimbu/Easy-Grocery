import axios from "axios";
import { baseURL } from "../config";


class ApiService{
    constructor(baseURL){
        // axios ko instance banako ho yaha
        this.api = axios.create({
        baseURL 
    })
    }
    // methods
    async getAll(endpoint){
        const response = await this.api.get(`/${endpoint}`)
        return {data : response.data,status : response.status}
    }
    async getMyProducts(endpoint,token){
        const response = await this.api.get(`/${endpoint}`,{
            headers : {
                'Authorization' : token
            }
        })

        return {data : response.data,status : response.status}
    }
    async getOrders(endpoint,token){
        const response = await this.api.get(`/${endpoint}`,{
            headers : {
                'Authorization' : token
            }
        })

        return {data : response.data,status : response.status}
    }
    async getSingleOrders(endpoint,id,token){
        const response = await this.api.get(`/${endpoint}/${id}`,{
            headers : {
                'Authorization' : token
            }
        })

        return {data : response.data,status : response.status}
    }
    async getSingleOrder(endpoint,id){
        const response = await this.api.get(`http://10.0.2.2:3000/api/${endpoint}/${id}`)

        return {data : response.data,status : response.status}
    }
    async getMyProductsSingle(endpoint,id,token){
        const response = await this.api.get(`/${endpoint}/${id}`,{
            headers : {
                'Authorization' : token
            }
        })
        return {data : response.data,status : response.status}
    }

    async getNotifications(endpoint,token){
        const response = await this.api.get(`/${endpoint}`,{
            headers : {
                'Authorization' : token
            }
        })
        return {data : response.data,status : response.status}
    }
    async updateNotification(endpoint,id,token){
        console.log("t",token)
        const response = await this.api.get(`/${endpoint}/${id}`)
        return {data : response.data,status : response.status}
    }
    async getById(endpoint,id){
        const response = await this.api.get(`/${endpoint}/${id}`)
        return response.data
    }
    async getSellers(endpoint){
        const response = await this.api.get(`/${endpoint}`)
        return {data : response.data, status : response.status}
    }
    async getSellersProducts(endpoint,id){
        const response = await this.api.get(`/${endpoint}/${id}`)


        return {data : response.data, status : response.status}
    }
    async add(endpoint,data){
        const response = await this.api.post(`/${endpoint}`,data)
        return {data : response.data,status : response.status}
    }
    async addProduct(endpoint,data,token){
       
        const response = await axios.post(`http://10.0.2.2:3000/api/${endpoint}`,data,{
            headers : {
                'Authorization' : token,
                "Content-Type" : 'multipart/form-data',
            }
        })
        console.log(response)
        return {data : response.data,status : response.status}

    }

    async addCart(endpoint,id,token){
        const response = await this.api.post(`/${endpoint}/${id}`,{
            id : id
        },{
            headers : {
                "Content-Type" : "application/json",
                'Authorization' : token
            }
        })
        return {data : response.data,status : response.status}
    }
    async checkout(data,token){
        const response = await this.api.post(`/consumer/order`,data,{
            headers : {
                "Content-Type" : "application/json",
                'Authorization' : token
            }
        })
   
        return {data : response.data,status : response.status}
    }
    async getCarts(endpoint,token){
        const response = await this.api.get(`/${endpoint}`,{
            headers : {
            
                'Authorization' : token
            }
        })
        return {data : response.data,status : response.status}
    }
    async getPayments(endpoint,token){
        const response = await this.api.get(`/${endpoint}`,{
            headers : {
            
                'Authorization' : token
            }
        })
        return {data : response.data,status : response.status}
    }
    async deleteFromCart(endpoint,token){
        const response = await this.api.delete(`/${endpoint}`,{
            headers : {
            
                'Authorization' : token
            }
        })
        console.log(response.status)
        return {data : response.data,status : response.status}
    }
    async delete(endpoint,id){
        const response = await this.api.delete(`/${endpoint}/${id}`)
        return {status : response.status}
    }
    async edit(endpoint,id,data){
        const response = await this.api.put(`/${endpoint}/${id}`,data)
        return {status: response.status,data : response.data }
    }

}

const api = new ApiService(baseURL) // class instantsiation gareko ho
export default api