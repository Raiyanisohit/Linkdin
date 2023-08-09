import {defineStore} from "pinia"
import axios from 'axios'
export const usenetworkStore = defineStore('list',()=>{
    const allrequest = ref("")
    function getAllConnectionRequest(){
        var config = {
        method: 'get',
        url: 'http://localhost:3010/getAllConnectionRequest',
        headers: { 
          'token': localStorage.getItem('token')
        },
      };
      
      axios(config)
      .then(function (response) {
        console.log(response.data)
        allrequest.value = response.data
      })
      .catch(function (error) {
        console.log(error);
      });
      } 
      getAllConnectionRequest()
    return {allrequest}
})