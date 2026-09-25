document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const body = document.body;

  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .mobile-link');
  const allNavLinks = [...desktopLinks, ...mobileLinks];

  // 1. Open / Close Mobile Navigation with Scroll Lock
  function openMenu() {
    mobileDrawer.classList.add('is-open');
    menuBackdrop.classList.add('is-open');
    menuToggle.classList.add('is-active');
    menuToggle.setAttribute('aria-expanded', 'true');
    body.classList.add('nav-locked'); // Prevents background scrolling
  }

  function closeMenu() {
    mobileDrawer.classList.remove('is-open');
    menuBackdrop.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
    body.classList.remove('nav-locked'); // Restores background scrolling
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = mobileDrawer.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  if (drawerClose) drawerClose.addEventListener('click', closeMenu);
  menuBackdrop.addEventListener('click', closeMenu);

  // Close menu when clicking on any mobile nav item
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close menu with ESC key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // 2. Header Box Shadow on Scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('header-scrolled');
    } else {
      header.classList.remove('header-scrolled');
    }
  }, { passive: true });

  // 3. Scrollspy: Highlight current section link based on visible content
  const sections = document.querySelectorAll('section[id], div[id]');

  function updateActiveLink() {
    const scrollPosition = window.scrollY + header.offsetHeight + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        allNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // Run initially on load
});







document.addEventListener('DOMContentLoaded', () => {
   let currentPage = window.location.pathname.split('/').pop();

   if (currentPage === '' || currentPage === '/') {
    currentPage = 'index.html';
  }

   const navLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-drawer .mobile-link, .footer-links .footer-link');

   navLinks.forEach(link => {
    link.classList.remove('active');

    const linkHref = link.getAttribute('href');
    if (linkHref === currentPage) {
      link.classList.add('active');
    }
  });
});









gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section[id]');
  const allNavLinks = document.querySelectorAll('.desktop-nav .nav-link, .mobile-drawer .mobile-link, .footer-links .footer-link');

  sections.forEach((section) => {
    const id = section.getAttribute('id');

    ScrollTrigger.create({
      trigger: section,
      start: 'top 35%', // செக்ஷன் ஸ்கிரீனின் 35% பகுதிக்கு வரும்போது ஆக்டிவேட் ஆகும்
      end: 'bottom 35%',
      onEnter: () => setActive(id),
      onEnterBack: () => setActive(id),
    });
  });

  function setActive(id) {
    allNavLinks.forEach((link) => {
      // லிங்க்கின் href மதிப்பில் இருந்து '#id' அல்லது 'page.html#id' சரிபார்க்கப்படுகிறது
      const href = link.getAttribute('href');
      if (href === `#${id}` || href.endsWith(`#${id}`) || href === `${id}.html`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // அனிமேஷன்கள் லோட் ஆன பிறகு பொசிஷன்களை ரீ-கால்குலேட் செய்ய
  ScrollTrigger.refresh();
});







document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('siteHeader');
  
  // Select navigation links across desktop nav, mobile drawer, and footer
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .mobile-link');
  const footerLinks = document.querySelectorAll('.footer-links .footer-link');
  const allNavLinks = [...desktopLinks, ...mobileLinks, ...footerLinks];

  const sections = document.querySelectorAll('section[id], div[id]');

  function updateActiveLink() {
    const headerHeight = header ? header.offsetHeight : 80;
    const scrollPosition = window.scrollY + headerHeight + 100;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      // Check if current scroll position is inside this section's bounds
      if (scrollPosition >= top && scrollPosition < top + height) {
        allNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink(); // Initial check on load
});









// --- Hero Section GSAP Timeline Reveal ---
if (document.querySelector('.hero-section')) {
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroTl
    .from('.hero-pill-badge', { opacity: 0, y: 15, duration: 0.7, delay: 0.1 })
    .from('.hero-title', { opacity: 0, y: 30, duration: 0.9 }, '-=0.4')
    .from('.hero-desc', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
    .from('.hero-btn-group .btn', { opacity: 0, y: 15, stagger: 0.12, duration: 0.6 }, '-=0.4')
    .from('.trust-stat', { opacity: 0, y: 15, stagger: 0.1, duration: 0.6 }, '-=0.4')
    .from('.visual-frame', { opacity: 0, scale: 0.95, y: 20, duration: 1, ease: 'expo.out' }, '-=1')
    .from('.floating-glass-card', { opacity: 0, y: 25, stagger: 0.15, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.5');

  // Subtle Parallax Scroll on the hero image
  if (document.querySelector('.hero-img')) {
    gsap.to('.hero-img', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });
  }
}








gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // 1. CORE SELECTORS
  // ==========================================================================
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const drawerClose = document.getElementById('drawerClose');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const menuBackdrop = document.getElementById('menuBackdrop');
  const body = document.body;

  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('.mobile-drawer .mobile-link');
  const footerLinks = document.querySelectorAll('.footer-links .footer-link');
  const allNavLinks = [...desktopLinks, ...mobileLinks, ...footerLinks];

  // ==========================================================================
  // 2. MOBILE MENU & SCROLL LOCK
  // ==========================================================================
  function openMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.add('is-open');
    if (menuBackdrop) menuBackdrop.classList.add('is-open');
    if (menuToggle) {
      menuToggle.classList.add('is-active');
      menuToggle.setAttribute('aria-expanded', 'true');
    }
    body.classList.add('nav-locked');
  }

  function closeMenu() {
    if (!mobileDrawer) return;
    mobileDrawer.classList.remove('is-open');
    if (menuBackdrop) menuBackdrop.classList.remove('is-open');
    if (menuToggle) {
      menuToggle.classList.remove('is-active');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
    body.classList.remove('nav-locked');
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer && mobileDrawer.classList.contains('is-open');
      isOpen ? closeMenu() : openMenu();
    });
  }

  if (drawerClose) drawerClose.addEventListener('click', closeMenu);
  if (menuBackdrop) menuBackdrop.addEventListener('click', closeMenu);
  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // ==========================================================================
  // 3. UNIFIED NAVIGATION HIGHLIGHTER (Fixes Header & Footer Sync)
  // ==========================================================================
  const sections = document.querySelectorAll('section[id]');
  let currentPage = window.location.pathname.split('/').pop().split('?')[0].split('#')[0];
  if (!currentPage || currentPage === '') currentPage = 'index.html';

  function applyActiveLink(identifier) {
    allNavLinks.forEach(link => {
      const rawHref = link.getAttribute('href') || '';
      const cleanHref = rawHref.split('/').pop();

      // Matches in-page anchors (#treatments), multi-page paths (treatments.html), and hero/index
      const isTargetMatch =
        cleanHref === `#${identifier}` ||
        cleanHref === `${identifier}.html` ||
        cleanHref.startsWith(`${identifier}.html#`) ||
        (identifier === 'hero' && (cleanHref === 'index.html' || cleanHref === '#hero' || cleanHref === ''));

      if (isTargetMatch) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  if (sections.length > 0) {
    sections.forEach(sec => {
      const secId = sec.getAttribute('id');
      if (!secId) return;

      ScrollTrigger.create({
        trigger: sec,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => applyActiveLink(secId),
        onEnterBack: () => applyActiveLink(secId)
      });
    });
  } else {
    allNavLinks.forEach(link => {
      const targetFile = (link.getAttribute('href') || '').split('/').pop().split('#')[0];
      link.classList.toggle('active', targetFile === currentPage);
    });
  }

  // Header background style trigger
  if (header) {
    ScrollTrigger.create({
      start: 'top -30px',
      onUpdate: (self) => {
        header.classList.toggle('header-scrolled', self.progress > 0);
      }
    });
  }

  // ==========================================================================
  // 4. 3D COVERFLOW CAROUSEL LOGIC
  // ==========================================================================
  const cards = document.querySelectorAll('.coverflow-card');
  const prevBtn = document.getElementById('coverflowPrev');
  const nextBtn = document.getElementById('coverflowNext');
  const dotsContainer = document.getElementById('coverflowDots');

  let currentIndex = 1; // Start focused on the signature 2nd card
  const totalCards = cards.length;

  if (cards.length > 0) {
    // Generate indicator dots
    dotsContainer.innerHTML = '';
    cards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('coverflow-dot');
      if (idx === currentIndex) dot.classList.add('active');
      dot.setAttribute('aria-label', `Slide ${idx + 1}`);
      dot.addEventListener('click', () => updateCoverflow(idx));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.coverflow-dot');

    function updateCoverflow(newIndex) {
      currentIndex = (newIndex + totalCards) % totalCards;

      cards.forEach((card, i) => {
        card.className = 'coverflow-card'; // reset classes

        if (i === currentIndex) {
          card.classList.add('active');
        } else if (i === (currentIndex - 1 + totalCards) % totalCards) {
          card.classList.add('prev-1');
        } else if (i === (currentIndex + 1) % totalCards) {
          card.classList.add('next-1');
        } else if (i < currentIndex) {
          card.classList.add('hidden-left');
        } else {
          card.classList.add('hidden-right');
        }
      });

      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
    }

    // Direct card click navigation
    cards.forEach((card, idx) => {
      card.addEventListener('click', () => {
        if (currentIndex !== idx) updateCoverflow(idx);
      });
    });

    if (prevBtn) prevBtn.addEventListener('click', () => updateCoverflow(currentIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => updateCoverflow(currentIndex + 1));

    // Initialize carousel display
    updateCoverflow(currentIndex);
  }

  // ==========================================================================
  // 5. GSAP SCROLL ENTRANCE ANIMATIONS
  // ==========================================================================
  if (document.querySelector('.treatments-carousel-section')) {
    gsap.from('.carousel-head > *', {
      scrollTrigger: {
        trigger: '.treatments-carousel-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.coverflow-stage', {
      scrollTrigger: {
        trigger: '.coverflow-stage',
        start: 'top 80%'
      },
      opacity: 0,
      scale: 0.94,
      y: 40,
      duration: 1.1,
      ease: 'power3.out'
    });
  }

  ScrollTrigger.refresh();
});







// ==========================================================================
  // SPLIT-SCREEN: INTERACTIVE TABS & BEFORE/AFTER SLIDER
  // ==========================================================================
  
  // 1. Accordion / Tab Switching
  const pillarItems = document.querySelectorAll('.pillar-item');
  pillarItems.forEach(item => {
    item.addEventListener('click', () => {
      pillarItems.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // 2. Interactive Before / After Slider
  const sliderContainer = document.getElementById('beforeAfterSlider');
  const sliderBeforeWrap = document.getElementById('sliderBeforeWrap');
  const sliderHandle = document.getElementById('sliderHandle');

  if (sliderContainer && sliderBeforeWrap && sliderHandle) {
    let isSliding = false;

    function handleSlide(clientX) {
      const rect = sliderContainer.getBoundingClientRect();
      let offsetX = clientX - rect.left;
      
      // Boundary clamp (5% to 95%)
      const minX = rect.width * 0.05;
      const maxX = rect.width * 0.95;
      if (offsetX < minX) offsetX = minX;
      if (offsetX > maxX) offsetX = maxX;

      const percentage = (offsetX / rect.width) * 100;
      sliderBeforeWrap.style.width = `${percentage}%`;
      sliderHandle.style.left = `${percentage}%`;
    }

    sliderContainer.addEventListener('mousedown', (e) => {
      isSliding = true;
      handleSlide(e.clientX);
    });

    window.addEventListener('mouseup', () => { isSliding = false; });
    window.addEventListener('mousemove', (e) => {
      if (isSliding) handleSlide(e.clientX);
    });

    // Touch support for mobile devices
    sliderContainer.addEventListener('touchstart', (e) => {
      isSliding = true;
      handleSlide(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isSliding = false; });
    window.addEventListener('touchmove', (e) => {
      if (isSliding) handleSlide(e.touches[0].clientX);
    }, { passive: true });
  }

  // 3. GSAP Entrance Animation for Split Section
  if (document.querySelector('.split-showcase-section')) {
    gsap.from('.split-content-col > *', {
      scrollTrigger: {
        trigger: '.split-showcase-section',
        start: 'top 75%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.9,
      ease: 'power3.out'
    });

    gsap.from('.split-visual-col', {
      scrollTrigger: {
        trigger: '.split-showcase-section',
        start: 'top 70%'
      },
      opacity: 0,
      scale: 0.95,
      x: 30,
      duration: 1.1,
      ease: 'power3.out'
    });
  }









  // ==========================================================================
  // SVG MATRIX FILTER SWITCHER & GSAP REVEAL
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const matrixTargets = document.querySelectorAll('.matrix-target');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterId = btn.dataset.filter;

      // Apply the SVG matrix filter smoothly to all scan images
      matrixTargets.forEach(img => {
        if (filterId === 'none') {
          img.style.filter = 'none';
        } else {
          img.style.filter = `url(#${filterId})`;
        }
      });
    });
  });

  // GSAP Entrance Animations
  if (document.querySelector('.matrix-filter-section')) {
    gsap.from('.matrix-head > *', {
      scrollTrigger: {
        trigger: '.matrix-filter-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.scan-card', {
      scrollTrigger: {
        trigger: '.matrix-grid',
        start: 'top 80%'
      },
      opacity: 0,
      y: 35,
      stagger: 0.18,
      duration: 0.9,
      ease: 'power3.out'
    });
  }









  // ==========================================================================
  // MICRO-INTERACTION MORPHING LOGIC
  // ==========================================================================
  const morphTabs = document.querySelectorAll('.morph-tab-btn');
  const morphIndicator = document.getElementById('morphBubbleIndicator');
  const morphPath = document.getElementById('morphPath');
  const chamberConc = document.getElementById('chamberConcentration');
  const chamberPh = document.getElementById('chamberPh');

  const formulaCode = document.getElementById('formulaCode');
  const formulaTitle = document.getElementById('formulaTitle');
  const formulaDesc = document.getElementById('formulaDesc');
  const ing1 = document.getElementById('ing1');
  const ing2 = document.getElementById('ing2');
  const ing3 = document.getElementById('ing3');

  // Morphing SVG Path Coordinates for 3 States
  const morphStates = {
    hydrate: {
      path: "M 50,200 C 60,110 130,50 200,60 C 280,70 340,120 350,200 C 360,290 290,340 200,330 C 110,320 40,290 50,200 Z",
      colorStart: "#e8b4b8",
      colorEnd: "#c59b7b",
      conc: "840 mOsm/L",
      ph: "pH 5.4 BALANCED",
      code: "PROTOCOL HY-01",
      title: "Liposomal Hyaluronic Suspension",
      desc: "Combines five molecular weights of fermented non-animal hyaluronic acid with phytoceramides to flood cellular compartments and plump degraded channels.",
      ings: ["Low-MW Hyaluronate (1.8%)", "Snow Fungus Polysaccharide", "Ectoin Barrier Protector"]
    },
    clarify: {
      path: "M 70,170 C 80,70 200,40 270,80 C 330,120 360,230 320,300 C 260,370 140,360 80,300 C 40,240 60,220 70,170 Z",
      colorStart: "#244244",
      colorEnd: "#3d6568",
      conc: "420 mOsm/L",
      ph: "pH 4.8 ACTIVE",
      code: "PROTOCOL CL-02",
      title: "Glycolic & Willow Bark Complex",
      desc: "Buffered alpha and beta-hydroxy fractions micro-dissolve cellular cement within sebaceous canals, preventing acne papules while keeping skin calm.",
      ings: ["Buffered Glycolic Acid (7%)", "Organic Willow Salicin", "Centella Asiatica Extract"]
    },
    renew: {
      path: "M 90,200 C 80,100 160,60 230,70 C 310,80 340,160 320,240 C 300,320 220,350 150,330 C 70,300 100,270 90,200 Z",
      colorStart: "#c59b7b",
      colorEnd: "#e8b4b8",
      conc: "980 mOsm/L",
      ph: "pH 5.8 RESTORATIVE",
      code: "PROTOCOL RN-03",
      title: "Polynucleotide Matrix Booster",
      desc: "High-density peptide fragments derived from marine bio-technology trigger neo-collagenesis and tissue regeneration along deep wrinkle lines.",
      ings: ["PDRN Bio-Stimulator (2.5%)", "Copper Tripeptide-1", "Bio-Placental Growth Factors"]
    }
  };

  // Adjust background indicator position
  function updateIndicator(tab) {
    if (!morphIndicator || !tab) return;
    morphIndicator.style.width = `${tab.offsetWidth}px`;
    morphIndicator.style.transform = `translateX(${tab.offsetLeft - 6}px)`;
  }

  // Switch Formula States
  morphTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      morphTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updateIndicator(tab);

      const target = tab.dataset.formula;
      const data = morphStates[target];

      // Smooth Morphing Transitions
      if (morphPath) morphPath.setAttribute('d', data.path);
      
      const grad1 = document.querySelector('.gradient-stop-1');
      const grad2 = document.querySelector('.gradient-stop-2');
      if (grad1 && grad2) {
        grad1.setAttribute('stop-color', data.colorStart);
        grad2.setAttribute('stop-color', data.colorEnd);
      }

      if (chamberConc) chamberConc.textContent = data.conc;
      if (chamberPh) chamberPh.textContent = data.ph;
      if (formulaCode) formulaCode.textContent = data.code;
      if (formulaTitle) formulaTitle.textContent = data.title;
      if (formulaDesc) formulaDesc.textContent = data.desc;
      if (ing1) ing1.textContent = data.ings[0];
      if (ing2) ing2.textContent = data.ings[1];
      if (ing3) ing3.textContent = data.ings[2];
    });
  });

  // Position indicator correctly on load
  const initialActive = document.querySelector('.morph-tab-btn.active');
  if (initialActive) {
    setTimeout(() => updateIndicator(initialActive), 150);
  }

  // Window resize recalculation for indicator
  window.addEventListener('resize', () => {
    const active = document.querySelector('.morph-tab-btn.active');
    if (active) updateIndicator(active);
  });

  // Micro-Morphing CTA Button State Cycle
  const actionBtn = document.getElementById('morphActionBtn');
  if (actionBtn) {
    actionBtn.addEventListener('click', () => {
      // 1. Morph to loading sphere
      actionBtn.classList.add('state-loading');

      // 2. Morph to success pill after simulated calibration
      setTimeout(() => {
        actionBtn.classList.remove('state-loading');
        actionBtn.classList.add('state-success');

        // 3. Reset after 4 seconds
        setTimeout(() => {
          actionBtn.classList.remove('state-success');
        }, 4000);
      }, 1600);
    });
  }

  // GSAP Entrance Animation
  if (document.querySelector('.morph-section')) {
    gsap.from('.morph-header > *', {
      scrollTrigger: {
        trigger: '.morph-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.14,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.morph-stage-grid > *', {
      scrollTrigger: {
        trigger: '.morph-stage-grid',
        start: 'top 75%'
      },
      opacity: 0,
      y: 35,
      stagger: 0.2,
      duration: 0.95,
      ease: 'power3.out'
    });
  }









  // ==========================================================================
  // TESTIMONIALS CAROUSEL LOGIC
  // ==========================================================================
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  const prevTestimonialBtn = document.getElementById('prevTestimonial');
  const nextTestimonialBtn = document.getElementById('nextTestimonial');
  const testimonialDotsContainer = document.getElementById('testimonialDots');
  const carouselContainer = document.getElementById('testimonialCarousel');

  let currentTestimonial = 0;
  const totalTestimonials = testimonialCards.length;
  let testimonialTimer = null;

  if (totalTestimonials > 0 && testimonialDotsContainer) {
    // Generate navigation dots
    testimonialDotsContainer.innerHTML = '';
    testimonialCards.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.classList.add('testimonial-dot');
      if (idx === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to review ${idx + 1}`);
      dot.addEventListener('click', () => {
        showTestimonial(idx);
        restartTimer();
      });
      testimonialDotsContainer.appendChild(dot);
    });

    const testDots = document.querySelectorAll('.testimonial-dot');

    function showTestimonial(index) {
      currentTestimonial = (index + totalTestimonials) % totalTestimonials;

      testimonialCards.forEach((card, idx) => {
        card.classList.toggle('active', idx === currentTestimonial);
      });

      testDots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentTestimonial);
      });
    }

    if (prevTestimonialBtn) {
      prevTestimonialBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial - 1);
        restartTimer();
      });
    }

    if (nextTestimonialBtn) {
      nextTestimonialBtn.addEventListener('click', () => {
        showTestimonial(currentTestimonial + 1);
        restartTimer();
      });
    }

    // Auto-advance every 6.5s
    function startTimer() {
      testimonialTimer = setInterval(() => {
        showTestimonial(currentTestimonial + 1);
      }, 6500);
    }

    function stopTimer() {
      if (testimonialTimer) clearInterval(testimonialTimer);
    }

    function restartTimer() {
      stopTimer();
      startTimer();
    }

    // Pause on hover
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopTimer);
      carouselContainer.addEventListener('mouseleave', startTimer);
    }

    startTimer();
  }

  // GSAP Entrance Reveal
  if (document.querySelector('.testimonials-section')) {
    gsap.from('.testimonials-head > *', {
      scrollTrigger: {
        trigger: '.testimonials-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.testimonials-carousel', {
      scrollTrigger: {
        trigger: '.testimonials-carousel',
        start: 'top 80%'
      },
      opacity: 0,
      y: 35,
      duration: 0.95,
      ease: 'power3.out'
    });

    gsap.from('.trust-summary-strip', {
      scrollTrigger: {
        trigger: '.trust-summary-strip',
        start: 'top 85%'
      },
      opacity: 0,
      y: 30,
      duration: 0.85,
      ease: 'power2.out'
    });
  }










  // ==========================================================================
  // FAQ ACCORDION INTERACTION & GSAP REVEAL
  // ==========================================================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for a clean single-open accordion feel
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherTrigger = otherItem.querySelector('.faq-trigger');
        if (otherTrigger) otherTrigger.setAttribute('aria-expanded', 'false');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
        trigger.setAttribute('aria-expanded', 'true');
      } else {
        trigger.setAttribute('aria-expanded', 'false');
      }

      // Recompute ScrollTrigger measurements after drawer expands/collapses
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 460);
    });
  });

  // GSAP Entrance Reveal
  if (document.querySelector('.faq-section')) {
    gsap.from('.faq-head > *', {
      scrollTrigger: {
        trigger: '.faq-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.faq-item', {
      scrollTrigger: {
        trigger: '.faq-accordion',
        start: 'top 80%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.12,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.sidebar-card', {
      scrollTrigger: {
        trigger: '.faq-sidebar',
        start: 'top 80%'
      },
      opacity: 0,
      scale: 0.96,
      y: 30,
      duration: 0.95,
      ease: 'power3.out'
    });
  }








  // ==========================================================================
  // FINAL CTA: STRICT SANITIZATION, CUSTOM DROPDOWN, & PAGE VERIFICATION
  // ==========================================================================
  const form = document.getElementById('ctaBookingForm');
  const nameInput = document.getElementById('ctaName');
  const phoneInput = document.getElementById('ctaPhone');
  const submitBtn = document.getElementById('ctaSubmitBtn');

  const nameGroup = document.getElementById('nameGroup');
  const phoneGroup = document.getElementById('phoneGroup');
  const concernGroup = document.getElementById('concernGroup');

  // Custom Dropdown Elements
  const customDropdown = document.getElementById('customDropdown');
  const dropdownTrigger = document.getElementById('dropdownTrigger');
  const selectedText = document.getElementById('selectedText');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  const selectedConcernInput = document.getElementById('selectedConcern');

  // 1. Strict Input Sanitization in Real Time
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      // Allows only alphabets (A-Z, a-z) and spaces; strips all numbers and symbols
      nameInput.value = nameInput.value.replace(/[^A-Za-z\s]/g, '');
      if (nameInput.value.trim().length >= 2) {
        nameGroup.classList.remove('has-error');
      }
    });
  }

  if (phoneInput) {
    phoneInput.addEventListener('input', () => {
      // Allows only digits (0-9); strips all letters and symbols
      phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
      if (phoneInput.value.trim().length === 10) {
        phoneGroup.classList.remove('has-error');
      }
    });
  }

  // 2. Custom Method Dropdown Toggle & Selection
  if (customDropdown && dropdownTrigger) {
    function toggleDropdown(state) {
      const open = state !== undefined ? state : !customDropdown.classList.contains('is-open');
      customDropdown.classList.toggle('is-open', open);
      dropdownTrigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    dropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDropdown();
    });

    dropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetPage = item.dataset.value;
        const textLabel = item.querySelector('span').textContent;

        selectedConcernInput.value = targetPage;
        selectedText.textContent = textLabel;
        dropdownTrigger.classList.add('has-value');

        dropdownItems.forEach(i => i.classList.remove('is-selected'));
        item.classList.add('is-selected');

        concernGroup.classList.remove('has-error');
        toggleDropdown(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!customDropdown.contains(e.target)) {
        toggleDropdown(false);
      }
    });
  }

  // 3. Form Validation & Respective Page Check / Fallback Redirect
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name: Only alphabets, between 2 and 50 characters
      const nameVal = nameInput.value.trim();
      const namePattern = /^[A-Za-z\s]{2,50}$/;
      if (!namePattern.test(nameVal)) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Phone: Exactly 10 digits
      const phoneVal = phoneInput.value.trim();
      const phonePattern = /^[0-9]{10}$/;
      if (!phonePattern.test(phoneVal)) {
        phoneGroup.classList.add('has-error');
        isValid = false;
      } else {
        phoneGroup.classList.remove('has-error');
      }

      // Validate Dropdown selection
      const targetPage = selectedConcernInput.value.trim();
      if (!targetPage) {
        concernGroup.classList.add('has-error');
        isValid = false;
      } else {
        concernGroup.classList.remove('has-error');
      }

      if (!isValid) return;

      // Loading state on button
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <span>Routing Consultation...</span>
      `;

      // Check if the selected page exists; if missing or 404, safely route to error.html
      try {
        const response = await fetch(targetPage, { method: 'HEAD' });
        if (response.ok) {
          window.location.href = targetPage;
        } else {
          window.location.href = 'error.html';
        }
      } catch (err) {
        window.location.href = 'error.html';
      }
    });
  }

  // 4. GSAP Scroll Entrance Animations
  if (document.querySelector('.final-cta-section')) {
    gsap.from('.cta-card', {
      scrollTrigger: {
        trigger: '.final-cta-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.cta-info-col > *', {
      scrollTrigger: {
        trigger: '.cta-card',
        start: 'top 75%'
      },
      opacity: 0,
      x: -30,
      stagger: 0.12,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.cta-booking-box', {
      scrollTrigger: {
        trigger: '.cta-card',
        start: 'top 75%'
      },
      opacity: 0,
      x: 30,
      duration: 0.95,
      ease: 'power3.out'
    });
  }