import {defineStore} from "pinia"

export const uselikeStore = defineStore('list',()=>{
    const postLikeCalculateno = ref("")
    function postLikeno(e) {
        var data = JSON.stringify({
          postId: e,
        });
      
        var config = {
          method: "post",
          url: "http://localhost:3010/postLikeCalculate",
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "application/json",
          },
          data: data,
        };
      
        axios(config)
          .then(function (response) {
            postLikeCalculateno.value = response.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      }
  
    return {postLikeCalculateno,postLikeno}
})


// dummy

function deletepost(id) {
  var data = JSON.stringify({
    postId: id,
  });

  var config = {
    method: "delete",
    url: "http://localhost:3010/deleteUserPost",
    headers: {
      token: localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      storeallpost.getdata()
    })
    .catch(function (error) {
      console.log(error);
    });
}