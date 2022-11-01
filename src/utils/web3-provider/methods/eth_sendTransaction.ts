import { useGlobalStore } from './../../../stores/global/index';
import utils from 'web3-utils';
import EthCalls from '../web3Calls';
import WALLET_TYPES from '@/modules/access-wallet/common/walletTypes';
import EventNames from '../events';
import { toPayload } from '../jsonrpc';
import * as locStore from 'store';
import { getSanitizedTx, setEvents } from './utils';
import BigNumber from 'bignumber.js';
import sanitizeHex from '@/core/helpers/sanitizeHex';
import { MAIN_TOKEN_ADDRESS } from '@/core/helpers/common';
import { Web3Method } from '.';
import { useExternalStore } from '@/stores/external';
import { useWalletStore } from '@/stores/wallet';
//import { EventBus } from '@/core/plugins/eventBus';

export default <Web3Method>(async ({ payload, requestManager }, res, next) => {
  if (payload.method !== 'eth_sendTransaction') return next();
  const tx = Object.assign({}, payload.params[0]);
  let confirmInfo = '';
  let toDetails = {};
  if (tx.confirmInfo) {
    confirmInfo = tx['confirmInfo'];
    delete tx['confirmInfo'];
  }
  if (tx.toDetails) {
    toDetails = tx['toDetails'];
    delete tx['toDetails'];
  } else {
    toDetails = {
      type: 'TYPED'
    };
  }
  const externalStore = useExternalStore();
  const globalStore = useGlobalStore();
  const walletStore = useWalletStore();
  let currency = externalStore.contractToToken()(tx.to);
  if (!currency) currency = externalStore.contractToToken()(MAIN_TOKEN_ADDRESS);
  tx.gasPrice = tx.gasPrice ? tx.gasPrice : BigNumber(globalStore.gasPrice);
  const localTx = Object.assign({}, tx);
  delete localTx['gas'];
  delete localTx['nonce'];
  delete localTx['gasPrice'];
  tx.value = tx.value === '' || tx.value === '0x' ? '0' : tx.value;
  const ethCalls = new EthCalls(requestManager);
  try {
    tx.nonce = !tx.nonce
      ? await walletStore.web3.eth.getTransactionCount(
          walletStore.instance.getAddressString()
        )
      : tx.nonce;
    if (tx.gasLimit) {
      tx.gas = tx.gasLimit;
    } // !tx.gas ? await ethCalls.estimateGas(localTx) : tx.gas
    tx.gasLimit = tx.gas;
  } catch (e) {
    res(e);
    return;
  }
  tx.chainId = !tx.chainId ? globalStore.type.chainID : tx.chainId;
  tx.from = tx.from ? tx.from : walletStore.address;
  getSanitizedTx(tx)
    .then(_tx => {
      const event = confirmInfo
        ? EventNames.SHOW_SWAP_TX_MODAL
        : EventNames.SHOW_TX_CONFIRM_MODAL;
      const params = confirmInfo
        ? [_tx, confirmInfo]
        : [_tx, toDetails, currency];
      if (
        walletStore.identifier === WALLET_TYPES.WEB3_WALLET ||
        walletStore.identifier === WALLET_TYPES.WALLET_CONNECT
      ) {
        // EventBus.$emit(event, params, _promiObj => {
        //   if (_promiObj.rejected) {
        //     res(new Error('User rejected action'));
        //     return;
        //   }
        //   setEvents(_promiObj, _tx, store.dispatch);
        //   _promiObj
        //     .once('transactionHash', hash => {
        //       res(null, toPayload(payload.id, hash));
        //     })
        //     .on('error', err => {
        //       res(err);
        //     });
        // });
      } else {
        /**
         * confirmInfo is @Boolean
         * Checks whether confirmInfo is true
         * if true, assume transaction is a swap
         */
        // EventBus.$emit(event, params, _response => {
        //   if (_response.rejected) {
        //     res(new Error('User rejected action'));
        //     return;
        //   }
        //   const _promiObj = walletStore.web3.eth.sendSignedTransaction(
        //     _response.rawTransaction
        //   );
        //   setEvents(_promiObj, _tx, store.dispatch);
        //   _promiObj
        //     .once('transactionHash', hash => {
        //       if (walletStore.instance !== null) {
        //         const isTesting = locStore.get('mew-testing');
        //         if (!isTesting) {
        //           const storeKey = utils.sha3(
        //             `${
        //               store.getters['global/network'].type.name
        //             }-${walletStore.instance
        //               .getChecksumAddressString()
        //               .toLowerCase()}`
        //           );
        //           const localStoredObj = locStore.get(storeKey);
        //           locStore.set(storeKey, {
        //             nonce: sanitizeHex(
        //               BigNumber(localStoredObj.nonce).plus(1).toString(16)
        //             ),
        //             timestamp: localStoredObj.timestamp
        //           });
        //         }
        //       }
        //       res(null, toPayload(payload.id, hash));
        //     })
        //     .on('error', err => {
        //       res(err);
        //     });
        // });
      }
    })
    .catch(e => {
      res(e);
    });
});
