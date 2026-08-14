export interface LoginServerResponseDTO {
  accessToken: string;
  user: UserDTO;
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