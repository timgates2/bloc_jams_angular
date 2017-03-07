(function() {
     function SongPlayer(Fixtures) {
         var SongPlayer = {};
         
         var currentAlbum = Fixtures.getAlbum();
         
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };
         
         SongPlayer.currentSong = null;
         
            /**
            * @desc Buzz object audio file
            * @type {Object}
            */
         
         var currentBuzzObject = null;
         
            /**
            * @function setSong
            * @desc Stops currently playing song and loads new audio file as currentBuzzObject
            * @param {Object} song
            */

         var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };
        
            /**
            * @function playSong
            * @desc Plays currently song and sets playing bool to true;
            * @param {Object} song
            */
         
         var playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;
         };
         
         SongPlayer.play = function(song) {
             song = song || SongPlayer.currentSong;
             if (SongPlayer.currentSong !== song) {
           setSong(song);
           currentBuzzObject.play();
           song.playing = true;
                  } else if (SongPlayer.currentSong === song) {
                      if (currentBuzzObject.isPaused()) {
                          currentBuzzObject.play();
                      }
                  }
              };
              
              SongPlayer.pause = function(song) {
                  song = song || SongPlayer.currentSong;
                  currentBuzzObject.pause();
                  song.playing = false;
              };
         
                /**
                * @function previous
                * @desc Gets the index of the song before the current song which is playing and plays song. stops at beginning.
                */
         
              SongPlayer.previous = function() {
                  var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                  currentSongIndex--;
                  
                  if (currentSongIndex < 0) {
                      currentBuzzObject.stop();
                      SongPlayer.currentSong.playing = null;
                  } else {
                      var song = currentAlbum.songs[currentSongIndex];
                      setSong(song);
                      playSong(song);
                  }
              };
                /**
                * @function next
                * @desc Gets the index of the song after the current song which is playing and plays song. stops at end.
                */

                SongPlayer.next = function() {
                    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
                    currentSongIndex++;

                if (currentSongIndex == currentAlbum.songs.length) {
                    stopSong(SongPlayer.currentSong);
                } else {
                    var song = currentAlbum.songs[currentSongIndex];
                    setSong(song);
                    playSong(song);
                }
            };
         
         return SongPlayer;
    };
    
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', SongPlayer]);
 })();
