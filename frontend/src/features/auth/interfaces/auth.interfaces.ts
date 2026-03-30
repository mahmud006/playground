export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  accessToken: string;
}

export interface ProfileResponse {
  user: {
    id: string;
    email: string;
    createdAt: string;
  };
}

export interface LoginFormProps {
  onSuccess?: () => void;
}

export interface SignupFormProps {
  onSuccess?: () => void;
}
