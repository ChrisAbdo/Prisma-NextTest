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
  return (
    <div className="">
      <div>
        
      </div>
    <form className=" flex flex-col" onSubmit={handleSubmit(props.onSubmit)}>
      <InputSpacer>
        <input
          placeholder="Wallet Address"
          className="input input-bordered w-full max-w-xs text-white input-info"
          name="firstName"
          ref={register({ required: true })}
        />
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
        
        </select>
        {errors.role && (
          <FormError errorMessage="First Name is required" />
        )}
      </InputSpacer>


          <InputSpacer>
          <textarea className="textarea textarea-info max-w-xs w-full" placeholder="Bio"></textarea>
          </InputSpacer>


      <InputSpacer>
      <button onClick={() => {
          var el_down1 = (document.getElementById('helloWorld1') as HTMLElement);
          var inputF1 = (document.getElementById('id2') as HTMLInputElement);
          inputF1.value = el_down1.innerText;
          }
        } className="btn btn-info btn-outline mt-2 mb-3 w-full">FetchURL RESUME</button>
        <input
          placeholder="Link to resume"
          id='id2'
          name="email"
          className='input input-bordered w-full max-w-xs text-white input-info'
          ref={register({ required: true })}
        />
        
      

        {errors.email && <FormError errorMessage="RESUME is required" />}
      </InputSpacer>
      

      <InputSpacer>
      <button
        className="btn btn-info mb-3 w-full btn-outline"
        onClick={() => {
          var el_down = (document.getElementById('helloWorld') as HTMLElement);
          var inputF = (document.getElementById('id1') as HTMLInputElement);
          inputF.value = el_down.innerText;
          }
        }
        
      >
        FetchURL AVATAR
      </button>
        <input
          id='id1'
          placeholder="Link to Avatar"
          className="input input-bordered w-full max-w-xs text-white input-info"
          name="avatar"
          ref={register({ required: true })}
        />
        
      </InputSpacer>
      
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
