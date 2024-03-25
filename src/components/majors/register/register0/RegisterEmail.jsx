import { useState, useRef, useEffect } from "react";

const RegisterEmail = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const passwordInputDivRef = useRef(null);
  const confirmPasswordInputDivRef = useRef(null);
  const emailInputDivRef = useRef(null);
  const numberInputDivRef = useRef(null);
  const registerButtonRef = useRef(null);

  const passwordPattern1 = /[0-9]+/;
  const passwordPattern3 = /[^a-zA-z0-9]+/;
  const passwordLength = 8;
  const emailPattern = /^[a-zA-Z][\S]+@[a-zA-Z]+\.[\S]{2,}$/;
  const numberPattern = /^[\+][0-9]{11,}$/;

  const validateEmail = (currentEmail) => {
    let isEmailValid = false;
    emailInputDivRef.current.lastChild.classList.remove("hidden");
    emailInputDivRef.current.lastChild.lastChild.textContent = "";
    if (currentEmail === "") {
      emailInputDivRef.current.lastChild.lastChild.textContent =
        "Email is required";
    } else if (!emailPattern.test(currentEmail)) {
      emailInputDivRef.current.lastChild.lastChild.textContent =
        "Invalid email address";
    } else {
      emailInputDivRef.current.lastChild.classList.add("hidden");
      numberInputDivRef.current.children[1].disabled = false;
      isEmailValid = true;
      setEmail(currentEmail);
    }
    return isEmailValid;
  };

  const validateNumber = (currentNumber) => {
    let isNumberValid = false;
    numberInputDivRef.current.lastChild.classList.remove("hidden");
    numberInputDivRef.current.lastChild.lastChild.textContent = "";
    if (currentNumber === "") {
      numberInputDivRef.current.lastChild.lastChild.textContent =
        "Phone number is required";
    } else if (!numberPattern.test(currentNumber)) {
      numberInputDivRef.current.lastChild.lastChild.textContent =
        "Phone number should start with + and contain at least 11 digits";
    } else {
      numberInputDivRef.current.lastChild.classList.add("hidden");
      passwordInputDivRef.current.children[2].disabled = false;
      isNumberValid = true;
      setNumber(currentNumber);
    }
    return isNumberValid;
  };

  const validatePassword = (currentPassword) => {
    let isPasswordValid = false;
    passwordInputDivRef.current.lastChild.classList.remove("hidden");
    passwordInputDivRef.current.lastChild.lastChild.textContent = "";
    if (currentPassword === "") {
      passwordInputDivRef.current.lastChild.lastChild.textContent =
        "Password is required";
    } else if (currentPassword.length < passwordLength) {
      passwordInputDivRef.current.lastChild.lastChild.textContent =
        "Password should be at least 8 characters";
    } else if (!passwordPattern1.test(currentPassword)) {
      passwordInputDivRef.current.lastChild.lastChild.textContent =
        "Password should contain at least one number";
    } else if (!passwordPattern3.test(currentPassword)) {
      passwordInputDivRef.current.lastChild.lastChild.textContent =
        "Password should contain special characters like (“$%&/?.,:;*+)";
    } else {
      passwordInputDivRef.current.lastChild.classList.add("hidden");
      confirmPasswordInputDivRef.current.children[2].disabled = false;
      isPasswordValid = true;
      setPassword(currentPassword);
    }
    return isPasswordValid;
  };

  const validateConfirmPassword = (currentPassword, currentConfirmPassword) => {
    let doPasswordsMatch = false;
    confirmPasswordInputDivRef.current.lastChild.classList.remove("hidden");
    confirmPasswordInputDivRef.current.lastChild.lastChild.textContent = "";
    if (currentConfirmPassword === "") {
      confirmPasswordInputDivRef.current.lastChild.lastChild.textContent =
        "Password is required";
    } else if (currentConfirmPassword !== currentPassword) {
      confirmPasswordInputDivRef.current.lastChild.lastChild.textContent =
        "Password do not match";
    } else {
      confirmPasswordInputDivRef.current.lastChild.classList.add("hidden");
      registerButtonRef.current.disabled = false;
      registerButtonRef.current.className =
        "bg-blue-1 py-2 px-12 text-white sm:py-3 sm:px-12";
      doPasswordsMatch = true;

      setConfirmPassword(currentConfirmPassword);
    }
    return doPasswordsMatch;
  };

  const handleRegister = () => {
    console.log(email, number, password, confirmPassword);
    console.log(
      emailInputDivRef.current.children[1].value,
      numberInputDivRef.current.children[1].value,
      passwordInputDivRef.current.children[2].value,
      confirmPasswordInputDivRef.current.children[2].value
    );
    const isEmailValid = validateEmail(email);
    const isNumberValid = validateNumber(number);
    const isPasswordValid = validatePassword(password);
    const doPasswordsMatch = validateConfirmPassword(password, confirmPassword);
    if (isEmailValid && isNumberValid && isPasswordValid && doPasswordsMatch) {
      console.log("Successfully logged in");
    }
  };

  useEffect(() => {
    const emailInputDiv = emailInputDivRef.current;
    const numberInputDiv = numberInputDivRef.current;
    const passwordInputDiv = passwordInputDivRef.current;
    const confirmPasswordInputDiv = confirmPasswordInputDivRef.current;
    const registerButton = registerButtonRef.current;

    emailInputDivRef.current.children[1].addEventListener("focusin", () => {
      emailInputDivRef.current.firstChild.className =
        "text-gray-400 absolute z-0 hover:cursor-text top-[-1.5rem] text-sm duration-300 ml-2";
    });
    emailInputDivRef.current.children[1].addEventListener("focusout", () => {
      if (emailInputDivRef.current.children[1].value === "") {
        emailInputDivRef.current.firstChild.className =
          "text-gray-400 absolute z-0 hover:cursor-text ml-2";
      } else {
        validateEmail(emailInputDivRef.current.children[1].value);
      }
    });
    numberInputDivRef.current.children[1].addEventListener("focusin", () => {
      numberInputDivRef.current.firstChild.className =
        "text-gray-400 absolute z-0 hover:cursor-text top-[-1.5rem] text-sm duration-300 ml-2";
    });
    numberInputDivRef.current.children[1].addEventListener("focusout", () => {
      if (numberInputDivRef.current.children[1].value === "") {
        numberInputDivRef.current.firstChild.className =
          "text-gray-400 absolute z-0 hover:cursor-text ml-2";
      } else {
        validateNumber(numberInputDivRef.current.children[1].value);
      }
      validateEmail(emailInputDivRef.current.children[1].value);
    });
    passwordInputDivRef.current.children[2].addEventListener("focusin", () => {
      passwordInputDivRef.current.firstChild.className =
        "text-gray-400 absolute z-0 hover:cursor-text top-[-1.5rem] text-sm duration-300 ml-2";
      validateEmail(emailInputDivRef.current.children[1].value);
    });
    passwordInputDivRef.current.children[2].addEventListener("focusout", () => {
      if (passwordInputDivRef.current.children[2].value === "") {
        passwordInputDivRef.current.firstChild.className =
          "text-gray-400 absolute z-0 hover:cursor-text ml-2";
      } else {
        validatePassword(passwordInputDivRef.current.children[2].value);
      }
      validateNumber(numberInputDivRef.current.children[1].value);
      validateEmail(emailInputDivRef.current.children[1].value);
    });
    confirmPasswordInputDivRef.current.children[2].addEventListener(
      "focusin",
      () => {
        confirmPasswordInputDivRef.current.firstChild.className =
          "text-gray-400 absolute z-0 hover:cursor-text top-[-1.5rem] text-sm duration-300 ml-2";
        validateNumber(numberInputDivRef.current.children[1].value);
        validateEmail(emailInputDivRef.current.children[1].value);
        validatePassword(passwordInputDivRef.current.children[2].value);
      }
    );
    confirmPasswordInputDivRef.current.children[2].addEventListener(
      "focusout",
      () => {
        if (confirmPasswordInputDivRef.current.children[2].value === "") {
          confirmPasswordInputDivRef.current.firstChild.className =
            "text-gray-400 absolute z-0 hover:cursor-text ml-2";
        } else {
          validateConfirmPassword(
            passwordInputDivRef.current.children[2].value,
            confirmPasswordInputDivRef.current.children[2].value
          );
        }
        validateNumber(numberInputDivRef.current.children[1].value);
        validateEmail(emailInputDivRef.current.children[1].value);
        validatePassword(passwordInputDivRef.current.children[2].value);
      }
    );
    registerButtonRef.current.addEventListener("click", handleRegister);
  }, []);

  return (
    <div className="w-full flex flex-col justify-between py-8">
      <div className="text-lg w-full">
        <div className="relative mb-12" ref={emailInputDivRef}>
          <label
            htmlFor="email"
            className="text-gray-400 absolute z-0 hover:cursor-text ml-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={(e) => {
              validateEmail(e.target.value);
            }}
            className="focus:outline-none border-b border-b-gray-400 w-full z-10 px-2"
          />
          <div className="text-center bg-quiet shadow-lg shadow-gray-400 text-logo-red relative mt-3 hidden">
            <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl bg-quiet z-[-10]"></span>
            <p></p>
          </div>
        </div>
        <div className="relative mb-12" ref={numberInputDivRef}>
          <label
            htmlFor="number"
            className="text-gray-400 absolute z-0 hover:cursor-text ml-2"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="number"
            id="number"
            disabled
            onChange={(e) => {
              validateNumber(e.target.value);
            }}
            className="focus:outline-none border-b border-b-gray-400 w-full z-10 px-2"
          />
          <div className="text-center bg-quiet shadow-lg shadow-gray-400 text-logo-red relative mt-3 w-full hidden">
            <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl bg-quiet z-[-10]"></span>
            <p></p>
          </div>
        </div>
        <div className="relative mb-12" ref={passwordInputDivRef}>
          <label
            htmlFor="password"
            className="absolute text-gray-400 z-0 hover:cursor-text ml-2"
          >
            Password
          </label>
          <button
            type="button"
            className="w-8 h-auto absolute right-2"
            onClick={() => {
              setShowPassword(!showPassword);
              passwordInputDivRef.current.children[2].setAttribute(
                "type",
                showPassword ? "password" : "text"
              );
            }}
          >
            {!showPassword && (
              <img
                src="icons/eye.svg"
                alt="eye icon"
                className="w-full h-full"
              />
            )}
            {showPassword && (
              <img
                src="icons/eye_closed.svg"
                alt="closed eye icon"
                className="w-full h-full"
              />
            )}
          </button>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => {
              validatePassword(e.target.value);
            }}
            disabled
            className="focus:outline-none border-b border-b-gray-400 w-full z-10 px-2"
          />
          <div className="text-center bg-quiet shadow-lg shadow-gray-400 text-logo-red relative mt-3 w-full hidden rounded-lg">
            <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl bg-quiet z-[-10]"></span>
            <p></p>
          </div>
        </div>
        <div className="relative mb-4" ref={confirmPasswordInputDivRef}>
          <label
            htmlFor="confirm_password"
            className="absolute text-gray-400 z-0 hover:cursor-text ml-2"
          >
            Confirm Password
          </label>
          <button
            type="button"
            className="w-8 h-auto absolute right-2"
            onClick={() => {
              setShowConfirmPassword(!showConfirmPassword);
              confirmPasswordInputDivRef.current.children[2].setAttribute(
                "type",
                showConfirmPassword ? "password" : "text"
              );
            }}
          >
            {!showConfirmPassword && (
              <img
                src="icons/eye.svg"
                alt="eye icon"
                className="w-full h-full"
              />
            )}
            {showConfirmPassword && (
              <img
                src="icons/eye_closed.svg"
                alt="closed eye icon"
                className="w-full h-full"
              />
            )}
          </button>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            onChange={(e) => {
              validateConfirmPassword(
                passwordInputDivRef.current.children[2].value,
                e.target.value
              );
            }}
            disabled
            className="focus:outline-none border-b border-b-gray-400 w-full z-10 px-2"
          />
          <div className="text-center bg-quiet shadow-lg shadow-gray-400 text-logo-red relative mt-3 w-full hidden rounded-lg">
            <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl bg-quiet z-[-10]"></span>
            <p></p>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-12">
        <button
          type="submit"
          className="bg-blue-500 py-2 px-14 text-white sm:py-3 sm:px-12"
          ref={registerButtonRef}
          disabled
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default RegisterEmail;
