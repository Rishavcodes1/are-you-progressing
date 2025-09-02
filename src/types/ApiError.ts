export interface ApiError<T = unknown> {
    status: number;
    message: string;
    details?: T;
}