
const menuBtn = document.querySelector('.menu');
const layout = document.querySelector('.layout');
const overlay = document.querySelector('.overlay');
const menuSVG = document.querySelector('.menu svg path');
const menuItems = gsap.utils.toArray('ul li a');

let menuOpen = false;
// Get a reference to the circle element
  // Get a reference to the inner yellow circle
  const follower = document.getElementById("follower");

  // Get a reference to the outer changing circle
  const changingCircle = document.getElementById("changingCircle");

  // Add an event listener to track the cursor's movement
  document.addEventListener("mousemove", (e) => {
    // Update the position of the inner circle to follow the cursor
    follower.style.left = (e.clientX - 15) + "px";
    follower.style.top = (e.clientY - 15) + "px";
  });
function animateOuterCircle() {
    // Get the position and size of the inner circle
    const innerCirclePosition = follower.getBoundingClientRect();
    
    // Calculate the center of the inner circle
    const innerCircleCenterX = innerCirclePosition.left + innerCirclePosition.width / 2;
    const innerCircleCenterY = innerCirclePosition.top + innerCirclePosition.height / 2;

    // Calculate the desired position for the outer circle (center around the inner circle)
    const desiredX = innerCircleCenterX - changingCircle.offsetWidth / 2;
    const desiredY = innerCircleCenterY - changingCircle.offsetHeight / 2;

    // Smoothly update the position of the outer circle
    const ease = 0.2; // Adjust the ease for faster/slower follow
    changingCircle.style.left = changingCircle.offsetLeft + (desiredX - changingCircle.offsetLeft) * ease + "px";
    changingCircle.style.top = changingCircle.offsetTop + (desiredY - changingCircle.offsetTop) * ease + "px";

    // Request the next frame
    requestAnimationFrame(animateOuterCircle);
  }

  // Start the animation loop
  animateOuterCircle();
  // Add an event listener to change the inner circle's color when it hovers over an element that is not the body
  document.addEventListener("mouseover", (e) => {
    if (e.target == menuSVG) {
      // Change the inner circle's background color to red when not over the body
      follower.style.backgroundColor = "red";
    }
  });

  // Add an event listener to change the inner circle's color back to yellow when it leaves the hovered element
  document.addEventListener("mouseout", () => {
    follower.style.backgroundColor = "yellow";
  });

// Add an event listener to change the circle's color back to yellow when it leaves the hovered element
document.addEventListener("mouseout", () => {
    follower.style.backgroundColor = "yellow";
});
gsap.set(overlay, {
    scaleY: 0
})

gsap.set(menuItems, {
    yPercent: 100
})

const navTl = gsap.timeline({
    defaults: {
        ease: 'power4.inOut',
        duration: 1
    }
});

navTl
    .to(layout, {
        scale: 0.95,
    })
    .to(overlay, {
        scaleY: 1
    }, "-=0.5")
    .to(menuSVG, {
        fill: 'white'
    }, "<")
    .to(menuItems, {
        yPercent: 0,
        stagger: 0.1,
        duration: 2
    }, "-=1.5")
navTl.pause();

menuBtn.addEventListener('click', () => {
    
    if (!menuOpen) {
        navTl.play();
        menuOpen = true;
    } else {
        navTl.reverse();
        menuOpen = false;
    }
})