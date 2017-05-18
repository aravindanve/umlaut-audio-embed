/**
* sm2-playlist helper
* for umlaut
* by @aravindanve
* https://github.com/aravindanve
**/

+function ($, window) {

    var PLAY_SELECTOR = '[data-play]';
    var PLAY_ID_ATTRIBUTE = 'data-play';
    var PLAYLIST_SELECTOR = '[data-playlist]';
    var PLAYLIST_ID_ATTRIBUTE = 'data-playlist';
    var PLAYER_ID_ATTRIBUTE = 'data-player';
    var PLAYER_HIDDEN_CLASS = 'hidden';

    var playerTemplate = '\
    <div class="sm2-bar-ui full-width fixed hidden">\
    <div class="bd sm2-main-controls">\
        <div class="sm2-inline-element sm2-button-element">\
            <div class="sm2-button-bd">\
                <a href="#play" class="sm2-inline-button play-pause">Play / pause</a>\
                    </div>\
                </div>\
            <div class="sm2-inline-element sm2-inline-status">\
            <div class="sm2-playlist">\
                <div class="sm2-playlist-target">\
                    <noscript><p>JavaScript is required.</p></noscript>\
                        </div>\
                    </div>\
                <div class="sm2-progress">\
                <div class="sm2-row">\
                    <div class="sm2-inline-time">0:00</div>\
                        <div class="sm2-progress-bd">\
                        <div class="sm2-progress-track">\
                            <div class="sm2-progress-bar"></div>\
                                <div class="sm2-progress-ball"><div class="icon-overlay"></div></div>\
                                </div>\
                            </div>\
                        <div class="sm2-inline-duration">0:00</div>\
                        </div>\
                    </div>\
                </div>\
            <div class="sm2-inline-element sm2-button-element sm2-volume">\
            <div class="sm2-button-bd">\
                <span class="sm2-inline-button sm2-volume-control volume-shade"></span>\
                    <a href="#volume" class="sm2-inline-button sm2-volume-control">volume</a>\
                    </div>\
                </div>\
            <div class="sm2-inline-element sm2-button-element">\
            <div class="sm2-button-bd">\
                <a href="#prev" title="Previous" class="sm2-inline-button previous">&lt; previous</a>\
                    </div>\
                </div>\
            <div class="sm2-inline-element sm2-button-element">\
            <div class="sm2-button-bd">\
                <a href="#next" title="Next" class="sm2-inline-button next">&gt; next</a>\
                    </div>\
                </div>\
            <div class="sm2-inline-element sm2-button-element sm2-menu">\
            <div class="sm2-button-bd">\
                <a href="#menu" class="sm2-inline-button menu">menu</a>\
                    </div>\
                </div>\
            <div class="sm2-inline-element sm2-button-element sm2-close">\
            <div class="sm2-button-bd">\
                <a href="#close" class="sm2-inline-button sm2-close">\
                    <i class="fa fa-close"></i>\
                        </a>\
                    </div>\
                </div>\
            </div>\
        <div class="bd sm2-playlist-drawer sm2-element">\
        <div class="sm2-inline-texture">\
            <div class="sm2-box-shadow"></div>\
                </div>\
            <div class="sm2-playlist-wrapper">\
            <ul class="sm2-playlist-bd">\
                %PLAYLIST%\
                    </ul>\
                </div>\
            </div>\
    </div>';


    var playlists = {};

    function init() {
        $(PLAYLIST_SELECTOR).each(function () {
            var id = $(this).attr(PLAYLIST_ID_ATTRIBUTE);
            var playlist = $(this).html();
            playlists[id] = playlist;
            $(this).remove();
        });

        for (var i in playlists) {
            if (!playlists.hasOwnProperty(i)) {
                continue;
            }

            var $player = $(playerTemplate
                .replace(/%PLAYLIST%/g, playlists[i]));

            $player.attr(PLAYER_ID_ATTRIBUTE, i);
            playlists[i] = $player;
            $('body').append($player);
        }

        initSm2Playlists();
        setTimeout(setupEventHandlers, 100);
    }

    function setupEventHandlers() {
        $(document).on('click', PLAY_SELECTOR, function (e) {
            var playId = $(this).attr(PLAY_ID_ATTRIBUTE);
            if (playlists && 
                playlists[playId]) {
                $('.sm2-bar-ui').each(function () {
                    var $elem = $(this);
                    if ($elem && $elem[0] && $elem[0].__player) {
                        $elem[0].__player.actions.close();
                    }
                });
                playlists[playId][0] && 
                    (playlists[playId][0].__player.actions.play());
                $(playlists[playId]).removeClass(PLAYER_HIDDEN_CLASS);
            }
            return false;
        });
    }

    $(document).ready(function () {

        init();

    });

}(jQuery, window);





