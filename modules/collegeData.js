const fs = require('fs');

// Define the Data class to store student and course data
class Data {
    constructor(students, courses) {
        this.students = students;
        this.courses = courses;
    }
}

let dataCollection = null;

// Initialize the data by reading from JSON files
function initialize() {
    return new Promise((resolve, reject) => {
        // Read students.json file
        fs.readFile('./data/students.json', 'utf8', (err, studentDataFromFile) => {
            if (err) {
                console.log(err);
                return reject("Unable to read students.json");
            }
            // Read courses.json file
            fs.readFile('./data/courses.json', 'utf8', (err, courseDataFromFile) => {
                if (err) {
                    return reject("Unable to read courses.json");
                }

                // Create a new Data instance and assign it to dataCollection
                dataCollection = new Data(
                    JSON.parse(studentDataFromFile),
                    JSON.parse(courseDataFromFile)
                );
                resolve();
            });
        });
    });
}

// Function to get all students
function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.students.length > 0) {
            resolve(dataCollection.students);
        } else {
            reject("No students found");
        }
    });
}

// Function to get Teaching Assistants (TAs)
function getTAs() {
    return new Promise((resolve, reject) => {
        const TAs = dataCollection.students.filter(student => student.TA);
        if (TAs.length > 0) {
            resolve(TAs);
        } else {
            reject("No TAs found");
        }
    });
}

// Function to get all courses
function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection && dataCollection.courses.length > 0) {
            resolve(dataCollection.courses);
        } else {
            reject("No courses found");
        }
    });
}

// Function to get students by course
function getStudentsByCourse(course) {
    return new Promise((resolve, reject) => {
        if (!dataCollection) {
            return reject("Data not initialized");
        }
        let studentsByCourse = dataCollection.students.filter(s => s.course === course);
        if (studentsByCourse.length > 0) {
            resolve(studentsByCourse);
        } else {
            reject("No students found for the given course");
        }
    });
}

// Function to get a student by their student number
function getStudentByNum(num) {
    return new Promise((resolve, reject) => {
        if (!dataCollection) {
            return reject("Data not initialized");
        }
        let student = dataCollection.students.find(s => s.studentNum === num);
        if (student) {
            resolve(student);
        } else {
            reject("No student found with the given student number");
        }
    });
}

// Export the functions
module.exports = {
    initialize,
    getAllStudents,
    getTAs,
    getCourses,
    getStudentsByCourse,
    getStudentByNum
};
