// ==========================================
// SELECT ELEMENTS
// ==========================================

const navToggler = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");
const navLinks = document.querySelectorAll(".nav li a");


// ==========================================
// OPEN / CLOSE SIDEBAR
// ==========================================

navToggler.addEventListener("click", () => {

  aside.classList.toggle("open");

});


// ==========================================
// NAVIGATION LINK CLICK
// ==========================================

navLinks.forEach((link) => {

  link.addEventListener("click", function () {

    // Remove active from all links

    navLinks.forEach((item) => {
      item.classList.remove("active");
    });


    // Add active to clicked link

    this.classList.add("active");


    // Close sidebar on mobile

    if (window.innerWidth <= 991) {
      aside.classList.remove("open");
    }

  });

});


// ==========================================
// CLOSE SIDEBAR WHEN RESIZING
// ==========================================

window.addEventListener("resize", () => {

  if (window.innerWidth > 991) {
    aside.classList.remove("open");
  }

});