/* eslint-disable max-lines-per-function */

function createStudent(name, year) {
  return {
    name,
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(id) {
      this.courses.push(id);
    },

    listCourses() {
      console.log(this.courses);
    },

    addNote(code, note) {
      let myCourse = this.returnCourse(code);
      if (!myCourse['note']) {
        myCourse['note'] = [];
      }
      myCourse['note'].push(note);
    },

    updateNote(code, note) {
      let myCourse = this.returnCourse(code);
      myCourse['note'] = [note];
    },

    returnCourse(code) {
      for (let i = 0; i < this.courses.length; i++) {
        if (this.courses[i].code === code) {
          return this.courses[i];
        }
      }
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.hasOwnProperty('note')) {
          console.log(`${course.name}: ${course.note.join('; ')}`);
        }
      });
    },

  };
}

let school = {
  students: [],

  addStudent(name, year) {
    if (['1st','2nd','3rd','4th','5th'].includes(year)) {
      let newStudent = createStudent(name, year);
      this.students.push(newStudent);
      return newStudent;
    } else {
      return 'Invalid Year';
    }
  },

  enrollStudent(name, course) {
    let student = this.findStudent(name);
    student.addCourse(course);
  },

  addGrade(name, course, grade) {
    let student = this.findStudent(name);
    let specificCourse = student.courses.filter(subject => subject.name === course)[0];
    specificCourse['grade'] = grade;
  },

  findStudent(name) {
    return this.students.filter(student => student.name === name)[0];
  },

  getReportGrade(name) {
    let student = this.findStudent(name);
    student.courses.forEach(course => {
      if (course['grade']) {
        console.log(`${course.name}: ${course.grade}`);
      } else {
        console.log(`${course.name}: In progress`);
      }
    });
  },

  courseReport(course) {
    let mySum = 0;
    let numberOfStudents = 0;
    this.students.forEach(student => {
      student.courses.forEach(subject => {
        if (subject.name === course && subject.hasOwnProperty('grade')) {
          console.log(`${student.name}: ${subject.grade}`);
          mySum += subject.grade;
          numberOfStudents += 1;
        }
      });
    });

    if (numberOfStudents > 0) {
      console.log('---');
      console.log(`Course Average: ${mySum / numberOfStudents}`);
    } else {
      console.log('undefined');
    }

  },

};

school.addStudent('foo', '3rd');
school.addStudent('bar', '1st');
school.addStudent('qux', '2nd');

school.enrollStudent('foo',{name: 'Math', code: 101});
school.enrollStudent('foo',{name: 'Advanced Math', code: 102});
school.enrollStudent('foo',{name: 'Physics', code: 202});
school.enrollStudent('bar',{name: 'Math', code: 101});
school.enrollStudent('qux',{name: 'Math', code: 101});
school.enrollStudent('qux',{name: 'Advanced Math', code: 102});

school.addGrade('foo','Math',95);
school.addGrade('foo','Advanced Math',90);
school.addGrade('bar','Math',91);
school.addGrade('qux','Math',93);
school.addGrade('qux','Advanced Math',90);

school.getReportGrade('foo');
school.getReportGrade('bar');
school.getReportGrade('qux');

school.courseReport('Math');
school.courseReport('Advanced Math');
school.courseReport('Physics');