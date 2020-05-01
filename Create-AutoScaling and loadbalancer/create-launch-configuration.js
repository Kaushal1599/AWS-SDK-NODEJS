const AWS = require("aws-sdk");
const helpers = require("./helpers");

AWS.config.update({ region: "ap-south-1" });

// Declare local variables
const autoScaling = new AWS.AutoScaling();

const lcName = "hamsterLC";
const roleName = "hamsterLCRole";
const sgName = "hamster_sg3";
const keyName = "hamster_key3";

helpers
  .createIamRole(roleName)
  .then((profileArn) => createLaunchConfiguration(lcName, profileArn))
  .then((data) => console.log(data));

function createLaunchConfiguration(lcName, profileArn) {
  const params = {
    IamInstanceProfile: profileArn,
    ImageId: "ami-0b25fb12e2ee55d89",
    InstanceType: "t2.micro",
    KeyName: keyName,
    LaunchConfigurationName: lcName,
    KeyName: keyName,
    SecurityGroups: [sgName],
    UserData:
      "IyEvYmluL2Jhc2gNCnN1ZG8gYXB0LWdldCB1cGRhdGUNCnN1ZG8gYXB0LWdldCAteSBpbnN0YWxsIGdpdA0KZ2l0IGNsb25lIGh0dHBzOi8vZ2l0aHViLmNvbS9yeWFubXVyYWthbWkvaGJmbC5naXQgL2hvbWUvYml0bmFtaS9oYmZsDQpjaG93biAtUiBiaXRuYW1pOiAvaG9tZS9iaXRuYW1pL2hiZmwNCmNkIC9ob21lL2JpdG5hbWkvaGJmbA0Kc3VkbyBucG0gaQ0Kc3VkbyBucG0gcnVuIHN0YXJ0",
  };

  return new Promise((resolve, reject) => {
    autoScaling.createLaunchConfiguration(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
