"use client";

import React, { useState } from "react";
import { AuthType } from "../types";
import LoginCard from "./LoginCard";
import RegisterCard from "./RegisterCard";

const AuthPage = () => {
  const [authType, setAuthType] = useState<AuthType>("login");
  return (
    <div className="h-full flex items-center justify-center bg-[#5c3b58]">
      <div className="md:h-auto md:w-[420px]">
        {authType === "login" ? (
          <LoginCard toRegister={() => setAuthType("register")} />
        ) : (
          <RegisterCard toLogin={() => setAuthType("login")} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
