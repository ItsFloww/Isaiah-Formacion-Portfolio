// JavaScript for the portfolio clone

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Add hover effects to project cards
document.querySelectorAll(".project-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-5px)";
    card.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.15)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
    card.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
  });
});

// Tech stack badge hover effects
document.querySelectorAll(".tech-badge").forEach((badge) => {
  badge.addEventListener("mouseenter", () => {
    badge.style.transform = "scale(1.05)";
  });

  badge.addEventListener("mouseleave", () => {
    badge.style.transform = "scale(1)";
  });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("hidden");
}

// ===== SCROLL ANIMATIONS =====
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, index * 100);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },
);

document.querySelectorAll(".scroll-animate").forEach((el) => {
  scrollObserver.observe(el);
});

// ===== ANIMATED COUNTERS =====
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute("data-target"));
          animateCounter(counter, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

const statsCard = document.querySelector(".stats-card");
if (statsCard) {
  statsObserver.observe(statsCard);
}

// ===== PARTICLE BACKGROUND =====
function createParticles() {
  const container = document.createElement("div");
  container.className = "particles-bg";
  document.body.appendChild(container);

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s";
    particle.style.animationDuration = 15 + Math.random() * 10 + "s";

    const size = 4 + Math.random() * 4;
    particle.style.width = size + "px";
    particle.style.height = size + "px";

    container.appendChild(particle);
  }
}

createParticles();

// ===== INLINE SCRIPT FROM INDEX.HTML =====

// Fallback DC cert renderer
function renderDCCert(el, course, hrs, date) {
  el.innerHTML = `<div style="display:flex;width:100%;height:100%;background:#f5f0e8;">
    <div style="background:#1a2332;width:38%;display:flex;align-items:center;justify-content:center;">
      <span style="color:#3dc78e;font-size:2.2rem;font-weight:900;font-style:italic;">D<</span>
    </div>
    <div style="flex:1;padding:14px 12px;display:flex;flex-direction:column;justify-content:center;">
      <div style="font-size:0.55rem;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:3px;">Statement of Accomplishment</div>
      <div style="font-size:0.65rem;color:#e85a00;margin-bottom:2px;">Has been awarded to</div>
      <div style="font-size:0.78rem;font-weight:700;color:#111;margin-bottom:4px;">Isaiah Daniel Formacion</div>
      <div style="font-size:0.62rem;color:#888;margin-bottom:1px;">For successfully completing</div>
      <div style="font-size:0.72rem;font-weight:700;color:#111;margin-bottom:6px;">${course}</div>
      ${hrs ? `<div style="font-size:0.55rem;color:#888;">LENGTH: ${hrs}</div>` : ""}
      <div style="font-size:0.55rem;color:#888;margin-top:4px;">Completed on: ${date}</div>
      <div style="font-size:0.55rem;font-weight:700;color:#111;margin-top:6px;">D< datacamp</div>
    </div>
  </div>`;
}

// ===== MAIN SCRIPT FROM INDEX.HTML =====

// ===== PAGE NAVIGATION =====
function navigate(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  window.scrollTo(0, 0);
}

// ===== CHAT =====
const chatTrigger = document.getElementById("chatTrigger");
const chatPopup = document.getElementById("chatPopup");
const stBtn = document.getElementById("scrollTop");
const scrollTopIcon = document.getElementById("scrollTopIcon");
let chatOpen = false;

let tickingTopBtnScroll = false;
function updateScrollTopVisibility() {
  if (!tickingTopBtnScroll) {
    window.requestAnimationFrame(() => {
      const shouldShow = !chatOpen && window.scrollY > 400;
      stBtn.classList.toggle("show", shouldShow);
      tickingTopBtnScroll = false;
    });
    tickingTopBtnScroll = true;
  }
}

function updateScrollTopIcon() {
  if (!scrollTopIcon) return;
  scrollTopIcon.src = document.body.classList.contains("dark-mode")
    ? "Materials/upb.png"
    : "Materials/upw.png";
}

