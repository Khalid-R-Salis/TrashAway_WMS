const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleNumber: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    currentLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      }, // [longitude, latitude]
    },
    status: {
      type: String,
      enum: ["idle", "collecting", "maintenance"],
      default: "idle",
    },
  },
  { timestamps: true }
);

// Index location for geospatial queries
vehicleSchema.index({ currentLocation: "2dsphere" });

module.exports = mongoose.model("Vehicle", vehicleSchema);
