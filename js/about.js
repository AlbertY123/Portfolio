// Get a reference to the inner yellow circle
const follower = document.getElementById("follower");

// Get a reference to the outer changing circle
const changingCircle = document.getElementById("changingCircle");

// Function to update circle positions with an almost imperceptible transition
function updateCirclePosition(element, x, y) {
  element.style.transition = "transform 0.06s linear"; // Very slow and subtle transition
  element.style.transform = `translate(${x}px, ${y}px)`;
}

// Add an event listener to track the cursor's movement
document.addEventListener("mousemove", (e) => {
  // Update the position of the inner circle to follow the cursor
  const innerCircleX = e.clientX - 15;
  const innerCircleY = e.clientY - 15;
  updateCirclePosition(follower, innerCircleX, innerCircleY);
  
  // Get the position of the inner circle
  const innerCirclePosition = follower.getBoundingClientRect();

  // Update the position and size of the outer circle to match the inner circle
  const outerCircleX = innerCirclePosition.left - 60;
  const outerCircleY = innerCirclePosition.top - 60;
  updateCirclePosition(changingCircle, outerCircleX, outerCircleY);
});

// Reset transition on mouseleave (optional, for smoother behavior)
document.addEventListener("mouseleave", () => {
  follower.style.transition = "none";
  changingCircle.style.transition = "none";
});
