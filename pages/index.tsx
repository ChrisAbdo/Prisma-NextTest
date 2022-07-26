import { useState, useEffect } from 'react';
import Head from 'next/head';
import AddContactForm from './../components/AddContactForm';
import ContactCard from './../components/ContactCard';
import Web3 from 'web3';

import styles from '../styles/Index.module.css'

import { PrismaClient, Contact, Prisma } from '@prisma/client';
import { ChakraProvider } from '@chakra-ui/react'


import App from '../components/Upload';
import Navbar from '../components/Navbar';
import Search from '../components/Search';

const prisma = new PrismaClient();

export async function getServerSideProps() {
  const contacts: Contact[] = await prisma.contact.findMany();
  return {
    props: {
      initialContacts: contacts
    }
  };
}

async function saveContact(contact: Prisma.ContactCreateInput) {
  const response = await fetch('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(contact)
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default function Index({ initialContacts }) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [account, setAccount] = useState('')
  const [connected, setConnected] = useState(false)

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
    var input, filter,  li, a, i, txtValue;
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

  function sortByRole(){
    // set the input field value to  id='role1'
    var el_down2 = (document.getElementById('role1') as HTMLElement);
    var inputF2 = (document.getElementById('myInput') as HTMLInputElement);
    // inputF2.value = el_down2.innerText;
    // replace it letter by letter
    var i = 0;
    var timer = setInterval(function() {
      if (i < el_down2.innerText.length) {
        inputF2.value += el_down2.innerText[i];
        i++;
      } else {
        clearInterval(timer);
      }
    }
    , 100);
  }

  
    
  return (
    <>
      <Head>
        <title>Contacts App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link href="https://cdn.jsdelivr.net/npm/daisyui@2.19.0/dist/full.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.tailwindcss.com"></script>
<script src="../path/to/flowbite/dist/flowbite.js"></script>
<script src="./TW-ELEMENTS-PATH/dist/js/index.min.js"></script>
<link
          href="https://fonts.googleapis.com/css2?family=Comforter&family=Poppins:wght@300&family=Supermercado+One&display=swap"
          rel="stylesheet"
        />


      </Head>

    {/* if users wallet address is null, load a h1 that says connect to wallet */}
    {account === '' ? (
      <h1>Connect to wallet</h1>
    ) : (
      <div className={styles.homeText}>
        



      <Navbar />
      <Search />
      <div className="flex">
        <section className="w-1/3 border-r border-gray-500  p-4 ">
          <div className="mb-3">
            <h2 className="text-3xl text-white">Upload your credentials</h2>
          </div>
          <AddContactForm 
            onSubmit={async (data, e) => {
              try {
                await saveContact(data);
                setContacts([...contacts, data]);
                e.target.reset();
              } catch (err) {
                console.log(err);
              }
            }}
          />
        </section>
        <section className="w-2/3 h-screen p-4">
          <div className="mb-3 ml-4">
            <h2 className="text-3xl text-white">buidlers</h2>
          </div>
          <input
        type="text"
        id="myInput"
        onKeyUp={filterSearch}
        placeholder="Search wallet addresses..."
        title="Type in a name"
        className="input input-bordered input-info w-full max-w-sm ml-4 z-10"
      />
          
          {contacts.map((c, i: number) => (
              <ContactCard contact={c} key={i}/>
        
            
          ))}
        </section>
        <section className="w-3/3 border-l border-gray-500  p-4 ">
          <div className="mb-3">
            <h2 className="text-3xl text-white">Sort by category</h2>
          </div>
          <div className="flex flex-col">
          <div className="cursor-pointer badge badge-success mb-2" id='role1'
          onClick={sortByRole}>front end </div>
          <div className="cursor-pointer badge badge-info mb-2">back end </div>
          <div className="cursor-pointer badge badge-secondary mb-2">full stack </div>
          <div className="cursor-pointer badge badge-accent mb-2">smart contract </div>
          <div className="cursor-pointer badge badge-ghost mb-2">community manager</div>
        </div>
        </section>
      </div> 

        
    </div>
    )}
    </>
  );
}

