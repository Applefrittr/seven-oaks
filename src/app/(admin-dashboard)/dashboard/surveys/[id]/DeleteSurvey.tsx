"use client";

import { useState } from "react";
import { removeSurvey } from "@/server/actions";

export default function DeleteSurvey({ code }: { code: string }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className={`flex flex-col gap-2`}>
      <button
        onClick={() => setConfirmDelete(true)}
        className={`bg-red-400 px-4 py-2 rounded-md w-max`}
      >
        Delete
      </button>
      {confirmDelete && (
        <div className={`flex flex-col gap-2`}>
          <b>Confirm Deletion?</b>
          <div className={`flex gap-4`}>
            <button
              onClick={() => removeSurvey(code)}
              className={`bg-red-400 px-4 py-2 rounded-md w-max`}
            >
              Confirm
            </button>
            <button
              className={`bg-slate-400 px-4 py-2 rounded-md w-max`}
              onClick={() => setConfirmDelete(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
