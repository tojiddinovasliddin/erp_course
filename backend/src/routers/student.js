import { Router } from "express";
import valudation from "../middleware/valudation.js";
import studentControllers from "../controllers/student.js"
import update_valudation from "../middleware/update_valudation.js";
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"

const student = Router()
student
    .post("/add/newStudent",valudation.checkStudent, authGuard, roleGuard("admin"),studentControllers.addNewStudent)
    .post("/user/added/newCourse/:student_id",authGuard,roleGuard("admin"), studentControllers.studentToconnectCoure)
    .get("/user/showAstudent/:student_id", authGuard, roleGuard("admin"), studentControllers.showAStudent)
    .get("/user/ShowAll/Student", authGuard, roleGuard("admin"),studentControllers.showAllStudent)
    .get("/user/ShowAll/ActiveStudent",authGuard,roleGuard("admin"),studentControllers.showAllActiveStudent)
    .get("/user/ShowAll/InActiveStudent",authGuard,roleGuard("admin"),studentControllers.showAllInActiveStudent)
    .put("/delete/AStudent/ACourse/:student_id", authGuard, roleGuard("admin"),studentControllers.deleteAStudentFromCourse)
    .put("/delete/AStudent/AllCourse/:student_id", authGuard, roleGuard("admin"), studentControllers.deleteStudent)
    .put("/update/AStudent/:student_id", update_valudation.checkUpdateStudent, authGuard, roleGuard("admin", 'student'), studentControllers.uptadeStudent)
    .put("/change/studentStatusTO/Active/:student_id", authGuard, roleGuard("admin", 'student'), studentControllers.changeToActive)

export default student
