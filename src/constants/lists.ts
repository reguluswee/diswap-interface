// used to mark unsupported tokens, these are hosted lists of unsupported tokens
/**
 * @TODO add list from blockchain association
 */
export const UNSUPPORTED_LIST_URLS: string[] = []

// const COMPOUND_LIST = 'https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json'
// const UMA_LIST = 'https://umaproject.org/uma.tokenlist.json'
// const AAVE_LIST = 'tokenlist.aave.eth'
// const SYNTHETIX_LIST = 'synths.snx.eth'
// const WRAPPED_LIST = 'wrapped.tokensoft.eth'
// const SET_LIST = 'https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json'
// const OPYN_LIST = 'https://raw.githubusercontent.com/opynfinance/opyn-tokenlist/master/opyn-v1.tokenlist.json'
// const ROLL_LIST = 'https://app.tryroll.com/tokens.json'
// const COINGECKO_LIST = 'https://tokens.coingecko.com/uniswap/all.json'
// const CMC_ALL_LIST = 'defi.cmc.eth'
// const CMC_STABLECOIN = 'stablecoin.cmc.eth'
// const KLEROS_LIST = 't2crtokens.eth'
// const GEMINI_LIST = 'https://www.gemini.com/uniswap/manifest.json'
// const HECO_MAINNET_LIST = 'http://oriswap.xyz:3000/heco-mainnet-tokenlist.json?v=2&t=20220513'
// const HECO_TESTNET_LIST = window.location.origin + '/heco-testnet-tokenlist.json'
const HECO_MAINNET_LIST = window.location.origin + '/heco-mainnet-tokenlist.json?v=3&t=20221232'
const ETHF_MAINNET_NFT_LIST = window.location.origin + '/ethf-mainnet-nftlist.json?v=3&t=20221232'


// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  // COMPOUND_LIST,
  // AAVE_LIST,
  // SYNTHETIX_LIST,
  // UMA_LIST,
  // WRAPPED_LIST,
  // SET_LIST,
  // OPYN_LIST,
  // ROLL_LIST,
  // COINGECKO_LIST,
  // CMC_ALL_LIST,
  // CMC_STABLECOIN,
  // KLEROS_LIST,
  // GEMINI_LIST,
  // HECO_TESTNET_LIST,
  HECO_MAINNET_LIST,
  ...UNSUPPORTED_LIST_URLS // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [HECO_MAINNET_LIST]
export const DEFAULT_ACTIVE_NFT_LIST_URLS: string[] = [ETHF_MAINNET_NFT_LIST]
