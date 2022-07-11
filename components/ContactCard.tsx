import { Contact } from '@prisma/client';
import Image from 'next/image';

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard(props: ContactCardProps) {
 
  
  return (
    <div>
      
    <ul id="myUL" className="border rounded-lg p-4 flex">
      
      <li><div className="my-auto" id="myUL">
        <Image
          src={props.contact.avatar}
          alt="Avatar"
          width={100}
          height={100}
          className="rounded-full"
        />
      </div></li>
      <li><div className="ml-4">
        <p className="text-xl text-gray-700">
          {props.contact.firstName} 
        </p>
        <p className="text-xl text-gray-700">
          {props.contact.lastName}
        </p>
        <p className="text-gray-500">{props.contact.email}</p>
        
      </div>
      </li>
    </ul>
    </div>
  );
}
