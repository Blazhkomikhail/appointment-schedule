import $api from "./index";
import { AxiosResponse } from "axios";

export default class UserService {
  static async genUserData(): Promise<AxiosResponse<any>> {
    return $api.get('/UserCrmProfiles/GetAllDynamic');
  }

  static async patchUserData(userId: string, body: {}): Promise<AxiosResponse<any>> {
    return $api.get(`/UserCrmProfiles/Patch/${userId}`, body);
  }
}