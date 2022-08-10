import $api from "./index";
import { AxiosResponse } from "axios";
import {IWorkflowItem} from "../models/responce/WorklogResponce";

export default class WorklogService {
  static async getAllData(): Promise<AxiosResponse<IWorkflowItem[]>> {
    return $api.get<IWorkflowItem[]>('/UserCrmProfileWorklogs/GetAllDynamic');
  }
}