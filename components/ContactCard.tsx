import { Contact } from '@prisma/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


interface ContactCardProps {
  contact: Contact;
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ContactCard(props: ContactCardProps) {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

 async function setCorrectRoles(){
  if(document.getElementById("roleSelect") != null){
  // if(document.getElementById('roleSelect').innerHTML === 'Full Stack'){
  //   document.getElementById('roleSelect').className = 'badge badge-secondary'
  // } 
  // make this apply for every instance of the role
  for(let i = 0; i < document.getElementsByClassName('roleSelect').length; i++){
    if(document.getElementsByClassName('roleSelect')[i].innerHTML === 'Front End'){
      document.getElementsByClassName('roleSelect')[i].className = 'badge badge-success'
    } else
    if(document.getElementsByClassName('roleSelect')[i].innerHTML === 'Back End'){
      document.getElementsByClassName('roleSelect')[i].className = 'badge badge-info'
    } else
    if(document.getElementsByClassName('roleSelect')[i].innerHTML === 'Full Stack'){
      document.getElementsByClassName('roleSelect')[i].className = 'badge badge-secondary'
    } else
    if(document.getElementsByClassName('roleSelect')[i].innerHTML === 'Smart Contract'){
      document.getElementsByClassName('roleSelect')[i].className = 'badge badge-accent'
    }
    else
    if(document.getElementsByClassName('roleSelect')[i].innerHTML === 'Community Manager'){
      document.getElementsByClassName('roleSelect')[i].className = 'badge badge-ghost'
    }

  }}
 

 }
  useEffect(() => {
    setCorrectRoles();
  }
  , [])
  return (
      
        <li className="mt-2  rounded-lg p-4 flex ">

<a className="card w-96 bg-base-100 border border-gray-500 shadow-xl">
  <figure className="mt-4"><Image
              src={props.contact.avatar}
              alt="Avatar"
              width={150}
              height={150}
              className="rounded-full"
             /></figure>
  <div className="card-body">
    <h2 className="card-title text-sm">
      {props.contact.firstName} 
      
    </h2>
    <div id='roleSelect' className="roleSelect badge badge-primary">{props.contact.role}</div>
    <h3 className="card-subtitle text-sm">
      <b>AKA:</b> {props.contact.lastName}
    </h3>
    <p className="card-text text-sm">
      {props.contact.bio.substring(0, 223).concat('...')}
    </p>
    {/* <a target="_blank" href={props.contact.portfolio} className="card-text text-sm">
      {props.contact.portfolio}
    </a> */}

<button className="btn btn-info btn-outline max-w-xs" onClick={handleOpen}>bio / profile</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1 id="transition-modal-title" >
              {props.contact.firstName} {props.contact.lastName}
            </h1>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {props.contact.bio}
            </Typography>
          </Box>
        </Fade>
      </Modal>

    <button
    onClick={() => {
      // open window with {props.contact.email} as url
      window.open(props.contact.email);
    }
    }
    className="btn btn-info btn-outline">View Resume</button>

<button
    onClick={() => {
      // open window with {props.contact.email} as url
      window.open(props.contact.portfolio);
    }
    }
    className="btn btn-info btn-outline">Open Portfolio</button>

      


  </div>
</a>
        </li>
        
  );
}
