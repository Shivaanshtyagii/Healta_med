const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');

// Get all medications
router.get('/', async (req, res) => {
    try {
        const meds = await Medication.find().sort({ createdAt: -1 });
        res.json(meds);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch medications" });
    }
});

// Add new medication
router.post('/', async (req, res) => {
    try {
        const { name, dosage, frequency, stock } = req.body;
        // Basic validation to prevent crashes
        if (!name || !frequency || stock === undefined) {
            return res.status(400).json({ message: "Name, Frequency, and Stock are required" });
        }
        const newMed = new Medication({ name, dosage, frequency, stock });
        await newMed.save();
        res.status(201).json(newMed);
    } catch (err) {
        console.error("POST Error:", err.message);
        res.status(500).json({ message: "Error saving to database" });
    }
});

// Mark dose taken & reduce stock
router.patch('/:id/take', async (req, res) => {
    try {
        const med = await Medication.findById(req.params.id);
        if (!med) return res.status(404).json({ message: "Medication not found" });

        if (med.stock > 0) {
            med.stock -= 1;
            await med.save();
            res.json(med);
        } else {
            res.status(400).json({ message: "Out of stock" });
        }
    } catch (err) {
        res.status(500).json({ message: "Error updating stock" });
    }
});

// Delete medication
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Medication.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: "Medication not found" });
        res.json({ message: "Successfully deleted" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting medication" });
    }
});

module.exports = router;