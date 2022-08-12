import $api from "./index";
import { AxiosResponse } from "axios";
import {IWorklogItem} from "../models/responce/WorklogResponce";

export default class WorklogService {
  static async getAllData(): Promise<AxiosResponse<IWorklogItem[]>> {
    return $api.get<IWorklogItem[]>('/UserCrmProfileWorklogs/GetAllDynamic');
  }
}