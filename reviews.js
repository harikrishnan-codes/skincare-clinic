// ==========================================================================
  // RESULTS PAGE HERO: FILTER CHIPS & GSAP REVEAL
  // ==========================================================================
  const resultFilterChips = document.querySelectorAll('.results-filter-bar .result-filter-chip');

  resultFilterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      resultFilterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const condition = chip.dataset.condition;

      // Dispatch custom event for downstream outcome gallery cards to filter
      const resultEvent = new CustomEvent('conditionFilterChange', {
        detail: { condition: condition }
      });
      document.dispatchEvent(resultEvent);
    });
  });

  // GSAP Entrance Animations
  if (document.querySelector('.results-hero-section')) {
    const resultsHeroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    resultsHeroTl
      .from('.results-hero-section .hero-breadcrumb-badge', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        delay: 0.1
      })
      .from('.results-hero-title', {
        opacity: 0,
        y: 30,
        duration: 0.85
      }, '-=0.4')
      .from('.results-hero-lead', {
        opacity: 0,
        y: 20,
        duration: 0.7
      }, '-=0.5')
      .from('.results-filter-bar .result-filter-chip', {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.5
      }, '-=0.4')
      .from('.results-trust-row .results-trust-stat', {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.6
      }, '-=0.3')
      .from('.results-visual-frame', {
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 1,
        ease: 'expo.out'
      }, '-=0.9')
      .from('.floating-case-card', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'back.out(1.4)'
      }, '-=0.5');
  }









  // ==========================================================================
  // RESULTS PAGE: RETRO-FUTURISM TELEMETRY GSAP REVEAL
  // ==========================================================================
  if (document.querySelector('.results-vapor-section')) {
    // Header Reveal
    gsap.from('.results-vapor-header > *', {
      scrollTrigger: {
        trigger: '.results-vapor-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    // Telemetry Cards Stagger
    gsap.from('.telemetry-card', {
      scrollTrigger: {
        trigger: '.vapor-telemetry-grid',
        start: 'top 75%'
      },
      opacity: 0,
      y: 40,
      stagger: 0.18,
      duration: 0.95,
      ease: 'power3.out'
    });

    // Terminal Status Bar Reveal
    gsap.from('.telemetry-terminal-footer', {
      scrollTrigger: {
        trigger: '.telemetry-terminal-footer',
        start: 'top 90%'
      },
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power2.out'
    });
  }








// ==========================================================================
  // BEFORE/AFTER INTERACTIVE SPLIT-SCREEN DRAGGABLE ENGINE
  // ==========================================================================
  const viewport = document.getElementById('splitViewport');
  const beforeLayer = document.getElementById('layerBefore');
  const handle = document.getElementById('splitHandle');

  if (viewport && beforeLayer && handle) {
    let isDragging = false;

    function syncBeforeImageWidth() {
      const beforeImg = beforeLayer.querySelector('.split-img');
      if (beforeImg) {
        beforeImg.style.width = `${viewport.offsetWidth}px`;
      }
    }

    syncBeforeImageWidth();
    window.addEventListener('resize', syncBeforeImageWidth);

    function setSliderPosition(clientX) {
      const rect = viewport.getBoundingClientRect();
      let offsetX = clientX - rect.left;

      // Restrict slider within bounds (0% to 100%)
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      beforeLayer.style.width = `${percentage}%`;
      handle.style.left = `${percentage}%`;
    }

    // Mouse Interactions
    viewport.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch Support for Mobile / Tablet
    viewport.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches.length > 0) {
        setSliderPosition(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || e.touches.length === 0) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  // GSAP Scroll Entrance Animations
  if (document.querySelector('.split-slider-section')) {
    gsap.from('.split-header > *', {
      scrollTrigger: {
        trigger: '.split-slider-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.split-viewport', {
      scrollTrigger: {
        trigger: '.split-viewport',
        start: 'top 75%'
      },
      opacity: 0,
      scale: 0.96,
      duration: 1,
      ease: 'expo.out'
    });

    gsap.from('.split-meta-card', {
      scrollTrigger: {
        trigger: '.split-meta-card',
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power2.out'
    });
  }








  // ==========================================================================
  // RESULTS DOSSIER: CATEGORY FILTER SYNC & GSAP REVEAL
  // ==========================================================================
  
  // Connects with the condition filter buttons from the Hero section
  document.addEventListener('conditionFilterChange', (e) => {
    const activeCondition = e.detail.condition;
    const dossierCards = document.querySelectorAll('.dossier-card');

    dossierCards.forEach(card => {
      const cardCat = card.dataset.category;

      if (activeCondition === 'all' || cardCat === activeCondition) {
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

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
  });

  // GSAP Entrance Sequence
  if (document.querySelector('.results-dossier-section')) {
    gsap.from('.dossier-header > *', {
      scrollTrigger: {
        trigger: '.results-dossier-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.dossier-card', {
      scrollTrigger: {
        trigger: '.dossier-grid',
        start: 'top 75%'
      },
      opacity: 0,
      y: 35,
      stagger: 0.18,
      duration: 0.95,
      ease: 'power3.out'
    });

    gsap.from('.dossier-footer-bar', {
      scrollTrigger: {
        trigger: '.dossier-footer-bar',
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power2.out'
    });
  }








  // ==========================================================================
  // RESULTS PAGE: TIME-HORIZON PROGRESSION GSAP REVEAL
  // ==========================================================================
  if (document.querySelector('.results-progression-section')) {
    gsap.from('.progression-header > *', {
      scrollTrigger: {
        trigger: '.results-progression-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.progression-card', {
      scrollTrigger: {
        trigger: '.progression-grid',
        start: 'top 75%'
      },
      opacity: 0,
      y: 35,
      stagger: 0.15,
      duration: 0.95,
      ease: 'power3.out'
    });

    // Animate gauge bars expanding upon scrolling into view
    gsap.from('.gauge-fill', {
      scrollTrigger: {
        trigger: '.progression-grid',
        start: 'top 70%'
      },
      scaleX: 0,
      transformOrigin: 'left center',
      stagger: 0.12,
      duration: 1.2,
      ease: 'power2.out'
    });

    gsap.from('.progression-guarantee-strip', {
      scrollTrigger: {
        trigger: '.progression-guarantee-strip',
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power2.out'
    });
  }