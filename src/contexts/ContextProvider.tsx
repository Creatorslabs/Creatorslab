"use client";
import { PrivyProvider } from "@privy-io/react-auth";
import { SessionProvider } from "next-auth/react";
import { FC, ReactNode } from "react";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
const solanaConnectors = toSolanaWalletConnectors();

export const ContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <PrivyProvider
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID as string}
      config={{
        appearance: {
          showWalletLoginFirst: true,
          walletList: [
            "detected_solana_wallets",
            "backpack",
            "phantom",
            "solflare",
            "metamask",
          ],
          theme: "dark",
          accentColor: "#5D3FD1",
          landingHeader: "CreatorsLab",
          walletChainType: "solana-only",
          // logo: "https://creatorslab.cc/images/logo.png",
        },
        loginMethods: ["email", "discord", "twitter", "wallet"],
        fundingMethodConfig: {
          moonpay: {
            useSandbox: true,
          },
        },
        externalWallets: {
          solana: { connectors: solanaConnectors },
        },
        solanaClusters: [
          {
            name: "mainnet-beta",
            rpcUrl: "https://api.mainnet-beta.solana.com",
          },
        ],
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </PrivyProvider>
  );
};
