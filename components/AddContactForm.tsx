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
    <div>
      <div>
        
      </div>
    <form className=" flex flex-col" onSubmit={handleSubmit(props.onSubmit)}>
      <InputSpacer>
        <InputTS
          placeholder="First Name"
          name="firstName"
          formRef={register({ required: true })}
        />
        {errors.firstName && (
          <FormError errorMessage="First Name is required" />
        )}
      </InputSpacer>
      <InputSpacer>
        <InputTS
          placeholder="Last Name"
          name="lastName"
          formRef={register({ required: true })}
        />
        {errors.lastName && <FormError errorMessage="Last Name is required" />}
      </InputSpacer>
      <InputSpacer>
        <input
          placeholder="Email"
          name="email"
          className='rounded p-4 text-xl w-full'
          ref={register({ required: true })}
        />
        {errors.email && <FormError errorMessage="Email is required" />}
      </InputSpacer>
      {/* <InputSpacer>
        <input
          placeholder="Age"
          name="age"
          className='rounded p-4 text-xl w-full'
          ref={register({ required: true })}
        />
        {errors.age && <FormError errorMessage="Age is required" />}
      </InputSpacer> */}

      <InputSpacer>
          
        <input
          id='id1'
          placeholder="Avatar"
          className="rounded p-4 text-xl w-full"
          name="avatar"
          ref={register({ required: true })}
        />
        {errors.avatar && <FormError errorMessage="Avatar is required" />}
      </InputSpacer>
      <div
        className="cursor-pointer bg-blue-500 rounded-md mb-2 p-4 text-blue-100 text-center"
        onClick={() => {
          var el_down = (document.getElementById('helloWorld') as HTMLElement);
          var inputF = (document.getElementById('id1') as HTMLInputElement);
          inputF.value = el_down.innerText;
          }
        }
        
      >
        FetchURL
      </div>
      <button
        className="bg-blue-500 rounded-md p-4 text-blue-100"
        type="submit"
      >
        Submit
      </button>
    </form>
    </div>
  );
}
