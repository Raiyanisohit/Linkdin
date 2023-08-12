import { defineStore } from "pinia"
import axios from 'axios'
export const usenetworkStore = defineStore('list', () => {
  const allrequest = ref("")
  const totalConnection = ref("")
  const userallconnectionlist = ref("")
  //userconnection
  function userConnections(){
    var config = {
    method: 'get',
    url: 'http://localhost:3010/userConnections',
    headers: { 
      'token': localStorage.getItem("token")
    },
  };
  
  axios(config)
  .then(function (response) {
  userallconnectionlist.value = response.data.Message
    console.log(JSON.stringify(response.data));
  })
  .catch(function (error) {
    console.log(error);
  });
    }
  userConnections()

  //getTotalConnectionNo
function getconnection(){
    var config = {
  method: 'post',
  url: 'http://localhost:3010/getTotalConnectionNo',
  headers: { 
    'token': localStorage.getItem('token')
  },
};

axios(config)
.then(function (response) {
  totalConnection.value = response.data

})
.catch(function (error) {
  console.log(error);
});
}
getconnection()
  //getAllConnectionRequest
  function getAllConnectionRequest() {
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

  //acceptOrDeclineRequest

  function getaccept(e) {
    var data = JSON.stringify({
      "id": e.slice(0, 24),
      "status": e.slice(24)
    });

    var config = {
      method: 'post',
      url: 'http://localhost:3010/acceptOrDeclineRequest',
      headers: {
        'token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        getAllConnectionRequest()
        userConnections()
        getconnection()
        console.log(JSON.stringify(response.data));

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //removeconnection
function removeconnection(e){
  console.log(e)
  var data = JSON.stringify({
    "userId": e
});

var config = {
  method: 'delete',
  url: 'http://localhost:3010/removeConnection',
  headers: { 
    'token': localStorage.getItem('token'), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log((response.data));
  userConnections()
  getconnection()
})
.catch(function (error) {
  console.log(error);
});
  }
  return { allrequest , getaccept ,removeconnection, totalConnection,userallconnectionlist}
})