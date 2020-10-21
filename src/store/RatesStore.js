import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';
import { notification } from 'antd';
import _ from 'lodash';

import consts from '../constants';

const GET_RATES_INTERVAL = 1000 * 10;

export default class RatesStore {
  rates       = [];
  defaultRate = {
    id: 'USD',
    code: 'USD',
    value: 1,
    symbol: '$',
  };
  isReady     = false;
  _isLoading  = false;

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;

    this.get();
    setInterval(() => this.get(), GET_RATES_INTERVAL);
  }

  async get() {
    this._isLoading = true;
    try {
      const { data } = await axios.get('https://api.exchangeratesapi.io/latest?base=USD');
      runInAction(() => {
        this.rates   = Object.entries(data.rates)
          .map(([key, value]) => new Rate({
            code: key,
            value
          }));
        this.isReady = true;
      });
    } catch (e) {
      notification.error({
        message: 'Whoops, Something went wrong',
        description: `Fetching of exchange rate has failed due to:  ${e}`,
      });
    } finally {
      this._isLoading = false;
    }
  }

  getRate(code) {
    return _.find(this.rates, { code }) || this.defaultRate;
  }

  getCurrentRate() {
    const currency = this.rootStore.configStore.config.currency;
    return this.getRate(currency);
  }

  get isLoading() {
    return !this.isReady && this._isLoading;
  }
}

class Rate {
  id;
  code;
  value;
  symbol;

  constructor(rate) {
    const { code, value } = rate;

    this.id     = code;
    this.code   = code;
    this.value  = value;
    this.symbol = consts.RATES[code].symbol;

    makeAutoObservable(this);
  }
}
