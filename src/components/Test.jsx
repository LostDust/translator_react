import React, { useState } from "react";

function Test() {
  // const [info, setInfo] = useState({
  //   title: "hahaha",
  //   content: "hehehe"
  // });
  const [info, setInfo] = useState(0);
  const target = {
    title: "haefff",
    content: "gggghe"
  };

  return (
    <section>
      <p>{info}</p>
      <button
        onClick={() => {
          setInfo(info + 1);
        }}
      >Click</button>
    </section>
  );
}

export default Test;