const isMobile = window.innerWidth <= 768;
if (!isMobile) {
  setTimeout(() => {
    chatPopup.classList.add("show");
    chatOpen = true;
    updateScrollTopVisibility();
  }, 1800);
}

chatTrigger.addEventListener("click", () => {
  chatOpen = !chatOpen;
  chatPopup.classList.toggle("show", chatOpen);
  updateScrollTopVisibility();
});

window.addEventListener("scroll", updateScrollTopVisibility);

// ===== RECOMMENDATIONS =====
let curRec = 1;
function showRec(i) {
  document
    .querySelectorAll(".rec-slide")
    .forEach((s) => s.classList.remove("active"));
  document
    .querySelectorAll(".rec-dot")
    .forEach((d) => d.classList.remove("active"));
  document.getElementById("rec-" + i).classList.add("active");
  document.getElementById("dot-" + i).classList.add("active");
  curRec = i;
}
setInterval(() => showRec((curRec + 1) % 2), 4000);

// ===== FIX FIRST CERT CARD IMAGE =====
const firstCertImg = document.querySelector(
  "#page-certifications .cert-card:first-child .cert-card-img img",
);
if (firstCertImg) {
  firstCertImg.onerror = function () {
    this.parentElement.innerHTML = `<div style="display:flex;width:100%;height:100%;background:#f5f0e8;">
      <div style="background:#1a2332;width:38%;display:flex;align-items:center;justify-content:center;"><span style="color:#3dc78e;font-size:2rem;font-weight:900;font-style:italic;">D&lt;</span></div>
      <div style="flex:1;padding:14px 12px;display:flex;flex-direction:column;justify-content:center;">
        <div style="font-size:0.55rem;text-transform:uppercase;letter-spacing:0.1em;color:#888;margin-bottom:3px;">Statement of Accomplishment</div>
        <div style="font-size:0.62rem;color:#e85a00;margin-bottom:2px;">Has been awarded to</div>
        <div style="font-size:0.78rem;font-weight:700;color:#111;margin-bottom:3px;">Isaiah Daniel Formacion</div>
        <div style="font-size:0.6rem;color:#888;margin-bottom:1px;">For successfully completing</div>
        <div style="font-size:0.72rem;font-weight:700;color:#111;margin-bottom:4px;">The Future of Smart Systems</div>
        <div style="font-size:0.55rem;color:#888;margin-top:2px;">Completed on: Jan 2026</div>
        <div style="font-size:0.6rem;font-weight:700;color:#111;margin-top:4px;">D&lt; datacamp</div>
      </div>
    </div>`;
  };
  // Force trigger if already broken
  if (!firstCertImg.complete || firstCertImg.naturalWidth === 0)
    firstCertImg.onerror();
}

// ===== ADD EVENT LISTENERS FOR NAVIGATION =====
document.querySelectorAll("[data-navigate]").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const pageId = this.getAttribute("data-navigate");
    navigate(pageId);
  });
});

// ===== ADD EVENT LISTENERS FOR REC SHOW =====
document.querySelectorAll("[data-show-rec]").forEach((el) => {
  el.addEventListener("click", function () {
    const recIndex = parseInt(this.getAttribute("data-show-rec"));
    showRec(recIndex);
  });
});

// ===== ADD EVENT LISTENER FOR SCROLL TOP =====
document.getElementById("scrollTop").addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== ADD EVENT LISTENERS FOR IMAGE ERROR HANDLING =====
document.querySelectorAll(".beyond-img img").forEach((img) => {
  img.addEventListener("error", function () {
    this.parentElement.style.background = "#e5e7eb";
  });
});

// ===== DARK MODE TOGGLE =====
const darkModeToggle = document.getElementById("darkModeToggle");
let isDarkMode = false;

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  document.body.classList.toggle("dark-mode", isDarkMode);
  updateScrollTopIcon();

  // Save preference to localStorage
  localStorage.setItem("darkMode", isDarkMode);
}

