/**
* sm2-playlist helper
* for umlaut
* by @aravindanve
* https://github.com/aravindanve
**/

+function ($, window) {

    var PLAY_SELECTOR = '[data-play]';
    var PLAY_ID_ATTRIBUTE = 'data-play';
    var PLAY_PLAYING_CLASS = 'playing';
    var PLAY_ICON_SELECTOR = '[data-play-icon]';
    var PLAYLIST_SELECTOR = '[data-playlist]';
    var PLAYLIST_ID_ATTRIBUTE = 'data-playlist';
    var PLAYER_ID_ATTRIBUTE = 'data-player';
    var PLAYER_HIDDEN_CLASS = 'hidden';

    var playIconTemplate = '<span class="fa fa-play-circle"></span>';
    var pauseIconTemplate = '<span class="fa fa-pause-circle"></span>';
    var playerTemplate = '\
    <div class="sm2-bar-ui full-width fixed hidden">\
    <div class="bd sm2-main-controls">\
        <div class="sm2-inline-element sm2-button-element">\
            <div class="sm2-button-bd">\
                <a href="#play" class="sm2-inline-button play-pause"></a>\
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
            <div class="sm2-inline-element sm2-button-element sm2-volume mobile-hidden">\
            <div class="sm2-button-bd">\
                <span class="sm2-inline-button sm2-volume-control volume-shade"></span>\
                    <a href="#volume" class="sm2-inline-button sm2-volume-control"></a>\
                    </div>\
                </div>\
            <div class="sm2-inline-element sm2-button-element mobile-hidden">\
            <div class="sm2-button-bd">\
                <a href="#prev" title="Previous" class="sm2-inline-button previous"></a>\
                    </div>\
                </div>\
            <div class="sm2-inline-element sm2-button-element mobile-hidden">\
            <div class="sm2-button-bd">\
                <a href="#next" title="Next" class="sm2-inline-button next"></a>\
                    </div>\
                </div>\
            <div class="sm2-inline-element sm2-button-element sm2-menu">\
            <div class="sm2-button-bd">\
                <a href="#menu" class="sm2-inline-button menu"></a>\
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

        $(PLAY_ICON_SELECTOR).html(playIconTemplate);

        initSm2Playlists();
        setTimeout(setupEventHandlers, 100);
    }

    function setupEventHandlers() {
        $(document).on('click', PLAY_SELECTOR, function (e) {
            var playId = $(this).attr(PLAY_ID_ATTRIBUTE);
            var playing = $(this).hasClass(PLAY_PLAYING_CLASS);

            if (playlists && 
                playlists[playId]) {
                $('.sm2-bar-ui').each(function () {
                    var $elem = $(this);
                    if ($elem && $elem[0] && $elem[0].__player) {
                        $elem[0].__player.actions.close();
                    }
                });

                $(PLAY_SELECTOR)
                    .removeClass(PLAY_PLAYING_CLASS);
                    
                $(PLAY_ICON_SELECTOR)
                    .html(playIconTemplate);

                if (!playing) {
                    playlists[playId][0] && 
                        (playlists[playId][0]
                            .__player.actions.play());

                    $(playlists[playId])
                        .removeClass(PLAYER_HIDDEN_CLASS);

                    $(this)
                        .addClass(PLAY_PLAYING_CLASS)
                        .find(PLAY_ICON_SELECTOR)
                        .html(pauseIconTemplate);
                }
            }
            return false;
        });
    }

    $(document).ready(function () {

        init();

    });

}(jQuery, window);





