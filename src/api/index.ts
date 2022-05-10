import { http } from "@/utils"

export const getDepartment = () => {
  return http.get('/api/department')
}