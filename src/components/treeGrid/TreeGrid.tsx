import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import {
  ColumnDirective,
  ColumnsDirective,
  TreeGridComponent
} from '@syncfusion/ej2-react-treegrid';
import rowsStore from 'stores/rowsStore';
import './treeGrid.css';

const TreeGrid: FC = () => {
  const { rowsTree, list } = rowsStore;

  return (
    <TreeGridComponent
      dataSource={rowsTree}
      treeColumnIndex={0}
      childMapping="child"
      enableAdaptiveUI={true}
      enableImmutableMode={true}
    >
      <ColumnsDirective>
        <ColumnDirective
          headerText="Уровень"
          width="50"
          textAlign="Left"
          type="string"
        />
        <ColumnDirective
          field="rowName"
          headerText="Название"
          width="210"
          textAlign="Left"
          type="string"
        />
        <ColumnDirective
          field="salary"
          headerText="Основная зарплата"
          width="70"
          textAlign="Left"
          type="number"
        />
        <ColumnDirective
          field="equipmentCosts"
          headerText="Оборудование"
          width="70"
          textAlign="Left"
          type="number"
        />
        <ColumnDirective
          field="overheads"
          headerText="Накладные расходы"
          width="70"
          textAlign="Left"
          type="number"
        />
        <ColumnDirective
          field="estimatedProfit"
          headerText="Сметная прибыль"
          width="70"
          textAlign="Left"
          type="number"
        />
      </ColumnsDirective>
    </TreeGridComponent>
  );
};

export default observer(TreeGrid);
