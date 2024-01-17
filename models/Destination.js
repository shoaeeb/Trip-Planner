const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema(
  {
    name: {
      type: string,
      required: [true, "Please provide name"],
      trim: true,
    },
    longitude: {
      type: number,
      required: [true, "Please provide longitude"],
    },
    latitude: { type: number, required: [true, "Please provide latitude"] },
    description: {
      type: string,
      required: [true, "Please provide description"],
      trim: true,
    },
    status: {
      type: string,
      required: true,
      enum: ["Upcomming", "Ongoing", "Completed"],
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", DestinationSchema);
