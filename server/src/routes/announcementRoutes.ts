import { Router } from "express";
import {
  createAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  updateAnnouncement
} from "../controllers/announcementController";
import { requireAuth } from "../middleware/auth";
import { upload } from "../config/upload";

const router = Router();

router.get("/", getAnnouncements);
router.post("/", requireAuth, upload.single("poster"), createAnnouncement);
router.put("/:id", requireAuth, upload.single("poster"), updateAnnouncement);
router.delete("/:id", requireAuth, deleteAnnouncement);

export default router;
