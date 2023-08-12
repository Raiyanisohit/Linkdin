import axios from 'axios'

export async function getconnection(route) {
    try {console.log(route,"get")
        const value = await axios.get(`http://localhost:3010/${route}`, {
            headers: {
                "token": localStorage.getItem("token"),
                'Content-Type': 'application/json'
            }
        })
        return value.data;
    } catch (err) {
        console.log("first", err)
    }
}


export const postdata = async (URL, data) => {
    try {
        const value = await axios.post(`http://localhost:3010/${URL}`, data, {
            headers: {
                'token': localStorage.getItem("token"),
                'Content-Type': 'application/json',
            }
        })
        return value.data;
    } catch (error) {

        console.log(error)
    }

}


export async function DeleteData(URL,data) {
    try {
     
        var config = {
            method: 'delete',
            url: `http://localhost:3010/${URL}`,
            headers: {
                'token': localStorage.getItem("token"),
                'Content-Type': 'application/json'
            },
            data : data
        };
        const response = await axios(config)
        return  response.data;
    } catch (err) {
        console.log("first", err)
    }
}
