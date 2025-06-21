"use client";
import { useEffect, useMemo } from "react";

import UserButton from "@/features/Auth/components/UserButton";
import useGetWorkspaces from "@/features/Workspaces/api/useGetWorkspaces";
import useCreateWorkspaceModal from "@/features/Workspaces/store/useCreateWorkspaceModal";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isLoading, data } = useGetWorkspaces();
  const [open, setOpen] = useCreateWorkspaceModal();

  const workspaceId = useMemo(() => data?.[0]?._id, [data]);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (workspaceId) {
      router.replace(`/workspaces/${workspaceId}`);
    } else if (!open) {
      setOpen(true);
    }
  }, [workspaceId, isLoading, open, setOpen]);

  return (
    <div>
      <UserButton />
    </div>
  );
}
