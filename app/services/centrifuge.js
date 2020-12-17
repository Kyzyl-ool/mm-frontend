import Centrifuge from 'centrifuge';
import route from '../config/route';

class CentrifugeSingleton {
  /**
   * @type {Centrifuge}
   */
  static instance = null;

  static getInstance(token) {
    if (!this.instance) {
      this.instance = new Centrifuge(route.URL_CENTRIFUGO_CONNECT);
    }

    if (!this.instance.isConnected()) {
      this.instance.setToken(token);
      this.instance.connect();
    }

    return this.instance;
  }

  static connect(token) {
    this.getInstance(token);
  }

  static disconnect() {
    if (this.instance) {
      this.instance.disconnect();
      this.instance = null;
    }
  }
}

export default CentrifugeSingleton;
