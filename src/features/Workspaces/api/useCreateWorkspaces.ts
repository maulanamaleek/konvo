import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCallback, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";

type Options = {
  onSuccess?: (data: ResponseType) => void;
  onError?: () => void;
  onSettled?: () => void;
};

type RequestType = {
  name: string;
};

type ResponseType = Id<"workspaces">;

const useCreateWorkspaces = () => {
  const mutation = useMutation(api.workspaces.create);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ResponseType | null>(null);
  const [status, setStatus] = useState<
    "pending" | "success" | "error" | "settled" | null
  >(null);

  const isPending = status === "pending";
  const isSuccess = status === "success";
  const isError = status === "error";

  const mutate = useCallback(async (values: RequestType, options: Options) => {
    try {
      setStatus("pending");
      setError(null);
      setData(null);

      const data = await mutation(values);
      setData(data);
      setStatus("success");
      options?.onSuccess?.(data);
    } catch (error) {
      setError(error as Error);
      setStatus("error");
      options?.onError?.();
    } finally {
      options?.onSettled?.();
    }
  }, []);

  return {
    mutate,
    isPending,
    isError,
    isSuccess,
    data,
    error,
  };
};

export default useCreateWorkspaces;
