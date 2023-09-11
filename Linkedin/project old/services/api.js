import axios from 'axios'
const HostName = ref("http://192.168.100.221:3010")

// -------------------------------get_All_Data-------------------------------------//

export async function getconnection(URL) {
    try {
        const value = await axios.get(`${HostName.value}/${URL}`,{
            headers:{
                "token":localStorage.getItem("token"),
                'Content-Type': "application/json"
            }
        })
        return value.data;
    } catch (err) {
        console.log("GET_REQUEST", err)
    }
}

// ----------------------------------------Post_All_Data------------------------------//

export const postdata = async (URL, data) => {

    try {
        const value = await axios.post(`${HostName.value}/${URL}`, data,{
            headers:{
                "token":localStorage.getItem("token"),
                'Content-Type': "application/json"
            }
        })
        return value.data;
    } catch (error) {

        console.log("POST_REQUEST",error)
    }

}

// --------------------------------PostData_Img-----------------------------------//

export const postdataImg = async (URL, data) => {
    try {
        const value = await axios.post(`${HostName.value}/${URL}`, data, {
            headers:{
                "token":localStorage.getItem("token"),
                'Content-Type': "multipart/form-data"
            }
        })
        return value.data;
    } catch (error) {
        console.log("POST_IMG_REQUEST",error)
    }
}

// ----------------------------------------Delete_Data-------------------------------------//

export async function DeleteData(URL,data) {
    try {
        var config = {
            method: 'delete',
            url: `${HostName.value}/${URL}`,
            headers: {
                'token': localStorage.getItem("token"),
                'Content-Type': 'application/json',

            },
            data : data
        };
        const response = await axios(config)
        return  response.data;
    } catch (err) {
        console.log("DELET_REQUEST", err)
    }
}

// -------------------------------------------Update_Data----------------------------//

export async function UpdateData(URL,data) {
    try {
        var config = {
            method: 'put',
            url: `${HostName.value}/${URL}`,
            headers: {
                'token': localStorage.getItem("token"),
                'Content-Type': 'application/json',
            },
            data : data
        };
        const response = await axios(config)
        return  response.data;
    } catch (err) {
        console.log("UPDATE_REQUEST", err)
    }
}
