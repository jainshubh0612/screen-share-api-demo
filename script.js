const videoElem = document.getElementById("video");
const startElem = document.getElementById("start");
const stopElem = document.getElementById("stop");

startElem.addEventListener("click", function(e) {
      startCapture();
});

stopElem.addEventListener("click", function(e) {
  stopCapture();
});

var displayMediaOptions = {
   video: {
        cursor: "always"
      },
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44100
}
};

async function startCapture() {
 try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);
    dumpOptionsInfo();
  } catch(err) {
    console.error("Error: " + err);
  }
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach(track => track.stop());
  videoElem.srcObject = null;
}



function dumpOptionsInfo() {
      const videoTrack = videoElem.srcObject.getVideoTracks()[0];
     
      console.info("Track settings:");
      console.info(JSON.stringify(videoTrack.getSettings(), null, 2));
      console.info("Track constraints:");
      console.info(JSON.stringify(videoTrack.getConstraints(), null, 2));
}

