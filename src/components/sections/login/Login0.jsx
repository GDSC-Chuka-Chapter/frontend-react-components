import { useState, useRef, useEffect } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordInputDivRef = useRef(null);
  const emailInputDivRef = useRef(null);
  const loginButtonRef = useRef(null);

  const passwordPattern1 = /[0-9]+/;
  const passwordPattern3 = /[^a-zA-z0-9]+/;
  const passwordLength = 8;
  const emailPattern = /^[a-zA-Z][\S]+@[a-zA-Z]+\.[\S]{2,}$/;

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
    passwordInputDivRef.current.children[2].setAttribute(
      "type",
      showPassword ? "password" : "text"
    );
  };

  const validateEmail = (currentEmail) => {
    let isEmailValid = emailPattern.test(currentEmail);
    if (currentEmail === "") {
      emailInputDivRef.current.lastChild.classList.remove("hidden");
      emailInputDivRef.current.lastChild.lastChild.textContent =
        "Email is required";
    } else if (!isEmailValid) {
      emailInputDivRef.current.lastChild.classList.remove("hidden");
      emailInputDivRef.current.lastChild.lastChild.textContent =
        "Invalid email address";
    } else {
      emailInputDivRef.current.lastChild.classList.add("hidden");
      emailInputDivRef.current.lastChild.lastChild.textContent = "";
      passwordInputDivRef.current.children[2].disabled = false;
    }
    return isEmailValid;
  };

  const validatePassword = (currentPassword) => {
    let isPasswordValid = false;
    passwordInputDivRef.current.lastChild.classList.remove("hidden");
    loginButtonRef.current.disabled = true;
    loginButtonRef.current.className =
      "bg-blue-500 py-2 px-12 text-white sm:py-3 sm:px-16 md:px-20";
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
      passwordInputDivRef.current.lastChild.lastChild.textContent = "";
      loginButtonRef.current.disabled = false;
      loginButtonRef.current.className =
        "bg-blue-1 py-2 px-12 text-white sm:py-3 sm:px-16 md:px-20";
      isPasswordValid = true;
      return isPasswordValid;
    }
  };

  const handleLogin = () => {
    console.log("email: ", email);
    console.log("password: ", password);
    console.log("Successfully logged in");
  };

  useEffect(() => {
    document.title = "Ablaze Study Abroad | Login";
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
    passwordInputDivRef.current.children[2].addEventListener("focusin", () => {
      passwordInputDivRef.current.firstChild.className =
        "text-gray-400 absolute z-0 hover:cursor-text top-[-1.5rem] text-sm duration-300 ml-2";
      validateEmail(emailInputDivRef.current.children[1].value);
    });
    passwordInputDivRef.current.children[2].addEventListener("focusout", () => {
      if (passwordInputDivRef.current.children[2].value === "") {
        passwordInputDivRef.current.firstChild.className =
          "text-gray-400 absolute z-0 hover:cursor-text ml-2";
      }
      validatePassword(passwordInputDivRef.current.children[2].value);
    });
    loginButtonRef.current.addEventListener("click", handleLogin);
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-full h-full flex flex-col justify-around items-center px-8 sm:w-[32rem] md:w-[40rem]">
        <div className="space-y-6">
          <img src="icons/logo.svg" alt="Ablaze Study Abroad logo" />
          <h2>Sign in to your account</h2>
        </div>
        <div className="text-lg w-full">
          <div className="relative mb-16" ref={emailInputDivRef}>
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
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              className="focus:outline-none border-b border-b-gray-400 w-full z-10 px-2"
            />
            <div className="text-center bg-quiet shadow-lg shadow-gray-400 text-logo-red relative mt-3 hidden">
              <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl bg-quiet z-[-10]"></span>
              <p></p>
            </div>
          </div>
          <div className="relative mb-4" ref={passwordInputDivRef}>
            <label
              htmlFor="password"
              className="absolute text-gray-400 z-0 hover:cursor-text ml-2"
            >
              Password
            </label>
            <button
              type="button"
              className="w-8 h-auto absolute right-2"
              onClick={handlePasswordVisibility}
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
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              disabled
              className="focus:outline-none border-b border-b-gray-400 w-full z-10 px-2"
            />

            <div className="text-center bg-quiet shadow-lg shadow-gray-400 text-logo-red relative mt-3 max-w-72 hidden rounded-lg">
              <span className="absolute left-1/2 top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-tl bg-quiet z-[-10]"></span>
              <p></p>
            </div>
          </div>
          <div className="flex justify-end">
            <a href="/forgot-password" className="text-blue-800 underline">
              Forgot password?
            </a>
          </div>
          <div className="flex justify-center items-center mt-12">
            <button
              type="submit"
              className="bg-blue-500 py-2 px-14 text-white sm:py-3 sm:px-16 md:px-20"
              ref={loginButtonRef}
              disabled
            >
              Sign in
            </button>
          </div>
        </div>
        <div className="w-full flex justify-between sm:px-8 md:px-16 items-end text-blue-800">
          <a href="/register" className="underline">
            Create an Account
          </a>
          <div className="flex gap-x-2 items-end">
            <p>Or Sign in with </p>
            <a href="#">
              <img
                src="icons/google.svg"
                alt="eye icon"
                className="w-8 h-auto"
              />
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
    </div>
  );
};

export default Login;
