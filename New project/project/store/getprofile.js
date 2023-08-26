import { defineStore } from "pinia"
import { postdata } from "~/services/fetch"
export const useprofileStore = defineStore('idlist', () => {
   const profileid = ref("")
        async function getprofiledata(){
            const data = await postdata("getUserData")
            profileid.value = data.Message._id
        }

        onMounted(()=>{
            getprofiledata()
        })
    return { profileid  }
})