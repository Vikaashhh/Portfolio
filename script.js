var timeout;

// Initialize LocomotiveScroll for smooth scrolling
const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});

// Function to animate elements on the first page
function firstPageAnimate() {
    var tl = gsap.timeline();

    tl.from("#nav", {
        y: "-10", // Slide down from above
        opacity: 0, // Start invisible
        duration: 1.5,
        ease: Expo.easeInOut
    })
    .to(".boundingelem", {
        y: 0, // Move to original position
        ease: Expo.easeInOut,
        duration: 1.5,
        delay: -1,
        stagger: 0.2, // Stagger animation for each element
    })
    .from("#herofooter", {
        y: -10, // Slide down from above
        opacity: 0, // Start invisible
        duration: 1.5,
        delay: -1,
        ease: Expo.easeInOut
    });
}

// Function to handle circle animation on mouse move
function circleanimation() {
    var xscale = 1; // Default scale for x
    var yscale = 1; // Default scale for y
    var xprev = 0; // Previous x position
    var yprev = 0; // Previous y position

    window.addEventListener("mousemove", function (dets) {
        clearTimeout(timeout); // Clear previous timeout

        // Clamp scale values between 0.8 and 1.2
        xscale = gsap.utils.clamp(.8, 1.2, dets.clientX - xprev);
        yscale = gsap.utils.clamp(.8, 1.2, dets.clientY - yprev);

        xprev = dets.clientX; // Update previous x position
        yprev = dets.clientY; // Update previous y position

        circlemousefollow(xscale, yscale); // Update circle position and scale

        timeout = setTimeout(function() {
            document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1, 1)`;
        }, 100); // Reset scale after 100ms
    });
}

// Function to follow mouse movement with a circle
function circlemousefollow(xscale, yscale) {
    window.addEventListener("mousemove", function(dets) {
        document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
    });
}

// Initialize animations and event listeners
circleanimation();
circlemousefollow();
firstPageAnimate();

// Add event listeners to elements for hover effects
document.querySelectorAll(".element").forEach(function (elem) {
    var rotate = 0; // Initial rotation
    var diffrot = 0; // Difference in rotation

    elem.addEventListener("mouseleave", function (dets) {
        gsap.to(elem.querySelector("img"), {
            opacity: 0, // Fade out image
            ease: Power3,
            duration: 0.6,
        });
    });

    elem.addEventListener("mousemove", function (dets) {
        var diff = dets.clientY - elem.getBoundingClientRect().top; // Calculate vertical difference
        diffrot = dets.clientX - rotate; // Calculate rotation difference
        rotate = dets.clientX; // Update rotation

        gsap.to(elem.querySelector("img"), {
            opacity: 1, // Fade in image
            ease: Power3,
            top: diff, // Move image vertically
            left: dets.clientX, // Move image horizontally
            rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5) // Rotate image
        });
    });
});

// Add click event to email link
document.querySelector("#letstalk").addEventListener("click", function(email) {
    email.preventDefault(); // Prevent default behavior if it's a link
    window.location.href = "mailto:vikashjoshi5438@gmail.com"; // Open email client
});

// Function to update real-time clock in the footer
function updateTime() {
    const timeElement = document.getElementById('current-time');
    const options = { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true,
        timeZone: 'Asia/Kathmandu'
    };
    const time = new Date().toLocaleTimeString('en-US', options);
    timeElement.textContent = time + ' IST'; // Display time with IST suffix
}

// Update time immediately and then every second
updateTime();
setInterval(updateTime, 1000);