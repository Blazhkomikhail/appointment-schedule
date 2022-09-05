import $api from "./index";
import { LoginLabelType, LoginLabelsResponse } from "../models/LabelsResponse";

export default class LabelsService {
  static async getLoginPageLabels(params: string[], labelList: string[]): Promise<LoginLabelType[]> {

    return $api.get<LoginLabelsResponse>('/Labels/GetAllDynamic', {
      params: {
        Select: params.join(", "),
      }
    }).then((resp) => resp.data.value.filter((item: LoginLabelType) => labelList.includes(item.labelKey)));
  }
}

 