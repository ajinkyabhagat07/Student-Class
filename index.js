
// Problem Statement:
// Create a class "Student" with following member:

// firstname - ; lastname - ; fullname - ,DOB - ,AGE - , Semester CGPA Array, FinalCGPA,SemesterGrades,FinalGrade, YearofEnrollment, YearofPassing, NumberOfYearstoGraduate

 

// All the underlined members are derived attributes.

 

// Create App that performs CRUD operations on the above class



class Student{

    static #allStudents = [];
    static #studentID = 0;
    #fullName;
    #age;
    #finalCgpa;
    #semesterGrades;
    #finalGrade;
    #NumberOfYearstoGraduate


    constructor(studentID, firstName, lastName, fullName, dob, age, semesterCgpa, finalCgpa, semesterGrades, finalGrade, yearOfEnrollment, yearOfPassing, NumberOfYearstoGraduate) {
        this.studentID = studentID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.#fullName = fullName;
        this.dob = dob;
        this.#age = age;
        this.semesterCgpa = semesterCgpa;
        this.#finalCgpa = finalCgpa;
        this.#semesterGrades = semesterGrades;
        this.#finalGrade = finalGrade;
        this.yearOfEnrollment = yearOfEnrollment;
        this.yearOfPassing = yearOfPassing;
        this.#NumberOfYearstoGraduate = NumberOfYearstoGraduate;  
    }

    getFullName(){
        return this.#fullName;
    }

    getAge(){
        return this.#age;
    }

    getSemesterGrades(){
        return this.#semesterGrades;
    }

    getFinalGrades(){
        return this.#finalGrade;
    }


    getFinalCgpa(){
        return this.#finalCgpa;
    }

