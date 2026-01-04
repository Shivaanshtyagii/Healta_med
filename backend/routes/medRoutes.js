const express = require('express');
const router = express.Router();
const Medication = require('../models/Medication');

// GET: All medications sorted by newest first
router.get('/', async (req, res) => {
    try {
        const meds = await Medication.find().sort({ createdAt: -1 });
        res.json(meds);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch medications" });
    }
});

// POST: Add new medication
router.post('/', async (req, res) => {
    try {
        const { name, dosage, frequency, stock } = req.body;
        if (!name || !frequency || stock === undefined) {
            return res.status(400).json({ message: "Name, Frequency, and Stock are required" });
        }
        const newMed = new Medication({ name, dosage, frequency, stock });
        await newMed.save();
        res.status(201).json(newMed);
    } catch (err) {
        res.status(500).json({ message: "Error saving to database" });
    }
});

// PUT: Update medication (Edit)
router.put('/:id', async (req, res) => {
    try {
        const { name, dosage, frequency, stock } = req.body;
        const updatedMed = await Medication.findByIdAndUpdate(
            req.params.id,
            { name, dosage, frequency, stock },
            { new: true }
        );
        if (!updatedMed) return res.status(404).json({ message: "Medication not found" });
        res.json(updatedMed);
    } catch (err) {
        res.status(500).json({ message: "Error updating medication" });
    }
});

// PATCH: Mark dose taken & reduce stock
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

// DELETE: Remove medication
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