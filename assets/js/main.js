/**
* Template Name: Append
* Updated: Jul 27 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/append-bootstrap-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict"

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  const selectBody = document.querySelector('body');
  const selectHeader = document.querySelector('#header');

  function toggleScrolled() {
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Scroll up sticky header to headers with .scroll-up-sticky class
   */
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    if (!selectHeader.classList.contains('scroll-up-sticky')) return;

    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = `-${header.offsetHeight + 50}px`;
    } else if (scrollTop > selectHeader.offsetHeight) {
      selectHeader.style.setProperty('position', 'sticky', 'important');
      selectHeader.style.top = "0";
    } else {
      selectHeader.style.removeProperty('top');
      selectHeader.style.removeProperty('position');
    }
    lastScrollTop = scrollTop;
  });

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .has-dropdown i').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init isotope layout and filters
   */
  function initIsotopeLayout() {
    document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
      let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
      let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
      let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

      let initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });

      isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
        filters.addEventListener('click', function() {
          isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          initIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aosInit === 'function') {
            aosInit();
          }
        }, false);
      });

    });
  }
  window.addEventListener('load', initIsotopeLayout);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

});


/*Added later for payment purpose */
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const plan = urlParams.get("plan") || "free";

  let amount = "Free";
  let qrCodeSrc = "assets/img/payment/free-plan-qr.png"; // Default QR
  let buttonText = "Buy Now"; // Default for free plan

  if (plan === "business") {
      amount = "$29/month";
      qrCodeSrc = "assets/img/payment/business-plan-qr.png";
      buttonText = "Submit Payment";
  } else if (plan === "developer") {
      amount = "$49/month";
      qrCodeSrc = "assets/img/payment/developer-plan-qr.png";
      buttonText = "Submit Payment";
  }

  document.getElementById("plan-info").innerText = `Plan: ${plan.toUpperCase()} - Amount: ${amount}`;
  document.getElementById("qr-code").src = qrCodeSrc;
  document.querySelector(".btn-custom").innerText = buttonText;
});

// File selection validation
const fileInput = document.getElementById("payment-proof");
const uploadBox = document.querySelector(".upload-box");
const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
const maxSizeMB = 1;

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];

  if (!file) {
      uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
      return;
  }

  const fileSizeMB = file.size / (1024 * 1024);
  const fileExtension = file.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(fileExtension)) {
      alert("Invalid file type. Please upload a JPG, PNG, or PDF file.");
      fileInput.value = "";
      uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
      return;
  }

  if (fileSizeMB > maxSizeMB) {
      alert("File size exceeds 1 MB. Please upload a smaller file.");
      fileInput.value = "";
      uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
      return;
  }

  uploadBox.innerHTML = `<i class="bi bi-check-circle-fill" style="color: green;"></i> File Selected ✅ - ${file.name}`;
});

// Handle form submission
const paymentForm = document.getElementById("payment-form");
paymentForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default submission

  const plan = new URLSearchParams(window.location.search).get("plan") || "free";
  const loader = document.querySelector(".loader");
  const confirmation = document.getElementById("confirmation");

  if (plan !== "free" && !fileInput.files.length) {
      alert("No file has been selected. Please select the file first.");
      return;
  }

  loader.style.display = "block";

  setTimeout(function () {
      loader.style.display = "none";
      confirmation.style.display = "block";
      
      if (plan === "free") {
          confirmation.innerHTML = "<p>Free plan has been purchased successfully.</p>";
      } else {
          confirmation.innerHTML = "<p>Your payment has been processed successfully!</p>";
      }
      
      setTimeout(function () {
          window.location.href = "index.html";
      }, 3000);
  }, 2000);
});







/* working code */
// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const plan = urlParams.get("plan") || "free";

//   let amount = "Free";
//   let qrCodeSrc = "assets/img/payment/free-plan-qr.png"; // Default QR
//   const paymentProofInput = document.getElementById("payment-proof");
//   const submitButton = document.getElementById("submit-button");

//   if (plan === "business") {
//       amount = "$29/month";
//       qrCodeSrc = "assets/img/payment/business-plan-qr.png";
//   } else if (plan === "developer") {
//       amount = "$49/month";
//       qrCodeSrc = "assets/img/payment/developer-plan-qr.png";
//   }

