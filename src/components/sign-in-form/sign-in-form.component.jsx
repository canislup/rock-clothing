import { useState } from "react";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithEmailAndPasswordMethod,
} from "../../utils/firebase/firebase.utils";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  // Helper reset function
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  // Authenticates user with gmail
  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
    alert("You have been sucessfully logged in");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = await signInWithEmailAndPasswordMethod(email, password);
      console.log(user);
      resetFormFields();
      alert("You have been sucessfully signed in. Welcome.");
    } catch (error) {
      const errorCode = error.code;

      switch (errorCode) {
        case "auth/wrong-password":
          alert("Wrong e-mail or password. Please try again.");
          break;

        case "auth/user-not-found":
          alert("User not found. Please try again.");
          break;

        default:
          console.error(error);
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your e-mail and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button buttonType="google" type="button" onClick={signInWithGoogle}>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
