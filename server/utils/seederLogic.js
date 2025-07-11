const dayjs = require("dayjs");

const generateRandomNameWithGender = () => {
  const firstNames = [
    { name: "John", gender: 1 }, // 1
    { name: "Bob", gender: 1 }, // 2
    { name: "Eve", gender: 2 }, // 3
    { name: "Mars", gender: 1 }, // 4
    { name: "Mark", gender: 1 }, // 5
    { name: "Marcus", gender: 1 }, // 6
    { name: "Aaron", gender: 1 }, // 7
    { name: "Jonas", gender: 1 }, // 8
    { name: "Joshua", gender: 1 }, // 9
    { name: "Nash", gender: 1 }, // 10
    { name: "Joy", gender: 1 }, // 11
    { name: "Jennie", gender: 1 }, // 12
    { name: "Jennifer", gender: 1 }, // 13
    { name: "Rose", gender: 2 }, // 14
    { name: "Jane", gender: 2 }, // 15
    { name: "Alice", gender: 2 }, // 16
    { name: "Eli", gender: 2 }, // 17
    { name: "Nancy", gender: 2 }, // 18
    { name: "Oli", gender: 2 }, // 19
    { name: "Ana", gender: 2 }, // 20
  ];
  const lastNames = [
    "Doe",
    "Smith",
    "Johnson",
    "Brown",
    "Lee",
    "Santos",
    "Mendez",
    "Dela Cruz",
    "Rivera",
    "Nichols",
    "Roxas",
    "Villar",
    "Dizon",
    "Uy",
    "Go",
    "Ombog",
    "Legaspi",
    "Samonte",
    "Serapio",
    "Fernandez",
  ];
  const randomFirstNameIndex = Math.floor(Math.random() * firstNames.length);
  const randomLastNameIndex = Math.floor(Math.random() * lastNames.length);
  const firstName = firstNames[randomFirstNameIndex].name;
  const lastName = lastNames[randomLastNameIndex];
  const gender = firstNames[randomFirstNameIndex].gender;

  return {
    firstName,
    lastName,
    gender,
  };
};

const generateRoles = () => {
  const roles = [
    "superadmin", // 1
    "moderator", // 2
    "player", // 3
    "player", // 4
    "player", // 5
    "player", // 6
    "player", // 7
    "player", // 8
    "player", // 9
    "player", // 10
    "player", // 11
    "player", // 12
    "player", // 13
    "player", // 14
    "player", // 15
    "player", // 16
    "player", // 17
    "player", // 18
    "player", // 19
    "player", // 20
    "player", // 21
    "player", // 22
    "player", // 23
    "player", // 24
    "player", // 25
    "player", // 26
    "player", // 27
    "player", // 28
    "player", // 29
    "player", // 30
  ];

  return roles;
};

const generateUUID = () => {
  const roles = [
    "moderator1", // 1
    "player1", // 2
    "player2", // 3
    "player3", // 4
    "player4", // 5
    "player5", // 6
    "player6", // 7
    "player7", // 8
    "player8", // 9
    "player9", // 10
    "player10", // 11
    "player11", // 12
    "player12", // 13
    "player13", // 14
    "player14", // 15
    "player15", // 16
    "player16", // 17
    "player17", // 18
    "player18", // 19
    "player19", // 20
    "player20", // 21
    "player21", // 22
    "player22", // 23
    "player23", // 24
    "player24", // 25
    "player25", // 26
    "player26", // 27
    "player27", // 28
    "player28", // 29
    "player29", // 30
  ];

  return roles;
};

const generateMobileNo = () => {
  const mobileNo = [
    "+639568198701", // 1
    "+639568198702", // 2
    "+639568198703", // 3
    "+639568198704", // 4
    "+639568198705", // 5
    "+639568198706", // 6
    "+639568198707", // 7
    "+639568198708", // 8
    "+639568198709", // 9
    "+639568198710", // 10
    "+639568198711", // 11
    "+639568198712", // 12
    "+639568198713", // 13
    "+639568198714", // 14
    "+639568198715", // 15
    "+639568198716", // 16
    "+639568198717", // 17
    "+639568198718", // 18
    "+639568198719", // 19
    "+639568198720", // 20
    "+639568198721", // 21
    "+639568198722", // 22
    "+639568198723", // 23
    "+639568198724", // 24
    "+639568198725", // 25
    "+639568198726", // 26
    "+639568198727", // 27
    "+639568198728", // 28
    "+639568198729", // 29
    "+639568198730", // 30
  ];
  return mobileNo;
};

const generateGender = () => {
  const gender = ["1", "2"];
  const randomGender = gender[Math.floor(Math.random() * gender.length)];

  return `${randomGender}`;
};

const generateRandomBoolean = () => {
  const boolean = ["1", "2"];
  const randomBoolean = boolean[Math.floor(Math.random() * boolean.length)];

  return `${randomBoolean}`;
};

const generatingRecords = () => {
  const records = [];
  const { v4: uuidv4 } = require("uuid");

  for (let i = 0; i < generateMobileNo().length; i++) {
    const { firstName, lastName, gender } = generateRandomNameWithGender();

    records.push({
      // uuid: uuidv4(),
      uuid: generateUUID()[i],
      firstName: firstName,
      lastName: lastName,
      nickName: `${firstName}${i}`,
      usePresentAddress: 1,
      govtType: "",
      govtId: "",


      role: generateRoles()[i],
      username: null,
      email: null,
      birthdate: null,
      gender: parseInt(gender),
      address: "",
      mobile: generateMobileNo()[i],
      password: "",
      isMobileVerified: 1,
      isEmailVerified: 0,
      isDeactivated: 0,
      isDenied: 0,
      actionStatus: "new",
      isSupervisorApproved: 0,
      isVerifierApproved: 0,
      supervisorWhoApprove: null,
      verifierWhoApprove: null,
      personWhoDeactivated: null,
      personWhoDenied: null,
      deactivatedReason: null,
      deniedReason: null,
      supervisorApprovedAt: null,
      verifierApprovedAt: null,
      createdAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      updatedAt: null,
      deniedAt: null,
    });
  }
  return records;
};

module.exports = {
  generateRandomNameWithGender,
  generateRoles,
  generateRandomBoolean,
  generateMobileNo,
  generatingRecords,
};
