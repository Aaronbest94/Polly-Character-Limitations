# Polly-Character-Limitations
Overcome the Polly character limitation Issue 


Implementation 

1.Download Polly.js file to your computer and Upload it to your server.

2.Replace the AWS Identity Pool Id in the Polly.js file with your Identity Pool Id.<br>
&nbsp;&nbsp;&nbsp;AWS.config.region = 'eu-west-1'; // Region<br>
&nbsp;&nbsp;&nbsp;AWS.config.credentials = new AWS.CognitoIdentityCredentials({<br>
&nbsp;&nbsp;&nbsp;IdentityPoolId: '*{IdentityPoolId}*',<br>
&nbsp;&nbsp;&nbsp;});<br>

3.Include the script tags in the head of your site to reference Polly’s sdk & the new Polly.js file:<br>
&nbsp;&nbsp;&nbsp;<script src="https://sdk.amazonaws.com/js/aws-sdk-2.7.20.min.js"></script><br>
&nbsp;&nbsp;&nbsp;<script src="/[ file_path ]/Polly.js"></script><br>
    
4.Add the audio player just before the closing body tag.<br>
&nbsp;&nbsp;&nbsp;<*audio controls id="audioPlayer" src="#" style="display: none;"> </audio*>
  
5.Set the ‘textForSpeech’ Id to whichever Html element you wish to read:<br>
&nbsp;&nbsp;&nbsp;id="textForSpeech"
    
Polly and the Script will handle the rest.
