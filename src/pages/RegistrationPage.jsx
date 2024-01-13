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
import { registerUser } from "../features/auth/authActions";

const RegistrationPage = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/login");
    }

    if (userInfo) {
      navigate("/settings");
    }
  }, [navigate, userInfo, success]);

  const submitForm = (e) => {
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    dispatch(registerUser(data));
  };

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-900 dark:text-white">
          Create an account
        </h2>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form
          validationErrors={error}
          onSubmit={submitForm}
          className="space-y-6"
        >
          <TextField name="username" type="text" isRequired>
            <Label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-neutral-900 dark:text-white"
            >
              Username
            </Label>
            <Input
              id="username"
              autoComplete="username"
              className="input mt-1 w-full"
            />
            <FieldError className="mt-2 block text-xs font-medium text-red-600" />
          </TextField>
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
          <Button
            type="submit"
            className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            Sign up
          </Button>
        </Form>
        <p className="mt-10 text-end text-sm text-neutral-500 dark:text-neutral-300">
          Already have an account?
          <Link
            to="/login"
            className="ms-2 font-semibold leading-6 text-primary-600 hover:text-primary-500 dark:text-primary-400"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
