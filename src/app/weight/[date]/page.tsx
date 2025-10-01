"use client"
import axios from "axios"
import { use, useEffect, useState } from "react"

export default function Page({
    params,
}: {
    params: Promise<{ date: string }>
}) {
    const { date } =  use(params)

    const [weightData, setWeightData] = useState({})


    const fetchDatedWeight = async () => {

        const response = await axios.get(`/api/weight/${date}`)
        setWeightData(response.data?.data)
        console.log(response)
    }

    useEffect(() => {
        fetchDatedWeight()
    }, [])
    return (
        <>
            <div>weight :{weightData.weight}</div>
            <div>date: {weightData.date}</div>
        </>
    )
}