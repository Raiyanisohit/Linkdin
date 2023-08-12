import {defineStore} from "pinia"
import {postdata,getconnection,DeleteData} from '../services/fetch'
export const useServiceStore = defineStore('list',()=>{
   const jj = ref("")

   async function deletepostee(e) {
    const deletes = await DeleteData("deleteUserPost",e)
    storeallpost.jj.filter((i)=>i._id !== e)
      }
    
    return {jj,deletepostee}
})