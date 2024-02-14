import "./App.css";
import Courses from "./data.json";
import React, { useState } from "react";
import Subjects from "./subjects.json";
import Instructors from "./instructors.json";
import BarChartLocal from "./components/BarChartLocal";
import CourseInfo from "./components/CourseInfo";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import CssBaseline from "@mui/material/CssBaseline";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";

import WelcomePage from "./components/WelcomePage";
import Header from "./components/Header";
import FilteredOutput from "./components/FilteredOutput";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#23272f",
    },
  },
});
function App() {
  const [visibleItems, setVisibleItems] = useState(10);

  const handleShowMore = () => {
    setVisibleItems((prev) => prev + 10);
  };

  const [subjectDataExists, setSubjectDataExists] = useState(false);
  const [courseNumberDataExists, setCourseNumberDataExists] = useState(false);
  const [instructorDataExists, setInstructorDataExists] = useState(false);

  const [subjectFilter, setSubjectFilter] = useState("");
  const [courseNumberFilter, setCourseNumberFilter] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");

  const handleInstructorChange = (event, value) => {
    setInstructorDataExists(true);
    setInstructorFilter(value);
    setVisibleItems(10);
    if (value === null || value === "") {
      setInstructorDataExists(false);
    }
  };

  const handleSubjectChange = (event, value) => {
    setSubjectDataExists(true);
    setVisibleItems(10);
    setSubjectFilter(value);
    if (value === null || value === "") {
      setSubjectDataExists(false);
    }
  };

  const handleCouseNumberChange = (event) => {
    setCourseNumberDataExists(true);
    setVisibleItems(10);
    setCourseNumberFilter(event.target.value);
    if (event.target.value === null || event.target.value === "") {
      setCourseNumberDataExists(false);
    }
  };

  const filterCourses = (
    course,
    subjectFilter,
    courseNumberFilter,
    instructorFilter,
  ) => {
    // 1 2 3
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

      // 1 2
    } else if (subjectFilter && courseNumberFilter) {
      return (
        course.subject === subjectFilter &&
        course.courseNumber.toLowerCase() === courseNumberFilter.toLowerCase()
      );

      // 2 3
    } else if (courseNumberFilter && instructorFilter) {
      let fullName = instructorFilter;
      let parts = fullName.split(", ");
      let lastName = parts[0];
      let firstName = parts[1];
      return (
        course.instructorLastName === lastName &&
        course.instructorFirstName === firstName &&
        course.courseNumber === courseNumberFilter
      );

      // 1 3
    } else if (subjectFilter && instructorFilter) {
      let fullName = instructorFilter;
      let parts = fullName.split(", ");
      let lastName = parts[0];
      let firstName = parts[1];
      return (
        course.instructorLastName === lastName &&
        course.instructorFirstName === firstName &&
        course.subject === subjectFilter
      );
    } else if (subjectFilter) {
      return course.subject === subjectFilter;
    } else if (courseNumberFilter) {
      return (
        course.courseNumber.toLowerCase() === courseNumberFilter.toLowerCase()
      );
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
    <div className="App">
      <p className="header">
        <Header />
      </p>
      <div className="welcome">
        <WelcomePage />

        <br />
        <br />
        <form>
          <div className="selectContainer">
            <label className="inputLabel">
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Autocomplete
                  disablePortal
                  id="subject"
                  options={Subjects}
                  onChange={(event, value) => {
                    console.log("Autocomplete value:", value);
                    handleSubjectChange(event, value);
                  }}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Subject" />
                  )}
                />
              </ThemeProvider>
            </label>
            <br />

            <label className="inputLabel">
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <TextField
                  id="outlined-basic"
                  label={"Course Number"}
                  variant="outlined"
                  autoComplete="off"
                  onChange={handleCouseNumberChange}
                />
              </ThemeProvider>
            </label>
            <br />
            <label className="inputLabel">
              <ThemeProvider theme={darkTheme}>
                <CssBaseline />
                <Autocomplete
                  disablePortal
                  id="instructor"
                  options={Instructors}
                  onChange={(event, value) => {
                    handleInstructorChange(event, value);
                  }}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Instructor" />
                  )}
                />
              </ThemeProvider>
            </label>
          </div>
        </form>
      </div>

      {/* <FilteredOutput Courses={Courses} subjectDataExists={subjectDataExists} courseNumberDataExists={courseNumberDataExists} instructorDataExists={instructorDataExists} subjectFilter={subjectFilter} courseNumberFilter={courseNumberFilter}, instructorFilter={instructorFilter} visibleItems={visibleItems}/> */}

      {filteredCourses &&
        // filteredCourses.length > 10 &&
        filteredCourses
          // .reverse()
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

      {false &&
        (subjectDataExists || courseNumberDataExists || instructorDataExists) &&
        Courses &&
        Courses.filter((course) => {
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
              course.courseNumber.toLowerCase() ===
                courseNumberFilter.toLowerCase()
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
        })
          // .reverse()
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
      <div>
        {!subjectDataExists &&
          !courseNumberDataExists &&
          !instructorDataExists &&
          Courses
            // .reverse()
            .slice(0, visibleItems)
            .map((course, index) => (
              <div key={index}>
                <div className="course" key={course.id}>
                  <div className="column">
                    <CourseInfo course={course} />
                  </div>
                  <div
                    className="column"
                    style={{ backgroundColor: "#23272f" }}
                  >
                    <BarChartLocal course={course} />
                  </div>
                </div>
              </div>
            ))}
        {((Courses.length > visibleItems &&
          filteredCourses.length > visibleItems) ||
          (!subjectDataExists &&
            !courseNumberDataExists &&
            !instructorDataExists)) && (
          <div className="footer">
            <ThemeProvider theme={darkTheme}>
              <Button
                color="primary"
                onClick={handleShowMore}
                variant="outlined"
              >
                Show More
              </Button>
            </ThemeProvider>
          </div>
        )}

        {filteredCourses.length === 0 && (
          <div className="footer">No results</div>
        )}
      </div>
    </div>
  );
}

export default App;
