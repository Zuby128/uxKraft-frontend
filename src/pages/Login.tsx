import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useAuthStore from "@/store/AuthStore";
import * as Yup from "yup";
import { useFormik } from "formik";
import type { ILoginBody } from "@/types/auth.type";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "sonner";

const initialValues: ILoginBody = {
  email: "test@email.com",
  password: "123456",
};

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuthStore();

  const validationSchema = Yup.object({
    email: Yup.string().max(50).required(),
    password: Yup.string().max(16).required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: () => {
      try {
        login(formik.values);
        toast.success("Login success");
        navigate("/");
      } catch (error) {
        toast.error("Email or password is invalid");
      }
    },
  });

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  name="email"
                  color={formik.errors.email ? "error" : "primary"}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={
                    formik.touched.email && formik.errors.email
                      ? "border border-red-500"
                      : ""
                  }
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  name="password"
                  color={formik.errors.password ? "error" : "primary"}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className={
                    formik.touched.password && formik.errors.password
                      ? "border border-red-500"
                      : ""
                  }
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            disabled={!formik.isValid}
            onClick={() => formik.handleSubmit()}
          >
            Login
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  );
}
