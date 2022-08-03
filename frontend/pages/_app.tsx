import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { AppProps } from "next/app";
import { WagmiConfig, createClient } from "wagmi";
import { getDefaultProvider } from "ethers";
import { ToastContainer } from "react-toastify";

const client = createClient({
  autoConnect: true,
  provider: getDefaultProvider(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
        theme="dark"
      />
    </WagmiConfig>
  );
}

export default MyApp;
