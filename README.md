# AWS CDK NodeJs 18 lambda example

This is a example implementation of the releases NodeJs 18 AWS Lambda runtime.

https://github.com/aws/aws-lambda-base-images/issues/47

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template


## Test Results

**CloudWatch Logs Insights**  
region: eu-central-1  
log-group-names: /aws/lambda/CdkLambdaNode18Stack-Node18Fetch3F1E5CAE-HsbtJibWL1Au  
start-time: -3600s  
end-time: 0s  
query-string:
```
fields @timestamp, @message
| filter @type="REPORT" and ispresent(@initDuration)
| stats count() as coldStarts, avg(@initDuration), min(@initDuration), max(@initDuration) ,avg(@billedDuration), min(@billedDuration), max(@billedDuration) by  bin (10m) as testTime
| sort testTime desc
| limit 2000
```
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|           testTime           | coldStarts | avg(@initDuration) | min(@initDuration) | max(@initDuration) | avg(@billedDuration) | min(@billedDuration) | max(@billedDuration) |
|-------------------------|------------|--------------------|--------------------|--------------------|----------------------|----------------------|----------------------|
| 2022-11-18 13:40:00.000 | 100        | 283.1583           | 202.55             | 592.84             | 381.15               | 327                  | 477                  |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


**CloudWatch Logs Insights**  
region: eu-central-1  
log-group-names: /aws/lambda/CdkLambdaNode18Stack-Node18AwsSdk49BEFC9D-trAehD6a0MAJ  
start-time: -3600s  
end-time: 0s  
query-string:
```
fields @timestamp, @message
| filter @type="REPORT" and ispresent(@initDuration)
| stats count() as coldStarts, avg(@initDuration), min(@initDuration), max(@initDuration) ,avg(@billedDuration), min(@billedDuration), max(@billedDuration) by  bin (10m) as testTime
| sort testTime desc
| limit 2000
```
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|           testTime           | coldStarts | avg(@initDuration) | min(@initDuration) | max(@initDuration) | avg(@billedDuration) | min(@billedDuration) | max(@billedDuration) |
|-------------------------|------------|--------------------|--------------------|--------------------|----------------------|----------------------|----------------------|
| 2022-11-18 13:40:00.000 | 100        | 496.2744           | 389.71             | 679.39             | 210.08               | 183                  | 300                  |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

**CloudWatch Logs Insights**  
region: eu-central-1  
log-group-names: /aws/lambda/CdkLambdaNode18Stack-Node1853A2725A-b7o1yolM1IXi  
start-time: -3600s  
end-time: 0s  
query-string:
```
fields @timestamp, @message
| filter @type="REPORT" and ispresent(@initDuration)
| stats count() as coldStarts, avg(@initDuration), min(@initDuration), max(@initDuration) ,avg(@billedDuration), min(@billedDuration), max(@billedDuration) by  bin (10m) as testTime
| sort testTime desc
| limit 2000
```
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|           testTime           | coldStarts | avg(@initDuration) | min(@initDuration) | max(@initDuration) | avg(@billedDuration) | min(@billedDuration) | max(@billedDuration) |
|-------------------------|------------|--------------------|--------------------|--------------------|----------------------|----------------------|----------------------|
| 2022-11-18 13:50:00.000 | 100        | 492.3161           | 371.02             | 1050.81            | 855.3                | 674                  | 1088                 |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------



## combined results



----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
|           testTime           | coldStarts | avg(@initDuration) | min(@initDuration) | max(@initDuration) | avg(@billedDuration) | min(@billedDuration) | max(@billedDuration) |
|-------------------------|------------|--------------------|--------------------|--------------------|----------------------|----------------------|----------------------|
| 2022-11-18 13:40:00.000 | 100        | 283.1583           | 202.55             | 592.84             | 381.15               | 327                  | 477                  |
| 2022-11-18 13:40:00.000 | 100        | 496.2744           | 389.71             | 679.39             | 210.08               | 183                  | 300                  |
| 2022-11-18 13:50:00.000 | 100        | 492.3161           | 371.02             | 1050.81            | 855.3                | 674                  | 1088                 |
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------
