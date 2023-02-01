import axios from 'api/helpers/axios';
import envs from 'config/environments';

import { RowInterface } from 'types/entityType';

export default {
  async getTreeRows(): Promise<Array<RowInterface>> {
    const response = await axios.get(
      `/v1/outlay-rows/entity/${envs.id}/row/list`
    );
    return response.data;
  }
};
