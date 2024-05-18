import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [number_allow, setNumber_allow] = useState(false);
  const [character_allow, setCharacter_allow] = useState(false);
  const [password, setPassword] = useState("");
  const [copy, setCopy] = useState("copy");

  //  use ref

  let passwordRef = useRef(null);

  const copyPassword = useCallback(() => {
    setCopy("copied");

    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 3);

    window.navigator.clipboard.writeText(password);
  }, [password, setCopy]);

  //

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (number_allow) str += "0123456789";

    if (character_allow) str += "!@#$%&*?";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, number_allow, character_allow, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, number_allow, character_allow, passwordGenerator]);
  return (
    <>
      <div className="w-[100vw] h-[100vh] bg-zinc-500 flex-cols space-y-10 pl-[32%]">
        <h1 className="font-bold text-4xl text-zinc-100 pl-10">
          PassWord Generator
        </h1>

        <div className="flex">
          <input
            type="text"
            value={password}
            readOnly
            className="w-[60%] h-[50px] border-none rounded-lg rounded-r-none overflow-hidden pl-6 shadow-2xl outline-none"
            ref={passwordRef}
          />
          <button
            className="px-6 py-3 bg-blue-600 overflow-hidden rounded-lg rounded-l-none border-none font-bold"
            onClick={copyPassword}
          >
            {copy}
          </button>
        </div>

        <div className="flex gap-4">
          <label htmlFor="length" className="font-bold text-xl">
            Length :{length}{" "}
          </label>
          <input
            type="range"
            id="length"
            min={6}
            max={100}
            value={length}
            className=""
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />

          <label htmlFor="num" className="font-bold">
            Number
          </label>
          <input
            type="checkbox"
            defaultChecked={number_allow}
            onChange={() => {
              setNumber_allow((prev) => !prev);
            }}
            id="num"
          />

          <label htmlFor="char" className="font-bold">
            Character
          </label>
          <input
            type="checkbox"
            defaultChecked={character_allow}
            id="char"
            onChange={() => {
              setCharacter_allow((pre) => !pre);
            }}
          />
        </div>
      </div>
    </>
  );
}

export default App;
