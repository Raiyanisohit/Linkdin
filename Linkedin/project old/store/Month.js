import { defineStore } from "pinia"

export const usemonthStore = defineStore('month', () => {
    const month = ref(
        [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ]
    )
    const year = ref(
        [
            2023,
            2022,
            2021,
            2020,
            2019,
            2018,
            2017,
            2016,
            2015,
            2014,
            2013,
            2012,
            2011,
            2010,
        ]
    )
    return { month,year }
})