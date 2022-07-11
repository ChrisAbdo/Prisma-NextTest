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
          className="rounded p-4 text-xl w-full"
          name="firstName"
          ref={register({ required: true })}
        />
        {errors.firstName && (
          <FormError errorMessage="First Name is required" />
        )}
      </InputSpacer>
      <InputSpacer>
        <input
          placeholder="Name (Optional - put NA)"
          name="lastName"
          className="rounded p-4 text-xl w-full mb-12"
          ref={register({ required: true })}
        />
        {errors.lastName && <FormError errorMessage="Last Name is required" />}
      </InputSpacer>
      <InputSpacer>
          
        <input
          placeholder="Link to resume"
          id='id2'
          name="email"
          className='rounded p-4 text-xl w-full'
          ref={register({ required: true })}
        />
        {/* <div
        className="cursor-pointer bg-blue-500 rounded-md mt-2 mb-2 p-4 text-blue-100 text-center"
        onClick={() => {
          var el_down1 = (document.getElementById('helloWorld1') as HTMLElement);
          var inputF1 = (document.getElementById('id2') as HTMLInputElement);
          inputF1.value = el_down1.innerText;
          }
        }
        
      >
        FetchURL RESUME
      </div> */}
      <button onClick={() => {
          var el_down1 = (document.getElementById('helloWorld1') as HTMLElement);
          var inputF1 = (document.getElementById('id2') as HTMLInputElement);
          inputF1.value = el_down1.innerText;
          }
        } className="btn btn-info mt-2 w-full">FetchURL RESUME</button>

        {errors.email && <FormError errorMessage="Email is required" />}
      </InputSpacer>
      

      <InputSpacer>
          
        <input
          id='id1'
          placeholder="Avatar"
          className="rounded p-4 text-xl w-full"
          name="avatar"
          ref={register({ required: true })}
        />
        
      </InputSpacer>
      <div
        className="btn btn-info mb-12 w-full"
        onClick={() => {
          var el_down = (document.getElementById('helloWorld') as HTMLElement);
          var inputF = (document.getElementById('id1') as HTMLInputElement);
          inputF.value = el_down.innerText;
          }
        }
        
      >
        FetchURL AVATAR
      </div>
      <button
         className="btn btn-info text-white"
        type="submit"
      >
        Submit
      </button>
    </form>
    </div>
  );
}
