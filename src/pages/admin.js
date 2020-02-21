import React, { useState, useEffect } from "react"
import { useIdentityContext } from "react-netlify-identity"

import SignUp from "../components/formComponents/SignUp"
import ConfirmSignUp from "../components/formComponents/ConfirmSignUp"
import SignIn from "../components/formComponents/SignIn"
import Inventory from "../templates/Inventory"

const Admin = () => {
  const [formState, setFormState] = useState("signUp")
  const {
    loginUser,
    signupUser,
    logoutUser,
    isConfirmedUser,
    isLoggedIn,
    param,
  } = useIdentityContext()

  const toggleFormState = formState => {
    setFormState(formState)
  }

  console.log("isLoggedIn: ", isLoggedIn)
  console.log("param: ", param)

  useEffect(() => {
    // check and update signed in state
  }, [])

  const signUp = async form => {
    const { email, password } = form
    setFormState("confirmSignUp")

    signupUser(email, password)
      .then(user => console.log("Success! Signed up", user))
      .catch(err => console.error(err))
  }

  const confirmSignUp = async form => {
    // const { username, authcode } = form
    // confirm sign up
    setFormState("signIn")
  }

  const signIn = async form => {
    const { email, password } = form
    // Log In
    setFormState("signedIn")

    loginUser(email, password)
      .then(user => console.log("Success! Signed up", user))
      .catch(err => console.error(err))
  }

  const signOut = async () => {
    // sign out
    setFormState("signUp")

    logoutUser()
  }

  const renderForm = (formState, state) => {
    switch (formState) {
      case "signUp":
        return (
          <SignUp
            {...state}
            signUp={signUp}
            toggleFormState={toggleFormState}
          />
        )
      case "confirmSignUp":
        return <ConfirmSignUp {...state} confirmSignUp={confirmSignUp} />
      case "signIn":
        return (
          <SignIn
            {...state}
            signIn={signIn}
            toggleFormState={toggleFormState}
          />
        )
      case "signedIn":
        return isConfirmedUser ? (
          <Inventory {...state} signOut={signOut} />
        ) : (
          <h3>Not an admin</h3>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col">
      <div className="max-w-fw flex flex-col">
        <div className="pt-10">
          <h1 className="text-5xl font-light">Admin Panel</h1>
        </div>
        {renderForm(formState)}
      </div>
    </div>
  )
}

export default Admin
