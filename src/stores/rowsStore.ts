import { observable, action, makeObservable, runInAction } from 'mobx';

import api from 'api';

import { RowInterface } from 'types/entityType';

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

interface ListItem {
  id: number;
  rowName: string;
  total: number;
  salary: number;
  mimExploitation: number;
  machineOperatorSalary: number;
  materials: number;
  mainCosts: number;
  supportCosts: number;
  equipmentCosts: number;
  overheads: number;
  estimatedProfit: number;
  currentLevel: number;
  child: Array<RowInterface> | [];
}

const treeToList = (
  currentTree: RowInterface[],
  currentLevel: number,
  endList: Array<ListItem>
): void => {
  currentTree.forEach((item) => {
    if (item.child.length === 0) {
      endList.push({ ...item, currentLevel });
    } else if (item.child) {
      treeToList(item.child, currentLevel++, endList);
      endList.push({ ...item, currentLevel });
    }
  });

  return;
};

class RowsStore {
  @observable
  rowsTree: Array<RowInterface> | [];

  @observable
  loading: boolean;

  @observable
  list: Array<ListItem>;

  constructor(
    rowsTree: Array<RowInterface> | [],
    loading: boolean,
    list: Array<ListItem>
  ) {
    makeObservable(this);
    this.rowsTree = rowsTree;
    this.loading = loading;
    this.list = list;
  }

  @action
  getRows = async (): Promise<RowInterface[]> => {
    let res = [] as RowInterface[];
    try {
      this.loading = true;
      const rows = await api.rows.getTreeRows();

      runInAction(() => {
        this.rowsTree = rows;

        res = rows;
        console.log(rows);
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
            this.rowsTree.splice(rowInd + 1, 0, response.current);
          }
          resp = response?.current;
        } else {
          this.rowsTree.splice(0, 0, response?.current);
        }

        resp = response?.current;
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
        console.log(response);
        const rowInd = this.rowsTree.findIndex((el) => el.id === rowId);

        if (rowInd >= 0 && response?.current) {
          this.rowsTree.splice(rowInd, 1, response.current);
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
      const response = await api.rows.deleteRow(rowId);
      runInAction(() => {
        console.log(response);
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

const rowsStoreInitial = new RowsStore([], false, []);
const tree = await rowsStoreInitial.getRows();
const list = [] as Array<ListItem>;
treeToList(tree, 0, list);

const rowsStore = new RowsStore(tree, false, list);
export default rowsStore;
