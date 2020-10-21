import React from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import { observer } from 'mobx-react';
import moment from 'moment';

const ProductCard = observer(({ product, withActions = true }) => {
  const { name, imageUrl, price, storeName, eta } = product;
  const etaFormatted                              = moment(eta)
    .format('DD/MM/YYYY');

  const setReceived = () => product.setReceived(true);

  return (
    <Container className={'product-card'}>
      <div className="product-details">
        <img
          src={imageUrl}
          style={{
            maxHeight: 100,
            width: 'auto',
            height: 'auto'
          }} />

        <div style={{ marginLeft: 20 }}>
          <div className="name">
            <Typography.Title level={3}>{name}</Typography.Title>
          </div>

          <div className="store-name">
            <Typography.Title level={5}>{storeName}</Typography.Title>
          </div>

          <div className="eta">
            <Typography.Title level={5}>ETA: {etaFormatted}</Typography.Title>
          </div>

          <div className="price-container">
            <span className="price-value">{price.value}</span>
            <span className="price-symbol">{price.symbol}</span>
          </div>
        </div>
      </div>

      {withActions && (
        <div className="action-bar">
          <Button onClick={setReceived}>Received!</Button>
        </div>
      )}
    </Container>
  );
});

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-radius: 5px;
  border: 1px solid var(--grey-800);
  
  .product-details {
    display: flex;    
  }
  
  .price-container {
    color: var(--red-500);
    font-weight: 700;
    font-size: 18px;
  }
`;

export default ProductCard;
