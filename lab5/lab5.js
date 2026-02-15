$(document).ready(function(){
    /* array of slides' image and description file paths
     * - 1st key is image file paths and 2nd key is corresponding description file paths
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
    
    // Function to load the current slide
    function loadSlide() {
        // a slide is the image and the description below it
        // the relative positioning is done in HTML/CSS
        const currentSlide = slides[index];
                
        // Requirement #4.2.1 : "Use AJAX to load each different image".
        $.ajax({
            url: currentSlide.image,
            type: "GET",
            xhrFields: {
                // has to be blob to get raw binary 
                // and properly load image files
                // works with URL.createObjectURL(data)
                responseType: "blob"
            },
            success: function(data) {
                const url = URL.createObjectURL(data);
                $(".slide-image").attr("src", url);
            }
        });
        
        // Requirement #5.2 : "Descriptions are loaded with AJAX, from seperate files."
        $.ajax({
            url: currentSlide.description,
            type: "GET",
            dataType: "text",
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
            await delay(delayTime); // Wait for 2 seconds before loading the next slide
        }
    }
    
    // start the slide loop
    slideLoopWithDelay(2000);
});
