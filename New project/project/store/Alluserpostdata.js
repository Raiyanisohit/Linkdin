import { defineStore } from "pinia"
import axios from "axios";
const router = useRouter()
export const usealluserpostdataStore = defineStore('listy', () => {
  const data = ref("")
  const loding = ref(false)
  //alluserpost

  
  
  //getprofiledata
  const userData = ref("")
  const userid = ref("")
  function getprofiledata() {
    var data = JSON.stringify({});

    var config = {
      method: "post",
      url: "http://localhost:3010/getUserData", //done
      headers: {
        token: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios(config)
      .then(function (response) {
        userid.value = response.data.Message._id
        userData.value = response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    getprofiledata();

 

  return { data, loding, userData,userid,getprofiledata }
})