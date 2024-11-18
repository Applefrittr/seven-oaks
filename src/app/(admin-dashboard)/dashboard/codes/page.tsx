import { displayCodes, createCode } from "@/server/actions";

type codeFormat = {
  id: number;
  code: string;
  assigned: boolean;
};

export default async function Codes() {
  const codes = await displayCodes();
  console.log(codes);
  return (
    <section className={`flex-auto flex flex-col gap-6 p-8`}>
      <h1 className="font-extrabold text-xl">Codes</h1>
      <div className={`flex gap-4 flex-wrap`}>
        {codes.map((code: codeFormat) => {
          return (
            <div
              key={code.id}
              className={`flex gap-2 px-4 py-1 ${
                !code.assigned ? "bg-green-400" : "bg-red-400"
              } rounded-md w-max`}
            >
              <div>
                code: <b>{code.code}</b>
              </div>
              <i>assigned: {code.assigned ? "yes" : "no"}</i>
            </div>
          );
        })}
      </div>
      <button
        onClick={createCode}
        className={`px-4 py-1 rounded-md bg-slate-500 w-max text-white`}
      >
        Create New Code
      </button>
    </section>
  );
}
