const mongoose = require('mongoose');

const MedicationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dosage: { type: String },
    frequency: { type: Number, required: true }, // Times per day [cite: 19]
    stock: { type: Number, required: true },
    lowStockThreshold: { type: Number, default: 3 }, // [cite: 36]
    reminders: [{ time: String, taken: { type: Boolean, default: false } }]
}, { timestamps: true });

module.exports = mongoose.model('Medication', MedicationSchema);