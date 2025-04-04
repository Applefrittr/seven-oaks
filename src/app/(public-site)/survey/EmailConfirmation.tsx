"use client";
import { SurveyData } from "@/db/dataTypes";
import { useState } from "react";
import { sendEmailConfirmation } from "@/server/actions";
import Link from "next/link";
import LoadingSpinner from "@/app/components/LoadingSpinner";

type EmailErrors = {
  email?: string[] | undefined;
  id?: string[] | undefined;
};

export default function EmailConfirmation({
  surveyData,
}: {
  surveyData: SurveyData;
}) {
  const [errors, setErrors] = useState<EmailErrors | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [active, setActive] = useState(true);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const formState = await sendEmailConfirmation(surveyData, formData);

    setPending(false);
    if (formState?.errors) {
      setErrors(formState.errors);
    } else {
      setErrors(null);
      setActive(false);
    }
  };

  return (
    <div
      className={`absolute z-5 top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.90)] flex flex-col gap-4 justify-start items-center pt-6`}
    >
      <b className={`text-xl`}>Survey Sent Successfully</b>
      <hr className={`w-full`} />
      <p>
        Thank you for taking the time to complete the visitors survey. If you
        would like a confirmation email, please enter it below.
      </p>
      <form className={`flex gap-2`} onSubmit={onSubmit}>
        <input
          name="email"
          id="email"
          className={`text-black w-fit rounded p-1`}
          disabled={active ? false : true}
        />
        <button
          className={`px-4 py-1 rounded-md bg-slate-500 w-max text-white ${active ? "opacity-100" : "opacity-50"}`}
          disabled={active ? false : true}
        >
          {!pending ? (
            "Send Confirmation"
          ) : (
            <LoadingSpinner text={"Sending..."} />
          )}
        </button>
      </form>
      {errors?.email && <p className="text-red-600">{errors.email}</p>}
      {!active && (
        <p className="text-green-600">Email sent, check your inbox shortly</p>
      )}
      <p>-Or-</p>
      <Link
        href={"/"}
        className={`px-4 py-1 rounded-md bg-slate-500 w-max text-white`}
      >
        Home
      </Link>
    </div>
  );
}
