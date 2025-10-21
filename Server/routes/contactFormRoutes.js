import { Router } from "express";
const router = Router();
import { submitForm, getAllForms, getFormById, deleteFormById } from "../controllers/contactFormController.js";

// Public
router.post("/submit", submitForm);

// Admin
router.get("/get/all", getAllForms);
router.get("/get/:id", getFormById);
router.delete("/delete/:id", deleteFormById);

export default router;
