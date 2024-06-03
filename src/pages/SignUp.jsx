import React, { useRef } from "react";
import "./SignUp.scss";

const SignUp = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const signUpHandler = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password === confirmPassword) {
      if (password.length > 7) {
        try {
          const response = await fetch(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyATBLNXUUyGsJ8yS54FzsFZayV2iOnEJhQ",
            {
              method: "POST",
              body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const data = await response.json();
          if (data.error) {
            throw data.error;
          } else alert("You have registered with email :- " + data.email);
          console.log(data);
          console.log(data.email);
          emailRef.current.value = "";
          passwordRef.current.value = "";
          confirmPasswordRef.current.value = "";
        } catch (error) {
          alert(error.message);
        }
      } else {
        alert("Enter A password of length greater than 7.");
      }
    } else {
      alert("Password and Confirm Password should be same.");
    }
  };
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="p-3 border rounded border-dark"
        style={{ width: "300px", height: "350px" }}
      >
        <h3 className="fw-medium mt-3 mb-5 text-center">SignUp</h3>
        <form>
          <div>
            <input
              placeholder=" "
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              ref={emailRef}
            />
            <label htmlFor="firstName">Email</label>
          </div>
          <div>
            <input
              placeholder=""
              type="password"
              id="password"
              name="password"
              autoComplete="off"
              ref={passwordRef}
            />
            <label htmlFor="password">Password</label>
          </div>
          <div>
            <input
              placeholder=" "
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              autoComplete="off"
              ref={confirmPasswordRef}
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>
        </form>
        <div className="d-grid gap-2">
          <button
            className="btn btn-dark rounded-pill mt-4"
            type="button"
            onClick={signUpHandler}
          >
            SignUp
          </button>
        </div>
      </div>
      <div className="d-grid gap-2 mt-3 mx-auto" style={{ width: "300px" }}>
        <button
          className="btn btn-light"
          type="button"
          style={{ backgroundColor: "rgba(0, 255, 255, 0.074)" }}
        >
          Have an account? LogIn
        </button>
      </div>
    </div>
  );
};

export default SignUp;