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
  console.log("API Hit");
  
  const form = e.target;
  const date = new Date();

  // ✅ Prepare form data
  const formData = new FormData(form);
  const data = {
    Date: date.toLocaleDateString("en-US"),
    Time: date.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }),
    Message: "No Message",
  };

  formData.forEach((value, key) => {
    data[key] = value;
  });

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbyobbiK62RKeLLQJ-lB6hLdgIQwtWsYNyp3FrhJg1Exf4hSgR6zijvrjRZeSwq3lzwp0Q/exec";

  try {
    // ✅ Send as form-encoded to avoid CORS
    await fetch(scriptURL, {
      method: "POST",
      body: new URLSearchParams(data),
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    form.reset();
  } catch (err) {
    console.error("Error:", err);
  } finally {
    // showLoader(false);
  }
}
