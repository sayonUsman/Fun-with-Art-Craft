import useAllDetails from "./useAllDetails";
import useEnrollmentClasses from "./useEnrollmentClasses";

const useEnrollmentClassesDetails = () => {
  const [enrollmentClasses] = useEnrollmentClasses();
  const [allDetails] = useAllDetails();
  let enrollmentClassesDetails = [];
  let idList = [];

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

  return enrollmentClassesDetails;
};

export default useEnrollmentClassesDetails;
