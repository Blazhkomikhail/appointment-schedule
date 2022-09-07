import $api from "./index";
import { AxiosResponse } from "axios";
import { IUserDataResponse } from "../models/UserDataResponse";

type FromToType = string | boolean | number | null;

export default class UserService {
  static async genUserData(): Promise<AxiosResponse<IUserDataResponse>> {
    return $api.get("/UserCrmProfiles/GetAllDynamic");
  }

  static async patchUserData(
    userId: string,
    pathName: string,
    value: { from: FromToType; to: FromToType }
  ): Promise<AxiosResponse<any>> {
    return $api.patch(`/UserCrmProfiles/Patch/${userId}`, [
      {
        path: pathName,
        from: value.from,
        value: value.to,
      },
    ]);
  }
}
