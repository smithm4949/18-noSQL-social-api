const { Schema, model } = require('mongoose');

// Schema to create user model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(email) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
        },
        message: () => 'invalid email address'
      }
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    thougts: [{ type: Schema.Types.ObjectId, ref: 'Thought' }]
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

userSchema
  .virtual('friendCount')
  .get(function () { return this.friends.length });

const User = model('User', userSchema);

module.exports = User;
