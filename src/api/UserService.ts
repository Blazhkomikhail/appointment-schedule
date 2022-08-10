import $api from "./index";
import { AxiosResponse } from "axios";

export default class UserService {
  static async genUserData(): Promise<AxiosResponse<any>> {
    return $api.get('/UserCrmProfiles/GetAllDynamic');
  }

  static async patchUserData(userId: string, pathName: string, value: {from: string | boolean, to: string | boolean}): Promise<AxiosResponse<any>> {
    return $api.patch(`/UserCrmProfiles/Patch/${userId}`, [{
      "path": pathName,
      "from": value.from,
      "value": value.to
    }]);
  }
}