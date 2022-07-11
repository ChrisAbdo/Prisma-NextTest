import { Contact } from '@prisma/client';
import Image from 'next/image';

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard(props: ContactCardProps) {
 
  return (
      
        <li className="mt-2 border rounded-lg p-4 flex my-auto">

          <div className="text-2xl ">
            <Image
              src={props.contact.avatar}
              alt="Avatar"
              width={100}
              height={100}
             />
            {props.contact.firstName}
            </div>
            <a
              href=''
            >{props.contact.email}</a>
        </li>
        
  );
}
