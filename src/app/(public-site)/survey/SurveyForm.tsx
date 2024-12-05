"use client";
import { submitSurvey } from "@/server/actions";
import { useState } from "react";

const inputStyles = `text-black w-fit rounded p-1`;
const labelStyles = "font-bold";

type Errors = {
  code?: string[] | undefined;
  date?: string[] | undefined;
  length?: string[] | undefined;
  name?: string[] | undefined;
};

export default function SurveyForm() {
  const [active, setActive] = useState<boolean>(true);
  const [pending, setPending] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    const formData = new FormData(e.currentTarget);
    const surveyState = await submitSurvey(formData);

    console.log(surveyState);

    setPending(false);
    if (surveyState?.errors) {
      setErrors(surveyState.errors);
    } else {
      setErrors(null);
      setActive(false);
    }
  };

  return (
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => onSubmit(event)}
      className="flex flex-col gap-2 relative"
    >
      {!active && (
        <div
          className={`absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)] flex justify-center items-center`}
        >
          <p className={`bg-slate-500 px-4 py-2 rounded-lg w-max text-lg`}>
            <b>Survey Sent Successfully</b>
          </p>
        </div>
      )}
      <label htmlFor="code" className={labelStyles}>
        Survey Code
      </label>
      <input id="code" name="code" className={inputStyles} />
      {errors?.code && <p className="text-red-600">{errors.code}</p>}
      <label htmlFor="name" className={labelStyles}>
        Party Name
      </label>
      <input id="name" name="name" className={inputStyles} />
      {errors?.name && <p className="text-red-600">{errors.code}</p>}
      <label htmlFor="date" className={labelStyles}>
        Date of arrival
      </label>
      <input type="date" id="date" name="date" className={inputStyles} />
      {errors?.date && <p className="text-red-600">{errors.date}</p>}
      <label htmlFor="length" className={labelStyles}>
        Length of stay
      </label>
      <input
        type="number"
        id="length"
        min="1"
        max="14"
        step="1"
        name="length"
        className={inputStyles}
      />
      {errors?.length && <p className="text-red-600">{errors.length}</p>}
      <label htmlFor="beverage" className={labelStyles}>
        Beverage Preference
      </label>
      <select id="beverage" name="beverage" className={inputStyles}>
        <option value="Tea">Tea</option>
        <option value="Coffee">Coffee</option>
        <option value="None">None</option>
      </select>
      <label htmlFor="diet" className={labelStyles}>
        Allergies and/or Dietary Specifications
      </label>
      <textarea
        id="diet"
        name="diet"
        rows={5}
        className="text-black rounded p-1"
      ></textarea>
      <label htmlFor="other" className={labelStyles}>
        Any other requests and/or requirements
      </label>
      <textarea
        id="other"
        name="other"
        rows={5}
        className="text-black rounded p-1"
      ></textarea>
      <button
        disabled={active ? false : true}
        type="submit"
        className="bg-slate-500 rounded w-28  pl-2 pr-4 pt-1 pb-1 font-bold flex justify-center"
      >
        {!pending ? (
          "Submit"
        ) : (
          <div role="status">
            <svg
              aria-hidden="true"
              className="w-7 h-6 text-black animate-spin dark:text-gray-600 fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </button>
    </form>
  );
}
