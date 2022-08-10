import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { generateProof } from "src/utils/proof";
import { useStore } from "src/utils/store";
import ConnectWallet from "src/wagmi/ConnectWallet";
import { useAccount } from "wagmi";

export default function Home() {
  const router = useRouter();
  const { address } = useAccount();
  const { claimData } = useStore();
  const [generating, setGenerating] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [proof, setProof] = React.useState<any>();

  const calculateProof = async () => {
    if (!claimData) {
      toast.error("No claims found", {
        toastId: "error",
      });
      return;
    }

    setGenerating(true);
    toast.info("Generating proof...", {
      toastId: "generate",
    });

    // Load files and run proof locally
    const DOMAIN = "http://localhost:3000";
    const wasmBuff = await getFileBuffer(`${DOMAIN}/circuit.wasm`);
    const zkeyBuff = await getFileBuffer(`${DOMAIN}/circuit_final.zkey`);

    try {
      const proof = await generateProof(claimData, wasmBuff, zkeyBuff);
      console.log(proof);
    } catch (error) {
      toast.error("Proof generation Failed: " + error, {
        toastId: "generate",
      });
    }
  };

  const verifyProof = () => {
    console.log(proof);
  };

  const getFileBuffer = async (filename: string) => {
    let req = await fetch(filename);
    return Buffer.from(await req.arrayBuffer());
  };

  return (
    <div className="relative flex h-full w-screen flex-col bg-orange-100">
      <Head>
        <title>ELVTD ZKP PoC Demo</title>
        <meta
          name="description"
          content="Explore the world of ZKP with ELVTD"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>

      <main className="flex h-full min-h-screen w-full flex-col p-16 text-black">
        <h1 className="text-center text-4xl font-bold">Some Techy Shady Bar</h1>
        <p className="w-full pt-8 text-lg leading-relaxed">
          Hello human! You must be <strong>above 18</strong> to enter this bar.
          <br />
          <br />
          We don&apos;t accept IDs here since they can be faked. Only{" "}
          <strong>ZKP proofs</strong> are allowed!
          <br />
          <br />
          To get started, follow these steps:
        </p>
        <ol className="list-decimal">
          <li>Connect your wallet to view your claims</li>
          <li>Click on your claim to generate a proof</li>
          <li>Do anything you want after that!</li>
        </ol>
        <div className="my-8 flex w-full flex-col items-center justify-center space-y-4">
          <p className="text-2xl font-bold">Step 1: Connect Wallet</p>
          {address && <p>Connected to {address}</p>}
          <ConnectWallet />
          <p className="text-2xl font-bold">
            Step 2: Generate a proof from your claim
          </p>
          {address &&
            (claimData ? (
              <div
                className="card my-12 w-128 transform bg-base-100 text-white shadow-xl duration-300 hover:scale-105 active:scale-100"
                onClick={calculateProof}
              >
                <div className="card-body">
                  <h2 className="card-title">Age Claim</h2>
                  <p className="my-2 break-words">
                    Claim: <code>{claimData.claim.toString()}</code>
                  </p>
                  <p className="my-2 break-words">
                    Signature:{" "}
                    <code>{`${claimData.sigR8x},${claimData.sigR8y},${claimData.sigS}`}</code>
                  </p>
                </div>
              </div>
            ) : (
              <h2 className="my-12">No claims found</h2>
            ))}
          <p className="text-2xl font-bold">Step 3: Enter The Bar</p>
          <button
            className={`btn btn-success bg-green-400 ${
              loading ? "loading" : ""
            }`}
            onClick={verifyProof}
          >
            Submit
          </button>
        </div>
        <div className="my-8 flex w-full flex-row items-center justify-center space-x-8">
          <button
            className="btn btn-primary"
            onClick={() => router.push("/issuer")}
          >
            ELVTD (Issuer)
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => router.push("/profile")}
          >
            User Portal (Profile)
          </button>
        </div>
      </main>
    </div>
  );
}
