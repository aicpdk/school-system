import { type NextPage } from "next";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState, type ChangeEvent } from "react";

import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link } from "../../components/link";

const Signin: NextPage = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>();
  const router = useRouter();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleSignIn: React.FormEventHandler = async (event) => {
    event.preventDefault();

    const response = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (response?.error) return setError(response?.error);

    return router.push("/");
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <form
        onSubmit={handleSignIn}
        className=" flex w-full flex-col items-center gap-4"
      >
        <h2 className="text-3xl font-bold ">Sign In</h2>
        <Image src={"/aicp_logo.png"} alt="aicp_logo" width={200} height={0} />
        <Input
          label="Username"
          placeholder="placeholder"
          name="username"
          onChange={(event) => handleOnChange(event)}
          value={credentials.username}
        />
        <Input
          label="Password"
          placeholder="placeholder"
          type="password"
          name="password"
          onChange={(event) => handleOnChange(event)}
          value={credentials.password}
        />
        <Button widthFull>Sign in</Button>
        <Link href="/auth/forgot-password">Forgot Password?</Link>
      </form>
    </div>
  );
};

export default Signin;
