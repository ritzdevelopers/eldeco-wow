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

// section1Animations();

document.getElementById("leadForm").addEventListener("submit", leadController);

async function leadController(e) {
  e.preventDefault();

  const form = e.target;
  const date = new Date();

  const data = {
    Name: form.Name.value,
    Email: form.Email.value,
    Phone: form.Phone.value,
    Message: "No Message",
    Date: date.toDateString(),
    Time: date.toTimeString(),
  };

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzbJ1FxHWkGumbxv4zOaa6rCoUkI8Vccg-vhInYA2jtI22We6JTfFw95FvDSzq7OGUy/exec";

  try {
    await fetch(scriptURL, {
      method: "POST",
       mode: "no-cors",
      headers: { "Content-Type": "application/json" }, // ✅ send JSON
      body: JSON.stringify(data),
    });

    alert("Lead Saved Successfully!");
    form.reset();
  } catch (err) {
    console.error("Error:", err);
    alert("Something went wrong!");
  }
}
