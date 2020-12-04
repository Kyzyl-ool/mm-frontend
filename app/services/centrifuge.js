import Centrifuge from 'centrifuge';
import route from '../config/route';

class CentrifugeSingleton {
  /**
   * @type {Centrifuge}
   */
  static instance = null;

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new Centrifuge(route.URL_CENTRIFUGO_CONNECT);

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIn0.GXJt-BM9mvzAQfhKNAgAHLu7y6dVFSl6XWqc-ODCgwc';
    this.instance.setToken(token);
    this.instance.connect();

    return this.instance;
  }

  static connect() {
    this.getInstance();
  }

  static disconnect() {
    if (this.instance) {
      this.instance.disconnect();
      this.instance = null;
    }
  }
}

export default CentrifugeSingleton;
