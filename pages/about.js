import React from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/About.module.css";
import Head from "next/head";

export default function about() {
  return (
    <div className={styles.homeText}>
      <>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@2.19.0/dist/full.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Comforter&family=Poppins:wght@300&family=Supermercado+One&display=swap"
          rel="stylesheet"
        />
      </>
      <Navbar />
      <div className={styles.homeText}>
        <div className="flex flex-col items-center justify-center mt-4">
          <h1 className="text-3xl mb-2">about Web3.Me</h1>
          <div class="card card-side bg-base-100 shadow-xl border">
            <figure>
              <img
                src="https://media.sproutsocial.com/uploads/2022/04/web3_primer_1.gif"
                alt="Movie"
              />
            </figure>
            <div class="card-body">
              <h2 class="card-title">
                Web3.Me is a platform designed for Web3 builders
              </h2>
              <p>
                The platform is designed to be a decentralized self-advertising
                and talent seeking forum.
                <br />
                <br />
                users are able to upload credentials to IPFS and have the
                information updated immediately with no need to refresh.
              </p>
              <div class="card-actions justify-end">
                <button class="btn btn-primary">Learn More</button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <h1 className="text-3xl mt-2 mb-2">the stack</h1>
          <div class="grid grid-cols-3 gap-6">
            <div class="border card w-96 bg-base-100 shadow-xl">
              <figure class="px-10 pt-10">
                <img
                  src="https://assets.vercel.com/image/upload/q_auto/front/assets/design/white-nextjs.png"
                  alt="Shoes"
                  class="rounded-xl"
                />
              </figure>
              <div class="card-body items-center text-center">
                <h2 class="card-title">Next.js</h2>
                <p>
                  I decided to utilize Next.js for this project for many
                  reasons: hybrid static & server rendering, TypeScript support,
                  smart bundling, route pre-fetching, etc.
                </p>
                <div class="card-actions">
                  <button
                    onClick={() => {
                      window.open("https://nextjs.org/");
                    }}
                    class="btn btn-primary"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
            <div class="border card w-96 bg-base-100 shadow-xl">
              <figure class="px-10 pt-10">
                <img src="/web3js.jpg" alt="Shoes" class="rounded-xl" />
              </figure>
              <div class="card-body items-center text-center">
                <h2 class="card-title">Web3.js/IPFS</h2>
                <p>
                  Web3.js is utilized to initiate a connection between the users
                  Ethereum wallet and the website. IPFS is utilized to store the
                  users credentials and allow the user to not have to pay any
                  gas fees.
                </p>
                <div class="card-actions">
                  <button
                    onClick={() => {
                      window.open(
                        "https://web3js.readthedocs.io/en/v1.5.2/index.html"
                      );
                    }}
                    class="btn btn-primary"
                  >
                    Web3.js
                  </button>
                  <button
                    onClick={() => {
                      window.open("https://ipfs.io");
                    }}
                    class="btn btn-primary"
                  >
                    IPFS
                  </button>
                </div>
              </div>
            </div>
            <div class="border card w-96 bg-base-100 shadow-xl">
              <figure class="px-10 pt-10">
                <img
                  src="https://miro.medium.com/max/1400/1*X6wCDTpjcn_WcvDW9jS4WQ.png"
                  alt="Shoes"
                  class="rounded-xl"
                />
              </figure>
              <div class="card-body items-center text-center">
                <h2 class="card-title">Prisma</h2>
                <p>
                  I used Prisma as a database as it is extremely manageable and
                  easy to set up. Prisma serves as the entire database for now,
                  I plan on moving this to on-chain.
                </p>
                <div class="card-actions">
                  <button
                    onClick={() => {
                      window.open("https://www.prisma.io");
                    }}
                    class="btn btn-primary"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <h1 className="text-3xl mt-2 mb-2">created by Christopher Abdo</h1>
        </div>
      </div>
    </div>
  );
}
