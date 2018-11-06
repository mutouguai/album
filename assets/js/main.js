/*
	Lens by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

/*
	image list
	image init
*/
(function($) {
    //图片列表
    var imglist = [{
        src: 'images/fulls/natural.jpg',
        title: 'Natural',
        desc: 'Beautiful natural scenery.'
    },{
        src: 'images/fulls/Animegirl.jpg',
        title: 'Animegirl',
        desc: 'Anime illustration - beautiful girl.'
    },{
        src: 'images/fulls/EiffelTower.jpg',
        title: 'Eiffel Tower',
        desc: 'Trinket gifts - Eiffel Tower.'
    },{
        src: 'images/fulls/park.jpg',
        title: 'Park',
        desc: 'Everything is picturesque in the autumn park.'
    },{
        src: 'images/fulls/01.jpg',
        title: 'Diam tempus accumsan',
        desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },{
        src: 'images/fulls/02.jpg',
        title: 'Vivamus convallis libero',
        desc: 'Sed velit lacus, laoreet at venenatis convallis in lorem tincidunt.'
    },{
        src: 'images/fulls/03.jpg',
        title: 'Nec accumsan enim felis',
        desc: 'Maecenas eleifend tellus ut turpis eleifend, vitae pretium faucibus.'
    },{
        src: 'images/fulls/04.jpg',
        title: 'Donec maximus nisi eget',
        desc: 'Tristique in nulla vel congue. Sed sociis natoque parturient nascetur.'
    },{
        src: 'images/fulls/05.jpg',
        title: 'Nullam vitae nunc vulputate',
        desc: 'In pellentesque cursus velit id posuere. Donec vehicula nulla.'
    },{
        src: 'images/fulls/06.jpg',
        title: 'Phasellus magna faucibus',
        desc: 'Nulla dignissim libero maximus tellus varius dictum ut posuere magna.'
    },{
        src: 'images/fulls/07.jpg',
        title: 'Proin quis mauris',
        desc: 'Etiam ultricies, lorem quis efficitur porttitor, facilisis ante orci urna.'
    },{
        src: 'images/fulls/08.jpg',
        title: 'Gravida quis varius enim',
        desc: 'Nunc egestas congue lorem. Nullam dictum placerat ex sapien tortor mattis.'
    },{
        src: 'images/fulls/09.jpg',
        title: 'Morbi eget vitae adipiscing',
        desc: 'In quis vulputate dui. Maecenas metus elit, dictum praesent lacinia lacus.'
    },{
        src: 'images/fulls/10.jpg',
        title: 'Habitant tristique senectus',
        desc: 'Vestibulum ante ipsum primis in faucibus orci luctus ac tincidunt dolor.'
    },{
        src: 'images/fulls/11.jpg',
        title: 'Pharetra ex non faucibus',
        desc: 'Ut sed magna euismod leo laoreet congue. Fusce congue enim ultricies.'
    },{
        src: 'images/fulls/12.jpg',
        title: 'Mattis lorem sodales',
        desc: 'Feugiat auctor leo massa, nec vestibulum nisl erat faucibus, rutrum nulla.'
    }];

    var html = '';
    for (var i = 0; i < imglist.length; i++) {
        html += '<article><a class="thumbnail" href="' + imglist[i].src + '"><img src="' + imglist[i].src + '" alt="" /></a>';
        html += '<h2>' + imglist[i].title + '</h2><p>' + imglist[i].desc + '</p></article>';
    }
    $('#thumbnails').append(html);
}
)(jQuery);

