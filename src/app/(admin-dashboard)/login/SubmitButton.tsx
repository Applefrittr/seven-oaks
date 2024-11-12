"use client";

import { useFormStatus } from "react-dom";

type SubmitButtonParams = {
  text: string;
};

export default function SubmitButton({ text }: SubmitButtonParams) {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} type="submit">
      {text}
    </button>
  );
}
