/*
 * Responsive Resize Display v2 - 2015-12-04
 * (c) 2013 Xenoplexus Webstudios, LLC - github.com/stuntdawg/responsive-resize/
 * license: http://www.opensource.org/licenses/mit-license.php
 *
 * Only one setting, determines how the information is displayed
 * window.DisplayType = ??;
 * 1 to console log
 * 2 to localStorage
 * 3 to onscreen div
 */
window.DisplayType = 1;

// simple function for rounding numbers as needed
function roundNumber (num, dec) {
    var result = Math.round(num*Math.pow(10,dec))/Math.pow(10,dec);
    return result;
}

function updateSize() {
	// Get the dimensions of the viewport
	var width = window.innerWidth,
		height = window.innerHeight,
	// Get the device pixel density
		density = window.devicePixelRatio.toFixed(1),
	// used for determining ems, simulate a base font-size of 16
		font_size = 16,
	// use just two decimal places for ems
	// you can set this to what ever
		widthEM = roundNumber(width / font_size, 2),
		heightEM = roundNumber(height / font_size, 2),
		widthPX = roundNumber(window.innerWidth, 2),
		heightPX = roundNumber(window.innerHeight, 2);
  
  // set the text with all the appropriate data
	var finale = 'Width: ' + widthEM + 'em/' + widthPX + 'px\n\rHeight: ' + heightEM + 'em/' + heightPX + 'px\n\rPixelDensity: ' + density;
	
	// use which method of display was defined earlier 
	if(window.DisplayType === 1) {
	  window.console.log(finale);
	} else if(window.DisplayType === 2) {
		localStorage.setItem('rwd', finale);
	} else if(window.DisplayType === 3) {
	  // replace the line breaks with <br />, purely optional
	  finale = finale.replace(/(?:\n\r|\n|\r)/g, '<br />');
	  // for onscreen display
	  // first check is element exists
	  // if not, create it and set some basic css
	  // feel free to change the css as needed
		if (!document.getElementById("rwd")) {
			var d = document.createElement('div');
			d.id = 'rwd';
			d.style.position = "absolute";
			d.style.left = '0px';
			d.style.top = '0px';
			d.style.zIndex='9999999999'; // i know, a little over cooked
			d.style.backgroundColor = '#fff';
			d.style.padding = '5px 10px';
			d.style.borderRight = '1px solid black';
			d.style.borderBottom = '1px solid black';
			d.innerHTML = finale;
	  	document.body.insertBefore(d, document.body.childNodes[0]);
	  } else {
	  // if the div already exists and update the data
			document.getElementById('rwd').innerHTML = finale;
	  }
	}
}

// just two simple little functions for waiting until the resize has
// completed or hesitated before the everything fires
var rtime,
	  timeout = false,
	  delta = 200;

function resizeEnd() {
    if (new Date() - rtime < delta) {
        setTimeout(resizeEnd, delta);
    } else {
        timeout = false;
        updateSize();
    }               
}

function resizeTest() {
	rtime = new Date();
    if (timeout === false) {
        timeout = true;
        setTimeout(resizeEnd, delta);
    }
}

// let's see that info
window.onload = updateSize();	// When the page first loads
window.onresize = resizeTest;	// When the browser changes size
