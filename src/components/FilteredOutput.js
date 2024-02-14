import BarChartLocal from "./BarChartLocal";
import CourseInfo from "./CourseInfo";
function FilteredOutput({
  Courses,
  subjectDataExists,
  courseNumberDataExists,
  instructorDataExists,
  subjectFilter,
  courseNumberFilter,
  instructorFilter,
  visibleItems,
}) {
  const filterCourses = (
    course,
    subjectFilter,
    courseNumberFilter,
    instructorFilter,
  ) => {
    if (subjectFilter && courseNumberFilter && instructorFilter) {
      let fullName = instructorFilter;
      let parts = fullName.split(", ");
      let lastName = parts[0];
      let firstName = parts[1];
      return (
        course.subject === subjectFilter &&
        course.courseNumber.toLowerCase() ===
          courseNumberFilter.toLowerCase() &&
        course.instructorLastName === lastName &&
        course.instructorFirstName === firstName
      );
    } else if (subjectFilter && courseNumberFilter) {
      return (
        course.subject === subjectFilter &&
        course.courseNumber.toLowerCase() === courseNumberFilter.toLowerCase()
      );
    } else if (subjectFilter) {
      return course.subject === subjectFilter;
    } else if (instructorFilter) {
      let fullName = instructorFilter;
      let parts = fullName.split(", ");
      let lastName = parts[0];
      let firstName = parts[1];
      return (
        course.instructorLastName === lastName &&
        course.instructorFirstName === firstName
      );
    } else {
      return false;
    }
  };

  const filteredCourses =
    (subjectDataExists || courseNumberDataExists || instructorDataExists) &&
    Courses &&
    Courses.filter((course) =>
      filterCourses(
        course,
        subjectFilter,
        courseNumberFilter,
        instructorFilter,
      ),
    );
  return (
    <div>
      {filteredCourses &&
        // filteredCourses.length > 10 &&
        filteredCourses
          .reverse()
          .slice(0, visibleItems)
          .map((course) => {
            return (
              <div className="course" key={course.id}>
                <div className="column">
                  <CourseInfo course={course} />
                </div>
                <div className="column">
                  <BarChartLocal course={course} />
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default FilteredOutput;
