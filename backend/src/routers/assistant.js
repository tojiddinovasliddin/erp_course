import { Router } from "express";
import valudation from "../middleware/valudation.js";
import assistantControllers from "../controllers/assistant.js";
import update_valudation from "../middleware/update_valudation.js";
import { authGuard } from "../guards/auth.js"
import { roleGuard } from "../guards/role.js"

const assistant = Router()
assistant
    .post("/add/newAssistant", authGuard, roleGuard("admin"),valudation.checkAssistant, assistantControllers.addNewAssistant)
    .put("/change/AssistanttoActive/:assistant_id", authGuard, roleGuard("admin"),assistantControllers.changeToActive)
    .put("/update/Assistant/:assistant_id", authGuard, roleGuard("admin","assistant"),update_valudation.checkUpdateAssistant,assistantControllers.updateAsistant)
    .put("/delete/Assistant/:assistant_id", authGuard, roleGuard("admin"), assistantControllers.deleteAssistant)
    .get("/all/Assistant", authGuard, roleGuard("admin"), assistantControllers.allAssistant)
    .get("/all/AssistantActive", authGuard, roleGuard("admin"),assistantControllers.allAssistantActive)
    .get("/all/AssistantInactive", authGuard, roleGuard("admin"), assistantControllers.allAssistantInactive)
    .get("/show/aAssistant/:assistant_id", authGuard, roleGuard("admin"), assistantControllers.showA_assistant)



export default assistant
