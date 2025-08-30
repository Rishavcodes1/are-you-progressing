import { ApiResponse } from "@/types/ApiResponse"
import { NextResponse } from "next/server";

export const response = <T>(
  statusCode: number,
  success: boolean,
  message: string,
  data?: T
) => {
  const response: ApiResponse<T> = {
    success,
    message,
    ...(data !== undefined && { data }),
  };

  return NextResponse.json(response, { status: statusCode });
};