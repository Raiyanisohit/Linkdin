// import axios from 'axios'
// import {ref} from 'vue'
// const list = ref([])
// const hh = ref("")
// export function getlogin(input){

//     var data = JSON.stringify({
//         "email": input.email,
//         "password": input.password
//       });
      
//       var config = {
//         method: 'post',
//         url: 'http://192.168.103.254:3010/LoGin',
//         headers: { 
//           'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJfaWQiOiI2NDlhZGYzNjYwYzlmMzM4MTkxYmNjYjAiLCJlbWFpbCI6InNvaGl0QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJhJDEwJHp0cDdkS1lrOUIwYlRLZ2I1NDJCdHVnVXNDWE5zUC9WQ0xwYllhR1dpNWZwUnppLzMwenlPIiwiX192IjowfSwiaWF0IjoxNjg4MTI2MTAzLCJleHAiOjE2ODgxNjIxMDN9.nhwgyhAnl33gEqtD9MEv8IGQN8GaaVqGGvUlw1YmctE', 
//           'Content-Type': 'application/json'
//         },
//         data : data
//       };
      
//       axios(config)
//       .then(function (response) {
//         console.log(JSON.stringify(response.data));
//         list.value = response.data
//       })
//       .catch(function (error) {
//         console.log(error);
        
//       });
      
//       return {data,list }
// }