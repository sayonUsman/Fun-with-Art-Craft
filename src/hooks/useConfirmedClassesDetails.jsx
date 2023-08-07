import useAllDetails from "./useAllDetails";
import useConfirmedClasses from "./useConfirmedClasses";

const useConfirmedClassesDetails = () => {
  const [confirmedClasses] = useConfirmedClasses();
  const [allDetails] = useAllDetails();
  let confirmedClassesDetails = [];
  let errorMessage = "";
  let idList = [];

  if (!confirmedClasses?.error) {
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
  } else if (confirmedClasses?.error) {
    errorMessage = "Please login again!";
  }

  return [confirmedClassesDetails, errorMessage];
};

export default useConfirmedClassesDetails;
