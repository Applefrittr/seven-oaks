import Logo from "../../../../public/SO-logo.png";

export default function Test({ link = `http://localhost:3000/` }) {
  return (
    <div className={`flex flex-col gap-4 items-center justify-center p-4`}>
      <img src={Logo.src} alt="Seven Oaks Logo" className={`w-64 h-auto`} />
      <h1>
        <b>New Survey Recieved!</b>
      </h1>
      <i>
        Check the following link to see details in the Seven Oaks Dashboard:
      </i>
      <a href={link} className={`text-blue-500`}>
        {link}
      </a>
    </div>
  );
}
