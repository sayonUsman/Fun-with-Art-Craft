const PopularCard = ({ details }) => {
  return (
    <div className="card rounded sm:card-side shadow-md shadow-zinc-800 mx-2">
      <figure>
        <img
          src={details.classImage}
          alt="Class's Image"
          className="w-full h-72"
        />
      </figure>

      <div className="card-body pl-7 pt-5">
        <h2 className="card-title">{details.className}</h2>
        <p>
          Available seats: {details.availableSeats} <br />
          Course Price: {details.price}
        </p>

        <div className="card-actions justify-end">
          <button className="btn">Enroll Now</button>
        </div>
      </div>
    </div>
  );
};

export default PopularCard;
