"use client";
import React, { useEffect, useState } from "react";

import CreateWorkspaceModal from "@/features/Workspaces/components/CreateWorkspaceModal";

const Modals = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      <CreateWorkspaceModal />
    </>
  );
};

export default Modals;