// Load dark mode preference on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedDarkMode = localStorage.getItem("darkMode");
  if (savedDarkMode === "true") {
    isDarkMode = true;
    document.body.classList.add("dark-mode");
  }

  updateScrollTopIcon();
  updateScrollTopVisibility();

  // Add event listener for dark mode toggle
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", toggleDarkMode);
  }
});

// ===== PDF MODAL FUNCTIONALITY =====
const pdfModal = document.getElementById("pdfModal");
const pdfFrame = document.getElementById("pdfFrame");
const pdfModalTitle = document.getElementById("pdfModalTitle");
const pdfDownloadBtn = document.getElementById("pdfDownloadBtn");
const pdfModalClose = document.getElementById("pdfModalClose");
const pdfPlaceholder = document.getElementById("pdfPlaceholder");

function openPdfModal(pdfSrc, title) {
  pdfModalTitle.textContent = title;
  pdfDownloadBtn.href = pdfSrc;
  // Hide PDF viewer UI controls in many browsers where supported
  pdfFrame.src = pdfSrc + "#toolbar=0&navpanes=0&scrollbar=0";
  pdfPlaceholder.classList.remove("hidden");
  pdfModal.style.display = "block";
  document.body.style.overflow = "hidden";

  pdfFrame.onload = function () {
    pdfPlaceholder.classList.add("hidden");
  };
}

function closePdfModal() {
  pdfModal.style.display = "none";
  pdfFrame.src = "";
  document.body.style.overflow = "auto";
}

if (pdfModalClose) {
  pdfModalClose.addEventListener("click", closePdfModal);
}

window.addEventListener("click", (event) => {
  if (event.target === pdfModal) {
    closePdfModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && pdfModal.style.display === "block") {
    closePdfModal();
  }
});

document.querySelectorAll(".cert-pdf-card").forEach((card) => {
  card.addEventListener("click", function () {
    const pdfSrc = this.getAttribute("data-pdf");
    const title =
      this.querySelector(".cert-card-name")?.textContent || "Certificate";
    openPdfModal(pdfSrc, title);
  });
});

// ===== RESUME DOWNLOAD =====
const resumeBtn = document.getElementById("resumeBtn");
const downloadResumeBtn = document.getElementById("downloadResumeBtn");

function downloadResume() {
  const resumePath = "Materials/resume.pdf";
  const link = document.createElement("a");
  link.href = resumePath;
  link.download = "Isaiah-Daniel-Formacion-Resume.pdf";
  link.click();
}

if (resumeBtn) {
  resumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    downloadResume();
  });
}

if (downloadResumeBtn) {
  downloadResumeBtn.addEventListener("click", (e) => {
    e.preventDefault();
    downloadResume();
  });
}

// ===== PARALLAX EFFECT ON SCROLL =====
let tickingParallax = false;
window.addEventListener("scroll", () => {
  if (!tickingParallax) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const particles = document.querySelectorAll(".particle");
      particles.forEach((particle, index) => {
        const speed = 0.5 + index * 0.1;
        particle.style.transform = `translateY(${scrolled * speed}px)`;
      });
      tickingParallax = false;
    });
    tickingParallax = true;
  }
});

// ===== SMOOTH REVEAL ANIMATION FOR CARDS ON SCROLL =====
const cardObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  },
);

document.querySelectorAll(".card").forEach((card, index) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(30px)";
  card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
  cardObserver.observe(card);
});

// ===== BUTTON RIPPLE EFFECT =====
document.querySelectorAll(".btn, .resume-btn").forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255,255,255,0.3);
      width: 100px;
      height: 100px;
      left: ${e.clientX - rect.left - 50}px;
      top: ${e.clientY - rect.top - 50}px;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    `;
    this.style.position = "relative";
    this.style.overflow = "hidden";
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation CSS
const rippleStyle = document.createElement("style");
rippleStyle.textContent = `
  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// ===================== MOBILE-ONLY CREATIVE FEATURES =====================
