function makeDraggable(element) {
 const elder = document.querySelector(".elder")

 element.addEventListener("mousedown", event => {
  const rect = element.getBoundingClientRect()
  const pX = event.clientX - rect.left
  const pY = event.clientY - rect.top
  
  function changePosition(event2) {
    element.style.left = event2.clientX - pX + "px"
    element.style.top = event2.clientY - pY + "px"
  }

  function mouseRelease(event2) {
    document.removeEventListener("mouseup", mouseRelease)
    elder.removeEventListener("mousemove", changePosition)
  }
  
  elder.addEventListener("mousemove", changePosition)
  document.addEventListener("mouseup", mouseRelease)

 })
}

const draggableElements = document.querySelectorAll(".draggable")
draggableElements.forEach(makeDraggable)
