import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import InputTS from './Input';
import InputSpacer from './InputSpacer';
import App from './Upload'

const FormError = ({ errorMessage }) => {
  return <p className="text-red-300 mt-1">{errorMessage}</p>;
};

interface AddContactFormProps {
  onSubmit: any;
}

export default function AddContactForm(props: AddContactFormProps) {
  const { register, handleSubmit, errors } = useForm();
  const [account, setAccount] = useState('')

  async function loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    
  }

  useEffect(() => {
    loadBlockchainData();
  }
  , []);

  return (
    <div className="">
      <div>
        
      </div>
    <form className=" flex flex-col" onSubmit={handleSubmit(props.onSubmit)}>
      <InputSpacer>
      <div className="form-control">
  <div className="input-group input-rounded">
        <input
          placeholder="Wallet Address"
          className="input input-bordered w-full max-w-xs text-white input-info"
          name="firstName"
          id='walletAddress'
          ref={register({ required: true })}
        />
        <button className="btn btn-square" onClick={() => {
          // get accounts [0] and replace id='walletAddress' with it
          (document.getElementById('walletAddress') as HTMLInputElement).value = account;
          console.log(account)
          

        }}>
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
    </button>
        </div>
        </div>
        {errors.firstName && (
          <FormError errorMessage="WALLET ADDRESS is required" />
        )}
      </InputSpacer>
      
      <InputSpacer>
        <input
          placeholder="Name (Optional - put NA)"
          name="lastName"
          className="input input-bordered w-full max-w-xs  input-info"
          ref={register({ required: true })}
        />
        {errors.lastName && <FormError errorMessage="NAME is required" />}
      </InputSpacer>

      <InputSpacer>
        
        <select ref={register({ required: true })} name="role" className="select select-info w-full max-w-xs">
          <option disabled selected>Select role</option>
          <option>Front End</option>
          <option>Back End</option>
          <option>Full Stack</option>
          <option>Smart Contract</option>
          <option>Community Manager</option>
        
        </select>
        {errors.role && (
          <FormError errorMessage="First Name is required" />
        )}
      </InputSpacer>


          <InputSpacer>
            <textarea name="bio" ref={register({ required: true })} className="textarea textarea-info max-w-xs w-full" placeholder="Enter a quick Bio"></textarea>
            {errors.bio && <FormError errorMessage="Bio is required" />}
          </InputSpacer>

          <InputSpacer>
        <input
          placeholder="Portfolio Link (Optional)"
          name="portfolio"
          className="input input-bordered w-full max-w-xs  input-info"
          ref={register({ required: true })}
        />
        {errors.portfolio && <FormError errorMessage="PORTFOLIO is required" />}
      </InputSpacer>






      <App />


      {/* <InputSpacer>
      <button onClick={() => {
          var el_down1 = (document.getElementById('helloWorld1') as HTMLElement);
          var inputF1 = (document.getElementById('id2') as HTMLInputElement);
          inputF1.value = el_down1.innerText;
          }
        } className="btn btn-info btn-outline mt-2 mb-3 max-w-xs">FetchURL RESUME</button> */}
        <input
          id='id1'
          placeholder="Link to Avatar"
          className="input input-bordered w-full max-w-xs text-white input-info mt-4"
          name="avatar"
          
          ref={register({ required: true })}
        />
        <input
          placeholder="Link to resume"
          id='id2'
          name="email"
          className='input input-bordered w-full max-w-xs mt-4 text-white input-info'
          ref={register({ required: true })}
          
        />
        
      

        {/* {errors.email && <FormError errorMessage="RESUME is required" />}
      </InputSpacer>
      
      <InputSpacer>
      <button
        className="btn btn-info mb-3 max-w-xs btn-outline"
        onClick={() => {
          var el_down = (document.getElementById('helloWorld') as HTMLElement);
          var inputF = (document.getElementById('id1') as HTMLInputElement);
          inputF.value = el_down.innerText;
          }
        }
        
      >
        FetchURL AVATAR
      </button> */}
        
      {/* </InputSpacer> */}

      





      
      <button
         className="btn btn-info text-white mt-12"
        type="submit"
      >
        Submit
      </button>
    </form>
    </div>
  );
}
