import $api from "./index";
import { AxiosResponse } from "axios";
import {LoginResponse} from "../models/responce/AuthResponse";

export default class AuthService {
  static async generatePassword(email: string, languageId: string): Promise<AxiosResponse<string>> {
    return $api.post('/Accounts/GeneratePassword', {email, languageId});
  }

  static async loginWithCode(email: string, code: string, languageID: string): Promise<AxiosResponse<LoginResponse>> {
    return $api.post<LoginResponse>('/Accounts/LoginWithCode', {email, code, languageID});
  }

  static async logout(): Promise<void> {
    return $api.post('/Accounts/Logout');
  }

  static async refreshToken(token: string | null, refreshToken: string | null): Promise<AxiosResponse<any>> {
    return $api.post<LoginResponse>('/Accounts/RefreshToken', {token, refreshToken});
  } 
}