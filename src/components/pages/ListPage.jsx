import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import { Tabs } from 'antd';

import { useStores } from '../../hooks/useStores';
import { ProductCard, StoreCard } from '../index';

const ListPage = observer(() => {
  const { productsStore, storesStore } = useStores();
  const count                          = productsStore.unreceivedProducts.length;

  const productsEl = productsStore.unreceivedProducts.map((product) => <ProductCard key={product.id} product={product} />);
  const storesEl   = storesStore.stores.map((store) => <StoreCard key={store.id} store={store} />);

  return (
    <Container>
      <Tabs>
        <Tabs.TabPane key={'all'} tab={'All'}>
          {count} products
          {productsEl}
        </Tabs.TabPane>

        <Tabs.TabPane key={'store'} tab={'By Store'}>
          {storesEl}
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
});

const Container = styled.div`
.product-card {
  margin: 20px 0;
}
`;

export default ListPage;
