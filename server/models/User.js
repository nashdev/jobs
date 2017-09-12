var crypto = require("crypto");
var bcrypt = require("bcrypt-nodejs");
var Bookshelf = require("../config/bookshelf");

/*
+-----------------------+--------------------------+--------------+
| Column                | Type                     | Modifiers    |
|-----------------------+--------------------------+--------------|
| id                    | integer                  |              |
| name                  | character varying(255)   |              |
| email                 | character varying(255)   | unique       |
| password              | character varying(255)   |              |
| passwordResetToken    | character varying(255)   |              |
| passwordResetExpires  | timestamp with time zone |              |
| location              | character varying(255)   |              |
| website               | character varying(255)   |              |
| picture               | character varying(255)   |              |
| facebook              | character varying(255)   |              |
| github                | character varying(255)   |              |
| twitter               | character varying(255)   |              |
| google                | character varying(255)   |              |
| vk                    | character varying(255)   |              |
+-----------------------+--------------------------+--------------+
*/

var User = Bookshelf.Model.extend({
  tableName: "users",
  hasTimestamps: true,

  initialize: function() {
    this.on("saving", this.hashPassword, this);
  },

  companies: function() {
    return this.hasMany("Company");
  },

  jobs: function() {
    return this.hasMany("Job");
  },

  hashPassword: function(model, attrs, options) {
    var password = options.patch ? attrs.password : model.get("password");
    if (!password) {
      return;
    }
    return new Promise(function(resolve, reject) {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, null, function(err, hash) {
          if (options.patch) {
            attrs.password = hash;
          }
          model.set("password", hash);
          resolve();
        });
      });
    });
  },

  comparePassword: function(password, done) {
    var model = this;
    bcrypt.compare(password, model.get("password"), function(err, isMatch) {
      done(err, isMatch);
    });
  },

  hidden: ["password", "passwordResetToken", "passwordResetExpires"],

  virtuals: {
    gravatar: function() {
      if (!this.get("email")) {
        return "https://gravatar.com/avatar/?s=200&d=retro";
      }
      var md5 = crypto
        .createHash("md5")
        .update(this.get("email"))
        .digest("hex");
      return "https://gravatar.com/avatar/" + md5 + "?s=200&d=retro";
    }
  }
});

module.exports = Bookshelf.model("User", User);
