const Mongoose = require("mongoose");
const slugify=require("slugify")

// console.log('below is mongoose connection')
// console.log(Mongoose.connection)
//https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
//https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript

const BootcampSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: [50, "length cannot exceed 50"],
    unique: true,
    trim: true,
  },
  slug: String,
  description: {
    type: String,
    required: [true,'description is mandatory'],
    maxlength: [500, "length cannot exceed 50"],
  },
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      "Please use a valid url",
    ],
  },
  phone: {
    type: String,
    maxlength: [20, "cant be more than 20"],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "invalid email address",
    ],
  },
  address: {
    type: String,
    required: [true, "please add an address"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
    },
    coodinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      "Web Development",
      "Mobile Development",
      "UI/UX",
      "Data Science",
      "Business",
      "Other",
    ],
  },
  averageRating: {
    type: Number,
    minlength: [1, "min lnegth should be 1"],
    maxlength: [10, "max length should not exced"],
  },
  averageCost: Number,
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

BootcampSchema.pre('save',function(next){
  this.slug=slugify(this.name,{lower:true})
  next();
})

module.exports = Mongoose.model("bootcampapi", BootcampSchema);
