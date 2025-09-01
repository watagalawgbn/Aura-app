export type SignInRequest = {
  email: string;
  password: string;
};

export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = {
  token: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};

export type JwtPayload = {
  id: string;
  name: string;
  email: string;
  exp: number;
};
