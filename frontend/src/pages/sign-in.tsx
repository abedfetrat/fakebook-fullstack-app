import {SignInButton, useSignIn} from "@clerk/clerk-react";
import {useState} from "react";

const guestEmail = "johndoe@mail.com";
const guestPassword = "JohnDoe1337";

function SignIn() {
  const {isLoaded, signIn, setActive} = useSignIn()
  const [signingIn, setSigningIn] = useState(false);

  const handleGuestSignIn = async () => {
    if (!isLoaded) return;

    setSigningIn(true);

    try {
      const signInAttempt = await signIn.create({
        identifier: guestEmail,
        password: guestPassword
      })

      if (signInAttempt.status === 'complete') {
        await setActive({session: signInAttempt.createdSessionId})
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }

    setSigningIn(false);
  };

  return (
    <section className="text-center">
      <h1 className="text-3xl font-medium">Welcome to Fakebook!</h1>
      <p className="text-neutral-700 mt-4">Please sign-in to continue.</p>
      <div className="flex flex-col gap-2 mt-6 max-w-[300px] mx-auto">
        <button
          className="btn btn-primary text-white"
          disabled={signingIn}
          onClick={handleGuestSignIn}>
          {
            signingIn
              ?
              <>
                <span className="loading loading-spinner"></span>
                Signing in...
              </>
              :
              <>Sign-in as guest</>
          }

        </button>
        <p className="text-neutral-500">- or -</p>
        <SignInButton>
          <button className="btn btn-primary text-white">Sign-in with email</button>
        </SignInButton>
      </div>
    </section>
  );
}

export default SignIn;