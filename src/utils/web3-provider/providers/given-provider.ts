import { Manager as Web3RequestManager } from 'web3-core-requestmanager';
import MiddleWare from '../middleware';
import { EventBus } from '@/plugins/eventBus';
import {
  ethSendTransaction,
  ethSendRawTransaction,
  ethSign,
  ethSignTransaction,
  ethGetTransactionCount,
  ethCoinbase,
  ethAccounts
} from '../methods';
class CustomRequestManager extends Web3RequestManager {
  constructor(host: any) {
    super(host);
  }
  request(payload: any) {
    return new Promise((resolve, reject) => {
      const callback = (error: any, result: any) => {
        if (error) return reject(error.error);
        if (result.error) return reject(result.error);
        return resolve(result.result);
      };
      if (this.provider.request_) {
        this.provider.request_(payload).then(resolve).catch(reject);
      } else if (this.provider.sendAsync) {
        this.provider.sendAsync(payload, callback);
      } else if (this.provider.send) {
        this.provider.send(payload, callback);
      }
    });
  }
  send(data: any, callback: any) {
    const { method, params } = data;
    if (this.provider.request_) {
      this.provider
        .request_({ method, params })
        .then((res: any) => {
          callback(null, res);
        })
        .catch((err: any) => callback(err));
    } else {
      this.request({ method, params })
        .then(res => {
          callback(null, res);
        })
        .catch(err => callback(err));
    }
  }
}
class GivenProvider {
  givenProvider: any;
  constructor(host: any) {
    this.givenProvider = host;
    const requestManager = new CustomRequestManager(this.givenProvider);
    if (this.givenProvider.request && !this.givenProvider.request_) {
      this.givenProvider.request_ = this.givenProvider.request;
    }
    this.givenProvider.request = (payload: any) => {
      return new Promise((resolve, reject) => {
        const callback = (error: any, result: any) => {
          if (error) return reject(error.error);
          return resolve(result.result);
        };
        const req = {
          payload,
          // store: VuexStore,
          requestManager,
          eventHub: EventBus
        };
        const middleware = new MiddleWare();
        middleware.use(ethSendTransaction);
        middleware.use(ethSendRawTransaction);
        middleware.use(ethSignTransaction);
        middleware.use(ethGetTransactionCount);
        middleware.use(ethSign);
        middleware.use(ethCoinbase);
        middleware.use(ethAccounts);
        middleware.run(req, callback).then(() => {
          if (this.givenProvider.request_) {
            this.givenProvider.request_(payload).then(resolve).catch(reject);
          } else if (this.givenProvider.sendAsync) {
            this.givenProvider.sendAsync(payload, callback);
          } else if (this.givenProvider.send) {
            this.givenProvider.send(payload, callback);
          }
        });
      });
    };
    return this.givenProvider;
  }
}
export { CustomRequestManager };
export default GivenProvider;
