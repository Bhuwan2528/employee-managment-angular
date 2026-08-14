import { LoginServerResponseDTO, UserDTO } from "../../modules/auth/model/auth.model";


export interface AuthState {
  userDetail: LoginServerResponseDTO | null
  loading: boolean;
  error: string | null;
}

export const initialAuthState: AuthState = {
  userDetail: null,
  loading: false,
  error: null
};