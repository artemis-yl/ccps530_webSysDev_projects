$(document).ready(function(){
    /* array of slides' image and description file paths
     * Requirement #4.3 : "Must cycle through at least four different images.
     */
    const slides = [
        { image: "image1.PNG"
        , description: "desc1.txt" 
        },
        { image: "image2.PNG"
        , description: "desc2.txt" 
        },
        { image: "image3.PNG"
        , description: "desc3.txt" 
        },
        { image: "image4.JPG"
        , description: "desc4.txt" 
        }
    ];
    
    let index = 0;
    
    // will load the current slide w/ ajax
    function loadSlide() {
        // a slide is the image and the description below it
        // the relative positioning is done in HTML/CSS
        const currentSlide = slides[index];
                
        // Requirement #4.2.1 : "Use AJAX to load each different image".
        $.ajax({
            url: currentSlide.image,
            type: "GET",
            xhrFields: {
                /* basically, no datatype: image => need to use base XMLHttpRequest
                 * set XMLHttpRequest to  blob to get raw binary 
                 *
                 * works with URL.createObjectURL(data) below
                 */
                responseType: "blob"
            },
            // load the image into the ".slide-image" element
            success: function(data) {
                const url = URL.createObjectURL(data); // temp URL
                $(".slide-image").attr("src", url);
            }
        });
        
        // Requirement #5.2 : "Descriptions are loaded with AJAX, from seperate files."
        $.ajax({
            url: currentSlide.description,
            type: "GET",
            dataType: "text",
            // load the description into the ".slide-caption" element
            success: function(data) {
                $(".slide-caption").text(data);
            }
        });
        
        // Move to next slide
        index = (index + 1) % slides.length;
    }

    /* timed delay function
     * - works with async/await inside a loop
     * - a promise represent the eventual end of an async operature and value
     *   - the end is success or failure
     */
    const delay = (ms) => new Promise(resolve => {
        setTimeout(resolve, ms); // Resolve the promise after "ms" milliseconds
    });
    
    // loop through slides with 2-second delay
    // - has to be async to use await, and thus the promise/delay
    async function slideLoopWithDelay(delayTime) {
        // Requirement #4.2.2 : "Use a JS loop to cycle each image every 2 seconds".
        while(true) {
            loadSlide();
            await delay(delayTime); 
        }
    }
    
    // start the slide loop, with 2sec/2000ms delay between slides
    slideLoopWithDelay(2000);

    /* NOTE: setInterval(loadSlide, 2000) fails because non-blocking and AJAX is async
     */
});
