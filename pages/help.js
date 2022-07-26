import React from "react";
import Navbar from "../components/Navbar";

const help = () => {
  return (
    <div>
      <>
        <link
          href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/daisyui@2.19.0/dist/full.css"
          rel="stylesheet"
          type="text/css"
        />
        <script src="https://cdn.tailwindcss.com"></script>
      </>
      <Navbar />
      <h1>Help</h1>
    </div>
  );
};

export default help;
