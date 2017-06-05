/************************************************************************************************
 * jquery.mlens.js
 * http://mlens.musings.it
 * magnifying lens jQuery plugin for images
 * originally developed for the project "RubiniFirma" and released as a freebie
 * based on jquery.imageLens.js by http://www.dailycoding.com
 *
 * mlens supports multiple instances, these are the configurable parameters
 * lensShape: shape of the lens (square or circle)
 * lensSize: lens dimension (in px or in %, it can be also an array ["10%","20%"] to differentiate horizontal and vertical dimension)
 * borderSize: lens border size (in px)
 * borderColor: lens border color (hex value)
 * borderRadius: lens border radius (if you like rounded corners when the shape is "square")
 * imgSrc: address of the hi-res image
 * lensCss: lens class if you like to style it your own way
 * imgOverlay: address of the overlay image for the lens (optional)
 * overlayAdapt: boolean that indicates if the overlay image has to adapt to the lens size (dafault: true)
 * imgSrc2x: address of the double pixel density image (for retina displays)
 * zoomLevel: number for moltiplicating the zoom (zoomed image can pixellate!)
 * responsive: boolean that indicates if mlens should act responsively or not (default: true)
 *
 * @author Federica Sibella
 * Copyright (c) 2012-15 Federica Sibella - musings(at)musings(dot)it | http://www.musings.it
 * Double licensed MIT or GPLv3.
 * Date: 2015/12/11
 * @version 1.6
 *
 * changelog:
 * 2015/12/11 responsive version v.1.6
 * 2014/09/25 bug fix on destroy method, debugged with jshint v.1.5
 * 2014/05/22 rewritten destroy method, added zoomLevel, some parts of the code optimized v.1.4
 * 2013/12/16 added retina support v.1.3
 * 2013/09/25 added overlay image control v. 1.2
 * 2013/08/26 added touch support for v. 1.1
 ************************************************************************************************/

