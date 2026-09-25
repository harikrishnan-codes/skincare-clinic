// ==========================================================================
  // TREATMENTS HERO: FILTER CHIPS & GSAP REVEAL
  // ==========================================================================
  const filterChips = document.querySelectorAll('.treatment-filter-bar .filter-chip');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const selectedCategory = chip.dataset.category;
      
      // Dispatch a custom event so treatment grid cards below can filter dynamically
      const filterEvent = new CustomEvent('treatmentCategoryChange', {
        detail: { category: selectedCategory }
      });
      document.dispatchEvent(filterEvent);
    });
  });

  // GSAP Entrance Animations
  if (document.querySelector('.treatment-hero-section')) {
    const treatHeroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    treatHeroTl
      .from('.hero-breadcrumb-badge', { opacity: 0, y: 15, duration: 0.6, delay: 0.1 })
      .from('.treatment-hero-title', { opacity: 0, y: 30, duration: 0.85 }, '-=0.4')
      .from('.treatment-hero-desc', { opacity: 0, y: 20, duration: 0.7 }, '-=0.5')
      .from('.treatment-filter-bar .filter-chip', { 
        opacity: 0, 
        y: 15, 
        stagger: 0.08, 
        duration: 0.5 
      }, '-=0.4')
      .from('.treatment-visual-frame', { 
        opacity: 0, 
        scale: 0.95, 
        y: 25, 
        duration: 0.9, 
        ease: 'expo.out' 
      }, '-=0.8')
      .from('.treatment-metrics-card', { 
        opacity: 0, 
        y: 20, 
        duration: 0.7 
      }, '-=0.5');
  }







  // ==========================================================================
  // CLAYMORPHISM SECTION: CATEGORY FILTER SYNC & GSAP REVEAL
  // ==========================================================================
  
  // Listen for category changes dispatched from the Treatment Hero Filter Bar
  document.addEventListener('treatmentCategoryChange', (e) => {
    const selectedCategory = e.detail.category;
    const clayCards = document.querySelectorAll('.clay-card');

    clayCards.forEach(card => {
      const cardCategory = card.dataset.category;
      if (selectedCategory === 'all' || cardCategory === selectedCategory) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          display: 'flex',
          duration: 0.45,
          ease: 'power2.out'
        });
      } else {
        gsap.to(card, {
          opacity: 0,
          scale: 0.94,
          duration: 0.35,
          ease: 'power2.in',
          onComplete: () => {
            card.style.display = 'none';
          }
        });
      }
    });

    // Recompute scroll bounds
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
  });

  // GSAP Scroll Entrance Animations
  if (document.querySelector('.clay-compounds-section')) {
    gsap.from('.clay-header > *', {
      scrollTrigger: {
        trigger: '.clay-compounds-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.clay-card', {
      scrollTrigger: {
        trigger: '.clay-grid',
        start: 'top 75%'
      },
      opacity: 0,
      y: 40,
      scale: 0.94,
      stagger: 0.18,
      duration: 0.95,
      ease: 'back.out(1.2)'
    });

    gsap.from('.status-pod', {
      scrollTrigger: {
        trigger: '.clay-status-strip',
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      stagger: 0.12,
      duration: 0.7,
      ease: 'power2.out'
    });
  }








  // ==========================================================================
  // CARD-STACK / ACCORDION DECK INTERACTION & GSAP REVEAL
  // ==========================================================================
  const deckCards = document.querySelectorAll('.deck-card');

  deckCards.forEach(card => {
    card.addEventListener('click', () => {
      if (card.classList.contains('active')) return;

      // Collapse all cards and expand selected card
      deckCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // Refresh ScrollTrigger calculations smoothly
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 500);
    });
  });

  // GSAP Scroll Entrance Animations
  if (document.querySelector('.deck-section')) {
    gsap.from('.deck-header > *', {
      scrollTrigger: {
        trigger: '.deck-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.deck-card', {
      scrollTrigger: {
        trigger: '.deck-stack',
        start: 'top 75%'
      },
      opacity: 0,
      y: 35,
      stagger: 0.12,
      duration: 0.9,
      ease: 'power3.out'
    });
  }








  // ==========================================================================
  // RETRO-FUTURISM & VAPORWAVE SECTION GSAP ENTRANCE
  // ==========================================================================
  if (document.querySelector('.retrowave-section')) {
    // Header Reveal
    gsap.from('.vapor-header > *', {
      scrollTrigger: {
        trigger: '.retrowave-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    // Retro-Futuristic Cards Stagger
    gsap.from('.vapor-card', {
      scrollTrigger: {
        trigger: '.vapor-cards-grid',
        start: 'top 75%'
      },
      opacity: 0,
      y: 45,
      stagger: 0.18,
      duration: 1,
      ease: 'power3.out'
    });

    // Terminal Status Bar Slide In
    gsap.from('.vapor-terminal-bar', {
      scrollTrigger: {
        trigger: '.vapor-terminal-bar',
        start: 'top 90%'
      },
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power2.out'
    });
  }









  // ==========================================================================
  // TREATMENT CALIBRATOR & CARE PROTOCOLS INTERACTION
  // ==========================================================================
  const pillBtns = document.querySelectorAll('.calc-pill-btn');
  const severityRange = document.getElementById('severityRange');
  const severityDisplay = document.getElementById('severityDisplay');
  const outSessions = document.getElementById('outSessions');
  const outWeeks = document.getElementById('outWeeks');
  const outPrice = document.getElementById('outPrice');

  let basePrice = 4500;
  let baseSessions = 3;
  let baseWeeks = 6;

  function updateCalculation() {
    if (!severityRange || !outSessions) return;
    const severityMultiplier = parseInt(severityRange.value, 10); // 1, 2, or 3

    // Update Severity Label
    if (severityMultiplier === 1) severityDisplay.textContent = 'Mild (Grade I)';
    if (severityMultiplier === 2) severityDisplay.textContent = 'Moderate (Grade II)';
    if (severityMultiplier === 3) severityDisplay.textContent = 'Severe (Grade III)';

    // Adjust values based on condition grade
    const totalSessions = baseSessions + (severityMultiplier - 1);
    const totalWeeks = baseWeeks + (severityMultiplier - 1) * 2;
    const totalPrice = (basePrice * totalSessions).toLocaleString('en-IN');

    outSessions.textContent = `${totalSessions} Sessions`;
    outWeeks.textContent = `${totalWeeks} Weeks`;
    outPrice.textContent = `₹${totalPrice}`;
  }

  pillBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pillBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      basePrice = parseInt(btn.dataset.basePrice, 10);
      baseSessions = parseInt(btn.dataset.sessions, 10);
      baseWeeks = parseInt(btn.dataset.weeks, 10);

      updateCalculation();
    });
  });

  if (severityRange) {
    severityRange.addEventListener('input', updateCalculation);
  }

  // Pre/Post-Care Accordion
  const guideItems = document.querySelectorAll('.guide-item');
  guideItems.forEach(item => {
    const trigger = item.querySelector('.guide-trigger');
    if (trigger) {
      trigger.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        guideItems.forEach(g => {
          g.classList.remove('active');
          const t = g.querySelector('.guide-trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          item.classList.add('active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // GSAP Entrance Animations
  if (document.querySelector('.treatment-final-section')) {
    gsap.from('.concierge-header > *', {
      scrollTrigger: {
        trigger: '.treatment-final-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.calibrator-card', {
      scrollTrigger: {
        trigger: '.concierge-grid',
        start: 'top 75%'
      },
      opacity: 0,
      x: -30,
      duration: 0.95,
      ease: 'power3.out'
    });

    gsap.from('.protocols-card', {
      scrollTrigger: {
        trigger: '.concierge-grid',
        start: 'top 75%'
      },
      opacity: 0,
      x: 30,
      duration: 0.95,
      ease: 'power3.out'
    });

    gsap.from('.concierge-support-strip', {
      scrollTrigger: {
        trigger: '.concierge-support-strip',
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power2.out'
    });
  }