//   document.getElementById("plan-info").innerText = `Plan: ${plan.toUpperCase()} - Amount: ${amount}`;
//   document.getElementById("qr-code").src = qrCodeSrc;

//   // Change button text for Free plan
//   if (plan === "free") {
//       submitButton.innerText = "Buy";
//       paymentProofInput.removeAttribute("required"); // No file upload required for free plan
//   }
// });

// // File selection validation
// document.getElementById("payment-proof").addEventListener("change", function () {
//   const fileInput = this;
//   const file = fileInput.files[0];
//   const uploadBox = document.querySelector(".upload-box");
//   const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
//   const maxSizeMB = 1;

//   if (!file) {
//       uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
//       return;
//   }

//   const fileSizeMB = file.size / (1024 * 1024);
//   const fileExtension = file.name.split(".").pop().toLowerCase();

//   if (!allowedExtensions.includes(fileExtension)) {
//       alert("Invalid file type. Please upload a JPG, PNG, or PDF file.");
//       fileInput.value = "";
//       uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
//       return;
//   }

//   if (fileSizeMB > maxSizeMB) {
//       alert("File size exceeds 1 MB. Please upload a smaller file.");
//       fileInput.value = "";
//       uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
//       return;
//   }

//   uploadBox.innerHTML = `<i class="bi bi-check-circle-fill" style="color: green;"></i> File Selected ✅ - ${file.name}`;
// });

// // Handle form submission
// document.getElementById("payment-form").addEventListener("submit", function (event) {
//   const plan = new URLSearchParams(window.location.search).get("plan") || "free";
//   const fileInput = document.getElementById("payment-proof");

//   if ((plan === "developer" || plan === "business") && !fileInput.files.length) {
//       alert("No files selected. Please select the file first.");
//       event.preventDefault();
//       return;
//   }
// });


// document.addEventListener("DOMContentLoaded", function () {
//     const urlParams = new URLSearchParams(window.location.search);
//     const plan = urlParams.get("plan") || "free";

//     let amount = "Free";
//     let qrCodeSrc = "assets/img/payment/free-plan-qr.png"; // Default QR
//     const paymentProofInput = document.getElementById("payment-proof");
//     const submitButton = document.getElementById("submit-button");

//     if (plan === "business") {
//         amount = "$29/month";
//         qrCodeSrc = "assets/img/payment/business-plan-qr.png";
//     } else if (plan === "developer") {
//         amount = "$49/month";
//         qrCodeSrc = "assets/img/payment/developer-plan-qr.png";
//     }

//     document.getElementById("plan-info").innerText = `Plan: ${plan.toUpperCase()} - Amount: ${amount}`;
//     document.getElementById("qr-code").src = qrCodeSrc;

//     // Change button text for Free plan
//     if (plan === "free") {
//         submitButton.innerText = "Buy";
//         paymentProofInput.removeAttribute("required"); // No file upload required for free plan
//     }
// });

// // File selection validation
// document.getElementById("payment-proof").addEventListener("change", function () {
//     const fileInput = this;
//     const file = fileInput.files[0];
//     const uploadBox = document.querySelector(".upload-box");
//     const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
//     const maxSizeMB = 1;

//     if (!file) {
//         uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
//         return;
//     }

//     const fileSizeMB = file.size / (1024 * 1024);
//     const fileExtension = file.name.split(".").pop().toLowerCase();

//     if (!allowedExtensions.includes(fileExtension)) {
//         alert("Invalid file type. Please upload a JPG, PNG, or PDF file.");
//         fileInput.value = "";
//         uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
//         return;
//     }

//     if (fileSizeMB > maxSizeMB) {
//         alert("File size exceeds 1 MB. Please upload a smaller file.");
//         fileInput.value = "";
//         uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
//         return;
//     }

//     uploadBox.innerHTML = `<i class="bi bi-check-circle-fill" style="color: green;"></i> File Selected ✅ - ${file.name}`;
// });

// // Handle form submission
// document.getElementById("payment-form").addEventListener("submit", function (event) {
//     const plan = new URLSearchParams(window.location.search).get("plan") || "free";
//     const fileInput = document.getElementById("payment-proof");

//     if ((plan === "developer" || plan === "business") && !fileInput.files.length) {
//         alert("No files selected. Please select the file first.");
//         event.preventDefault();
//         return;
//     }
// });





/*Another working code */
// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const plan = urlParams.get("plan") || "free";