;(function($){
	// global variables
	var mlens = [], // mlens array
		instance = 0, // instance of mlens
		methods = { // methods for mlens plugin
		// function for initializing the lens instance
		init: function(options) {
			// Defaults for lens options
			var defaults = {
				lensShape: "square",
				lensSize: [100,100],
   				borderSize: 4,
    			borderColor: "#888",
				borderRadius: 0,
				imgSrc: "",
				imgSrc2x: "",
				lensCss: "",
				imgOverlay: "",
				overlayAdapt: true,
				zoomLevel: 1,
				responsive: true
			},
			settings = $.extend({}, defaults, options),
			lensSizeHoriz = "100px", // initial value of the lens horizontal dimension string
			lensSizeVert = "100px"; // initial value of the lens vertical dimension string

			// for each instance of mlens
			this.each(function () {
				// internal variables
				var $image = $(this), 				// the image on which mlens is called
					data = $image.data("mlens"), 	// data array for mlens
					$target = $(), 					// the target lens
					$overlay = $(), 				// lens overlay
					$imageWrapper = $(), 			// image wrapper for attaching lens and hi-res image correctly
					$imageTag = $(), 				// hi-res hidden image
					imgSrc = $image.attr("src"), 	// initial value of the hi-res image src
					imgWidth = "auto"; 				// initial width of the underlying hi-res image

				// control on the zoomLevel parameter: must be a number, must be > 0
				if(typeof(settings.zoomLevel) !== "number" || settings.zoomLevel <= 0) {
					settings.zoomLevel = defaults.zoomLevel;
				}

				// create a new image out of the DOM for precise measurements
				var bigimg = new Image();

				// have we got retina image and the device has retina support?
				if(settings.imgSrc2x !== "" && window.devicePixelRatio > 1) {
					imgSrc = settings.imgSrc2x;
					// after the big image has been fully loaded
					bigimg.onload = function() {
						// take its width and divide by 2
						imgWidth = String(parseInt(this.width/2) * settings.zoomLevel) + "px";
						// use it as the background size for the lens
						$target.css({"backgroundSize": imgWidth + " auto"});
						// use it as the width for the hi-res image itself
						$imageTag.css({"width": imgWidth});
					};
					bigimg.src = imgSrc;
				}
				else {
					// if there's imgSrc in the settings use it
					if(settings.imgSrc !== "") {
						imgSrc = settings.imgSrc;
					}
					// after the big image has been fully loaded
					bigimg.onload = function() {
						// take its width and divide by 2
						imgWidth = String(parseInt(this.width) * settings.zoomLevel) + "px";
						// use it as the background size for the lens
						$target.css({"backgroundSize": imgWidth + " auto"});
						// use it as the width for the hi-res image itself
						$imageTag.css({"width": imgWidth});
					};
					bigimg.src = imgSrc;
				}

				// build lensSize dimensions: if it is an array, separate horizontal and vertical lens dimensions
				if(jQuery.isArray(settings.lensSize) === true) {
					if(check_string(settings.lensSize[0],"%") || check_string(settings.lensSize[0],"px"))
						lensSizeHoriz = String(settings.lensSize[0]);
					else
						lensSizeHoriz = String(settings.lensSize[0]) + "px";

					if(check_string(settings.lensSize[1],"%") || check_string(settings.lensSize[1],"px"))
						lensSizeVert = String(settings.lensSize[1]);
					else
						lensSizeVert = String(settings.lensSize[1]) + "px";
				}
				else { // else horizontal and vertical are the same
					if(check_string(settings.lensSize,"%") || check_string(settings.lensSize,"px"))
						lensSizeHoriz = String(settings.lensSize);
					else
						lensSizeHoriz = String(settings.lensSize) + "px";

					lensSizeVert = lensSizeHoriz;
				}

				// build lens style using user's settings
				var lensStyle = "background-position: 0px 0px;width: " + lensSizeHoriz + ";height: " + lensSizeVert + ";" + "float: left;display: none;border: " + String(settings.borderSize) + "px solid " + settings.borderColor + ";" + "background-repeat: no-repeat;position: absolute;";

				// build image overlay style (just in case it has to be used)
				var overlayStyle= "position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-position: center center; background-repeat: no-repeat; z-index: 1;";

				// if overlay image has to adapt to lens size
				if(settings.overlayAdapt === true) {
					overlayStyle = overlayStyle + "background-position: center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
				}

				// choosing lens shape and overlay style on the basis of user's settings
				switch(settings.lensShape) {
					case "square":
						lensStyle = lensStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
						overlayStyle = overlayStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
					break;
					case "":
						lensStyle = lensStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
						overlayStyle = overlayStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
					break;
					case "circle":
						lensStyle = lensStyle + "border-radius: 50%;";
						overlayStyle = overlayStyle + "border-radius: 50%;";
					break;
					default:
						lensStyle = lensStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
						overlayStyle = overlayStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
					break;
				}

				// lens wrapping div to attach target lens and hi-res image correctly
				$image.wrap("<div id='mlens_wrapper_" + instance + "' />");
				$imageWrapper = $image.parent();

				// if responsive set image width to 100% of its container
				if(settings.responsive === true) {
					$image.css({"width":"100%"});
				}
				else { // else set give a width to the wrapper equal to image width
					$imageWrapper.css({"width": $image.width()});
				}

				// create the target lens
				$target = $("<div class='mlens_target' id='mlens_target_" + instance + "' style='" + lensStyle + "' class='" + settings.lensCss + "'><div class='dot_container'><div class='dot'>&nbsp;</div></div></div>").appendTo($imageWrapper);

				// lens style on the basis of the previous infos
	            $target.css({
					"backgroundImage": "url('" + imgSrc + "')",
					"backgroundSize": imgWidth + " auto",
					"cursor": "none"
				});

				// create hi-res image tag
				$imageTag = $("<img style='display:none;width:" + imgWidth + ";height:auto;max-width:none;max-height;none;' src='" + imgSrc + "' />").appendTo($imageWrapper);

				// if there's an overlay append it to the $target lens
				if(settings.imgOverlay !== "") {
					// create the overlay
					$overlay = $("<div id='mlens_overlay_" + instance + "' style='" + overlayStyle + "'>&nbsp;</div>");

					// style the overlay
					$overlay.css({
						"backgroundImage": "url('" + settings.imgOverlay + "')",
						"cursor": "none"
					});

					// append it to the $target lens
					$overlay.appendTo($target);
				}

				// give the image a data-id attribute containing the instance for future use
	            $image.attr("data-id","mlens_" + instance);

				//attaching mousemove event both to the target and to the image
				$target.mousemove(function(e) {
					$.fn.mlens("move",$image.attr("data-id"),e);
				});

	            $image.mousemove(function(e) {
					$.fn.mlens("move",$image.attr("data-id"),e);
				});

				//touch events imitating mousemove both for the target and for the image
				$target.on("touchmove", function(e) {
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					$.fn.mlens("move",$image.attr("data-id"),touch);
				});

	            $image.on("touchmove",function(e) {
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
					$.fn.mlens("move",$image.attr("data-id"),touch);
				});

				//target visibility relies both on its own visibility and that of the original image
				$target.hover(function() {
					$(this).show();
				}, function() {
					$(this).hide();
				});

				$image.hover(function() {
					$target.show();
				}, function() {
					$target.hide();
				});

				//touch events for the target (target visibility)
				$target.on("touchstart", function(e) {
					e.preventDefault();
					$(this).show();
				});

				$target.on("touchend", function(e) {
					e.preventDefault();
					$(this).hide();
				});

				//touch events for the image (target visibility)
				$image.on("touchstart", function(e) {
					e.preventDefault();
					$target.show();
				});

				$image.on("touchend", function(e) {
					e.preventDefault();
					$target.hide();
				});

				//saving data in mlens instance
				$image.data("mlens", {
					image: $image,
					settings: settings,
					target: $target,
					imageTag: $imageTag,
					imgSrc: imgSrc,
					imgWidth: imgWidth,
					imageWrapper: $imageWrapper,
					overlay: $overlay,
					instance: instance,
					lensSizeHoriz: lensSizeHoriz,
					lensSizeVert: lensSizeVert
				});

				// saving data in the data array and in mlens instance array
				data = $image.data("mlens");
				mlens[instance] = data;

				//instance increment
				instance++;
				return mlens;
			});
		},
		// function that defines "move" command
		move: function(id,e) {
			id = find_instance(id);
			// taking parameters values based on the instance
			var data = mlens[id],
				$image = data.image,
				$target = data.target,
				$imageTag = data.imageTag,
				offset = $image.offset(),
        		leftPos = parseInt(e.pageX - offset.left),
        		topPos = parseInt(e.pageY - offset.top),
				widthRatio = $imageTag.width() / $image.width(),
				heightRatio = $imageTag.height() / $image.height();

			// if mouse position is inside our image
	        if(leftPos > 0 && topPos > 0 && leftPos < $image.width() && topPos < $image.height()) {
				// calculating hi-res image position as target lens background
	            leftPos = String(-((e.pageX - offset.left) * widthRatio  - $target.width() / 2));
	            topPos = String(-((e.pageY - offset.top) * heightRatio - $target.height() / 2));
	            $target.css({"backgroundPosition": leftPos + "px " + topPos + "px"});

				// calculating target lens position inside the image
							var ua = navigator.userAgent.toLowerCase();
							var isAndroid = ua.indexOf("android") > -1;
	            leftPos = String(e.pageX - offset.left - $target.width() / 2);
	            topPos = String(e.pageY - offset.top - $target.height() / 2);

							if(isAndroid) {
								$target.css({"left": leftPos + "px", "top": topPos - 50 + "px"});
							} else {
		            $target.css({"left": leftPos + "px", "top": topPos - 20 + "px"});
							}
	        }

			// saving new data in the mlens instance
			data.target = $target;

			mlens[id] = data;
			return mlens;
		},
		// function that defines "update" command (to modify mlens options on-the-fly)
		// same functioning as init
		update: function(options) {
			var id = find_instance($(this).attr("data-id")),
				data = mlens[id],
				$image = data.image,
				$target = data.target,
				$overlay = data.overlay,
				$imageTag = data.imageTag,
				imgSrc = data.imgSrc,
				defaults = data.settings,
				settings = $.extend({}, defaults, options),
				lensSizeHoriz = data.lensSizeHoriz,
				lensSizeVert = data.lensSizeVert,
				imgWidth = "auto",
				bigimg = new Image(); // create a new image out of the DOM for precise measurements

			if(settings.imgSrc2x !== "" && window.devicePixelRatio > 1) {
				imgSrc = settings.imgSrc2x;

				bigimg.onload = function() {
					imgWidth = String(parseInt(this.width/2) * settings.zoomLevel) + "px";
					$target.css({"backgroundSize": imgWidth + " auto"});
					$imageTag.css({"width": imgWidth});
				};
				bigimg.src = imgSrc;
			}
			else {
				// if there's imgSrc in the settings use it
				if(settings.imgSrc !== "") {
					imgSrc = settings.imgSrc;
				}

				// after the big image has been fully loaded
				bigimg.onload = function() {
					// take its width and divide by 2
					imgWidth = String(parseInt(this.width) * settings.zoomLevel) + "px";
					// use it as the background size for the lens
					$target.css({"backgroundSize": imgWidth + " auto"});
					// use it as the width for the hi-res image itself
					$imageTag.css({"width": imgWidth});
				};
				bigimg.src = imgSrc;
			}

			if(jQuery.isArray(settings.lensSize) === true) {
				if(check_string(settings.lensSize[0],"%") || check_string(settings.lensSize[0],"px"))
					lensSizeHoriz = String(settings.lensSize[0]);
				else
					lensSizeHoriz = String(settings.lensSize[0]) + "px";

				if(check_string(settings.lensSize[1],"%") || check_string(settings.lensSize[1],"px"))
					lensSizeVert = String(settings.lensSize[1]);
				else
					lensSizeVert = String(settings.lensSize[1]) + "px";
			}
			else {
				if(check_string(settings.lensSize,",")) {
					var lensSizeArray = settings.lensSize.split(",");

					if(check_string(lensSizeArray[0],"%") || check_string(lensSizeArray[0],"px"))
						lensSizeHoriz = String(lensSizeArray[0]);
					else
						lensSizeHoriz = String(lensSizeArray[0]) + "px";

					if(check_string(lensSizeArray[1],"%") || check_string(lensSizeArray[1],"px"))
						lensSizeVert = String(lensSizeArray[1]);
					else
						lensSizeVert = String(lensSizeArray[1]) + "px";
				}
				else { // else horizontal and vertical are the same
					if(check_string(settings.lensSize,"%") || check_string(settings.lensSize,"px"))
						lensSizeHoriz = String(settings.lensSize);
					else
						lensSizeHoriz = String(settings.lensSize) + "px";

					lensSizeVert = lensSizeHoriz;
				}
			}

			var lensStyle = "background-position: 0px 0px;width: " + lensSizeHoriz + ";height: " + lensSizeVert + "; float: left;display: none;border: " + String(settings.borderSize) + "px solid " + settings.borderColor + ";" + "background-repeat: no-repeat;position: absolute;";

			var overlayStyle= "position: absolute; width: 100%; height: 100%; left: 0; top: 0; background-position: center center; background-repeat: no-repeat; z-index: 1;";

			if(settings.overlayAdapt === true) {
				overlayStyle = overlayStyle + "background-position: center center fixed; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;";
			}

			switch(settings.lensShape) {
				case "square":
					lensStyle = lensStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
					overlayStyle = overlayStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
				break;
				case "":
					lensStyle = lensStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
					overlayStyle = overlayStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
				break;
				case "circle":
					lensStyle = lensStyle + "border-radius: 50%;";
					overlayStyle = overlayStyle + "border-radius: 50%;";
				break;
				default:
					lensStyle = lensStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
					overlayStyle = overlayStyle + "border-radius:"  + String(settings.borderRadius) + "px;";
				break;
			}

			$target.attr("style", lensStyle);
			$imageTag.attr("src", imgSrc);
			$imageTag.css({"width": imgWidth});
            $target.css({
				"backgroundImage": "url('" + imgSrc + "')",
				"backgroundSize": imgWidth + " auto",
				"cursor": "none"
			});

			$overlay.attr("style", overlayStyle);
			$overlay.css({
				"backgroundImage": "url('" + settings.imgOverlay + "')",
				"cursor": "none"
			});

			data.image = $image;
			data.target = $target;
			data.overlay = $overlay;
			data.settings = settings;
			data.imgSrc = imgSrc;
			data.imageTag = $imageTag;
			data.lensSizeHoriz = lensSizeHoriz;
			data.lensSizeVert = lensSizeVert;

			mlens[id] = data;
			return mlens;
		},
		//function that destroys mlens instance
		destroy: function() {
			var id = find_instance($(this).attr("data-id")),
				data = mlens[id];
			data.target.remove();
			data.imageTag.remove();
			data.image.unwrap();
			data.overlay.remove();
            $.removeData(data, "mlens");
		    this.unbind();
		    this.element = null;
        }
	};

	/**
	 * service functions
	 */

	/**
	 * function to find mlens actual instance
	 * @param {Object} id
	 */
	function find_instance(id) {
		if(typeof(id) === "string") {
			var position = id.indexOf("_");
			if(position != -1) {
				id = id.substr(position+1);
			}
		}
		return id;
	}

	/**
	 * function to check if needle is contained in string
	 * @param {string} id, {string} needle
	 */
	function check_string(string, needle) {
		if(typeof(string) === "string") {
			var position = string.indexOf(needle);
			if(position != -1) {
				return true;
			}
		}
		return false;
	}

	/**
	 * function that generates mlens plugin
	 * @param {Object} method
	 */
	$.fn.mlens = function(method) {
	    //method calling logic
	    if(methods[method]) {
	      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
	    }
		else if( typeof method === 'object' || !method) {
	      return methods.init.apply(this, arguments);
	    }
		else {
	      $.error('Method ' +  method + ' does not exist on jQuery.mlens');
	    }
  	};
})(jQuery);
