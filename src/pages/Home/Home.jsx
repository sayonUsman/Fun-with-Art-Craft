import Banner from "./Banner/Banner";
import { useEffect, useState } from "react";
import PopularClassCard from "./PopularClassCard/PopularClassCard";
import PopularInstructorCard from "./PopularInstructorCard/PopularInstructorCard";
import SectionTitle from "../../components/SectionTitle";

const Home = () => {
  const [popularClasses, setPopularClasses] = useState([]);
  const [popularInstructors, setPopularInstructors] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/popularClasses")
      .then((res) => res.json())
      .then((data) => {
        setPopularClasses(data);
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:5000/popularInstructors")
      .then((res) => res.json())
      .then((data) => {
        setPopularInstructors(data);
      });
  }, []);

  return (
    <div>
      <Banner></Banner>

      <SectionTitle title={"Our Popular Classes"}></SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-9">
        {popularClasses.slice(0, 6).map((details) => (
          <PopularClassCard
            key={details._id}
            details={details}
          ></PopularClassCard>
        ))}
      </div>

      <SectionTitle title={"Our Popular Instructors"}></SectionTitle>

      <div className="grid grid-cols-1 lg:grid-cols-2 sm:gap-16 lg:gap-20">
        {popularInstructors.slice(0, 6).map((details) => (
          <PopularInstructorCard
            key={details._id}
            details={details}
          ></PopularInstructorCard>
        ))}
      </div>

      <SectionTitle title={"View Tutorial on Youtube"}></SectionTitle>
    </div>
  );
};

export default Home;
