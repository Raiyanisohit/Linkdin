import { userprofile } from "../../Models/Profile.js";

export const userSearch = async (req, res) => {

    try {
        const userData = await userprofile.find()

        if (req.body.firstName !== "") {
            const val = (req.body.firstName).split(' ')

            const searchData1 = userData.filter((d) => d.firstName.toLowerCase().includes((val[0]).toLowerCase()) && d.lastName.toLowerCase().includes((val[1] ? val[1] : "").toLowerCase()))

            const searchData2 = userData.filter((d) => d.lastName.toLowerCase().includes((val[0]).toLowerCase()) && d.firstName.toLowerCase().includes((val[1] ? val[1] : "").toLowerCase()))

            const finalSearchData = searchData1.concat(searchData2)
            const result = finalSearchData.filter((iteam, index) => finalSearchData.indexOf(iteam) === index)

            res.status(200).send(result)
            // res.send((searchData.length).toString())
        }
        else {
            res.status(200).send("[]")
        }
    } catch (error) {
        res.status(500).json({ Messsage: "Something went Wrong", Error: error });
    }
}   