var main = (function($) {
    var _ = {

     /**
	 * Settings.
	 * @var {object}
	 */
        settings: {

            // Preload all images.
            preload: false,

            // Slide duration (must match "duration.slide" in _vars.scss).
            slideDuration: 500,

            // Layout duration (must match "duration.layout" in _vars.scss).
            layoutDuration: 750,

            // Thumbnails per "row" (must match "misc.thumbnails-per-row" in _vars.scss).
            thumbnailsPerRow: 2,

            // Side of main wrapper (must match "misc.main-side" in _vars.scss).
            mainSide: 'right'

        },

        /**
	 * Window.
	 * @var {jQuery}
	 */
        $window: null,

        /**
	 * Body.
	 * @var {jQuery}
	 */
        $body: null,

        /**
	 * Main wrapper.
	 * @var {jQuery}
	 */
        $main: null,

        /**
	 * Thumbnails.
	 * @var {jQuery}
	 */
        $thumbnails: null,

        /**
	 * Viewer.
	 * @var {jQuery}
	 */
        $viewer: null,

        /**
	 * Toggle.
	 * @var {jQuery}
	 */
        $toggle: null,

        /**
	 * Nav (next).
	 * @var {jQuery}
	 */
        $navNext: null,

        /**
	 * Nav (previous).
	 * @var {jQuery}
	 */
        $navPrevious: null,

        /**
	 * Slides.
	 * @var {array}
	 */
        slides: [],

        /**
	 * Current slide index.
	 * @var {integer}
	 */
        current: null,

        /**
	 * Lock state.
	 * @var {bool}
	 */
        locked: false,

        /**
	 * Keyboard shortcuts.
	 * @var {object}
	 */
        keys: {

            // Escape: Toggle main wrapper.
            27: function() {
                _.toggle();
            },

            // Up: Move up.
            38: function() {
                _.up();
            },

            // Down: Move down.
            40: function() {
                _.down();
            },

            // Space: Next.
            32: function() {
                _.next();
            },

            // Right Arrow: Next.
            39: function() {
                _.next();
            },

            // Left Arrow: Previous.
            37: function() {
                _.previous();
            }

        },

        /**
	 * Initialize properties.
	 */
        initProperties: function() {

            // Window, body.
            _.$window = $(window);
            _.$body = $('body');

            // Thumbnails.
            _.$thumbnails = $('#thumbnails');

            // Viewer.
            _.$viewer = $('<div id="viewer">' + '<div class="inner">' + '<div class="nav-next"></div>' + '<div class="nav-previous"></div>' + '<div class="toggle"></div>' + '</div>' + '</div>').appendTo(_.$body);

            // Nav.
            _.$navNext = _.$viewer.find('.nav-next');
            _.$navPrevious = _.$viewer.find('.nav-previous');

            // Main wrapper.
            _.$main = $('#main');

            // Toggle.
            $('<div class="toggle"></div>').appendTo(_.$main);

            _.$toggle = $('.toggle');

            // IE<9: Fix viewer width (no calc support).
            if (skel.vars.IEVersion < 9)
                _.$window.on('resize', function() {
                    window.setTimeout(function() {
                        _.$viewer.css('width', _.$window.width() - _.$main.width());
                    }, 100);
                }).trigger('resize');

        },

        /**
	 * Initialize events.
	 */
        initEvents: function() {

            // Window.

            // Remove is-loading-* classes on load.
            _.$window.on('load', function() {

                _.$body.removeClass('is-loading-0');

                window.setTimeout(function() {
                    _.$body.removeClass('is-loading-1');
                }, 100);

                window.setTimeout(function() {
                    _.$body.removeClass('is-loading-2');
                }, 100 + Math.max(_.settings.layoutDuration - 150, 0));

            });

            // Disable animations/transitions on resize.
            var resizeTimeout;

            _.$window.on('resize', function() {

                _.$body.addClass('is-loading-0');
                window.clearTimeout(resizeTimeout);

                resizeTimeout = window.setTimeout(function() {
                    _.$body.removeClass('is-loading-0');
                }, 100);

            });

            // Viewer.

            // Hide main wrapper on tap (<= medium only).
            _.$viewer.on('touchend', function() {

                if (skel.breakpoint('medium').active)
                    _.hide();

            });

            // Touch gestures.
            _.$viewer.on('touchstart', function(event) {

                // Record start position.
                _.$viewer.touchPosX = event.originalEvent.touches[0].pageX;
                _.$viewer.touchPosY = event.originalEvent.touches[0].pageY;

            }).on('touchmove', function(event) {

                // No start position recorded? Bail.
                if (_.$viewer.touchPosX === null || _.$viewer.touchPosY === null)
                    return;

                // Calculate stuff.
                var diffX = _.$viewer.touchPosX - event.originalEvent.touches[0].pageX
                  , diffY = _.$viewer.touchPosY - event.originalEvent.touches[0].pageY;
                boundary = 20,
                delta = 50;

                // Swipe left (next).
                if ((diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta))
                    _.next();

                    // Swipe right (previous).
                else if ((diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta)))
                    _.previous();

                // Overscroll fix.
                var th = _.$viewer.outerHeight()
                  , ts = (_.$viewer.get(0).scrollHeight - _.$viewer.scrollTop());

                if ((_.$viewer.scrollTop() <= 0 && diffY < 0) || (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {

                    event.preventDefault();
                    event.stopPropagation();

                }

            });

            // Main.

            // Touch gestures.
            _.$main.on('touchstart', function(event) {

                // Bail on xsmall.
                if (skel.breakpoint('xsmall').active)
                    return;

                // Record start position.
                _.$main.touchPosX = event.originalEvent.touches[0].pageX;
                _.$main.touchPosY = event.originalEvent.touches[0].pageY;

            }).on('touchmove', function(event) {

                // Bail on xsmall.
                if (skel.breakpoint('xsmall').active)
                    return;

                // No start position recorded? Bail.
                if (_.$main.touchPosX === null || _.$main.touchPosY === null)
                    return;

                // Calculate stuff.
                var diffX = _.$main.touchPosX - event.originalEvent.touches[0].pageX
                  , diffY = _.$main.touchPosY - event.originalEvent.touches[0].pageY;
                boundary = 20,
                delta = 50,
                result = false;

                // Swipe to close.
                switch (_.settings.mainSide) {

                case 'left':
                    result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX > delta);
                    break;

                case 'right':
                    result = (diffY < boundary && diffY > (-1 * boundary)) && (diffX < (-1 * delta));
                    break;

                default:
                    break;

                }

                if (result)
                    _.hide();

                // Overscroll fix.
                var th = _.$main.outerHeight()
                  , ts = (_.$main.get(0).scrollHeight - _.$main.scrollTop());

                if ((_.$main.scrollTop() <= 0 && diffY < 0) || (ts > (th - 2) && ts < (th + 2) && diffY > 0)) {

                    event.preventDefault();
                    event.stopPropagation();

                }

            });
            // Toggle.
            _.$toggle.on('click', function() {
                _.toggle();
            });

            // Prevent event from bubbling up to "hide event on tap" event.
            _.$toggle.on('touchend', function(event) {
                event.stopPropagation();
            });

            // Nav.
            _.$navNext.on('click', function() {
                _.next();
            });

            _.$navPrevious.on('click', function() {
                _.previous();
            });

            // Keyboard shortcuts.

            // Ignore shortcuts within form elements.
            _.$body.on('keydown', 'input,select,textarea', function(event) {
                event.stopPropagation();
            });

            _.$window.on('keydown', function(event) {

                // Ignore if xsmall is active.
                if (skel.breakpoint('xsmall').active)
                    return;

                // Check keycode.
                if (event.keyCode in _.keys) {

                    // Stop other events.
                    event.stopPropagation();
                    event.preventDefault();

                    // Call shortcut.
                    (_.keys[event.keyCode])();

                }

            });

        },

        /**
	 * Initialize viewer.
	 */
        initViewer: function() {

            // Bind thumbnail click event.
            _.$thumbnails.on('click', '.thumbnail', function(event) {

                var $this = $(this);

                // Stop other events.
                event.preventDefault();
                event.stopPropagation();

                // Locked? Blur.
                if (_.locked)
                    $this.blur();

                // Switch to this thumbnail's slide.
                _.switchTo($this.data('index'));

            });

            // Create slides from thumbnails.
            _.$thumbnails.children().each(function() {

                var $this = $(this), $thumbnail = $this.children('.thumbnail'), s;

                // Slide object.
                s = {
                    $parent: $this,
                    $slide: null,
                    $slideImage: null,
                    $slideCaption: null,
                    url: $thumbnail.attr('href'),
                    loaded: false
                };

                // Parent.
                $this.attr('tabIndex', '-1');

                // Slide.

                // Create elements.
                s.$slide = $('<div class="slide"><div class="caption"></div><div class="image"></div></div>');

                // Image.
                s.$slideImage = s.$slide.children('.image');

                // Set background stuff.
                s.$slideImage.css('background-image', '').css('background-position', ($thumbnail.data('position') || 'center'));

                // Caption.
                s.$slideCaption = s.$slide.find('.caption');

                // Move everything *except* the thumbnail itself to the caption.
                $this.children().not($thumbnail).appendTo(s.$slideCaption);

                // Preload?
                if (_.settings.preload) {

                    // Force image to download.
                    var $img = $('<img src="' + s.url + '" />');

                    // Set slide's background image to it.
                    s.$slideImage.css('background-image', 'url(' + s.url + ')');

                    // Mark slide as loaded.
                    s.$slide.addClass('loaded');
                    s.loaded = true;

                }

                // Add to slides array.
                _.slides.push(s);

                // Set thumbnail's index.
                $thumbnail.data('index', _.slides.length - 1);

            });

        },

        /**
	 * Initialize stuff.
	 */
        init: function() {

            // IE<10: Zero out transition delays.
            if (skel.vars.IEVersion < 10) {

                _.settings.slideDuration = 0;
                _.settings.layoutDuration = 0;

            }

            // Skel.
            skel.breakpoints({
                xlarge: '(max-width: 1680px)',
                large: '(max-width: 1280px)',
                medium: '(max-width: 980px)',
                small: '(max-width: 736px)',
                xsmall: '(max-width: 480px)'
            });

            // Everything else.
            _.initProperties();
            _.initViewer();
            _.initEvents();

            // Initial slide.
            window.setTimeout(function() {

                // Show first slide if xsmall isn't active or it just deactivated.
                skel.on('-xsmall !xsmall', function() {

                    if (_.current === null)
                        _.switchTo(0, true);

                });

            }, 0);

        },

        /**
	 * Switch to a specific slide.
	 * @param {integer} index Index.
	 */
        switchTo: function(index, noHide) {

            // Already at index and xsmall isn't active? Bail.
            if (_.current == index && !skel.breakpoint('xsmall').active)
                return;

            // Locked? Bail.
            if (_.locked)
                return;

            // Lock.
            _.locked = true;

            // Hide main wrapper if medium is active.
            if (!noHide && skel.breakpoint('medium').active && skel.vars.IEVersion > 8)
                _.hide();

            // Get slides.
            var oldSlide = (_.current !== null ? _.slides[_.current] : null)
              , newSlide = _.slides[index];

            // Update current.
            _.current = index;

            // Deactivate old slide (if there is one).
            if (oldSlide) {

                // Thumbnail.
                oldSlide.$parent.removeClass('active');

                // Slide.
                oldSlide.$slide.removeClass('active');

            }

            // Activate new slide.

            // Thumbnail.
            newSlide.$parent.addClass('active').focus();

            // Slide.
            var f = function() {

                // Old slide exists? Detach it.
                if (oldSlide)
                    oldSlide.$slide.detach();

                // Attach new slide.
                newSlide.$slide.appendTo(_.$viewer);

                // New slide not yet loaded?
                if (!newSlide.loaded) {

                    window.setTimeout(function() {

                        // Mark as loading.
                        newSlide.$slide.addClass('loading');

                        // Wait for it to load.
                        $('<img src="' + newSlide.url + '" />').on('load', function() {
                            //window.setTimeout(function() {

                            // Set background image.
                            newSlide.$slideImage.css('background-image', 'url(' + newSlide.url + ')');

                            // Mark as loaded.
                            newSlide.loaded = true;
                            newSlide.$slide.removeClass('loading');

                            // Mark as active.
                            newSlide.$slide.addClass('active');

                            // Unlock.
                            window.setTimeout(function() {
                                _.locked = false;
                            }, 100);

                            //}, 1000);
                        });

                    }, 100);

                }
                // Otherwise ...
                else {

                    window.setTimeout(function() {

                        // Mark as active.
                        newSlide.$slide.addClass('active');

                        // Unlock.
                        window.setTimeout(function() {
                            _.locked = false;
                        }, 100);

                    }, 100);

                }

            };

            // No old slide? Switch immediately.
            if (!oldSlide)
                (f)();

                // Otherwise, wait for old slide to disappear first.
            else
                window.setTimeout(f, _.settings.slideDuration);

        },

        /**
	 * Switches to the next slide.
	 */
        next: function() {

            // Calculate new index.
            var i, c = _.current, l = _.slides.length;

            if (c >= l - 1)
                i = 0;
            else
                i = c + 1;

            // Switch.
            _.switchTo(i);

        },

        /**
	 * Switches to the previous slide.
	 */
        previous: function() {

            // Calculate new index.
            var i, c = _.current, l = _.slides.length;

            if (c <= 0)
                i = l - 1;
            else
                i = c - 1;

            // Switch.
            _.switchTo(i);

        },

        /**
	 * Switches to slide "above" current.
	 */
        up: function() {

            // Fullscreen? Bail.
            if (_.$body.hasClass('fullscreen'))
                return;

            // Calculate new index.
            var i, c = _.current, l = _.slides.length, tpr = _.settings.thumbnailsPerRow;

            if (c <= (tpr - 1))
                i = l - (tpr - 1 - c) - 1;
            else
                i = c - tpr;

            // Switch.
            _.switchTo(i);

        },

        /**
	 * Switches to slide "below" current.
	 */
        down: function() {

            // Fullscreen? Bail.
            if (_.$body.hasClass('fullscreen'))
                return;

            // Calculate new index.
            var i, c = _.current, l = _.slides.length, tpr = _.settings.thumbnailsPerRow;

            if (c >= l - tpr)
                i = c - l + tpr;
            else
                i = c + tpr;

            // Switch.
            _.switchTo(i);

        },

        /**
	 * Shows the main wrapper.
	 */
        show: function() {

            // Already visible? Bail.
            if (!_.$body.hasClass('fullscreen'))
                return;

            // Show main wrapper.
            _.$body.removeClass('fullscreen');

            // Focus.
            _.$main.focus();

        },

        /**
	 * Hides the main wrapper.
	 */
        hide: function() {

            // Already hidden? Bail.
            if (_.$body.hasClass('fullscreen'))
                return;

            // Hide main wrapper.
            _.$body.addClass('fullscreen');

            // Blur.
            _.$main.blur();

        },

        /**
	 * Toggles main wrapper.
	 */
        toggle: function() {

            if (_.$body.hasClass('fullscreen'))
                _.show();
            else
                _.hide();

        },

    };
    return _;
}
)(jQuery);
main.init();