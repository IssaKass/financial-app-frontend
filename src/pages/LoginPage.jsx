import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "react-aria-components";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../features/auth/authActions";
import EyeIcon from "@heroicons/react/20/solid/EyeIcon";
import EyeSlashIcon from "@heroicons/react/20/solid/EyeSlashIcon";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { loading, userInfo, userToken, error } = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  useEffect(() => {
    if (userToken) {
      navigate("/analytics");
    }
  }, [navigate, userToken]);

  const submitForm = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    dispatch(loginUser(data));
  };

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-900 dark:text-white">
          Login to your account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          validationErrors={error}
          className="space-y-6"
          onSubmit={submitForm}
        >
          <TextField name="email" type="email" isRequired>
            <Label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-neutral-900 dark:text-white"
            >
              Email address
            </Label>
            <Input
              id="email"
              autoComplete="email"
              className="input mt-1 w-full"
            />
            <FieldError className="mt-2 block text-xs font-medium text-red-600" />
          </TextField>
          <TextField name="password" type="password" isRequired>
            <Label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-neutral-900 dark:text-white"
            >
              Password
            </Label>
            <div className="relative mt-1">
              <Input
                id="password"
                autoComplete="current-password"
                className="input w-full pe-10"
                type={showPassword ? "text" : "password"}
              />
              <Button
                className="absolute right-1 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full"
                onPress={toggleShowPassword}
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4 fill-neutral-500" />
                ) : (
                  <EyeSlashIcon className="h-4 w-4 fill-neutral-500" />
                )}
              </Button>
            </div>
            <FieldError className="mt-2 block text-xs font-medium text-red-600" />
          </TextField>
          <div>
            <Button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:bg-primary-400"
              isDisabled={loading}
            >
              {loading && (
                <svg
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin fill-primary-600 text-neutral-200 dark:text-neutral-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              {!loading ? "Log in" : "Logging in..."}
            </Button>
          </div>
        </Form>
        <p className="mt-10 text-end text-sm text-neutral-500 dark:text-neutral-300">
          Don't have an account?
          <Link
            to="/register"
            className="ms-2 font-semibold leading-6 text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
