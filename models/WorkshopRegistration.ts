import mongoose, { Schema, models, model } from "mongoose";

const WorkshopRegistrationSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    age: {
      type: Number,
      required: [true, "Age is required"],
      min: [1, "Age must be at least 1"],
      max: [120, "Please enter a valid age"],
    },

    gender: {
      type: String,
      required: [true, "Gender is required"],
      enum: ["Male", "Female", "Other", "Prefer not to say"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
    },

    college: {
      type: String,
      required: [true, "College is required"],
      trim: true,
    },

    workshopSession: {
      type: String,
      required: [true, "Workshop session is required"],
      enum: [
        "Web Development",
        "AI and Technology",
        "Entrepreneurship",
        "Career Development",
      ],
    },

    consent: {
      type: Boolean,
      required: true,
      validate: {
        validator: (value: boolean) => value === true,
        message: "Consent is required",
      },
    },
  },
  {
    timestamps: true,
  }
);

const WorkshopRegistration =
  models.WorkshopRegistration ||
  model("WorkshopRegistration", WorkshopRegistrationSchema);

export default WorkshopRegistration;