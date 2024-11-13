import React from "react";
import { useFormStatus } from "react-dom";

type SubmitButtonParams = {
  children: string;
};

export default function SubmitButton({ children }: SubmitButtonParams) {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className={`px-4 py-1 rounded-md bg-slate-500 w-max`}
    >
      {children}
    </button>
  );
}
