import {defineStore} from "pinia"

export const usedataStore = defineStore('list',()=>{
    const profileData = ref("")
    const unothorized = ref("")
  
    return {profileData,unothorized}
})