const mongoose = require('mongoose');

const commissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },

    commissionType: {
      type: String,
      enum: ['percentage', 'flat'],
      required: true
    },

    commissionValue: {
      type: Number,
      required: true
    },

    category: {
      type: String,
      default: 'all' 
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Commission', commissionSchema);
