import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

export default function Home() {
  const router = useRouter();

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
        <p className="leading-relaxecd w-full p-8 text-lg">
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
          <ol className="list-decimal">
            <li>Connect your wallet and insert your age</li>
            <li>Click submit application</li>
            <li>
              Wait for your application to be approved by ELVTD. This process
              may take 1-2 business days
            </li>
            <li>
              After your claim is approved, log in to your user portal where you
              can manage your claims and generate proofs for them if needed
            </li>
            <li>
              Use your proof in any partner platform that accepts our claims!
            </li>
          </ol>
        </p>
        <div className="flex w-full flex-row items-center justify-center space-x-8">
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