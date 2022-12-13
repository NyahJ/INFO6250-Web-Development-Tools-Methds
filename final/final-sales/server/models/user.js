class User {
  constructor(
    email,
    password,
    firstName,
    lastName,
    createdAt,
    updatedAt,
    records
  ) {
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.records = records;
  }

  static fromJson(json) {
    const jsonObj = JSON.parse(json);
    return new User(
      jsonObj.email,
      jsonObj.password,
      jsonObj.firstName,
      jsonObj.lastName,
      jsonObj.createdAt,
      jsonObj.updatedAt,
      jsonObj.records
    );
  }

  static toJson(user) {
    return JSON.stringify(user);
  }
}

module.exports = User;
