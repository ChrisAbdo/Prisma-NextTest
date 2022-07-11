import { useState } from "react";
import { create } from "ipfs-http-client";
import { Contact } from "@prisma/client";

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
  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      updateFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  return (
    <div className="p-4">
      <div className="text-center mb-2">
        <h1>
          Upload Resume to IPFS. Press FetchURL in the form to auto pull the
          link
        </h1>
      </div>
      <div className="text-center">
        <input type="file" onChange={onChange} />
        {fileUrl && <h1 id="helloWorld">{fileUrl}</h1>}
      </div>

      {/* <ul id="myUL">
        <li>
          <a href="#"></a>
        </li>
        <li>
          <a href="#">Agnes</a>
        </li>

        <li>
          <a href="#">Billy</a>
        </li>
        <li>
          <a href="#">Bob</a>
        </li>

        <li>
          <a href="#">Calvin</a>
        </li>
        <li>
          <a href="#">Christina</a>
        </li>
        <li>
          <a href="#">Cindy</a>
        </li>
      </ul> */}
    </div>
  );
}

export default App;
