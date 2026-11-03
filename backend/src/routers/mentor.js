import { Router } from "express";
import valudation from "../middleware/valudation.js";
import mentorControllers from "../controllers/mentor.js";
import update_valudation from "../middleware/update_valudation.js";

const mentor = Router()
mentor
    .post("/add/newMentor", valudation.checkMentor, mentorControllers.addNewMentor)
    .put("/change/MentortoActive/:mentor_id",mentorControllers.changeToActive)
    .put("/update/Mentor/:mentor_id",update_valudation.checkUpdateMentor,mentorControllers.updateMentor)
    .get("/all/Mentor", mentorControllers.allMentor)
    .get("/all/MentorActive", mentorControllers.allMentorActive)
    .get("/all/MentorInactive", mentorControllers.allMentorInactive)
    .delete("/delete/Mentor/:mentor_id",mentorControllers.deleteMentor)


export default mentor
