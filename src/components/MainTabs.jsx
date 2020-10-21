import React from 'react';
import { Tabs, } from 'antd';
import { observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

import { ListPage, ReceivedPage } from './index';

const MainTabs = observer(({ tabKey = 'list' }) => {
  const history = useHistory();

  const onChangeTab = (value) => {
    history.push(`./${value}`);
  };

  return (
    <Tabs activeKey={tabKey} onChange={onChangeTab}>
      <Tabs.TabPane tab="List" key="list">
        <ListPage />
      </Tabs.TabPane>

      <Tabs.TabPane tab="Received" key="received">
        <ReceivedPage />
      </Tabs.TabPane>
    </Tabs>
  );
});

export default MainTabs;
