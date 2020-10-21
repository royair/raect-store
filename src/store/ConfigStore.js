import { makeAutoObservable } from 'mobx';

export default class ConfigStore {
  config = {
    currency: 'USD'
  };

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;
  }

  setCurrency = (value) => this.config.currency = value;
}
