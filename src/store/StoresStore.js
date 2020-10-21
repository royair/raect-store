import { makeAutoObservable, autorun, runInAction } from 'mobx';
import { v4 as uuidv4 } from 'uuid';


export default class StoresStore {
  stores = [];

  constructor(rootStore) {
    makeAutoObservable(this);

    this.rootStore = rootStore;

    autorun(() => {
      const stores = Object.entries(this.rootStore.productsStore.groupedProductsByStoreName)
        .map(([key, value]) => ({
          name: key,
          products: value
        }));

      runInAction(() => {
        this.stores = stores.map((store) => new Store(store));
      });
    });
  }
}

class Store {
  id;
  name;
  products = [];

  constructor(store) {
    this.id       = uuidv4();
    this.name     = store.name;
    this.products = store.products;

    makeAutoObservable(this);
  }

  get unreceivedProducts() {
    return this.products.filter((product) => !product.isReceived);
  }
}
