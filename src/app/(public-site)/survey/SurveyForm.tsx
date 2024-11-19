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
  const [errors, setErrors] = useState<Errors | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const surveyState = await submitSurvey(formData);

    console.log(surveyState);

    if (surveyState?.errors) {
      setErrors(surveyState.errors);
    } else {
      setErrors(null);
      setActive(false);
    }

    // if (loginState?.errors) {
    //   setErrors(loginState.errors);
    // }
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
        type="length"
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
        className="bg-slate-500 rounded w-fit pl-2 pr-4 pt-1 pb-1 font-bold"
      >
        Submit
      </button>
    </form>
  );
}
