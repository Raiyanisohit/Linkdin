import {defineStore} from "pinia"

export const usesignupdataStore = defineStore('list',()=>{
    const data = reactive({email:"",password:"",firstname:"",lastname:"",country:"",city:""})
    const experince = reactive({jobtitle:"",employe:"",role:true,compunyname:"",Startmonth:"",Startyear:"",Endmonth:"",Endyear:""})
    const student = reactive({college:"",Startmonth:"",Startyear:"",Endmonth:"",Endyear:""})
     const otp = ref("")
    return {data,otp,student,experince}
})