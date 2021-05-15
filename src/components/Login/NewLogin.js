import React, { useEffect, useReducer, useState } from "react";
import { act } from "react-dom/test-utils";
const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.includes("@"),
    };
  }
  if (action.type === "REST") {
    return {
      value: "",
      isValid: false,
    };
  }
  return {
    value: "",
    isValid: false,
  };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6,
    };
    if (action.type === "REST") {
      return {
        value: "",
        isValid: false,
      };
    }
  }
  return {
    value: "",
    isValid: false,
  };
};
function NewLogin() {
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    isValid: false,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    isValid: false,
  });
  const [formIsValid, setFormIsValid] = useState(false);
  useEffect(() => {
    const debounce = setTimeout(() => {
      console.log("USEEFFECT");
      setFormIsValid(emailState.isValid && passwordState.isValid);
    }, 500);
    return () => {
      clearTimeout(debounce);
      console.log("CLEANUP");
    };
  }, [emailState.isValid, passwordState.isValid]);

  const emailChangedHandler = (e) => {
    dispatchEmail({ type: "USER_INPUT", val: e.target.value });
  };
  const passwordChangedHandler = (e) => {
    dispatchPassword({ type: "USER_INPUT", val: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!emailState.isValid || !passwordState.isValid) {
      alert("Invalid Input!");
      return;
    }
    dispatchEmail({ type: "REST" });
    dispatchPassword({ type: "REST" });
    alert("SUCCESS!");
  };
  return (
    <form onSubmit={submitHandler}>
      <div>
        <label>E-Mail</label>
        <input
          type="email"
          value={emailState.value}
          onChange={emailChangedHandler}
        ></input>
        {!emailState.isValid && <p>Please Enter a Valid Email</p>}
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={passwordState.value}
          onChange={passwordChangedHandler}
        ></input>
        {!passwordState.isValid && <p>Please Enter a Valid Password</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default NewLogin;