//   let amount = "Free";
//   let qrCodeSrc = "assets/img/payment/free-plan-qr.png"; // Default QR

//   if (plan === "business") {
//       amount = "$29/month";
//       qrCodeSrc = "assets/img/payment/business-plan-qr.png";
//   } else if (plan === "developer") {
//       amount = "$49/month";
//       qrCodeSrc = "assets/img/payment/developer-plan-qr.png";
//   }

//   document.getElementById("plan-info").innerText = `Plan: ${plan.toUpperCase()} - Amount: ${amount}`;
//   document.getElementById("qr-code").src = qrCodeSrc;
// });

// // File selection validation
// document.getElementById("payment-proof").addEventListener("change", function () {
//   const fileInput = this;
//   const file = fileInput.files[0];
//   const uploadBox = document.querySelector(".upload-box");
//   const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
//   const maxSizeMB = 1;

//   if (!file) {
//       uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
//       return;
//   }

//   const fileSizeMB = file.size / (1024 * 1024);
//   const fileExtension = file.name.split(".").pop().toLowerCase();

//   if (!allowedExtensions.includes(fileExtension)) {
//       alert("Invalid file type. Please upload a JPG, PNG, or PDF file.");
//       fileInput.value = "";
//       uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
//       return;
//   }

//   if (fileSizeMB > maxSizeMB) {
//       alert("File size exceeds 1 MB. Please upload a smaller file.");
//       fileInput.value = "";
//       uploadBox.innerHTML = '<i class="bi bi-cloud-upload-fill"></i> Click to upload proof';
//       return;
//   }

//   // ✅ Show selected file name along with "File Selected ✅"
//   uploadBox.innerHTML = `<i class="bi bi-check-circle-fill" style="color: green;"></i> File Selected ✅ - ${file.name}`;
// });





// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const plan = urlParams.get("plan") || "free";

//   let amount = "Free";
//   let qrCodeSrc = "assets/img/payment/free-plan-qr.png"; // Default QR

//   if (plan === "business") {
//       amount = "$29/month";
//       qrCodeSrc = "assets/img/payment/business-plan-qr.png";
//   } else if (plan === "developer") {
//       amount = "$49/month";
//       qrCodeSrc = "assets/img/payment/developer-plan-qr.png";
//   }

//   document.getElementById("plan-info").innerText = `Plan: ${plan.toUpperCase()} - Amount: ${amount}`;
//   document.getElementById("qr-code").src = qrCodeSrc;
// });

// // File selection validation
// document.getElementById("payment-proof").addEventListener("change", function () {
//   const fileInput = this;
//   const file = fileInput.files[0];
//   const fileNameDisplay = document.getElementById("file-name");
//   const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
//   const maxSizeMB = 1;
  
//   if (!file) {
//       fileNameDisplay.textContent = "";
//       return;
//   }

//   const fileSizeMB = file.size / (1024 * 1024);
//   const fileExtension = file.name.split(".").pop().toLowerCase();

//   if (!allowedExtensions.includes(fileExtension)) {
//       alert("Invalid file type. Please upload a JPG, PNG, or PDF file.");
//       fileInput.value = "";
//       fileNameDisplay.textContent = "";
//       return;
//   }

//   if (fileSizeMB > maxSizeMB) {
//       alert("File size exceeds 1 MB. Please upload a smaller file.");
//       fileInput.value = "";
//       fileNameDisplay.textContent = "";
//       return;
//   }

//   fileNameDisplay.textContent = `Selected File: ${file.name}`;
// });








/*working code */
// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const plan = urlParams.get("plan") || "free";

//   let amount = "Free";
//   let qrCodeSrc = "assets/img/payment/free-plan-qr.png"; // Default QR

//   if (plan === "business") {
//       amount = "$29/month";
//       qrCodeSrc = "assets/img/payment/business-plan-qr.png";
//   } else if (plan === "developer") {
//       amount = "$49/month";
//       qrCodeSrc = "assets/img/payment/developer-plan-qr.png";
//   }

//   document.getElementById("plan-info").innerText = `Plan: ${plan.toUpperCase()} - Amount: ${amount}`;
//   document.getElementById("qr-code").src = qrCodeSrc;
// });

// // Update upload box text when file is selected
// document.getElementById("payment-proof").addEventListener("change", function () {
//   document.querySelector(".upload-box").innerText = "File Selected ✅";
// });

