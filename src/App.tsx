import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import rowsStore from 'stores/rowsStore';

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

const App: FC = () => {
  useEffect(() => {
    rowsStore.getRows();
  }, []);

  const params = {
    equipmentCosts: getRandomInt(5),
    estimatedProfit: getRandomInt(5),
    machineOperatorSalary: getRandomInt(5),
    mainCosts: getRandomInt(5),
    materials: getRandomInt(5),
    mimExploitation: getRandomInt(5),
    overheads: getRandomInt(5),
    rowName: 'RANDOM',
    salary: getRandomInt(5),
    supportCosts: getRandomInt(5)
  };

  const addOne = async () => {
    await rowsStore.addRow(params);
    await rowsStore.getRows();
  };

  return (
    <div className="App">
      <button onClick={() => addOne()}>Add row</button>
    </div>
  );
};

export default observer(App);
