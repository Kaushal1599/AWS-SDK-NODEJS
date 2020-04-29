// Imports
const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-south-1" });

// Declare local variables
const ec2 = new AWS.EC2();

createImage("i-0d9c84f2934516f0d", "hamsterImage").then(() =>
  console.log("Complete")
);

function createImage(seedInstanceId, imageName) {
  const params = {
    InstanceId: seedInstanceId,
    Name: imageName,
  };

  return new Promise((resolve, reject) => {
    ec2.createImage(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
