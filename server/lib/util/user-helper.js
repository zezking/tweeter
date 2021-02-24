"use strict";

const Chance = require("chance"),
  chance = new Chance();

const md5 = require("md5");

module.exports = {
  generateRandomUser: () => {
    const gender = chance.gender();
    const firstName = chance.first({ gender: gender });
    const lastName = chance.last();
    const userName = firstName + " " + lastName;

    let userHandle = "@";
    if (Math.random() > 0.5) {
      let prefix = chance.prefix({ gender: gender });
      prefix = prefix.replace(".", "");
      userHandle += prefix;
    }

    userHandle += lastName;

    if (Math.random() > 0.5) {
      const suffix = Math.round(Math.random() * 100);
      userHandle += suffix;
    }

    const avatars = {
      Female: [
        "https://randomuser.me/api/portraits/med/women/91.jpg",
        "https://randomuser.me/api/portraits/med/women/14.jpg",
        "https://randomuser.me/api/portraits/med/women/75.jpg",
        "https://randomuser.me/api/portraits/med/women/28.jpg",
        "https://randomuser.me/api/portraits/med/women/29.jpg",
        "https://randomuser.me/api/portraits/med/women/30.jpg",
        "https://randomuser.me/api/portraits/med/women/31.jpg",
        "https://randomuser.me/api/portraits/med/women/32.jpg",
        "https://randomuser.me/api/portraits/med/women/33.jpg",
        "https://randomuser.me/api/portraits/med/women/34.jpg",
      ],
      Male: [
        "https://randomuser.me/api/portraits/med/men/30.jpg",
        "https://randomuser.me/api/portraits/med/men/65.jpg",
        "https://randomuser.me/api/portraits/med/men/50.jpg",
        "https://randomuser.me/api/portraits/med/men/74.jpg",
        "https://randomuser.me/api/portraits/med/men/50.jpg",
        "https://randomuser.me/api/portraits/med/men/31.jpg",
        "https://randomuser.me/api/portraits/med/men/62.jpg",
        "https://randomuser.me/api/portraits/med/men/53.jpg",
        "https://randomuser.me/api/portraits/med/men/74.jpg",
        "https://randomuser.me/api/portraits/med/men/55.jpg",
      ],
    };

    const avatarArray = avatars[gender];
    const userAvatar =
      avatarArray[Math.floor(Math.random() * avatarArray.length)];

    return {
      name: userName,
      handle: userHandle,
      avatars: userAvatar,
    };
  },
};
