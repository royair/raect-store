import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Select } from 'antd';

import { MainTabs } from './index';
import { useStores } from '../hooks/useStores';

const App = observer(() => {
  const { configStore, ratesStore } = useStores();

  const onChangeCurrency = (key) => {
    configStore.setCurrency(key);
  };

  return (
    <Container>
      <Select
        value={configStore.config.currency}
        style={{ width: 120 }}
        loading={ratesStore.isLoading}
        disabled={!ratesStore.isReady}
        onChange={onChangeCurrency}>
        {ratesStore.rates.map((rate) => <Select.Option key={rate.id} value={rate.code}>{rate.code}</Select.Option>)}
      </Select>

      <Switch>
        <Route exact path="/list">
          <MainTabs tabKey={'list'} />
        </Route>

        <Route exact path="/received">
          <MainTabs tabKey={'received'} />
        </Route>

        <Route exact path="/*">
          <Redirect to="/list" />
        </Route>
      </Switch>
    </Container>
  );
});

const Container = styled.div`
  height: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding:  50px;
`;

export default App;
