import bcrypt from "bcryptjs";

const saltRounds = 10;

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    console.log("Hashing password...");

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.error("Error hashing password:", err);
        return reject(err);
      }
      console.log("Password hashed successfully.");
      resolve(hash);
    });
  });
};
