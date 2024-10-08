const mongoose = require("mongoose");

const collectionPointSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
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
    capacity: {
      type: Number,
      required: true,
    }, // Total capacity
    wasteTypes: {
      type: [String],
      enum: ["organic", "recyclable", "hazardous"],
      required: true,
    },
  },
  { timestamps: true }
);

// Index location for geospatial queries
collectionPointSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("CollectionPoint", collectionPointSchema);
