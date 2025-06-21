"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCreateWorkspaceModal from "../store/useCreateWorkspaceModal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useCreateWorkspaces from "../api/useCreateWorkspaces";

const CreateWorkspaceModal = () => {
  const [open, setOpen] = useCreateWorkspaceModal();
  const router = useRouter();
  const { mutate, isPending } = useCreateWorkspaces();
  const [name, setName] = useState("");

  const handleClose = () => {
    setOpen(false);
    setName("");
  };

  const handleSubmit = () => {
    mutate(
      {
        name,
      },
      {
        onSuccess(data) {
          toast.success("Workspaces created!");
          router.push(`/workspaces/${data}`);
          handleClose();
        },
        onError() {},
        onSettled() {},
      }
    );
  };
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription></DialogDescription>
          <form className="space-y-2.5" onSubmit={handleSubmit}>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isPending}
              minLength={5}
              placeholder="Workspace name"
              required
            />
            <div className="flex justify-end">
              <Button disabled={isPending} type="submit">
                Create
              </Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
