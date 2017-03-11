 (function() {
     function SongPlayer(Fixtures, $rootScope) {
        var SongPlayer = {};
        
             /**
             * @desc Buzz object audio file
             * @type {Object}
             */
             
        var currentBuzzObject = null;
        
        
            /**
             * @desc currentAlbum object
             * @type {Object}
             */
        
        var currentAlbum = Fixtures.getAlbum();
        
             /**
             * @function setSong
             * @desc Stops currently playing song and loads new audio file as currentBuzzObject
             * @param {Object} song
             */
          
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }
         
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentBuzzObject.bind('timeupdate', function() {
                 $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
            });
     });
         
            SongPlayer.currentSong = song;
         };
         
            /**
            * @function playSong
            * @desc Plays currently song and sets playing boolean to true;
            * @param {Object} song
            */
         
         var playSong = function(song){
             currentBuzzObject.play();
             song.playing = true;
         };
         
         // this is where the public variables begin as we attach them to the object to be injected.
         
            /**
            * @function getSongIndex
            * @desc Gets the index of the song wich is playing;
            * @param {Object} song
            */
         
          var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
            };
            
            /**
            * @function stopSong
            * @desc Stops the currently playing song, and sets song.playing = null;
            * @param {Object} song
            */ 
         
          var stopSong = function(song) {
                currentBuzzObject.stop();
                song.playing = null;
            };
            
            /*
            * @desc Active song object from list of songs
            * @type {Object}
            */
         
         SongPlayer.currentSong = null;
         
          /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;
         
        /**
         * @desc Current volume level of currently playing song
         * @type {Number}
         */
         
         SongPlayer.volume = null;
          
         SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            };
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
                stopSong(SongPlayer.currentSong);
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
        
             /**
             * @function setCurrentTime
             * @desc Set current time (in seconds) of currently playing song
             * @param {Number} time
             */
             SongPlayer.setCurrentTime = function(time) {
                 if (currentBuzzObject) {
                     currentBuzzObject.setTime(time);
                 }
             };
             
             SongPlayer.setVolume = function(volume) {
                if (currentBuzzObject) {
                     currentBuzzObject.setVolume(volume);
                 }
             }
        
        
        
        return SongPlayer;
    };
    

    
 
     angular
         .module('blocJams')
         .factory('SongPlayer', ['Fixtures', '$rootScope', SongPlayer]);
 })();