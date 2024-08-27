function Survey() {
  return (
    <section>
      <div>
        Welcome to Seven Oaks. Please fill out the form below in prepration to
        your visit.
        <form>
          <label htmlFor="dates">Dates visiting</label>
          <input type="date" id="date1" />
          <span> to </span>
          <input type="date" id="date2" />
        </form>
      </div>
    </section>
  );
}

export default Survey;
