export interface LoginResponse {
  jwt: {
    refreshToken: string,
    token: string,
  }
}