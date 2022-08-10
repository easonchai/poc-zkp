import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useStore } from "src/utils/store";

export default function Home() {
  const router = useRouter();
  const { claimData } = useStore();

  return (
    <div className="relative flex h-full w-screen flex-col bg-violet-100">
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
        <h1 className="text-center text-4xl font-bold">User Portal</h1>
        <p className="w-full pt-8 text-lg leading-relaxed">
          Hello human! Welcome to your User Portal where you can view{" "}
          <strong>approved</strong> claims about yourself. These claims can be
          anything about you, for example your age, name, certifications, etc.
          <br />
          <br />
          Currently, only claims issued by ELVTD exist here!
          <br />
          <br />
          To use your claims, follow these steps:
        </p>
        <ol className="list-decimal">
          <li>Head over to any third party which accepts our claims</li>
          <li>
            Click on your claim to generate a proof to be used on their site!
          </li>
        </ol>
        {claimData && (
          <div className="card my-12 w-128 transform bg-base-100 text-white shadow-xl duration-300 hover:scale-105">
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
        )}
        <div className="my-8 flex w-full flex-row items-center justify-center space-x-8">
          <button
            className="btn btn-primary"
            onClick={() => router.push("/issuer")}
          >
            ELVTD (Issuer)
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
