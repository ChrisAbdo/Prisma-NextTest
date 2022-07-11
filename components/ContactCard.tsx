import { Contact } from '@prisma/client';
import Image from 'next/image';

interface ContactCardProps {
  contact: Contact;
}

export default function ContactCard(props: ContactCardProps) {
 
  return (
      
        <li>
          <a href="#">{props.contact.firstName} {props.contact.lastName}</a>

        </li>
        
  );
}
