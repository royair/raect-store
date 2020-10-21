import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { ProductCard } from '../index';
import { useStores } from '../../hooks/useStores';

const ReceivedPage = observer(() => {
  const { productsStore } = useStores();
  const count             = productsStore.receivedProducts.length;

  const productsEl        = productsStore.receivedProducts.map((product) => <ProductCard key={product.id}
                                                                                         product={product}
                                                                                         withActions={false} />);

  return (
    <Container>
      {count} products
      {productsEl}
    </Container>
  );
});

const Container = styled.div`
  .product-card {
    margin: 20px 0;
  }
`;

export default ReceivedPage;
