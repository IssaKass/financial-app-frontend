import React, { useEffect } from "react";
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

const LoginPage = () => {
  const { loading, userInfo, userToken, error } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate("/analytics");
    }
  }, [navigate, userInfo]);

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
            <Input
              id="password"
              autoComplete="current-password"
              className="input mt-1 w-full"
            />
            <FieldError className="mt-2 block text-xs font-medium text-red-600" />
          </TextField>
          <div>
            <Button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              Sign in
            </Button>
          </div>
        </Form>
        <p className="mt-10 text-end text-sm text-neutral-500 dark:text-neutral-300">
          Don't have an account?
          <Link
            to="/register"
            className="ms-2 font-semibold leading-6 text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
