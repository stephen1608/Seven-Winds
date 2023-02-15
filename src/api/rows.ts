import axios from 'api/helpers/axios';
import envs from 'config/environments';

import { RowInterface } from 'types/entityType';

interface RowAddingFeedback {
  current: RowInterface | null;
  changed: Array<RowInterface> | [];
}

interface IProps {
  equipmentCosts: number;
  estimatedProfit: number;
  machineOperatorSalary: number;
  mainCosts: number;
  materials: number;
  mimExploitation: number;
  overheads: number;
  parentId?: number;
  rowName: string;
  salary: number;
  supportCosts: number;
}

export default {
  async getTreeRows(): Promise<Array<RowInterface> | []> {
    const response = await axios.get(
      `/v1/outlay-rows/entity/${envs.id}/row/list`
    );
    if (response.status != 200) {
      console.error(`status ${response.status}: ${response.statusText}`);
      return [];
    }
    return response.data;
  },

  async createRowInEntity(params: IProps): Promise<RowAddingFeedback | null> {
    console.log(`body: ${JSON.stringify(params)}`);
    const response = await axios.post(
      `/v1/outlay-rows/entity/${envs.id}/row/create`,
      {
        ...params
      }
    );
    if (response.status != 200) {
      console.error(`status ${response.status}: ${response.statusText}`);
      return null;
    }
    return response.data;
  },

  async updateRow(
    rowId: number,
    params: IProps
  ): Promise<RowAddingFeedback | null> {
    const response = await axios.post(
      `/v1/outlay-rows/entity/${envs.id}/row/${rowId}/update`,
      {
        ...params
      }
    );
    if (response.status != 200) {
      console.error(`status ${response.status}: ${response.statusText}`);
      return null;
    }
    return response.data;
  },

  async deleteRow(rowId: number): Promise<RowAddingFeedback | null> {
    const response = await axios.delete(
      `/v1/outlay-rows/entity/${envs.id}/row/${rowId}/delete`
    );
    if (response.status != 200) {
      console.error(`status ${response.status}: ${response.statusText}`);
      return null;
    }
    return response.data;
  }
};
