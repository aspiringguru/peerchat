console.log("start index.js")


//https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getUserMedia
//navigator.webkitGetUserMedia({ video: true, audio: false }, function(stream) {
  //console.log("navigator.webKitGetUserMedia")
  var Peer = require('simple-peer');
  var peer = new Peer({
    initiator: location.hash === '#init',
    trickle: false//,
    //stream: stream
  })

  peer.on('signal', function (data) {
    console.log('SIGNAL', JSON.stringify(data))
    document.getElementById('yourId').value = JSON.stringify(data);
    //document.querySelector('#outgoing').textContent = JSON.stringify(data)
  })

  //when connect element clicked, get otherId and signal via simple-peer
  document.getElementById('connect').addEventListener('click', function () {
      var otherId = JSON.parse(document.getElementById('otherId').value)
      peer.signal(otherId)
      console.log("connected.")
    })

  //when send element clicked, get yourMessage and send via simple-peer
  document.getElementById('send').addEventListener('click', function () {
      var yourMessage = document.getElementById('yourMessage').value
      peer.send(yourMessage)
      console.log("sending yourMessage:", yourMessage)
      document.getElementById('messages').textContent += "me:" + yourMessage + '\n'
      document.getElementById('yourMessage').textContent = ""
      console.log("document.getElementById('yourMessage').textContent = ", document.getElementById('yourMessage').textContent)
    })


  peer.on('data', function (data) {
    console.log('data: ' + data)
    document.getElementById('messages').textContent += "them:" + data + '\n'
  })

/*
  peer.on('stream', function(stream){
    var video = document.createElement('video')
    document.body.appendChild(video)
    video.src = window.URL.createObjectURL(stream)
    video.play()
  })
*/

/*
}, function(err) {
  console.log("function(err)")
  console.error(err)
})

*/
