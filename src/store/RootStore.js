import ProductsStore from './ProductsStore';
import RatesStore from './RatesStore';
import ConfigStore from './ConfigStore';
import StoresStore from './StoresStore';

class RootStore {
  constructor() {
    this.productsStore = new ProductsStore(this);
    this.ratesStore    = new RatesStore(this);
    this.configStore   = new ConfigStore(this);
    this.storesStore   = new StoresStore(this);
  }
}

export default new RootStore();
