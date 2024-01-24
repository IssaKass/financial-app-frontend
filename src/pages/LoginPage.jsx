import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { Typography } from "@/components/ui/typography";
import { loginUser } from "@/features/auth/authActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PiSpinnerBold } from "react-icons/pi";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";

const LoginFormSchema = z.object({
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

const LoginPage = () => {
  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const { loading, userInfo, userToken, errors } = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const toggleShowPassword = () =>
    setShowPassword((showPassword) => !showPassword);

  useEffect(() => {
    if (userToken) {
      navigate("/analytics");
    }
  }, [navigate, userToken]);

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

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Typography variant="h2" component="h2" className="mt-10 text-center">
          Login to your account
        </Typography>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input {...field} autoFocus />
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
            <Button type="submit" disabled={loading} className="w-full">
              {loading && (
                <PiSpinnerBold className="me-2 h-4 w-4 animate-spin" />
              )}
              <span>{loading ? "Logging in..." : "Log in"}</span>
            </Button>
          </form>
        </Form>
        <Typography className="mt-10 text-end text-muted-foreground">
          Don't have an account?
          <Link to="/register" className="ms-2 font-bold">
            Register now
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default LoginPage;
