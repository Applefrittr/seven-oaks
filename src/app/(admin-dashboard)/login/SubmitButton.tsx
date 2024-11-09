"use client";

import { useFormStatus } from "react-dom";

interface SubmitParams {
  text: string;
}

export default function SubmitButton({ text }: SubmitParams) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {text}
    </button>
  );
}
