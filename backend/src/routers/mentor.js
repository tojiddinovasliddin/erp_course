import { Router } from "express";
import valudation from "../middleware/valudation.js";
import mentorControllers from "../controllers/mentor.js";
import update_valudation from "../middleware/update_valudation.js";
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"

const mentor = Router()
mentor
    .post("/add/newMentor", authGuard, roleGuard("admin"),valudation.checkMentor, mentorControllers.addNewMentor)
    .put("/change/MentortoActive/:mentor_id", authGuard, roleGuard("admin","mentor"),mentorControllers.changeToActive)
    .put("/update/Mentor/:mentor_id",authGuard, roleGuard("admin", "mentor"),update_valudation.checkUpdateMentor,mentorControllers.updateMentor)
    .put("/delete/Mentor/:mentor_id", authGuard, roleGuard("admin"), mentorControllers.deleteMentor)
    .get("/all/Mentor", authGuard, roleGuard("admin"), mentorControllers.allMentor)
    .get("/all/MentorActive", mentorControllers.allMentorActive)
    .get("/all/MentorInactive", authGuard, roleGuard("admin"), mentorControllers.allMentorInactive)
    .get("/show/aMentor/:mentor_id", authGuard, roleGuard("admin", "mentor"), mentorControllers.showAMentor)
    .get("/show/MyCourses/:mentor_id",authGuard,roleGuard("mentor","admin"),mentorControllers.showMyCouses)


export default mentor
