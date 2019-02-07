const videojs = require('video.js');

(function handleAutoplay() {

    var player = videojs('video-player');
    player.ready(function() {
        var promise = player.play();

        if (promise !== undefined) {
            promise.then(function() {
                // Autoplay started!
            }).catch(function(error) {
                // Autoplay was prevented.
                alert(error);
            });
        }
    });

})();