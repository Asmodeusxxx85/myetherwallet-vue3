const ROUTES_HOME: ROUTE = {
  HOME: { NAME: 'Home', PATH: '' },
  //A-Z
  ACCESS_WALLET: { NAME: 'AccessWallet', PATH: 'wallet/access/:overlay?' },
  ABOUT_PAGE: { NAME: 'AboutPage', PATH: 'about' },
  BUY_HARDWARE_WALLET: { NAME: 'BuyHardwareWallet', PATH: 'buy-hardware' },
  CREATE_WALLET: { NAME: 'CreateWallet', PATH: 'wallet/create/:overlay?' },
  CONVERT_UNITS: { NAME: 'ConvertUnits', PATH: 'convert-units' },
  DAPP_SUBMISSION: { NAME: 'DappSubmission', PATH: 'dapp-submission' },
  HOW_IT_WORKS: { NAME: 'HowItWorks', PATH: 'how-it-works' },
  JOBS: { NAME: 'Careers', PATH: 'careers' },
  PAGE_NOT_FOUND: { NAME: 'PageNotFound', PATH: '/:pathMatch(.*)*' },
  PRESS_KIT: { NAME: 'PressKit', PATH: 'presskit' },
  PRIVACY_POLICY: { NAME: 'PrivacyPolicy', PATH: 'privacy-policy' },
  QR_CODE: { NAME: 'QrCode', PATH: 'qr-code' },
  SECURITY_POLICY: { NAME: 'SecurityPolicy', PATH: 'security-policy' },
  TEAM_PAGE: { NAME: 'TeamPage', PATH: 'team' },
  TERMS_OF_SERVICE: { NAME: 'TermsOfService', PATH: 'terms-of-service' },
  TOOLS: { NAME: 'Tools', PATH: 'tools' },
  TOOLS_KEYSTORE: { NAME: 'ToolsKeystore', PATH: 'tools-keystore' },
  TOOLS_KEYSTORE_1: { NAME: 'ToolsKeystore1', PATH: 'tools-keystore-1' },
  TOOLS_KEYSTORE_2: { NAME: 'ToolsKeystore2', PATH: 'tools-keystore-2' }
};
const ROUTES_WALLET: ROUTE = {
  WALLETS: { NAME: 'Wallets', PATH: '' },
  //A-Z
  AAVE: { NAME: 'Aave', PATH: 'aave' },
  DAPPS: { NAME: 'Dapps', PATH: 'dapps' },
  DASHBOARD: { NAME: 'Dashboard', PATH: 'dashboard' },
  DEPLOY_CONTRACT: { NAME: 'DeployContract', PATH: 'deploy' },
  ENS_MANAGER: { NAME: 'ENSManager', PATH: 'ens-manager' },
  ENS_1: { NAME: 'ENS1', PATH: 'ens-1' },
  ENS_2: { NAME: 'ENS2', PATH: 'ens-2' },
  ENS_3: { NAME: 'ENS3', PATH: 'ens-3' },
  INTERACT_WITH_CONTRACT: { NAME: 'InteractWithContract', PATH: 'interact' },
  NETWORK: { NAME: 'Network', PATH: 'network' },
  NFT_MANAGER: { NAME: 'NFTManager', PATH: 'nft' },
  NFT_MANAGER_SEND: { NAME: 'NftManagerSend', PATH: 'send-your-nft' },
  SEND_TX: { NAME: 'SendTX', PATH: 'send-tx' },
  SEND_TX_OFFLINE: { NAME: 'SendTXOffline', PATH: 'send-tx-offline' },
  SETTINGS: { NAME: 'Settings', PATH: 'settings' },
  SIGN_MESSAGE: { NAME: 'SignMessage', PATH: 'sign' },
  STAKED: { NAME: 'Staked', PATH: 'staked' },
  STAKED_STATUS: { NAME: 'StakedStatus', PATH: 'status' },
  STAKED_1: { NAME: 'Staked1', PATH: 'staked-1' },
  STAKED_2: { NAME: 'Staked2', PATH: 'staked-2' },
  STAKED_3: { NAME: 'Staked3', PATH: 'staked-3' },
  STAKED_4: { NAME: 'Staked4', PATH: 'staked-4' },
  STAKEWISE: { NAME: 'Stakewise', PATH: 'stakewise' },
  SWAP: { NAME: 'Swap', PATH: 'swap' },
  UNSTOPPABLE: { NAME: 'Unstoppable', PATH: 'unstoppable' },
  VERIFY_MESSAGE: { NAME: 'VerifyMessage', PATH: 'verify' }
};

interface ROUTE {
  [key: string]: {
    NAME: string;
    PATH: string;
  };
}

export { ROUTES_HOME, ROUTES_WALLET };
