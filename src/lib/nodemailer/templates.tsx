export const NewSurvey = ({ dashlink }: { dashlink: string }) => {
  return (
    <html lang="en">
      <div className={`flex flex-col gap-4 items-center justify-center p-4`}>
        <img
          src={`localhost:3000/SO-logo.png`}
          alt="Seven Oaks Logo"
          className={`w-64 h-auto`}
        />
        <h1>
          <b>New Survey Recieved!</b>
        </h1>
        <i>
          Check the following link to see details in the Seven Oaks Dashboard:
        </i>
        <div>
          <a href={dashlink} className={`text-blue-500`}>
            {dashlink}
          </a>
        </div>
      </div>
    </html>
  );
};
