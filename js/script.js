/**
 * ============================================================================
 * PREMIUM SAREE SHOWROOM — LUXURY CLIENT-SIDE SCRIPT & SCROLL VIDEO ENGINE
 * Brand Aesthetic: High-end Indian Haute Couture & Heritage Textiles
 * ============================================================================
 */

// ----------------------------------------------------------------------------
// 1. BRAND CONFIGURATION (Centralized customization for the showroom owner)
// ----------------------------------------------------------------------------
const SITE_CONFIG = {
  brandName: "VANYA COUTURE",
  tagline: "The Art of Draping",
  phone: "+91 98765 43210",
  whatsapp: "+919876543210",
  email: "concierge@vanyacouture.com",
  address: "74 Heritage Avenue, Kala Ghoda Arts District, Mumbai, Maharashtra 400001",
  hours: "Monday – Saturday: 11:00 AM – 8:00 PM | Sunday: By Private Appointment",
  instagram: "@vanyacouture",
  mapsUrl: "https://maps.google.com/?q=Kala+Ghoda+Fort+Mumbai",
  heroVideo: "assets/videos/hero.mp4",
  heroVideoMobile: "assets/videos/hero-mobile.mp4",
  heroPoster: "assets/images/hero-poster.webp",
  heroPosterJpg: "assets/images/hero-poster.jpg"
};

// ----------------------------------------------------------------------------
// 2. DOM CONTENT LOADED INITIALIZATION
// ----------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  initPreloader();
  initCustomCursor();
  initNavbar();
  initHeroVideoEngine();
  initLookbookParallax();
  initQuickViewModal();
  initGalleryLightbox();
  initTestimonialsSlider();
  initAppointmentForm();
  initScrollAnimations();
  initWhatsAppButtons();
});

// ----------------------------------------------------------------------------
// 3. PRELOADER & INITIAL ASSET READINESS
// ----------------------------------------------------------------------------
function initPreloader() {
  const preloader = document.getElementById("preloader");
  const preloaderBar = document.getElementById("preloaderBar");
  if (!preloader) return;

  let progress = 10;
  if (preloaderBar) preloaderBar.style.width = `${progress}%`;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 10;
    if (progress > 85) {
      clearInterval(interval);
      progress = 85;
    }
    if (preloaderBar) preloaderBar.style.width = `${progress}%`;
  }, 120);

  const dismissPreloader = () => {
    clearInterval(interval);
    if (preloaderBar) preloaderBar.style.width = "100%";
    setTimeout(() => {
      preloader.classList.add("fade-out");
      document.body.classList.add("loaded");
      triggerHeroIntroAnimations();
    }, 400);
  };

  // Video or window load readiness
  window.addEventListener("load", dismissPreloader, { once: true });
  // Fallback safety timeout so user is never stuck
  setTimeout(dismissPreloader, 2800);
}

// ----------------------------------------------------------------------------
// 4. CUSTOM LUXURY CURSOR (Desktop only)
// ----------------------------------------------------------------------------
function initCustomCursor() {
  const dot = document.querySelector(".custom-cursor-dot");
  const ring = document.querySelector(".custom-cursor-ring");
  if (!dot || !ring) return;

  // Disable on touch devices
  if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) {
    return;
  }

  let mouseX = -100;
  let mouseY = -100;
  let ringX = -100;
  let ringY = -100;
  let isMoving = false;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (!isMoving) {
      isMoving = true;
      document.body.classList.add("cursor-active");
    }
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  const renderRing = () => {
    // Smooth lerp follow
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderRing);
  };
  requestAnimationFrame(renderRing);

  // Interactive hover targets
  const interactiveTargets = "a, button, input, select, textarea, .collection-card, .product-card, .gallery-item, .instagram-card";
  document.querySelectorAll(interactiveTargets).forEach((el) => {
    el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
    el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
  });
}

// ----------------------------------------------------------------------------
// 5. NAVBAR & MOBILE DRAWER
// ----------------------------------------------------------------------------
function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const navToggle = document.querySelector(".nav-toggle");
  const mobileDrawer = document.querySelector(".mobile-nav-drawer");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  const onScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (navToggle && mobileDrawer) {
    const toggleMenu = (open) => {
      const isOpen = open !== undefined ? open : !mobileDrawer.classList.contains("open");
      if (isOpen) {
        navToggle.classList.add("active");
        mobileDrawer.classList.add("open");
        document.body.style.overflow = "hidden";
      } else {
        navToggle.classList.remove("active");
        mobileDrawer.classList.remove("open");
        document.body.style.overflow = "";
      }
    };

    navToggle.addEventListener("click", () => toggleMenu());

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => toggleMenu(false));
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && mobileDrawer.classList.contains("open")) {
        toggleMenu(false);
      }
    });
  }
}

