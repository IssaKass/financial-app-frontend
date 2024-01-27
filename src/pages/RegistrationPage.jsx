import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Loader } from "lucide-react";

import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Typography } from "@/components/ui/typography";
import Page from "@/layouts/Page";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import { registerUser } from "../features/auth/authActions";

const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(1, {
      message: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters",
    })
    .max(20, {
      message: "Username must be at most 20 characters",
    }),
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Invalid email address",
    }),
  password: z
    .string()
    .min(1, {
      message: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters",
    }),
});

const RegistrationPage = () => {
  const form = useForm({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const { loading, userToken, errors, success } = useSelector(
    (state) => state.auth,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      navigate("/login");
    }

    if (userToken) {
      navigate("/analytics");
    }
  }, [navigate, userToken, success]);

  useEffect(() => {
    const setFieldError = (errorKey, fieldName) => {
      if (errors?.[errorKey]) {
        form.setError(fieldName, { type: "manual", message: errors[errorKey] });
      }
    };

    setFieldError("username", "username");
    setFieldError("email", "email");
    setFieldError("password", "password");
  }, [errors]);

  const onSubmit = (data) => {
    dispatch(registerUser(data));
  };

  return (
    <Page title="Financial | Register">
      <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Typography variant="h3" component="h1" className="mt-10 text-center">
            Create an account
          </Typography>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input {...field} autoFocus />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                size="sm"
                className="w-full"
                disabled={loading}
              >
                {loading && <Loader className="me-2 animate-spin" size={16} />}
                {!loading ? "Register" : "Registering..."}
              </Button>
            </form>
          </Form>
          <Typography className="mt-10 text-end text-muted-foreground">
            Already have an account?
            <Link to="/login" className="ms-2 font-bold">
              Log in
            </Link>
          </Typography>
        </div>
      </div>
    </Page>
  );
};

export default RegistrationPage;
