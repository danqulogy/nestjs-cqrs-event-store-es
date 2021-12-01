import { UserInListDto } from "@fom/shared/api-dtos";

export interface AuthResponse {
  accessToken: string
  user: UserInListDto
}

