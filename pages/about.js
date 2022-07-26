import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import styles from "../styles/About.module.css";
import Head from "next/head";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { BsTwitter } from "react-icons/bs";

import Web3 from "web3";
import Web3Me from "../build/contracts/Web3Me.json";

export default function about() {
  const [account, setAccount] = useState("");
  const [web3me, setWeb3me] = useState(null);
  const [imagesCount, setImagesCount] = useState();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buffer, setBuffer] = useState(null);
  const [tipAmount, setTipAmount] = useState(0);

  async function componentWillMount() {
    await loadWeb3();
    await loadBlockchainData();
  }

  async function loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  async function loadBlockchainData() {
    const web3 = window.web3;
    // Load account
    const accounts = await web3.eth.getAccounts();
    // this.setState({ account: accounts[0] });
    setAccount(accounts[0]);
    // Network ID
    const networkId = await web3.eth.net.getId();
    const networkData = Web3Me.networks[networkId];
    if (networkData) {
      const web3me = new web3.eth.Contract(Web3Me.abi, networkData.address);
      // this.setState({ melomania });
      setWeb3me(web3me);
      const imagesCount = await web3me.methods.imageCount().call();
      // this.setState({ imagesCount });
      setImagesCount(imagesCount);
      // Load images
      for (var i = 1; i <= imagesCount; i++) {
        const image = await web3me.methods.images(i).call();
        // this.setState({
        //   images: [...this.state.images, image],
        // });
        setImages([...images, image]);
      }
      // Sort images. Show highest tipped images first
      // this.setState({
      //   images: this.state.images.sort((a, b) => b.tipAmount - a.tipAmount),
      // });
      setImages(images.sort((a, b) => b.tipAmount - a.tipAmount));
      // this.setState({ loading: false });
      setLoading(false);
    } else {
      window.alert("Melomania contract not deployed to detected network.");
    }
  }

  const captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);

    reader.onloadend = () => {
      // this.setState({ buffer: Buffer(reader.result) });
      setBuffer(Buffer(reader.result));
      console.log("buffer", buffer);
    };
  };

  const uploadImage = (description) => {
    console.log("Submitting file to ipfs...");

    //adding file to the IPFS
    ipfs.add(buffer, (error, result) => {
      console.log("Ipfs result", result);
      if (error) {
        console.error(error);
        return;
      }

      // this.setState({ loading: true });
      setLoading(true);
      web3me.methods
        .uploadImage(result[0].hash, description)
        .send({ from: account })
        .on("transactionHash", (hash) => {
          // this.setState({ loading: false });
          setLoading(false);
          window.location.reload();
        });
    });
  };

  const tipImageOwner = (id, tipAmount) => {
    // this.setState({ loading: true });
    setLoading(true);
    web3me.methods
      .tipImageOwner(id)
      .send({ from: account, value: tipAmount })
      .on("transactionHash", (hash) => {
        // this.setState({ loading: false });
        setLoading(false);
        window.location.reload();
      });
  };

  const likeImage = (id, likeCount) => {
    // this.setState({ loading: true });
    setLoading(true);
    web3me.methods
      .likeImage(id)
      .send({ from: account, value: likeCount })
      .on("transactionHash", (hash) => {
        // this.setState({ loading: false });
        setLoading(false);
        window.location.reload();
      });
  };
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
                  className="w-full"
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
                    class="btn btn-info btn-outline"
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
                    class="btn btn-info btn-outline"
                  >
                    Web3.js
                  </button>
                  <button
                    onClick={() => {
                      window.open("https://ipfs.io");
                    }}
                    class="btn btn-info btn-outline"
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
                    class="btn btn-info btn-outline"
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center mt-4">
          <h1 className="flex text-3xl mt-2 mb-2">
            created by Christopher Abdo &nbsp;
            <AiFillGithub
              onClick={() => {
                window.open("https://github.com/ChrisAbdo");
              }}
              className="cursor-pointer hover:text-white"
            />
            &nbsp;
            <AiFillLinkedin
              onClick={() => {
                window.open("https://www.linkedin.com/in/christopher-abdo/");
              }}
              className="cursor-pointer hover:text-white"
            />
            &nbsp;
            <BsTwitter
              onClick={() => {
                window.open("https://www.twitter.com/melomania_eth");
              }}
              className="cursor-pointer hover:text-white"
            />
          </h1>

          <button
            onClick={async () => {
              const web3 = window.web3;
              const accounts = await web3.eth.getAccounts();
              setAccount(accounts[0]);
              console.log(accounts[0] + " is the account");
              const sendTx = await web3.eth.sendTransaction({
                from: accounts[0],
                to: "0x177dD05aCAfC44E39ebC441bcbEca02CB00eBc17",
                value: web3.utils.toWei(
                  prompt("How much ETH would you like to tip"),
                  "ether"
                ),
                gas: "1000000",
              });
              console.log(sendTx);
            }}
            class="btn btn-info btn-outline"
          >
            "Stake" me a coffee
          </button>
        </div>
      </div>
    </div>
  );
}
