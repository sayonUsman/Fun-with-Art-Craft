import Banner from "./Banner/Banner";
import { useEffect, useState } from "react";
import PopularClassCard from "./PopularClassCard/PopularClassCard";
import PopularInstructorCard from "./PopularInstructorCard/PopularInstructorCard";
import SectionTitle from "../../components/SectionTitle";

const Home = () => {
  const [popularClasses, setPopularClasses] = useState([]);
  const [popularInstructors, setPopularInstructors] = useState([]);

  useEffect(() => {
    fetch("https://fun-with-art-craft.vercel.app/popularClasses")
      .then((res) => res.json())
      .then((data) => {
        setPopularClasses(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://fun-with-art-craft.vercel.app/popularInstructors")
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

      <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mb-20">
        <iframe
          height="245"
          src="https://www.youtube.com/embed/QtCA_dPjyOI"
          title="How to Draw Beautiful Moonlight Over the Lake Scenery | Oil Pastels Scenery Drawing"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          autoPlay
          className="flex mx-auto w-[345px] sm:w-9/12 lg:w-[475px] rounded-md"
        ></iframe>

        <iframe
          height="245"
          src="https://www.youtube.com/embed/kBih54nSQyc"
          title="Moonlight night scenery drawing painting | Night seascape painting"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          autoPlay
          className="flex mx-auto w-[345px] sm:w-9/12 lg:w-[475px] rounded-md"
        ></iframe>

        <iframe
          height="245"
          src="https://www.youtube.com/embed/vYpoRzumKSc"
          title="Como pintar paisagem de chuva com caminho de árvores / acrylic painting on canvas"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          autoPlay
          className="flex mx-auto w-[345px] sm:w-9/12 lg:w-[475px] rounded-md"
        ></iframe>

        <iframe
          height="245"
          src="https://www.youtube.com/embed/2RKsPUao3dk"
          title="Mountais and waterfalls drawing and painting | Beautiful Nature painting"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          autoPlay
          className="flex mx-auto w-[345px] sm:w-9/12 lg:w-[475px] rounded-md"
        ></iframe>

        <iframe
          height="245"
          src="https://www.youtube.com/embed/Ea7g-SrluGI"
          title="Beautiful Indian Village Scenery Drawing|Easy Indian Village Scenery With Watercolor|Scenery Drawing"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          autoPlay
          className="flex mx-auto w-[345px] sm:w-9/12 lg:w-[475px] rounded-md"
        ></iframe>

        <iframe
          height="245"
          src="https://www.youtube.com/embed/9pzN-Q0OLFI"
          title="Oil Painting - Full Moon Landscape / Easy Art / Drawing Lessons / Satisfying Relaxing / Живопись."
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          autoPlay
          className="flex mx-auto w-[345px] sm:w-9/12 lg:w-[475px] rounded-md"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
