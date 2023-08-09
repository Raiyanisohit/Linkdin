import axios from "axios";
import Cookie from 'js-cookie'

let Data = ref("");

export function getprofiledata(){
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
      return {Data}
}

// --------------------userabout------------------------------------//
// --------------------userabout------------------------------------//
// --------------------userabout------------------------------------//


   export function userabout(userAbout){
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
    return {data}
    
   }


  //  --------------------------userskills ---------------------------//
  //  --------------------------userskills ---------------------------//
  //  --------------------------userskills ---------------------------//

  export function userskills(inputskill){
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
    return {data}
  }