const isMobileDevice = window.innerWidth <= 768;

if (isMobileDevice) {
  // Scroll Progress Bar
  const scrollProgress = document.getElementById("scrollProgress");
  const header = document.querySelector(".header");
  const miniProfile = document.getElementById("miniProfile");
  const mobileNav = document.getElementById("mobileNav");
  const swipeHint = document.getElementById("swipeHint");
  const mobileFab = document.getElementById("mobileFab");

  // Header Shrink on Scroll
  let lastScrollY = 0;
  let tickingMobileScroll = false;

  window.addEventListener("scroll", () => {
    if (!tickingMobileScroll) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;

        // Scroll Progress
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (currentScrollY / docHeight) * 100;
        if (scrollProgress) {
          scrollProgress.style.width = scrollPercent + "%";
        }

        // Header Shrink
        if (header) {
          if (currentScrollY > 100) {
            header.classList.add("shrink");
          } else {
            header.classList.remove("shrink");
          }
        }

        // Mini Profile Visibility
        if (miniProfile) {
          if (currentScrollY > 300) {
            miniProfile.classList.add("visible");
          } else {
            miniProfile.classList.remove("visible");
          }
        }

        // Hide swipe hint after scrolling
        if (swipeHint && currentScrollY > 50) {
          swipeHint.style.display = "none";
        }

        lastScrollY = currentScrollY;
        tickingMobileScroll = false;
      });
      tickingMobileScroll = true;
    }
  });

  // Card Reveal Animation with Intersection Observer
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("revealed");
          }, index * 80);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  document.querySelectorAll(".main > div > .card").forEach((card) => {
    cardObserver.observe(card);
  });

  // Timeline Animation
  const timelineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  document.querySelectorAll(".timeline-item").forEach((item) => {
    timelineObserver.observe(item);
  });

  // Contact Rows Animation
  const contactObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  document.querySelectorAll(".contact-row").forEach((row) => {
    contactObserver.observe(row);
  });

  // Mobile FAB Toggle
  if (mobileFab) {
    mobileFab.addEventListener("click", () => {
      mobileFab.classList.toggle("open");
      if (mobileFab.classList.contains("open")) {
        // Navigate to email after opening
        setTimeout(() => {
          window.location.href = "mailto:isaiah.formacion@gmail.com";
        }, 300);
      }
    });
  }

  // Mobile Navigation - Active State
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item");
  const sections = document.querySelectorAll(".card");

  // Smooth scroll to section on nav click
  mobileNavItems.forEach((item) => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionType = item.dataset.section;

      // Update active state
      mobileNavItems.forEach((nav) => nav.classList.remove("active"));
      item.classList.add("active");

      // Scroll to appropriate section
      let targetSection;
      switch (sectionType) {
        case "home":
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "about":
          targetSection = document.querySelector(".about-p");
          if (targetSection)
            targetSection.scrollIntoView({ behavior: "smooth" });
          break;
        case "skills":
          targetSection = document.querySelector(".stack-group");
          if (targetSection)
            targetSection.scrollIntoView({ behavior: "smooth" });
          break;
        case "projects":
          targetSection = document.querySelector(".project-card");
          if (targetSection)
            targetSection.scrollIntoView({ behavior: "smooth" });
          break;
        case "contact":
          targetSection = document.querySelector(".contact-row");
          if (targetSection)
            targetSection.scrollIntoView({ behavior: "smooth" });
          break;
      }
    });
  });

  // Update active nav item on scroll
  let tickingNavScroll = false;
  window.addEventListener("scroll", () => {
    if (!tickingNavScroll) {
      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 400;

        let currentSection = "home";
        sections.forEach((section) => {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            const sectionId = section.id || section.className;
            if (
              sectionId.includes("about") ||
              section.querySelector(".about-p")
            ) {
              currentSection = "about";
            } else if (
              sectionId.includes("stack") ||
              section.querySelector(".stack-group")
            ) {
              currentSection = "skills";
            } else if (sectionId.includes("project")) {
              currentSection = "projects";
            } else if (section.querySelector(".contact-row")) {
              currentSection = "contact";
            }
          }
        });

        mobileNavItems.forEach((item) => {
          if (item.dataset.section === currentSection) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
        tickingNavScroll = false;
      });
      tickingNavScroll = true;
    }
  });

  // 3D Tilt Effect for Project Cards
  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("touchmove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener("touchend", () => {
      card.style.transform =
        "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });

  // Skill Tags Random Animation on View
  const tagObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const tags = entry.target.querySelectorAll(".tag");
          tags.forEach((tag, index) => {
            setTimeout(() => {
              tag.style.transform = "scale(1.1)";
              setTimeout(() => {
                tag.style.transform = "scale(1)";
              }, 150);
            }, index * 50);
          });
        }
      });
    },
    { threshold: 0.5 },
  );

  document.querySelectorAll(".stack-group").forEach((group) => {
    tagObserver.observe(group);
  });

  // Pull-to-top animation on scroll
  let touchStartY = 0;
  let touchEndY = 0;

  document.addEventListener(
    "touchstart",
    (e) => {
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true },
  );

  document.addEventListener(
    "touchend",
    (e) => {
      touchEndY = e.changedTouches[0].screenY;

      // Pull down from top to refresh indicator
      if (touchStartY < 50 && touchEndY - touchStartY > 100) {
        // Create pull indicator
        const indicator = document.createElement("div");
        indicator.style.cssText = `
        position: fixed;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 30px;
        height: 30px;
        border: 3px solid var(--text-color);
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10001;
      `;
        document.body.appendChild(indicator);

        setTimeout(() => indicator.remove(), 1000);
      }
    },
    { passive: true },
  );

  // Add spin animation
  const spinStyle = document.createElement("style");
  spinStyle.textContent = `
    @keyframes spin {
      to { transform: translateX(-50%) rotate(360deg); }
    }
  `;
  document.head.appendChild(spinStyle);

  // Haptic-like visual feedback on buttons
  document.querySelectorAll(".btn, .soc-icon").forEach((btn) => {
    btn.addEventListener("touchstart", () => {
      btn.style.transform = "scale(0.95)";
    });
    btn.addEventListener("touchend", () => {
      btn.style.transform = "";
    });
  });

  // Hide swipe hint after 4 seconds
  setTimeout(() => {
    if (swipeHint) {
      swipeHint.style.display = "none";
    }
  }, 4000);
}

// Desktop particle parallax effect (already exists, ensure it doesn't run on mobile)
if (!isMobileDevice) {
  let tickingDesktopParallax = false;
  window.addEventListener("scroll", () => {
    if (!tickingDesktopParallax) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const particles = document.querySelectorAll(".particle");
        particles.forEach((particle, index) => {
          const speed = 0.5 + index * 0.1;
          particle.style.transform = `translateY(${scrolled * speed}px)`;
        });
        tickingDesktopParallax = false;
      });
      tickingDesktopParallax = true;
    }
  });
}

// ===================== MOBILE NAV VISIBILITY FIX =====================
// Hides the mobile navigation bar when the footer comes into view

document.addEventListener("DOMContentLoaded", () => {
  const mobileNavElement = document.getElementById("mobileNav");
  const footerElement = document.querySelector("footer");

  if (mobileNavElement && footerElement) {
    mobileNavElement.style.transition = "transform 0.3s ease-in-out";

    const footerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            mobileNavElement.style.transform = "translateY(100%)";
          } else {
            mobileNavElement.style.transform = "translateY(0)";
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    footerObserver.observe(footerElement);
  }
});
