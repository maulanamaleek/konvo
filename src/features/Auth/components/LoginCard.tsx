import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useAuthActions } from "@convex-dev/auth/react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

interface LoginCardProps {
  toRegister: () => void;
}

const LoginCard = ({ toRegister }: LoginCardProps) => {
  const { signIn } = useAuthActions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);

  const handleSignIn = (type: "google" | "github") => {
    setPending(true);
    signIn(type).finally(() => {
      setPending(false);
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardTitle className="px-0 pt-0">Login to continue</CardTitle>
      <CardDescription>Use email or login by google account</CardDescription>
      <CardContent className="space-y-2.5">
        <form className="space-y-2.5">
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

          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            Continue
          </Button>
        </form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={pending}
            onClick={() => handleSignIn("google")}
            variant="outline"
            className="w-full relative"
          >
            <FcGoogle className="size-5" />
            Continue with Google
          </Button>
          <Button
            disabled={pending}
            onClick={() => handleSignIn("github")}
            variant="outline"
            className="w-full relative"
          >
            <FaGithub className="size-5" />
            Continue with Github
          </Button>
        </div>
        <p className="text-xs text-muted-foreground">
          Don&apos;t have an account?{" "}
          <span
            className="text-sky-700 hover:underline cursor-pointer"
            onClick={toRegister}
          >
            Register
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
