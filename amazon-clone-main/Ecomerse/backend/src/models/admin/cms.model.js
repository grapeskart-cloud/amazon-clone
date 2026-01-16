const mongoose = require("mongoose");

const cmsSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["page", "blog", "media", "seo"],
      required: true
    },

    title: String,
    slug: String,
    content: String,
    category: String,
    tags: [String],

    status: {
      type: String,
      enum: ["Draft", "Published", "Scheduled"],
      default: "Draft"
    },

    author: {
      type: String,
      default: "Admin"
    },

    views: {
      type: Number,
      default: 0
    },

    mediaUrl: String,
    mediaType: String,
    size: String,
    dimensions: String,

    seo: {
      title: String,
      description: String,
      keywords: String,
      robots: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("CMS", cmsSchema);
