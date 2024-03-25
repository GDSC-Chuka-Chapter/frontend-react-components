import { useState, useRef, useEffect } from "react";

const RegisterDetails = () => {
  const [firsName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [nationality, setNationality] = useState("");
  const firstNameDivRef = useRef(null);
  const lastNameDivRef = useRef(null);
  const birthDateDivRef = useRef(null);
  const nationalityDivRef = useRef(null);

  useEffect(() => {
    document.title = "Ablaze Study Abroad | Register";
    firstNameDivRef.current.children[1].addEventListener("focusin", () => {
      firstNameDivRef.current.firstChild.className =
        "text-gray-400 absolute z-0 hover:cursor-text top-[-1.5rem] text-sm duration-300 ml-2";
    });
    firstNameDivRef.current.children[1].addEventListener("focusout", () => {
      if (firstNameDivRef.current.children[1].value === "") {
        firstNameDivRef.current.firstChild.className =
          "text-gray-400 absolute z-0 hover:cursor-text ml-2";
      }
    });
  }, []);

  return (
    <div>
      <div className="relative mb-16 w-full bg-red-400" ref={firstNameDivRef}>
        <label
          htmlFor="email"
          className="text-gray-400 absolute z-0 hover:cursor-text ml-2"
        >
          FirstName
        </label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          onChange={(e) => {
            setFirsName(e.target.value);
          }}
          className="focus:outline-none border-b border-b-gray-400 w-full z-10 px-2"
        />
        <div className="text-center bg-quiet shadow-lg shadow-gray-400 text-logo-red relative mt-3 hidden">
          <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl bg-quiet z-[-10]"></span>
          <p></p>
        </div>
      </div>
      <div className="w-full flex justify-between gap-4 sm:px-8 md:px-4 bg-red-200 items-end text-blue-800">
        <a href="/login" className="underline">
          Sign into your Account
        </a>
        <div className="flex gap-x-2 items-end">
          <p>Or Sign up with </p>
          <a href="#">
            <img src="icons/google.svg" alt="eye icon" className="w-8 h-auto" />
          </a>
          <a href="#">
            <img
              src="icons/facebook.svg"
              alt="eye icon"
              className="w-auto h-8"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default RegisterDetails;
