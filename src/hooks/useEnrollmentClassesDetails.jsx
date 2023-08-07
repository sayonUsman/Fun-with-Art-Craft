import useAllDetails from "./useAllDetails";
import useEnrollmentClasses from "./useEnrollmentClasses";

const useEnrollmentClassesDetails = () => {
  const [enrollmentClasses] = useEnrollmentClasses();
  const [allDetails] = useAllDetails();
  let enrollmentClassesDetails = [];
  let errorMessage = "";
  let idList = [];

  if (!enrollmentClasses?.error) {
    enrollmentClasses?.forEach((enrollmentClass) => {
      enrollmentClass.classesId.forEach((id) => {
        idList = [...idList, id];
      });
    });

    idList.forEach((id) => {
      const enrollmentClassDetails = allDetails.find(
        (details) => details._id === id
      );

      enrollmentClassesDetails = [
        ...enrollmentClassesDetails,
        enrollmentClassDetails,
      ];
    });
  } else if (enrollmentClasses?.error) {
    errorMessage = "Please login again!";
  }

  return [enrollmentClassesDetails, errorMessage];
};

export default useEnrollmentClassesDetails;
