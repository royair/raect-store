import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { observer } from 'mobx-react';

import { ProductCard } from './index';

const StoreCard = observer(({ store = {} }) => {
  const { name, unreceivedProducts } = store;
  const count                        = unreceivedProducts.length;

  const productsEl = unreceivedProducts.map((product) => <ProductCard key={product.id} product={product} />);

  return (
    <Container className={'store-card'}>
      <Typography.Title level={1}>{name} ({count} products)</Typography.Title>
      {productsEl}
    </Container>
  );
});

const Container = styled.div`
  
`;

export default StoreCard;
