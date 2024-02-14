import React from "react";

function CourseInfo({ course }) {
  return (
    <div>
      <br />
      <h1>
        {course.subject} {course.courseNumber} {course.quarter}
        {course.year}
      </h1>
      <br />
      {course.courseTitle}
      <br />
      {course.instructorLastName}, {course.instructorFirstName}
      <br />
      <h3>Average GPA: {course.gpa}</h3>
    </div>
  );
}

export default CourseInfo;
