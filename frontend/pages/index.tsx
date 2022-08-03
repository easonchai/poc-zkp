import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="relative flex h-full w-screen flex-col bg-base-100">
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

      <main className="flex h-full min-h-screen w-full flex-col p-16 text-white">
        <h1 className="text-center text-4xl font-bold">ELVTD ZKP PoC Demo</h1>
        <article className="prose prose-slate lg:prose-xl">
          <p>Proof of Concept Zero Knowledge Proof (ZKP) Demo</p>
          <h2>Entities</h2>
          <h3>ELVTD (Issuer)</h3>
          <p>
            Issuers are trusted sources that issues claims for users. <br />
            You may access it from the <b>Issuer</b> site
          </p>
          <h3>User (Prover)</h3>
          <p>
            Provers prove their claims.
            <br />
            You may access it from the <b>Profile</b> site
          </p>
          <h3>Third Party (Verifier)</h3>
          <p>
            Verifiers will verify if your claims are true and perform actions
            based on the output
            <br />
            You may access it from the <b>Verifier</b> site
          </p>
        </article>

        <div className="my-6 flex w-full flex-row items-center justify-center space-x-8">
          <button
            className="btn btn-primary"
            onClick={() => router.push("/issuer")}
          >
            ELVTD Application Portal (Issuer)
          </button>
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
