import { useState, useRef, useEffect } from "react";
import { RegisterDetails, RegisterEmail } from "../../majors/index.js";

const Register0 = () => {
  const [step, setStep] = useState("email");

  useEffect(() => {
    document.title = "Ablaze Study Abroad | Register";
  }, []);
  return (
    <div className="w-full h-screen max-h-screen flex justify-center items-center">
      <div className="w-full h-full px-8 py-8 sm:w-[32rem] md:w-[40rem]">
        <div className="grid place-items-center gap-12">
          <img src="icons/logo.svg" alt="Ablaze Study Abroad logo" />
          <div className="text-center space-y-4">
            <h2>Create an Account</h2>
            <p>
              {step === "details" ? "Basic Information" : "Account Details"}
            </p>
          </div>
        </div>
        {step === "details" && <RegisterDetails />}
        {step === "email" && <RegisterEmail />}
      </div>
    </div>
  );
};
export default Register0;
