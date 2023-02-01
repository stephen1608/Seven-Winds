import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import rowsStore from 'stores/rowsStore';

const App: FC = () => {
  const { rows, loading } = rowsStore;
  rowsStore.getRows();

  return <div className="App">{JSON.stringify(rows)}</div>;
};

export default observer(App);
