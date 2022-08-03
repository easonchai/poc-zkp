import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";

export default function ConnectWallet() {
  const { isConnected } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();

  return isConnected ? (
    <button
      className="btn-base-300 btn"
      onClick={() => disconnect()}
    >
      Disconnect
    </button>
  ) : (
    <button
      className="btn-base-300 btn"
      onClick={() => connect()}
    >
      Connect Wallet
    </button>
  );
}
