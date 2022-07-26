import { useState } from "react";
import { create } from "ipfs-http-client";
import { Contact } from "@prisma/client";
import { useForm } from "react-hook-form";

const client = create("https://ipfs.infura.io:5001/api/v0");

function App() {
  function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
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
  const [fileUrl, updateFileUrl] = useState(``);
  const [fileUrl1, updateFileUrl1] = useState(``);
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
      var el_down = document.getElementById("helloWorld");
      var inputF = document.getElementById("id1");
      inputF.value = el_down.innerText;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function onChange1(e) {
    const file1 = e.target.files[0];
    try {
      const added1 = await client.add(file1);
      const url1 = `https://ipfs.infura.io/ipfs/${added1.path}`;
      updateFileUrl1(url1);
      var el_down1 = document.getElementById("helloWorld1");
      var inputF1 = document.getElementById("id2");
      inputF1.value = el_down1.innerText;
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  const { register, handleSubmit, errors } = useForm();
  return (
    <div className=" p-4 border-b border-gray-500">
      <link
        href="https://cdn.jsdelivr.net/npm/@tailwindcss/custom-forms@0.2.1/dist/custom-forms.css"
        rel="stylesheet"
      />

      <div className=" mb-2">
        <h1>Upload Avatar to IPFS.</h1>
      </div>
      <div>
        {/* <input type="file" onChange={onChange} /> */}
        <button type="file" className="btn btn-outline btn-info">
          <input
            type="file"
            onChange={onChange}
            className="custom-file-input"
            id="customFile"
          />
        </button>
        {fileUrl && (
          <h1 className="opacity-0" id="helloWorld">
            {fileUrl}
          </h1>
        )}
        {/* <input
          placeholder="Link to resume"
          disabled
          id="id2"
          name="email"
          className="input input-bordered w-full max-w-xs mb-4 text-white input-info"
          ref={register({ required: true })}
        /> */}
      </div>

      <div className=" mt-2 mb-2">
        <h1>Upload Resume to IPFS.</h1>
      </div>
      <div className="">
        <button type="file" className="btn btn-outline btn-info">
          <input type="file" onChange={onChange1} />
        </button>
        {fileUrl1 && (
          <h1 className="opacity-0" id="helloWorld1">
            {fileUrl1}
          </h1>
        )}
        {/* <input
          placeholder="Link to avatar"
          disabled
          id="id1"
          name="avatar"
          className="input input-bordered w-full max-w-xs mb-4 text-white input-info"
          ref={register({ required: true })}
        /> */}
      </div>
    </div>
  );
}

export default App;
