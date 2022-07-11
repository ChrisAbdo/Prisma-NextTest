import { useState, useEffect } from 'react';
import Head from 'next/head';
import AddContactForm from './../components/AddContactForm';
import ContactCard from './../components/ContactCard';
import Web3 from 'web3';

import { PrismaClient, Contact, Prisma } from '@prisma/client';

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

  useEffect(() => {
    loadWeb3();
    loadBlockchainData();
  }
  , [])

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

  function myFunction() {
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
      </Head>

    {/* load a different page before this one */}
    

      <Navbar />
      <App />
      <Search />
      <div className="flex">
        <section className="w-1/3 bg-gray-800 h-screen p-8">
          <div className="mb-3">
            <h2 className="text-3xl text-white">Upload your credentials :)</h2>
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
        <section className="w-2/3 h-screen p-8">
          <div className="mb-3">
            <h2 className="text-3xl text-gray-700">Contacts</h2>
          </div>
          <input
        type="text"
        id="myInput"
        onKeyUp={myFunction}
        placeholder="Search for names.."
        title="Type in a name"
      />
          
          {/* create a search function that filters specific contacts relating to input*/}
          {contacts.map((c, i: number) => (
              <ContactCard contact={c} key={i}/>
        
            
          ))}
        </section>
      </div>
    </>
  );
}

