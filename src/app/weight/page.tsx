"use client"
import axios from 'axios'
import React, { useEffect } from 'react'

const page = () => {

    const fetchAllWeights = async () => {
        const response = await axios.get("/api/weight")

        console.log(response)
    }

    useEffect(() => {
        fetchAllWeights()
    }, [])
    return (
        <div>

        </div>
    )
}

export default page
