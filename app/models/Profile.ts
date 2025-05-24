import  { Schema, Document, model } from "mongoose";

// Reusable average stats type
type StatsAverageType = {
  wpm: number;
  accuracy: number;
  raw: number;
};

// TypeScript interface for Profile
export interface ProfileProps {
  customize: {
    liveWpm: boolean;
    liveAccuracy: boolean;
    smoothCaret: boolean;
    soundOnClick: boolean;
    inputWidth: number;
    fontSize: number;
    caretStyle: string;
    theme: string;
  };
  stats: {
    testsStarted?: number;
    testsCompleted?: number;
    average?: StatsAverageType;
    highest?: StatsAverageType;
  };
  history: {
    timeline: {
      wpm: number;
      accuracy: number;
      raw: number;
      second: number;
    }[];
    errors: number;
    testType: string;
    date: string;
    quoteAuthor?: string;
  }[];
}

// Extend with Mongoose Document
export type ProfileInterface = ProfileProps & Document;

// Schema for average stats
const statsAverageSchema = new Schema(
  {
    wpm: Number,
    accuracy: Number,
    raw: Number,
  },
  { _id: false } // no _id for sub-doc
);

// Main profile schema
const profileSchema = new Schema<ProfileInterface>(
  {
    customize: {
      liveWpm: { type: Boolean, required: true },
      liveAccuracy: { type: Boolean, required: true },
      smoothCaret: { type: Boolean, required: true },
      soundOnClick: { type: Boolean, required: true },
      inputWidth: { type: Number, required: true },
      fontSize: { type: Number, required: true },
      caretStyle: { type: String, required: true },
      theme: { type: String, required: true },
    },
    stats: {
      testsStarted: { type: Number },
      testsCompleted: { type: Number },
      average: statsAverageSchema,
      highest: statsAverageSchema,
    },
    history: [
      {
        timeline: [
          {
            wpm: { type: Number, required: true },
            accuracy: { type: Number, required: true },
            raw: { type: Number, required: true },
            second: { type: Number, required: true },
          },
        ],
        errors: { type: Number, required: true },
        testType: { type: String, required: true },
        date: { type: Date, required: true },
        quoteAuthor: { type: String },
      },
    ],
  },
  { timestamps: true }
);

// Create and export the model
const Profile = model<ProfileInterface>("Profile", profileSchema);
export default Profile;
