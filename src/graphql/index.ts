import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// const uri = process.env.NODE_ENV === 'production' ? 'https://graph.OriSwap.com/mainnet/graphql/dsp/OriSwap' : 'https://graph.OriSwap.com/testnet/graphql/subgraphs/name/dsp/OriSwap';
// const uri = 'https://graph.oriswap.xyz/subgraphs/name/sun5347/oriswap';
const uri = 'https://graph.oriswap.xyz/subgraphs/name/sun5347/oriswapnew';
// const uri = 'https://graphtest.oriswap.co/subgraphs/name/sun5347/oriswaptest';
// const uri = 'https://graph.oriswap.co/mainnet/graphql/subgraphs/name/dsp/OriSwap';
// const uri = 'https://graph.OriSwap.com/testnet/graphql/subgraphs/name/dsp/OriSwap';
export const client = new ApolloClient({
  link: new HttpLink({
    uri: uri,
  }),
  cache: new InMemoryCache(),
  
});

export const airDropClient = new ApolloClient({
  link: new HttpLink({
    uri: 'https://graph.oriswap.xyz/airdrop/graphql',
  }),
  cache: new InMemoryCache(),
  
});

export default client;