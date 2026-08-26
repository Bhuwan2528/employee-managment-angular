export interface LoginServerResponseDTO {
  accessToken: string;
  refreshToken: string;
  user: UserDTO;
}

export interface RefreshTokenResponseDTO {
  accessToken: string;
  refreshToken: string;
}

export interface UserDTO {
    id:           string;
    email:        string;
    password:     string;
    roleId:       string;
    isActive:     boolean;
    createdAt:    Date;
    updatedAt:    Date;
    role:         RoleDTO;
}

export interface RoleDTO {
    id:        string;
    name:      string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LoginRequest{
    email: string;
    password: string;
}