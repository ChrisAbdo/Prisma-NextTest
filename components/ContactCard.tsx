import { Contact } from '@prisma/client';
import Image from 'next/image';

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard(props: ContactCardProps) {
 
  return (
      
        <li className="mt-2  rounded-lg p-4 flex ">

<a className="card w-96 bg-base-100 border shadow-xl">
  <figure><Image
              src={props.contact.avatar}
              alt="Avatar"
              width={100}
              height={100}
             /></figure>
  <div className="card-body">
    <h2 className="card-title text-sm">
      {props.contact.firstName} 
      
    </h2>
    <div className="badge badge-primary">AKA</div>
    <h3 className="card-subtitle text-sm">
      {props.contact.lastName}
    </h3>

    <button
    onClick={() => {
      // open window with {props.contact.email} as url
      window.open(props.contact.email);
    }
    }
    className="btn">View Resume</button>
    {/* <div className="card-actions justify-end">
      <div className="badge badge-outline">Fashion</div> 
      <div className="badge badge-outline">Products</div>
    </div> */}
  </div>
</a>
        </li>
        
  );
}
