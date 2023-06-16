import useAllDetails from "./useAllDetails";
import useConfirmedClasses from "./useConfirmedClasses";

const useConfirmedClassesDetails = () => {
  const [confirmedClasses] = useConfirmedClasses();
  const [allDetails] = useAllDetails();
  let confirmedClassesDetails = [];
  let idList = [];

  confirmedClasses?.forEach((confirmedClass) => {
    idList = [...idList, confirmedClass.classId];
  });

  idList.forEach((id) => {
    const confirmedClassDetails = allDetails.find(
      (details) => details._id === id
    );

    confirmedClassesDetails = [
      ...confirmedClassesDetails,
      confirmedClassDetails,
    ];
  });

  return confirmedClassesDetails;
};

export default useConfirmedClassesDetails;
