import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { ApiError } from "@/types/ApiError"


export const apiClient = async (url: string, config: AxiosRequestConfig) => {
    try {
        const response = await axios({
            url,
            headers: { "Content-Type": "application/json" },
            ...config
        })

        const result = response.data

        if (result.success === false) {
            throw {
                status: result.status,
                message: result.message,
                details: result.data || null
            } as ApiError
        }

        return result
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            const axiosErr = error as AxiosError<any>;
            throw {
                status: axiosErr.response?.status || 500,
                message: axiosErr.response?.data?.message || axiosErr.message,
                details: axiosErr.response?.data?.details || null,
            } as ApiError;
        }

        throw {
            status: 500,
            message: "Unexpected error occurred",
            details: null,
        } as ApiError;

    }
}

