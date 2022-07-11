import React from "react";

const Search = () => {
  function myFunction() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    // li = ul.document.getElementsByTagName("li");
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
  return (
    <div>
      <input
        type="text"
        id="myInput"
        onKeyUp={myFunction}
        placeholder="Search for names.."
        title="Type in a name"
      ></input>
    </div>
  );
};

export default Search;
