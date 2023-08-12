import {defineStore} from "pinia"
import axios from "axios";
export const useprofileStore = defineStore('lists',()=>{
   

    const Data = ref("");
    
     function getprofiledata(){
        var data = JSON.stringify({
          });
          
          var config = {
            method: 'post',
            url: 'http://localhost:3010/getUserData',
            headers: { 
              'token': localStorage.getItem('token') , 
              'Content-Type': 'application/json'
            },
            data : data
          };
        
          axios(config)
          .then(function (response) {
            Data.value = response.data
          })
          .catch(function (error) {
            console.log(error);
          });
    }
    
    // --------------------userabout------------------------------------//
    // --------------------userabout------------------------------------//
    // --------------------userabout------------------------------------//
    
    
        function userabout(userAbout){
        var data = JSON.stringify({
          "about": userAbout
        });
        
        var config = {
          method: 'post',
          url: 'http://localhost:3010/editUserInfo',
          headers: { 
            'token': localStorage.getItem('token'), 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        
       }
    
    
      //  --------------------------userskills ---------------------------//
      //  --------------------------userskills ---------------------------//
      //  --------------------------userskills ---------------------------//
    
       function userskills(inputskill){
        var data = JSON.stringify({
          "skills": inputskill
        });
        
        var config = {
          method: 'post',
          url: 'http://localhost:3010/addUserSkill',
          headers: { 
            'token': localStorage.getItem('token'), 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    return {Data,userskills,userabout,getprofiledata}
})