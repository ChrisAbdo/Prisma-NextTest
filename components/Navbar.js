import { useState, useEffect } from "react";
import Web3 from "web3";
import Link from "next/link";

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

  function filterSearch() {
    var input, filter, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();

    li = document.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  return (
    <div class="navbar bg-base-100 border-b border-gray-500">
      <div class="flex-1">
        <div class="dropdown">
          <label tabindex="0" class="btn btn-outline btn-info m-1">
            Web3.Me
          </label>
          <ul
            tabindex="0"
            class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52"
          >
            <Link href="/">
              <li>
                <a>Home</a>
              </li>
            </Link>
            <Link href="/about">
              <li>
                <a>About</a>
              </li>
            </Link>
            <Link href="/help">
              <li>
                <a>Help</a>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div class="flex-none gap-2">
        <div class="form-control">
          <input
            type="text"
            placeholder="Search"
            class="input input-info input-bordered "
            onKeyUp={filterSearch}
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
            <li onClick={() => setAccount("")}>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