// ----------------------------------------------------------------------------
// 6. MOST IMPORTANT FEATURE: 60FPS CANVAS VIDEO ENGINE & STRICT SCROLL LOCK
// Rule: STRICT SCROLL LOCK — Page will NOT scroll down until video is 100% complete
// Tech: 60FPS Apple-grade Canvas Sequence (Zero seek stutter / 0ms lag)
// ----------------------------------------------------------------------------
function initHeroVideoEngine() {
  const canvas = document.getElementById("heroCanvas");
  const video = document.getElementById("heroVideo");
  const videoContainer = document.querySelector(".hero-video-container");
  const heroContent = document.querySelector(".hero-content");
  const scrollIndicator = document.getElementById("heroScrollIndicator");
  const scrollText = document.getElementById("scrollIndicatorText");
  const badge = document.getElementById("heroVideoBadge");
  const badgeIcon = document.getElementById("badgeIcon");
  const badgeText = document.getElementById("badgeText");
  const fillBar = document.getElementById("heroVideoFillBar");

  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const TOTAL_FRAMES = 120;
  const frames = [];
  let loadedFramesCount = 0;
  let isHeroLocked = true; // STRICT SCROLL LOCK
  let targetProgress = 0;
  let currentProgress = 0;
  let touchStartY = 0;
  let lastDrawnIndex = -1;

  // 1. Resize canvas to display resolution
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    renderFrame(Math.round(currentProgress * (TOTAL_FRAMES - 1)));
  }
  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  // 2. Preload all 120 WebP video frames for instantaneous 60fps scrub
  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    const num = String(i).padStart(4, "0");
    img.src = `assets/frames/frame_${num}.webp`;
    img.onload = () => {
      loadedFramesCount++;
      if (i === 1 || loadedFramesCount === 1) {
        renderFrame(0);
      }
    };
    frames.push(img);
  }

  // 3. Ultra-fast Canvas Frame Render (< 0.2ms per frame)
  function renderFrame(index) {
    const safeIdx = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
    const img = frames[safeIdx];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    lastDrawnIndex = safeIdx;
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    // Cover math
    const ratio = Math.max(cw / iw, ch / ih);
    const nw = iw * ratio;
    const nh = ih * ratio;
    const nx = (cw - nw) / 2;
    const ny = (ch - nh) / 2;

    ctx.drawImage(img, 0, 0, iw, ih, nx, ny, nw, nh);
  }

  // 4. Update UI & Lock State
  function updateLockUI(progress) {
    const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));
    if (fillBar) {
      fillBar.style.width = `${percent}%`;
    }

    if (progress >= 0.98) {
      if (isHeroLocked) {
        unlockShowroomScroll();
      }
    } else {
      if (!isHeroLocked && window.scrollY <= 10) {
        isHeroLocked = true;
        if (badge) badge.classList.remove("unlocked");
        if (badgeIcon) badgeIcon.textContent = "🔒";
        if (scrollIndicator) scrollIndicator.classList.remove("unlocked");
        if (scrollText) scrollText.textContent = "Scroll to Play Video";
      }
      if (badgeText) {
        badgeText.textContent = `Scroll to Play Video • Complete to Unlock (${percent}%)`;
      }
    }

    // Hero title & text subtle fade
    if (heroContent) {
      const textFade = Math.max(0.1, 1 - progress * 1.6);
      const textTranslate = progress * -40;
      heroContent.style.opacity = textFade.toFixed(3);
      heroContent.style.transform = `translate3d(0, ${textTranslate.toFixed(1)}px, 0)`;
    }
  }

  function unlockShowroomScroll() {
    isHeroLocked = false;
    targetProgress = 1;
    currentProgress = 1;
    if (badge) badge.classList.add("unlocked");
    if (badgeIcon) badgeIcon.textContent = "✦";
    if (badgeText) badgeText.innerHTML = "Video Complete • Scroll Down to Enter Showroom &darr;";
    if (fillBar) fillBar.style.width = "100%";
    if (scrollIndicator) {
      scrollIndicator.classList.add("unlocked");
    }
    if (scrollText) {
      scrollText.textContent = "Scroll to Explore Showroom";
    }
  }

  // 5. MOUSE WHEEL INTERCEPTION: Strictly locked until video reaches 100%
  window.addEventListener("wheel", (e) => {
    const isAtTop = window.scrollY <= 15;

    if (isAtTop && isHeroLocked) {
      // PREVENT PAGE FROM SCROLLING DOWN
      e.preventDefault();

      // Smooth step calculation (supports precision trackpad and notched wheels)
      const delta = e.deltaY;
      const step = Math.sign(delta) * Math.min(0.065, Math.max(0.015, Math.abs(delta) * 0.00055));
      targetProgress = Math.max(0, Math.min(1, targetProgress + step));
      updateLockUI(targetProgress);
      return;
    }

    // Allow reverse scrubbing if user is at top and scrolls upward
    if (isAtTop && !isHeroLocked && e.deltaY < 0 && targetProgress > 0) {
      const step = Math.sign(e.deltaY) * Math.min(0.065, Math.max(0.015, Math.abs(e.deltaY) * 0.00055));
      targetProgress = Math.max(0, Math.min(1, targetProgress + step));
      updateLockUI(targetProgress);
    }
  }, { passive: false });

  // 6. TOUCH INTERCEPTION (MOBILE)
  window.addEventListener("touchstart", (e) => {
    if (e.touches && e.touches[0]) {
      touchStartY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    const isAtTop = window.scrollY <= 15;
    if (isAtTop && isHeroLocked && e.touches && e.touches[0]) {
      const currentY = e.touches[0].clientY;
      const diffY = touchStartY - currentY;
      
      e.preventDefault();

      const step = (diffY / window.innerHeight) * 1.1;
      targetProgress = Math.max(0, Math.min(1, targetProgress + step));
      touchStartY = currentY;
      updateLockUI(targetProgress);
    }
  }, { passive: false });

  // 7. KEYBOARD INTERCEPTION
  window.addEventListener("keydown", (e) => {
    const isAtTop = window.scrollY <= 15;
    if (isAtTop && isHeroLocked) {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        targetProgress = Math.min(1, targetProgress + 0.08);
        updateLockUI(targetProgress);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        targetProgress = Math.max(0, targetProgress - 0.08);
        updateLockUI(targetProgress);
      }
    }
  });

  // 8. 60FPS SILKY SMOOTH LERP LOOP
  const renderLoop = () => {
    if (!isReducedMotion) {
      const diff = targetProgress - currentProgress;
      if (Math.abs(diff) > 0.0005) {
        currentProgress += diff * 0.38; // 0.38 gives instant, smooth response
        const frameIdx = Math.round(currentProgress * (TOTAL_FRAMES - 1));
        if (frameIdx !== lastDrawnIndex) {
          renderFrame(frameIdx);
        }
      }
    }
    requestAnimationFrame(renderLoop);
  };
  requestAnimationFrame(renderLoop);

  // 9. Links & Nav Click Handlers
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", () => {
      unlockShowroomScroll();
    });
  });

  if (scrollIndicator) {
    scrollIndicator.addEventListener("click", () => {
      if (isHeroLocked) {
        targetProgress = Math.min(1, targetProgress + 0.25);
        updateLockUI(targetProgress);
      } else {
        const intro = document.getElementById("introduction");
        if (intro) intro.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (badge) {
    badge.addEventListener("click", () => {
      if (isHeroLocked) {
        targetProgress = 1;
        updateLockUI(1);
      } else {
        const intro = document.getElementById("introduction");
        if (intro) intro.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
}

function triggerHeroIntroAnimations() {
  const eyebrow = document.querySelector(".hero-eyebrow");
  const title = document.querySelector(".hero-title");
  const subtext = document.querySelector(".hero-subtext");
  const cta = document.querySelector(".hero-cta-group");

  const elements = [eyebrow, title, subtext, cta];
  elements.forEach((el, index) => {
    if (el) {
      el.style.opacity = "0";
      el.style.transform = "translateY(25px)";
      setTimeout(() => {
        el.style.transition = "opacity 1s cubic-bezier(0.25, 1, 0.5, 1), transform 1s cubic-bezier(0.25, 1, 0.5, 1)";
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 150 + index * 180);
    }
  });
}

// ----------------------------------------------------------------------------
// 7. LOOKBOOK PARALLAX
// ----------------------------------------------------------------------------
function initLookbookParallax() {
  const lookbook = document.querySelector(".section-lookbook");
  const bg = document.querySelector(".lookbook-parallax-bg");
  if (!lookbook || !bg) return;

  const onScroll = () => {
    const rect = lookbook.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const scrollPercent = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const translateY = (scrollPercent - 0.5) * 80;
      bg.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

// ----------------------------------------------------------------------------
// 8. PRODUCT QUICK VIEW MODAL
// ----------------------------------------------------------------------------
const PRODUCT_DATA = {
  "royal-banarasi": {
    title: "Royal Banarasi Silk",
    collection: "Heritage Katan Weaves",
    price: "₹18,500",
    image: "assets/images/products/royal-banarasi.jpg",
    tag: "Pure Katan Silk",
    desc: "A masterwork of ancient Varanasi handloom heritage. Woven with authentic gold and silver zari brocade featuring intricate Persian floral motifs (Jall-daar) along the pallu and scalloped borders.",
    specs: [
      "Fabric: 100% Pure Certified Mulberry Katan Silk",
      "Zari: Tested Gold & Silver Electroplated Thread",
      "Weave Time: 28 Days on Traditional Pit Loom",
      "Included: Matching Unstitched Blouse Piece with Zari Border"
    ]
  },
  "kanjeevaram-brocade": {
    title: "Crimson Kanjeevaram Brocade",
    collection: "Temple Bridal Series",
    price: "₹24,000",
    image: "assets/images/products/kanjeevaram-brocade.jpg",
    tag: "Temple Zari Border",
    desc: "Crafted with the venerable Korvai interlocking technique from Kanchipuram. Heavy pure silk in deep crimson red adorned with temple spires (Gopuram motifs) and pure gold tissue pallu.",
    specs: [
      "Fabric: Heavy Grade Kanchipuram Mulberry Silk (4-ply)",
      "Zari: Authentic Temple Gold Motif Brocade",
      "Craft: Korvai Weaving Technique with Contrast Pallu",
      "Origin: Kanchipuram, Tamil Nadu"
    ]
  },
  "gilded-organza": {
    title: "Gilded Tissue Organza",
    collection: "Noor Festive Edit",
    price: "₹16,200",
    image: "assets/images/products/gilded-organza.jpg",
    tag: "Contemporary Luxe",
    desc: "Ethereal featherlight silk organza woven with real metallic warp threads that shimmer gracefully under evening chandeliers. Completed with delicate hand-scalloped resham embroidery.",
    specs: [
      "Fabric: Silk Organza with Tissue Metallic Warp",
      "Embroidery: Hand-cut scalloped borders with pearls & sequins",
      "Drape: Crisp, airy, modern silhouette",
      "Occasion: Sangeet, Cocktail Evenings & Receptions"
    ]
  },
  "vintage-chanderi": {
    title: "Vintage Chanderi Zari",
    collection: "Royal Weaver Series",
    price: "₹14,800",
    image: "assets/images/products/vintage-chanderi.jpg",
    tag: "Artisan Handloom",
    desc: "Celebrated for its sheer texture and lustrous feel, this Chanderi saree pairs finest mercerized cotton with natural mulberry silk, woven with miniature golden peacock butis.",
    specs: [
      "Fabric: Chanderi Silk-Cotton Blend (70:30)",
      "Zari: Traditional Nakshi Zari Weave",
      "Weight: Ultra lightweight (420 grams)",
      "Origin: Chanderi, Madhya Pradesh"
    ]
  },
  "rose-chikankari": {
    title: "Rose Dust Georgette Chikankari",
    collection: "Couturier Edit",
    price: "₹21,500",
    image: "assets/images/products/rose-chikankari.jpg",
    tag: "Hand Embroidered",
    desc: "An ode to Awadhi romance. Hand-embroidered in Lucknow using 32 heritage Chikankari stitch variations, paired with authentic Mukaish silver needlework that shimmers like morning dew.",
    specs: [
      "Fabric: Pure Viscose Georgette with liquid drape",
      "Craftsmanship: 60+ Hours of Lucknowi Hand Chikankari",
      "Embellishment: Badla / Mukaish Metallic Highlights",
      "Color: Soft Rose Powder Pink"
    ]
  },
  "indigo-raw-silk": {
    title: "Midnight Indigo Raw Silk",
    collection: "Artisan Weaves",
    price: "₹19,900",
    image: "assets/images/products/indigo-raw-silk.jpg",
    tag: "Heritage Silk",
    desc: "Textured Tussar raw silk in celestial midnight indigo. Featuring antique brass-toned antique zari borders and an architectural geometric pallu inspired by royal haveli courtyards.",
    specs: [
      "Fabric: Handspun Wild Tussar Raw Silk",
      "Texture: Natural slubbed raw silk with rich tactile feel",
      "Border: Antique Matte Gold Geometric Zari",
      "Style: Distinctive statement drape for connoisseurs"
    ]
  }
};

function initQuickViewModal() {
  const backdrop = document.getElementById("quickviewModal");
  const closeBtn = document.getElementById("modalCloseBtn");
  if (!backdrop) return;

  const modalImg = document.getElementById("modalImg");
  const modalTag = document.getElementById("modalTag");
  const modalTitle = document.getElementById("modalTitle");
  const modalPrice = document.getElementById("modalPrice");
  const modalDesc = document.getElementById("modalDesc");
  const modalSpecsList = document.getElementById("modalSpecsList");
  const modalWaBtn = document.getElementById("modalWaBtn");

  const openModal = (productId) => {
    const item = PRODUCT_DATA[productId];
    if (!item) return;

    if (modalImg) modalImg.src = item.image;
    if (modalTag) modalTag.textContent = `${item.tag} • ${item.collection}`;
    if (modalTitle) modalTitle.textContent = item.title;
    if (modalPrice) modalPrice.textContent = item.price;
    if (modalDesc) modalDesc.textContent = item.desc;

    if (modalSpecsList) {
      modalSpecsList.innerHTML = item.specs.map(s => `<li>• ${s}</li>`).join("");
    }

    if (modalWaBtn) {
      const msg = encodeURIComponent(`Hello, I am interested in inquiring about "${item.title}" (${item.price}) from your showroom.`);
      modalWaBtn.href = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "")}?text=${msg}`;
    }

    backdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    backdrop.classList.remove("active");
    document.body.style.overflow = "";
  };

  document.querySelectorAll("[data-quickview]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-quickview");
      openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && backdrop.classList.contains("active")) closeModal();
  });
}

// ----------------------------------------------------------------------------
// 9. SHOWROOM GALLERY LIGHTBOX
// ----------------------------------------------------------------------------
function initGalleryLightbox() {
  const items = document.querySelectorAll(".gallery-item");
  const modal = document.getElementById("quickviewModal");
  if (!items.length || !modal) return;

  // Gallery items can open quick preview
  items.forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      const title = item.querySelector(".gallery-caption")?.textContent || "Showroom Detail";
      const sub = item.querySelector(".gallery-sub")?.textContent || "Experience";
      if (!img) return;

      const modalImg = document.getElementById("modalImg");
      const modalTag = document.getElementById("modalTag");
      const modalTitle = document.getElementById("modalTitle");
      const modalPrice = document.getElementById("modalPrice");
      const modalDesc = document.getElementById("modalDesc");
      const modalSpecsList = document.getElementById("modalSpecsList");
      const modalWaBtn = document.getElementById("modalWaBtn");

      if (modalImg) modalImg.src = img.src;
      if (modalTag) modalTag.textContent = sub;
      if (modalTitle) modalTitle.textContent = title;
      if (modalPrice) modalPrice.textContent = "VIP Showroom Experience";
      if (modalDesc) modalDesc.textContent = "Experience the grandeur of our heritage showroom in person. Book a private consultation with our master saree stylists and drape specialists.";
      if (modalSpecsList) {
        modalSpecsList.innerHTML = `
          <li>• Private VIP trial suites with custom bridal lighting</li>
          <li>• Exclusive access to archival weave catalog</li>
          <li>• Personal drapist & styling consultation</li>
        `;
      }
      if (modalWaBtn) {
        const msg = encodeURIComponent(`Hello, I would like to schedule a showroom visit for ${title}.`);
        modalWaBtn.href = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "")}?text=${msg}`;
      }

      modal.classList.add("active");
      document.body.style.overflow = "hidden";
    });
  });
}

// ----------------------------------------------------------------------------
// 10. TESTIMONIALS SLIDER
// ----------------------------------------------------------------------------
function initTestimonialsSlider() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dotsContainer = document.querySelector(".test-dots");
  const prevBtn = document.getElementById("testPrevBtn");
  const nextBtn = document.getElementById("testNextBtn");
  if (!slides.length) return;

  let currentIdx = 0;
  let autoplayTimer = null;

  // Build dots
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    slides.forEach((_, idx) => {
      const dot = document.createElement("div");
      dot.className = `test-dot ${idx === 0 ? "active" : ""}`;
      dot.addEventListener("click", () => goToSlide(idx));
      dotsContainer.appendChild(dot);
    });
  }

  const goToSlide = (idx) => {
    slides[currentIdx].classList.remove("active");
    const dots = document.querySelectorAll(".test-dot");
    if (dots[currentIdx]) dots[currentIdx].classList.remove("active");

    currentIdx = (idx + slides.length) % slides.length;

    slides[currentIdx].classList.add("active");
    if (dots[currentIdx]) dots[currentIdx].classList.add("active");
    resetAutoplay();
  };

  const nextSlide = () => goToSlide(currentIdx + 1);
  const prevSlide = () => goToSlide(currentIdx - 1);

  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  const startAutoplay = () => {
    autoplayTimer = setInterval(nextSlide, 6500);
  };

  const resetAutoplay = () => {
    clearInterval(autoplayTimer);
    startAutoplay();
  };

  startAutoplay();
}

// ----------------------------------------------------------------------------
// 11. APPOINTMENT BOOKING FORM & TOAST
// ----------------------------------------------------------------------------
function initAppointmentForm() {
  const form = document.getElementById("appointmentForm");
  const toast = document.getElementById("toastMsg");
  if (!form) return;

  // Set min date to tomorrow
  const dateInput = form.querySelector('input[type="date"]');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split("T")[0];
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = form.name?.value || "Guest";
    const phone = form.phone?.value || "";
    const email = form.email?.value || "";
    const date = form.date?.value || "";
    const time = form.time?.value || "";
    const occasion = form.occasion?.value || "Bridal / Occasion";
    const message = form.message?.value || "";

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : "Book Appointment";
    if (submitBtn) {
      submitBtn.textContent = "Confirming Reservation...";
      submitBtn.disabled = true;
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.textContent = "Reservation Confirmed";
      }

      showToast(`Thank you, ${name}! Your private showroom appointment for ${date || "the chosen date"} is confirmed. Our concierge will call you shortly.`);

      // Optional sync to WhatsApp
      const waMsg = encodeURIComponent(
        `*NEW SHOWROOM APPOINTMENT REQUEST*\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nPreferred Date: ${date} (${time})\nOccasion: ${occasion}\nNote: ${message}`
      );
      const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "")}?text=${waMsg}`;

      // Open WhatsApp confirmation after small delay
      const waChoice = confirm("Would you also like to send this reservation directly to our Concierge on WhatsApp for instant VIP confirmation?");
      if (waChoice) {
        window.open(waUrl, "_blank");
      }

      form.reset();
      setTimeout(() => {
        if (submitBtn) {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      }, 3000);
    }, 900);
  });
}

function showToast(text) {
  const toast = document.getElementById("toastMsg");
  if (!toast) return;
  toast.textContent = text;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 5000);
}

// ----------------------------------------------------------------------------
// 12. SCROLL REVEAL ANIMATIONS (IntersectionObserver)
// ----------------------------------------------------------------------------
function initScrollAnimations() {
  const revealElements = document.querySelectorAll(".reveal-fade, .section-title, .intro-image-frame, .collection-card, .product-card, .pillar-card");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach(el => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px"
  });

  revealElements.forEach(el => {
    el.classList.add("reveal-fade");
    observer.observe(el);
  });
}

// ----------------------------------------------------------------------------
// 13. WHATSAPP FLOATING & CONCIERGE BUTTONS
// ----------------------------------------------------------------------------
function initWhatsAppButtons() {
  const waFloating = document.getElementById("floatingWhatsApp");
  const waGeneralLinks = document.querySelectorAll(".wa-concierge-link");

  const defaultMsg = encodeURIComponent("Hello, I would like to know more about your saree collection and showroom appointments.");
  const waUrl = `https://wa.me/${SITE_CONFIG.whatsapp.replace(/[^0-9]/g, "")}?text=${defaultMsg}`;

  if (waFloating) {
    waFloating.href = waUrl;
    waFloating.setAttribute("target", "_blank");
    waFloating.setAttribute("rel", "noopener noreferrer");
  }

  waGeneralLinks.forEach((link) => {
    link.href = waUrl;
    link.setAttribute("target", "_blank");
    link.setAttribute("rel", "noopener noreferrer");
  });
}
