function Survey() {
  return (
    <section className="flex p-4 sm:p-24 justify-start items-center flex-auto relative z-10 bg-cover bg-no-repeat bg-[url('./assets/close-front.jpg')]">
      <div className="absolute top-0 bottom-0 left-0 right-0 -z-10 bg-gradient-to-r from-white to-transparent" />
      <div className="bg-black text-white p-4 max-w-[500px] flex flex-col gap-2">
        <h1 className="font-black text-center">Welcome</h1>
        <p>
          We at Seven Oaks pride ourselves in providing a memorable expirence to
          all our patrons. Please fill out the form below in prepration to your
          visit.
        </p>
        <form className="flex flex-col gap-2">
          <label htmlFor="date">Date of arrival</label>
          <input
            type="date"
            id="date"
            name="date"
            className="text-black w-fit"
          />
          <label htmlFor="number">Length of stay</label>
          <input
            type="number"
            id="number"
            min="1"
            max="14"
            step="1"
            name="number"
            className="text-black w-fit"
          ></input>
          <label htmlFor="beverage">Beverage Preference</label>
          <select id="beverage" name="beverage" className="text-black w-fit">
            <option value="Tea">Tea</option>
            <option value="Coffee">Coffee</option>
            <option value="None">None</option>
          </select>
          <label htmlFor="diet">Allergies and/or Dietary Specifications</label>
          <textarea
            id="diet"
            name="diet"
            rows={5}
            className="text-black"
          ></textarea>
          <label htmlFor="other">Any other requests and/or requirements</label>
          <textarea
            id="other"
            name="other"
            rows={5}
            className="text-black"
          ></textarea>
          <button className="bg-slate-500 rounded w-fit pl-2 pr-4 pt-1 pb-1">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Survey;
