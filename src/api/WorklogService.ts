import $api from "./index";
import { AxiosResponse } from "axios";
import {WorkflowItem} from "../models/responce/WorklogResponce";

export default class WorklogService {
  static async getWorklogData(): Promise<AxiosResponse<WorkflowItem[]>> {
    return $api.get<WorkflowItem[]>('/UserCrmProfileWorklogs/GetAllDynamic');
  }
}