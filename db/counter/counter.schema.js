const { Schema } = require("mongoose");

export const CounterSchema = Schema(
  {
    userIdCounter: {
      type: Number,
      default: 0,
    },
    roomIdCounter: {
      type: Number,
      default: 0,
    },
    postIdCounter: {
      type: Number,
      default: 0,
    },
  },
  { collection: "counter" }
);
