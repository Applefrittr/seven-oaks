import BG from "../assets/right-pan-front-stencil.jpg";

function About() {
  return (
    <section className="flex flex-col flex-auto overflow-scroll">
      <div className="p-10 sm:p-20 bg-[url('./assets/right-pan-front-stencil.jpg')] bg-cover bg-center flex">
        <aside className="p-4 bg-[rgba(250,250,250,0.85)] max-w-96">
          About Seven Oaks
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            facilisis, urna ut fermentum bibendum, mi metus egestas ante, vitae
            faucibus dui sapien id mauris. Integer sed metus in mi aliquet
            accumsan. Duis eu justo erat. Curabitur bibendum posuere egestas.
            Proin consectetur commodo dui ac elementum. Cras tristique sem.
          </p>
        </aside>
      </div>
      <div className="h-fit bg-[#87BBA2] text-white flex gap-6 flex-wrap p-9 justify-evenly">
        <div className="text-center">
          <h2 className="text-black font-extrabold p-2">Address</h2>
          <p>196 Fuselier Rd</p>
          <p>Arnaudville LA 70512</p>
        </div>
        <div className="text-center">
          <h2 className="text-black font-extrabold p-2">Wifi</h2>
          <p>Network: Sevenoaks</p>
          <p>Password:loft52318</p>
        </div>
        <div className="text-center">
          <h2 className="text-black font-extrabold p-2">Parking</h2>
          <p>Located on the side of</p>
          <p>the house on Olive St.</p>
        </div>
        <div className="text-center">
          <h2 className="text-black font-extrabold p-2">Ameneties</h2>
          <ul>
            <li>Air Conditioning</li>
            <li>Pool</li>
            <li>Fully stocked bar</li>
            <li className="pb-2">Streaming services included</li>
          </ul>
        </div>
      </div>
      <div className="p-4 flex flex-col items-center flex-auto">
        <h2 className="font-black text-2xl">Meet the Residents</h2>
        <div className="flex justify-around flex-auto w-full flex-wrap p-8 gap-3">
          <div className="w-52 flex flex-col gap-3 items-center">
            <h3 className="font-bold">Remy</h3>
            <img src="" className="bg-slate-500 w-32 h-32"></img>
            <p>
              Playful 1 1/2 year old Golden Retriever (95lbs), loves taking
              walks.
            </p>
          </div>
          <div className="w-52 flex flex-col gap-3 items-center">
            <h3 className="font-bold">Shakey</h3>
            <img src="" className="bg-slate-500 w-32 h-32"></img>
            <p>
              10 year old Jack/Rat Russell Terrier (rescue) who is very
              territorial and needs time to adjust to new guests.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
