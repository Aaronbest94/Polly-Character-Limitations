window.onload = function(){

	// AWS Configurations
	AWS.config.region = 'eu-west-1'; // Region *Required*
	AWS.config.credentials = new AWS.CognitoIdentityCredentials({
		IdentityPoolId: '*{IdentityPoolId}*', // CognitoIdentityCredentials  *Required*
	});

		// Set Params for calls
	var params = {
			OutputFormat: 'mp3',
			Text: '',
			TextType: 'text',
			VoiceId: 'Joanna',
			SampleRate: '22050'
	};

	// Declaring Needed Varabiles
	var text = document.getElementById("textForSpeech").innerText;
	var player = document.getElementById("audioPlayer");
	var sendingText = '';
	var maxWords = 230;
	var words = text.split(" ");
	var textArray = [];
	var bufferarray = [];

	//Checks length of desired text to send to Polly. If the amount of Words are longer than 230 then break text into an array.
	if (words.length > maxWords){
		 x = 0;
		 while(x < words.length){
			 textArray.push(text.match(/^(?:\w+\W+){0,230}/g).join(" "));
			 var check = text.split(/^(?:\w+\W+){230}/g);
			 var y = 0;
			 check.forEach(function(element) {
				 if(element === ""){
					 check.splice(y, 1);
				 }
				 y++;
			});
			text = check[0];
			x += maxWords;
		 }
	}else{
			//If the amount of Words are not longer than 230 then set text to the first item in the array.
			textArray.push(text);
	}

	// Making Call depending on the the Text Length

	// Call for text over 1400 Characters with loop to assign all calls to an array.
	if (words.length > maxWords){
		var calls = 0; //Counter for the number of calls to be made.
		getUrls();
		function getUrls(){
			//Invoke API call function.
			var promise = makeCall(params, textArray, calls);
			//promise for API call.
			promise.then(function(success){
				bufferarray.push(success);
				//Loop if there are still more calls to make.
				if(textArray.length > calls){
					calls ++;
					getUrls();
				}
				//Run If Statmen when looping is complete.
				if(textArray.length == calls){
					var arrarylength = 0;
					var z = 0;
					//Find length of all items in bufferarray.
					bufferarray.forEach(function() {
						arrarylength += bufferarray[z].length;
						z++;
				 });
				 //Create final Int8Array(masterMp3) array and set its length to the overall length of all bufferarrays (arrarylength).
				 var masterMp3 = new Int8Array(arrarylength);
				 var w = 0;
				 //Combine all 'bufferarrays' items into final 'Int8Array'(masterMp3) array.
				 bufferarray.forEach(function() {
					 if(w == 0){
					 		masterMp3.set(bufferarray[w]);
					 }else{
					    masterMp3.set(bufferarray[w], bufferarray[w-1]);
				 	 }
					 w++;
					});
					//Buffer the final 'Int8Array'(masterMp3) array for play and create blob & Url from that array.
					var arrayBuffer = masterMp3.buffer;
					var blob = new Blob([arrayBuffer]);
					url = URL.createObjectURL(blob);

					//Set final Url to the source of the Audio Player
					player.src = url;
					setPlayerProp(player);
				}
			}).catch(function(error){
				console.log(error)
			});
		};
	}else{
		var calls = 0;

		// Returning data from single call and setting audio src to new url.
		var getPayback = makeCall(params, textArray, calls);
		getPayback.then(function(success){
			bufferarray.push(success);
			var arrayBuffer = bufferarray[0].buffer;
			var blob = new Blob([arrayBuffer]);
			url = URL.createObjectURL(blob);
			player.src = url;
			setPlayerProp(player);
		}).catch(function(error){
			console.log(error);
		});

	}
}

// Function for making API Call.
function makeCall(params, textArray, calls){
	return new Promise(function(resolve, reject){
	let polly = new AWS.Polly();
	params.Text = textArray[calls];
	//The Call to Polly.
	if (textArray[calls]){
	polly.synthesizeSpeech(params, function(err, data) {
			if (err){
				// An error occurred.
				console.log(err, err.stack);
				reject(error);
			}
		  else{
				// Success has occurred.
				resolve(data.AudioStream);
			}
	 });
 }
 });
}

//Setting the Player Properties
function setPlayerProp(player){
	player.style.display = 'block';
	player.style.position = 'fixed';
	player.style.right = '30px';
	player.style.top = '20px';
}
