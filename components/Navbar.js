import { useState, useEffect } from "react";
import Web3 from "web3";

const Navbar = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }, []);

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
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    console.log(accounts[0]);
  }
  return (
    <div class="navbar bg-base-100 border-b border-gray-500">
      <div class="flex-1">
        <a class="btn btn-info btn-outline normal-case text-xl">Web3.Me</a>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-bordered"
          />
        </div>
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              {/* <img src="https://avatars.dicebear.com/api/human/john.svg?background=%230000ff" /> */}
              {/* make the image source avatar.dicebear but the seed is the account name */}
              <img
                src={`https://avatars.dicebear.com/api/human/${account}.svg?background=%230000ff`}
              />
            </div>
          </label>
          <ul
            tabindex="0"
            class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 border"
          >
            <li className="border-b">
              <a class="justify-between">
                Account: {account.substring(0, 5)}...{account.substring(38, 42)}
              </a>
            </li>
            <li className="border-b">
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
