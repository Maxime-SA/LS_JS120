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

let foo = createStudent('Foo', '1st');
foo.info();
// "Foo is a 1st year student"
foo.listCourses();
// [];
foo.addCourse({ name: 'Math', code: 101 });
foo.addCourse({ name: 'Advanced Math', code: 102 });
foo.listCourses();
// [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
foo.addNote(101, 'Fun course');
foo.addNote(101, 'Remember to study for algebra');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
foo.addNote(102, 'Difficult subject');
foo.viewNotes();
// "Math: Fun course; Remember to study for algebra"
// "Advance Math: Difficult subject"
foo.updateNote(101, 'Fun course');
foo.viewNotes();
// "Math: Fun course"
// "Advanced Math: Difficult subject"