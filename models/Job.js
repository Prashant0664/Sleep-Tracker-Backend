const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: false
      // default:"NOT DEF",
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please provide mail'],
    },
    starttime: {
      type: [Date],
      default: []
      // required:true, 
    },
    endtime: {
      type: [Date],
      default: []
      // required:true,
    },
    day: {
      type: [Number],
      default: []
    },
    // required:true,
    // },
    hour: {
      type: [Number],
      default: []
      // required:true,
    },
    min: {
      type: [Number],
      default: []
      // required:true,
    },
    second: {
      type: [Number],
      default: []
      // required:true,
    },
    id: {
      type: String,
      unique: true
    },
    month: {
      type: [String],
      default: []
      // required:true,
    },
    status: {
      type: [Boolean],
      default: []
      // default:false,
    },
    token: {
      type: String,
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobSchema);
