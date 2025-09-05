gsap.registerPlugin(ScrollTrigger);

function navbarAnimations() {
  // Desktop Navbar Hide/Show on Scroll
  let lastScroll = 0;
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > lastScroll && currentScroll > 50) {
      gsap.to(navbar, { top: "-100%", duration: 0.3, ease: "power2.out" });
    } else {
      gsap.to(navbar, { top: "0%", duration: 0.3, ease: "power2.out" });
    }
    lastScroll = currentScroll;
  });

  // Mobile Menu Toggle
  const menuBtn = document.getElementById("menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileItems = mobileMenu.querySelectorAll("li");
  let menuOpen = false;

  menuBtn.addEventListener("click", () => {
    if (!menuOpen) {
      mobileMenu.classList.remove("hidden");

      // Animate the container first
      gsap.fromTo(
        mobileMenu,
        { y: "-100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      // Stagger menu items
      gsap.fromTo(
        mobileItems,
        { y: -20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.1,
          delay: 0.2,
        }
      );
    } else {
      // Animate closing
      gsap.to(mobileItems, {
        y: -20,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        stagger: 0.05,
      });

      gsap.to(mobileMenu, {
        y: "-100%",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        delay: 0.2,
        onComplete: () => mobileMenu.classList.add("hidden"),
      });
    }

    menuOpen = !menuOpen;
  });
}
navbarAnimations();

function section1Animations() {
  // Animate heading and paragraph
  gsap.from("#s2-text", {
    scrollTrigger: {
      trigger: "#s2-text",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
  });

  // Animate form
  gsap.from("#s2-form", {
    scrollTrigger: {
      trigger: "#s2-form",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out",
    delay: 0.2,
  });
}

// Select all forms
const forms = document.querySelectorAll(".leadForm");
const loader = document.getElementById("loader");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");

console.log(window.location.href);

// Attach listener to all forms
forms.forEach((form) => form.addEventListener("submit", leadController));

async function leadController(e) {
  e.preventDefault();
  const form = e.target;

  loader.classList.remove("hidden"); // Show loader

  const date = new Date();
  const params = new URLSearchParams();
  params.append("Name", form.Name.value);
  params.append("Email", form.Email.value);
  params.append("Phone", form.Phone.value);
  params.append("Message", form.Message?.value || "No Message");
  params.append("Date", date.toLocaleDateString("en-US"));
  params.append("sheetName", "Google Display");
  // Google Display, Google P Max, Google Gemand Gen, Taboola, HTDS, TOI, Google PPC
  params.append(
    "Time",
    date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
  );

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbw5Ma1R2K1RqW0fnXBXwC-NujxZF4IpLe11e0v3Icm4ZMqrBMDIBQc1VThnjGXze2kc/exec";

  try {
    const res = await fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const json = await res.json();
    console.log("Response:", json);

    form.reset();
    showPopup("Form submitted successfully!");
  } catch (err) {
    console.error("Error:", err);
    showPopup("Error submitting form. Please try again.");
  } finally {
    loader.classList.add("hidden"); // Hide loader
  }
}

// Popup functions
function showPopup(message) {
  popupMessage.textContent = message;
  popup.classList.remove("hidden");
}

function closePopup() {
  popup.classList.add("hidden");
}
