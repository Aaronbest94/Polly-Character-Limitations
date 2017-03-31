# Polly-Character-Limitations
Overcome the Polly character limitation Issue 


Implementation 

1. Download Polly.js file to your computer and Upload it to your server.

2. Replace the AWS Identity Pool Id in the Polly.js file with your Identity Pool Id.<br>
	AWS.config.region = 'eu-west-1'; // Region<br>
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({<br>
     IdentityPoolId: '*{IdentityPoolId}*',<br>
  });<br>

3. Include the script tags in the head of your site to reference Polly’s sdk & the new Polly.js file:<br>
	<script src="https://sdk.amazonaws.com/js/aws-sdk-2.7.20.min.js"></script><br>
	 <script src="/[ file_path ]/Polly.js"></script><br>
    
4. Add the audio player just before the closing </body> tag.<br>
	  /*<audio controls id="audioPlayer" src="#" style="display: none;"> </audio>*/
  
5. Set the ‘textForSpeech’ Id to whichever Html element you wish to read:
	  id="textForSpeech"
    
Polly and the Script will handle the rest.
