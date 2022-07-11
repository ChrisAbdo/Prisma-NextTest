import { useState } from "react";
import { create } from "ipfs-http-client";

const client = create("https://ipfs.infura.io:5001/api/v0");

function App() {
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
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost normal-case text-xl">Web3.Me</a>
      </div>
      <div class="flex-1">
        <input type="file" onChange={onChange} />
        {fileUrl && (
          <div>
            <a
              class="btn btn-ghost normal-case text-xl"
              target="_blank"
              href={fileUrl}
            >
              View
            </a>
            <h1 class="opacity-0" id="helloWorld">
              {fileUrl}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
