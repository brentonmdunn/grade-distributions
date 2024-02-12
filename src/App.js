import "./App.css";
import Courses from "./data.json";
import React, { useState } from "react";
import Subjects from "./subjects.json";
import Instructors from "./instructors.json";
import BarChartLocal from "./components/BarChartLocal"; // Assuming BarChart.js is in the same directory
import CourseInfo from "./components/CourseInfo";
function App() {
  const [visibleItems, setVisibleItems] = useState(10);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const [subjectFilter, setSubjectFilter] = useState("");
  const [courseNumberFilter, setCourseNumberFilter] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");
  const [oneField, setOneField] = useState(false);

  const handleInstructorChange = (event) => {
    setOneField(true);
    setInstructorFilter(event.target.value);
  };

  const handleSubjectChange = (event) => {
    setOneField(true);
    setSubjectFilter(event.target.value);
  };

  const handleCouseNumberChange = (event) => {
    setOneField(true);
    setCourseNumberFilter(event.target.value);
  };

  const handleClear = (event) => {
    setInstructorFilter("");
    setCourseNumberFilter("");
    setSubjectFilter("");
  };

  return (
    <div className="App">
      <p className="header">
        <strong>Known issues</strong> <br />
        Data is missing or inaccurate for the following quarters: WI15, FA17,
        WI18, SP18, FA18, WI19, SP19, FA19, WI22 <br />
        [Fall, Winter, Spring] is out of order.
        <br />
        Searches with just a subject are extremely slow.
        <br />
        Searching is a little clunky with large dropdowns.
      </p>
      <div className="welcome">
        <form>
          <h1>Welcome</h1>
          <p>
            This site displays the grade distributions of each class, dating all
            the way back to 2015. The former course evaluation system, CAPEs,
            used to display grade distribution data. Starting in FA23, UC San
            Diego removed CAPEs in favor of SETs. While SETs has its strong
            points, one of the things it lacks is grade distribution data. This
            site hopes to fill that hole.
          </p>
          <br />
          <p style={{ color: "#1a7da3" }}>
            <strong>
              This site is currently in a closed beta phase. This means that
              some features are not fully working or are slow and the site theme
              is not fully finished.
            </strong>
          </p>

          <br />
          <br />
          <div className="selectContainer">
            <label>
              Subject:
              <select
                id="subject"
                name="subject"
                value={subjectFilter}
                onChange={handleSubjectChange}
              >
                <option value="">Select a subject</option>
                {Subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </label>
            <br />

            <label>
              Course number:
              <input
                type="text"
                value={courseNumberFilter}
                onChange={handleCouseNumberChange}
              />
            </label>
            <br />
            <label>
              Instructor:
              <select
                id="instructor"
                name="instructor"
                value={instructorFilter}
                onChange={handleInstructorChange}
              >
                <option value="">Select an instructor</option>
                {Instructors.map((instructor) => (
                  <option key={instructor} value={instructor}>
                    {instructor}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <label>
              <button onClick={handleClear} className="clear">
                Clear
              </button>
            </label>
          </div>
        </form>
      </div>

      {oneField &&
        Courses &&
        Courses.filter((course) => {
          if (subjectFilter && courseNumberFilter && instructorFilter) {
            var fullName = instructorFilter;
            var parts = fullName.split(", ");
            var lastName = parts[0];
            var firstName = parts[1];
            return (
              course.subject === subjectFilter &&
              course.courseNumber
                .toLowerCase()
                .includes(courseNumberFilter.toLowerCase()) &&
              course.instructorLastName === lastName &&
              course.instructorFirstName === firstName
            );
          } else if (subjectFilter && courseNumberFilter) {
            return (
              course.subject === subjectFilter &&
              course.courseNumber
                .toLowerCase()
                .includes(courseNumberFilter.toLowerCase())
            );
          } else if (subjectFilter) {
            return course.subject === subjectFilter;
          } else if (instructorFilter) {
            var fullName = instructorFilter;
            var parts = fullName.split(", ");
            var lastName = parts[0];
            var firstName = parts[1];
            return (
              course.instructorLastName === lastName &&
              course.instructorFirstName === firstName
            );
          } else {
            return false;
          }
        })
          .reverse()
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
      <div>
        {!oneField &&
          Courses.reverse()
            .slice(0, visibleItems)
            .map((course, index) => (
              <div key={index}>
                <div className="course" key={course.id}>
                  <div className="column">
                    <CourseInfo course={course} />
                  </div>
                  <div className="column">
                    <BarChartLocal course={course} />
                  </div>
                </div>
              </div>
            ))}
        {!oneField && Courses.length > visibleItems && (
          <button onClick={handleShowMore} className="showMore">
            Show More
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
