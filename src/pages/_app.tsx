import "../../styles/globals.css";
import type { AppProps } from "next/app";
import Nav from "../components/Nav";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  midnightTheme,
} from "@rainbow-me/rainbowkit";
import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, zora } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Test",
  projectId: "33e28c5d43009b3668cccf62984e6dbe",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={midnightTheme({
          accentColor: "#33B37B",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "large",
        })}
      >
        <div className="bg-[#1d1d1c] font-lato">
          <Nav />
          <Component {...pageProps} />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