    getNumberOfYearstoGraduate(){
        return this.#NumberOfYearstoGraduate;
    }

    
    static newStudent(firstName, lastName, dob, semesterCgpa, yearOfEnrollment, yearOfPassing){
        //validation
        try {
            if(typeof firstName !== "string"){
                throw new Error("firstname is invalid");
            }
            if(typeof lastName !== "string"){
                throw new Error("lastname is invalid");
            }
            if (firstName == lastName) {
                throw new Error(" invalid")
            }
    
            if(typeof dob != "string"){
                throw new Error("dob is invalid")
            }
    
            const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            const match = datePattern.test(dob);
    
            if (!match) {
                throw new Error("invalid db format")
            }
    
            if(!Array.isArray(semesterCgpa)){
                throw new Error("semesterCgpa is invalid")
            }
    
            if(semesterCgpa.length != 8){
                throw new Error("enter all semester cgpa")
            }
    
            if(typeof yearOfEnrollment != "number"){
                throw new Error("year of enrollment is invalid")
            }
            
    
            let fullName = firstName + " " + lastName;
            let dobDate = new Date(dob);
            let currDate = new Date();
            let age = currDate.getFullYear() - dobDate.getFullYear();
            let finalCgpa = 0;
            for(let i=0; i<8; i++){
                finalCgpa += semesterCgpa[i];
            }
            finalCgpa = finalCgpa/8;
            let semesterGrades = Student.calculateSemesterGrades(semesterCgpa);
            let finalGrades = Student.calculateFinalGrades(finalCgpa);
            let NumberOfYearstoGraduate = yearOfPassing - yearOfEnrollment;
            let tempStudent = new Student(++Student.#studentID, firstName, lastName, fullName, dob, age, semesterCgpa, finalCgpa, semesterGrades, finalGrades, yearOfEnrollment, yearOfPassing, NumberOfYearstoGraduate);
            Student.#allStudents.push(tempStudent);
            return tempStudent;

        } catch (error) {

            console.log(error);
            
        }
    }

    static calculateSemesterGrades(semesterCgpa){
      let semesterGrades = [];
      for (let i = 0; i < semesterCgpa.length; i++) {
        let currentCGPA = semesterCgpa[i];
        if (currentCGPA >= 8.0 && currentCGPA <= 10.0) {
          semesterGrades[i] = "A";
        } else if (currentCGPA >= 6.0 && currentCGPA < 8.0) {
          semesterGrades[i] = "B";
        } else if (currentCGPA >= 5.0 && currentCGPA < 6.0) {
          semesterGrades[i] = "C";
        } else if (currentCGPA >= 4.0 && currentCGPA < 5.0) {
          semesterGrades[i] = "D";
        } else {
          semesterGrades[i] = "F";
        }
      }

        return semesterGrades;
    }

    static calculateFinalGrades(finalCGPA){
        let finalGrade;
        if (finalCGPA >= 8.0 && finalCGPA <= 10.0) {
            finalGrade = "A";
        } else if (finalCGPA >= 6.0 && finalCGPA < 8.0) {
            finalGrade = "B";
        } else if (finalCGPA >= 5.0 && finalCGPA < 6.0) {
            finalGrade = "C";
        } else if (finalCGPA >= 4.0 && finalCGPA < 5.0) {
            finalGrade = "D";
        } else {
            finalGrade = "F";
      }
      return finalGrade;
    }

    //read
    //get All students
    static getAllStudent(){
        return Student.#allStudents;
    }

    //getStudentBy id;
    static getStudentByID(ID){
        try {
            if(typeof ID != "number"){
                throw new Error("id should be numeric");
            }
            if(ID < 0){
                throw new Error("ID should greater than 0");
            }
            if(ID > Student.#allStudents.length){
                throw new Error("Id does not exist")
            }

            for(let i=0; i<Student.#allStudents.length; i++){
                if(Student.#allStudents[i].studentID  == ID){
                    return Student.#allStudents[i];
                }
            }

            return null;

        } catch (error) {
            console.log(error);
            return null;
            
        }

    }

    //update student by id
    static updateStudentById(id , parameterToUpdate , value){
        try {
            if(typeof id != "number"){
                throw new Error("id should be numeric");
            }
            if(id < 0){
                throw new Error("ID should greater than 0");
            }
            if(id > Student.#allStudents.length){
                throw new Error("Id does not exist")
            }

            let foundStudent = Student.getStudentByID(id);

            if(foundStudent == null){
                throw new Error("Student does not exist")
            }

            switch(parameterToUpdate){
                case "firstName":
                    foundStudent.updateFirstName(value);
                    break;
                case "lastName":
                    foundStudent.updateLastName(value);
                    break;
                case "dob":
                    foundStudent.updateDob(value);
                    break;
                case "semesterCgpa":
                    foundStudent.updateSemesterCgpa(value);
                    break;
                case "yearOfEnrollment":
                    foundStudent.updateYearOfEnrollment(value);
                    break;
                case "yearOfPassing":
                    foundStudent.updateYearOfPassing(value);
                    break;
                default:
                    throw new Error("Invalid parameter to update");
            }
            
        } catch (error) {

            console.log(error);
            
        }

    }

    updateFirstName(value){
       try {
        if(typeof value != "string"){
            throw new Error("value is invalid");
        }
        this.firstName = value;
        this.#fullName = this.firstName + " " + this.lastName;
        
       } catch (error) {

        console.log(error);
        
       }
    }

    updateLastName(value){
        try {
            if(typeof value != "string"){
                throw new Error("value is invalid")
            }
            this.lastName = value;
            this.fullName = this.firstName + " " +  this.lastName;
        } catch (error) {
            console.log(error);
            
        }
    }

    updateDob(value) {
        try {
            const datePattern = /^(\d{2})\/(\d{2})\/(\d{4})$/;
            if (!datePattern.test(value)) {
                throw new Error("Invalid DOB format");
            }
            this.dob = value;
          
            const dobDate = new Date(value);
            const currDate = new Date();
            this.#age = currDate.getFullYear() - dobDate.getFullYear();
        } catch (error) {
            console.log(error);
        }
    }

    updateSemesterCgpa(value) {
        try {
            if (!Array.isArray(value) || value.length !== 8) {
                throw new Error("Semester CGPA must be an array of 8 numbers");
            }
            this.semesterCgpa = value;
    
          
            let finalCgpa = 0;
            for (let i = 0; i < value.length; i++) {
                finalCgpa += value[i];
            }
            finalCgpa = finalCgpa / 8;
    
            this.#finalCgpa = finalCgpa;
            this.#semesterGrades = Student.calculateSemesterGrades(value);
            this.#finalGrade = Student.calculateFinalGrades(this.#finalCgpa);
        } catch (error) {
            console.log(error);
        }
    }

    updateYearOfEnrollment(value) {
        try {
            if (typeof value !== "number") {
                throw new Error("Year of enrollment must be numeric");
            }
            this.yearOfEnrollment = value;
            this.#NumberOfYearstoGraduate = this.yearOfPassing - this.yearOfEnrollment;
        } catch (error) {
            console.log(error);
        }
    }

    updateYearOfPassing(value){
        if(typeof value != "number"){
            throw new Error("value is invalid");
        }
        this.yearOfPassing = value;
        this.#NumberOfYearstoGraduate = this.yearOfPassing -  this.yearOfEnrollment;
    }

    //delete student by id
    static deleteStudentById(id){
        try {
            if(typeof id != "number"){
                throw new Error("id Invalid")
            }
            if(id < 0){
                throw new Error("id should greter than 0")
            }

            if(id > Student.#allStudents.length){
                throw new Error("id does not exist")
            }

            let foundStudent = Student.getStudentByID(id);
            foundStudent = null;
            Student.#allStudents = Student.#allStudents.filter(Student => Student.studentID != id);

            
        } catch (error) {

            console.log(error);
            
        }
    }


   


}


let s1 = Student.newStudent("Ajinkya" , "bhagat" , "03/07/2001", [6,6,7,7,7,6,6,6] , 2020 , 2024);

let s2 = Student.newStudent("yash" , "shah" , "07/03/2001", [6,6,7,7,7,6,6,6] , 2020 , 2024);

Student.updateStudentById(1 , "firstName" , "Avishkar");
Student.updateStudentById(1 , "dob" , "09/22/2003");
Student.updateStudentById(1 , "semesterCgpa" , [8,9,4,5,6,7,8,9])
console.log(s1.getFinalGrades());

Student.deleteStudentById(2);

console.log(Student.getAllStudent());

