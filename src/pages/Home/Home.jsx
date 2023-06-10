import PopularCard from "../../components/PopularCard";
import Banner from "./Banner/Banner";
import { useEffect, useState } from "react";

const Home = () => {
  const [popularClasses, setPopularClasses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/popularClasses")
      .then((res) => res.json())
      .then((data) => {
        setPopularClasses(data);
      });
  }, []);

  return (
    <div>
      <Banner></Banner>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
        {popularClasses.slice(0, 6).map((details) => (
          <PopularCard key={details._id} details={details}></PopularCard>
        ))}
      </div>
    </div>
  );
};

export default Home;
