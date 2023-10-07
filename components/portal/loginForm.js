import {
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from 'firebase/auth'
import * as React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { auth } from '@/lib/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

const Loader = () => {
  return (
    <div className="center cursor-wait">
      <div className="spinner"></div>
      <p className="mt-[10%] text-5xl font-bold text-indigo-700">Loading...</p>
    </div>
  )
}

const LoginForm = () => {
  const router = useRouter() // Get the router instance
  const [user, loading, error] = useAuthState(auth)

  const methods = useForm({ mode: 'onTouched' })
  const { register, handleSubmit } = methods
  const [failedAuth, setFailedAuth] = React.useState('')
  const [authUserInformation, setAuthUserInformation] = React.useState(null)

  const onSubmit = async (data) => {
    const { email, password } = data

    try {
      setPersistence(auth, browserSessionPersistence)
        .then(() => {
          // Existing and future Auth states are now persisted in the current
          // session only. Closing the window would clear any existing state even
          // if a user forgets to sign out.
          // ...
          // New sign-in will be persisted with session persistence.
          return signInWithEmailAndPassword(auth, email, password)
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code
          const errorMessage = error.message
        })

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // signed in
          const user = userCredential.user
          setAuthUserInformation({
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          })
        })
        .catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.log(errorCode)
          console.log(errorMessage)
        })
    } catch (error) {
      const errorCode = error.code
      console.log(error)
      if (errorCode === 'auth/wrong-password') {
        setFailedAuth(`Invalid Username or Password!`)
      } else {
        setFailedAuth(`Invalid Username or Password!`)
      }
    }
  }

  if (user) {
    router.push('/explore')
  }
  return (
    <div className="z-10 mx-auto w-full max-w-md space-y-8 rounded-xl bg-straw-200 p-10">
      <div className="text-center">
        <h2 className="mt-6 text-3xl font-bold text-forestGreen600">
          {!authUserInformation ? (
            <span>Welcome Back!</span>
          ) : (
            <span>Welcome Back, {authUserInformation.email}!</span>
          )}
        </h2>
        {!failedAuth ? (
          <p className="mt-2 text-sm text-gray-600">Please sign in to your account</p>
        ) : (
          <p className="my-5 mb-6 rounded-md border border-red-300 bg-red-50 p-3 text-center font-medium text-red-500">
            {failedAuth}
          </p>
        )}
      </div>

      <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="relative">
          <label className="text-sm font-bold tracking-wide text-gray-700">Email</label>
          <input
            className=" w-full border-b border-gray-300 py-2 text-base focus:border-indigo-500 focus:outline-none"
            type="email"
            required={true}
            placeholder="mail@gmail.com"
            {...register('email')}
          />
        </div>
        <div className="mt-8 content-center">
          <label className="text-sm font-bold tracking-wide text-gray-700">Password</label>
          <input
            className="w-full content-center border-b border-gray-300 py-2 text-base focus:border-indigo-500 focus:outline-none"
            type="password"
            required={true}
            {...register('password')}
            placeholder="Enter your password"
          />
        </div>
        <div>
          <input
            type="submit"
            className="focus:shadow-outline flex w-full cursor-pointer justify-center rounded-full bg-forestGreen500 p-4
                                      font-semibold  tracking-wide text-gray-100 shadow-lg transition duration-300 ease-in hover:bg-forestGreen600 focus:outline-none"
          />
        </div>
        <p className="text-md mt-10 flex flex-col items-center justify-center text-center text-gray-500">
          <span>Forgot Password?</span>
          <a
            href="mailto:webworksdreams@gmail.com"
            className="cursor-pointer text-forestGreen600 no-underline transition duration-300 ease-in hover:text-forestGreen500 hover:underline"
          >
            Email admin
          </a>
        </p>
      </form>
    </div>
  )
}

export default LoginForm
