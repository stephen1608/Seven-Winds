import { observable, action, makeObservable, runInAction } from 'mobx';

import api from 'api';

import { RowInterface } from 'types/entityType';
import transformList from 'utilities/transformList';

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
  level?: number;
}

class RowsStore {
  @observable
  rowsTree: Array<RowInterface> | [];

  @observable
  loading: boolean;

  constructor(rowsTree: Array<RowInterface> | [], loading: boolean) {
    makeObservable(this);

    this.rowsTree = rowsTree;
    this.loading = loading;
  }

  @action
  getRows = async (): Promise<RowInterface[]> => {
    let res = [] as RowInterface[];

    try {
      this.loading = true;
      const rows = await api.rows.getTreeRows();

      runInAction(() => {
        this.rowsTree = transformList(rows, 0);

        res = this.rowsTree;
      });
    } catch (error) {
      console.error(error);
      this.rowsTree = [];
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
    return res;
  };

  @action
  addRow = async (
    params: IProps,
    rowId?: number
  ): Promise<RowInterface | null> => {
    let resp = null;
    try {
      this.loading = true;
      const response = await api.rows.createRowInEntity(params);

      runInAction(() => {
        if (!response?.current) return;

        if (rowId) {
          const rowInd = this.rowsTree.findIndex((el) => el.id === rowId);

          if (rowInd >= 0) {
            const currentRow = this.rowsTree[rowInd];

            this.rowsTree.splice(rowInd + 1, 0, {
              ...response.current,
              level: currentRow.level,
              parentId: currentRow.parentId
            });
          }

          resp = response?.current;
        } else {
          this.rowsTree.splice(0, 0, response?.current);
        }

        resp = response?.current;
        this.getRows();
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
    return resp;
  };

  @action
  updateRow = async (rowId: number, params: IProps): Promise<void> => {
    try {
      this.loading = true;
      const response = await api.rows.updateRow(rowId, params);

      runInAction(() => {
        const rowInd = this.rowsTree.findIndex((el) => el.id === rowId);

        if (rowInd >= 0 && response?.current) {
          const currentRow = this.rowsTree[rowInd];

          this.rowsTree[rowInd] = {
            ...response.current,
            level: currentRow.level,
            parentId: currentRow.parentId
          };
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  };

  @action
  deleteRow = async (rowId: number): Promise<void> => {
    try {
      this.loading = true;
      await api.rows.deleteRow(rowId);

      runInAction(() => {
        this.getRows();
      });
    } catch (error) {
      console.error(error);
    } finally {
      runInAction(() => {
        const rowInd = this.rowsTree.findIndex((el) => el.id === rowId);

        if (rowInd >= 0) {
          this.rowsTree.splice(rowInd, 1);
        }

        this.loading = false;
      });
    }
  };
}

const rowsStoreInitial = new RowsStore([], false);
const tree = await rowsStoreInitial.getRows();

const rowsStore = new RowsStore(tree, false);

export default rowsStore;
