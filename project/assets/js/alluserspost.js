import axios from "axios";
let data = ref("");
export function getdata(){

    var config = {
        method: "Post",
        url: "http://localhost:3010/allUserPost",
        headers: {
            token: localStorage.getItem("token"),
      
    },
};

axios(config)
.then(function (response) {
    data.value = response.data;
    console.log(response.data)
    
})
.catch(function (error) {
    console.log(error);
});
return {data}
}
  

// ---------------------------------comments--------------------------------//
// ---------------------------------comments--------------------------------//
// ---------------------------------comments--------------------------------//



export function postcomment(id,inputcomment){
    var data = JSON.stringify({
        "postId": id,
        "comment": inputcomment
      });
      
      var config = {
        method: 'post',
        url: 'http://192.168.103.254:3010/userComment',
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


// ---------------------------getcomment--------------------------------------//
// ---------------------------getcomment--------------------------------------//
// ---------------------------getcomment--------------------------------------//
// ---------------------------getcomment--------------------------------------//
