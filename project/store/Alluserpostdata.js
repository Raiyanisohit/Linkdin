import { defineStore } from "pinia"
import axios from "axios";
export const usealluserpostdataStore = defineStore('list', () => {
  const data = ref("")
  const Data = ref("")
  const userid = ref("")
  const loding = ref(false)
  function getdata() {
    var config = {
      method: "post",
      url: "http://localhost:3010/allUserpost",
      headers: {
        token: localStorage.getItem("token"),
      },
    };

    axios(config)
      .then(function (response) {
        if (response.data.includes("Unothorized")) {
          router.push('/login')
        } else {
          loding.value = true
          data.value = response.data.reverse();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getdata()

  function getprofiledata() {
    var data = JSON.stringify({});

    var config = {
      method: "post",
      url: "http://localhost:3010/getUserData",
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        Data.value = response.data;
        console.log(response.data)
        userid.value = response.data.Message._id
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  getprofiledata();

  return { data, loding, getdata, Data,userid,getprofiledata }
})