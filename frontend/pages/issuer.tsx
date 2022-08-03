import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import ConnectWallet from "src/wagmi/ConnectWallet";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const [age, setAge] = useState<number>(0);
  const [claimData, setClaimData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const submitApplication = async () => {
    // We make a call to our backend to generate a claim and return it
    setLoading(true);

    if (isNaN(age)) {
      toast.error("Invalid age!", {
        toastId: "error",
      });
      setAge(0);
    } else {
      const data = await fetch("http://localhost:3001", {
        method: "POST",
        body: JSON.stringify({
          age,
        }),
      })
        .then((response) => response.json())
        .catch((err) => {
          console.error("ERR", err);
          toast.error(`Something went wrong!`, {
            toastId: "error",
          });
          return null;
        });

      if (data) {
        setClaimData(data);
        toast.success(
          "Application submitted! Please wait for 1-2 business days for your application to be approved and claim to be issued",
          {
            toastId: "success",
          },
        );
      }
    }
    setLoading(false);
  };

  return (
    <div className="relative flex h-full w-screen flex-col bg-pink-100">
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
        <h1 className="text-center text-4xl font-bold">
          ELVTD Application Portal
        </h1>
        <p className="w-full pt-8 text-lg leading-relaxed">
          Hello human! Welcome to ELVTD Application Portal where you can apply
          for claims about yourself. These claims can be anything about you, for
          example your age, name, certifications, etc.
          <br />
          <br />
          At ELVTD, we are the trusted source that is{" "}
          <strong>certified to issue claims about your age</strong>!
          <br />
          <br />
          To get started, follow these steps:
        </p>
        <ol className="list-decimal">
          <li>Connect your wallet and insert your age</li>
          <li>Click submit application</li>
          <li>
            Wait for your application to be approved by ELVTD. This process may
            take 1-2 business days
          </li>
          <li>
            After your claim is approved, log in to your user portal where you
            can manage your claims and generate proofs for them if needed
          </li>
          <li>
            Use your proof in any partner platform that accepts our claims!
          </li>
        </ol>
        <div className="my-8 flex w-full flex-col items-center justify-center space-y-4">
          <p className="text-2xl font-bold">Step 1: Connect Wallet</p>
          {address && <p>Connected to {address}</p>}
          <ConnectWallet />
          <p className="text-2xl font-bold">Step 2: Insert Age</p>
          <input
            type="number"
            placeholder="Enter your age"
            className="input input-bordered input-primary w-full max-w-xs bg-white"
            onChange={(e) => setAge(Number(e.target.value))}
          />
          <p className="text-2xl font-bold">Step 3: Submit Application</p>
          <button
            className={`btn btn-success bg-green-400 ${
              loading ? "loading" : ""
            }`}
            onClick={submitApplication}
          >
            Submit
          </button>
        </div>
        <div className="mt-12 flex w-full flex-row items-center justify-center space-x-8">
          <button
            className="btn btn-secondary"
            onClick={() => router.push("/profile")}
          >
            User Portal (Profile)
          </button>
          <button
            className="btn btn-accent"
            onClick={() => router.push("/verifier")}
          >
            Third Party (Verifier)
          </button>
        </div>
      </main>
    </div>
  );
}
