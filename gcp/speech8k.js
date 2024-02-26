/**
 * TODO(developer): Uncomment these variables before running the sample.
 */

// Imports the Google Cloud client library
const speechTranscription = require('@google-cloud/speech');

async function transcription(fileName) {
  // Creates a client
  const client = new speechTranscription.SpeechClient();
  
  const fs = require('fs');
  
  // Reads a local audio file and converts it to base64
  const file = fs.readFileSync(fileName);
  const audioBytes = file.toString('base64');
  
  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    content: audioBytes,
  };
  const config = {
      encoding: 'MULAW',
      sampleRateHertz: 8000,
      languageCode: 'ja-JP',
  };
  const request = {
      audio: audio,
      config: config,
  };
  
  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  //console.log(`Transcription: ${transcription}`);
   
  return transcription;
}

async function transcription_base64(audioBytes) {
	  // Creates a client
	  const client = new speechTranscription.SpeechClient();
	  
	  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
	  const audio = {
	    content: audioBytes,
	  };
	  const config = {
	      encoding: 'MULAW',
	      sampleRateHertz: 8000,
	      languageCode: 'ja-JP',
	  };
	  const request = {
	      audio: audio,
	      config: config,
	  };
	  
	  // Detects speech in the audio file
	  const [response] = await client.recognize(request);
	  const transcription = response.results
	    .map(result => result.alternatives[0].transcript)
	    .join('\n');
	  //console.log(`Transcription: ${transcription}`);
	   
	  return transcription;
}

const speech = function() {
  ;
}

speech.prototype.transcription = async function(fileName) {
  return await transcription(fileName);
}

speech.prototype.transcription_base64 = async function(audioBytes) {
	  return await transcription_base64(audioBytes);
}

module.exports = speech;

