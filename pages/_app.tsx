import "../styles/globals.css";
import type { AppProps } from "next/app";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { ChakraProvider } from "@chakra-ui/react";

const { provider } = configureChains(
  [chain.mainnet],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: "https://eth-mainnet.blastapi.io/API-KEY",
        };
      },
    }),
  ]
);

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      chains: [chain.mainnet],
    }),
  ],
  provider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <WagmiConfig client={client}>
        <Component {...pageProps} />
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default MyApp;
