type ApiResponse<T> = { 
status: number; 
message: string; 
// data est de type générique 
data?: T; 
} 
export type { ApiResponse };