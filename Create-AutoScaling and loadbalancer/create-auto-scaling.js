// Imports
const AWS = require("aws-sdk");

AWS.config.update({ region: "ap-south-1" });

// Declare local variables
const autoScaling = new AWS.AutoScaling();
const asgName = "hamsterASG";
const lcName = "hamsterLC";
const policyName = "hamsterPolicy";
const tgArn =
  "arn:aws:elasticloadbalancing:ap-south-1:460073271477:targetgroup/hamsterTG/09abfade0f4341ab";

createAutoScalingGroup(asgName, lcName)
  .then(() => createASGPolicy(asgName, policyName))
  .then((data) => console.log(data));

function createAutoScalingGroup(asgName, lcName) {
  const params = {
    AutoScalingGroupName: asgName,
    AvailabilityZones: ["ap-south-1a", "ap-south-1b"],
    TargetGroupARNs: [tgArn],
    LaunchConfigurationName: lcName,
    MaxSize: 2,
    MinSize: 1,
  };

  return new Promise((resolve, reject) => {
    autoScaling.createAutoScalingGroup(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

function createASGPolicy(asgName, policyName) {
  const params = {
    AdjustmentType: "ChangeInCapacity",
    AutoScalingGroupName: asgName,
    PolicyName: policyName,
    PolicyType: "TargetTrackingScaling",
    TargetTrackingConfiguration: {
      TargetValue: 5,
      PredefinedMetricSpecification: {
        PredefinedMetricType: "ASGAverageCPUUtilization",
      },
    },
  };

  return new Promise((resolve, reject) => {
    autoScaling.putScalingPolicy(params, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
