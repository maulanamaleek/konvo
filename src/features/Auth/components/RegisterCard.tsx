import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useAuthActions } from "@convex-dev/auth/react";
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react";

interface RegisterCardProps {
  toLogin: () => void;
}

const RegisterCard = ({ toLogin }: RegisterCardProps) => {
  const { signIn } = useAuthActions();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleSignUp = (type: "google" | "github" | "password") => {
    setPending(true);
    if (type === "password") {
      if (password !== confirmPassword) {
        return setError("Confirm Password do not match");
      }
      signIn("password", { email, password, name, flow: "signUp" })
        .catch(() => {
          setError("Something went wrong");
        })
        .finally(() => {
          setPending(false);
        });
      return;
    }
    signIn(type)
      .catch(() => {
        setError("Invalid account");
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0">
        <CardTitle className="px-0 pt-0">Register to continue</CardTitle>
        <CardDescription>Use email or login by google account</CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/20 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
          <TriangleAlert size={20} />
          <p>{error}</p>
        </div>
      )}
      <CardContent className="space-y-2.5 px-0">
        <form
          className="space-y-2.5"
          onSubmit={(e) => {
            e.preventDefault();
            handleSignUp("password");
          }}
        >
          <Input
            disabled={pending}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            type="text"
            required
          />
          <Input
            disabled={pending}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            type="email"
            required
          />
          <Input
            disabled={pending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            required
          />
          <Input
            disabled={pending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            type="password"
            required
          />

          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => handleSignUp("google")}
            variant="outline"
            className="w-full relative"
          >
            <FcGoogle className="size-5" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleSignUp("github")}
            variant="outline"
            className="w-full relative"
          >
            <FaGithub className="size-5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Already have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={toLogin}
          >
            Login
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default RegisterCard;
