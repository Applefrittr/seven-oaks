interface props {
  name: String;
}

function NavButton({ name }: props) {
  return (
    <button
      onClick={() => console.log("Clicked!")}
      className="pt-1 pb-1 pl-4 pr-4 font-bold text-xl bg-gradient-to-l from-white to-white bg-[length:0%_0.1em] [background-position-y:100%] [background-position-x:100%] bg-no-repeat transition-all hover:bg-[length:100%_0.1em]"
    >
      {name}
    </button>
  );
}
export default NavButton;
