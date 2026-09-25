// ==========================================================================
  // SPECIALISTS PAGE HERO: FILTER CHIPS & GSAP REVEAL
  // ==========================================================================
  const specFilterChips = document.querySelectorAll('.specialty-filter-bar .spec-filter-chip');

  specFilterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      specFilterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const specialty = chip.dataset.specialty;

      // Dispatch custom event for physician cards down the page to filter dynamically
      const specEvent = new CustomEvent('specialistFilterChange', {
        detail: { specialty: specialty }
      });
      document.dispatchEvent(specEvent);
    });
  });

  // GSAP Entrance Sequence
  if (document.querySelector('.specialists-hero-section')) {
    const specHeroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    specHeroTl
      .from('.specialists-hero-section .hero-breadcrumb-badge', {
        opacity: 0,
        y: 15,
        duration: 0.6,
        delay: 0.1
      })
      .from('.specialists-hero-title', {
        opacity: 0,
        y: 30,
        duration: 0.85
      }, '-=0.4')
      .from('.specialists-hero-lead', {
        opacity: 0,
        y: 20,
        duration: 0.7
      }, '-=0.5')
      .from('.specialty-filter-bar .spec-filter-chip', {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.5
      }, '-=0.4')
      .from('.specialists-trust-row .spec-trust-stat', {
        opacity: 0,
        y: 15,
        stagger: 0.1,
        duration: 0.6
      }, '-=0.3')
      .from('.specialists-visual-frame', {
        opacity: 0,
        scale: 0.95,
        y: 30,
        duration: 1,
        ease: 'expo.out'
      }, '-=0.9')
      .from('.floating-faculty-badge', {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'back.out(1.4)'
      }, '-=0.5');

    // Subtle parallax on physician portrait upon scroll
    if (document.querySelector('.specialists-hero-img')) {
      gsap.to('.specialists-hero-img', {
        yPercent: 8,
        ease: 'none',
        scrollTrigger: {
          trigger: '.specialists-hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
  }







  // ==========================================================================
  // 3D TILT & PARALLAX ENGINE WITH REAL-TIME GYROSCOPIC SHEEN
  // ==========================================================================
  const tiltCards = document.querySelectorAll('.tilt-card[data-tilt]');

  tiltCards.forEach(card => {
    const sheen = card.querySelector('.card-sheen');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // X position inside card
      const y = e.clientY - rect.top;  // Y position inside card

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate subtle rotational degrees (-12deg to +12deg)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      // Move radial specular sheen directly under the mouse
      if (sheen) {
        sheen.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.4) 0%, transparent 65%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      // Smooth reset back to flat baseline
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // ==========================================================================
  // SPECIALIST FILTER DISPATCH LISTENER (SYNCED WITH HERO FILTER CHIPS)
  // ==========================================================================
  document.addEventListener('specialistFilterChange', (e) => {
    const targetSpecialty = e.detail.specialty;

    tiltCards.forEach(card => {
      const cardSpec = card.dataset.specialty;

      if (targetSpecialty === 'all' || cardSpec === targetSpecialty) {
        gsap.to(card, {
          opacity: 1,
          scale: 1,
          display: 'block',
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

    // Refresh ScrollTrigger metrics
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
  });

  // ==========================================================================
  // GSAP ENTRANCE ANIMATIONS
  // ==========================================================================
  if (document.querySelector('.specialist-roster-section')) {
    gsap.from('.roster-head > *', {
      scrollTrigger: {
        trigger: '.specialist-roster-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.tilt-card', {
      scrollTrigger: {
        trigger: '.tilt-roster-grid',
        start: 'top 75%'
      },
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.95,
      ease: 'power3.out'
    });

    gsap.from('.roster-footnote-strip', {
      scrollTrigger: {
        trigger: '.roster-footnote-strip',
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power2.out'
    });
  }








  // ==========================================================================
  // KINETIC STACKING & CARD OVERLAPPING SCROLL ENGINE
  // ==========================================================================
  const stackCards = gsap.utils.toArray('.stack-card');

  if (stackCards.length > 0 && window.innerWidth >= 768) {
    stackCards.forEach((card, index) => {
      // Don't scale down the last card as nothing overlaps it
      if (index === stackCards.length - 1) return;

      const nextCard = stackCards[index + 1];

      // As the next card stacks over the current card, subtly scale down and dim the lower card
      gsap.to(card, {
        scale: 0.94 - (index * 0.01),
        filter: 'brightness(0.92)',
        ease: 'none',
        scrollTrigger: {
          trigger: nextCard,
          start: 'top 70%',
          end: 'top 20%',
          scrub: true
        }
      });
    });
  }

  // GSAP Entrance Animations for Header & First Card
  if (document.querySelector('.kinetic-stack-section')) {
    gsap.from('.kinetic-header > *', {
      scrollTrigger: {
        trigger: '.kinetic-stack-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 30,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.card-step-1', {
      scrollTrigger: {
        trigger: '.kinetic-cards-stack',
        start: 'top 80%'
      },
      opacity: 0,
      y: 40,
      duration: 0.95,
      ease: 'power3.out'
    });
  }










// ==========================================================================
  // SPECIALIST TIER MATRIX & SEGMENTED CONTROL LOGIC
  // ==========================================================================
  const tierSegmentBtns = document.querySelectorAll('.tier-segment-btn');
  const tierSliderPill = document.getElementById('tierSliderPill');
  const tierPanels = document.querySelectorAll('.tier-panel');

  function updateTierSlider(activeBtn) {
    if (!tierSliderPill || !activeBtn) return;
    tierSliderPill.style.width = `${activeBtn.offsetWidth}px`;
    tierSliderPill.style.transform = `translateX(${activeBtn.offsetLeft - 6}px)`;
  }

  tierSegmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      // Update button active state
      tierSegmentBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Slide background pill
      updateTierSlider(btn);

      // Switch active panel
      const targetPanelId = btn.getAttribute('aria-controls');
      tierPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Refresh ScrollTrigger calculations
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 460);
    });
  });

  // Position indicator correctly on initial load
  const initialTierBtn = document.querySelector('.tier-segment-btn.active');
  if (initialTierBtn) {
    setTimeout(() => updateTierSlider(initialTierBtn), 150);
  }

  window.addEventListener('resize', () => {
    const active = document.querySelector('.tier-segment-btn.active');
    if (active) updateTierSlider(active);
  });

  // GSAP Scroll Entrance Animations
  if (document.querySelector('.specialist-matrix-section')) {
    gsap.from('.matrix-head > *', {
      scrollTrigger: {
        trigger: '.specialist-matrix-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.matrix-tier-panels', {
      scrollTrigger: {
        trigger: '.matrix-tier-panels',
        start: 'top 75%'
      },
      opacity: 0,
      y: 35,
      duration: 0.95,
      ease: 'power3.out'
    });

    gsap.from('.tier-governance-strip', {
      scrollTrigger: {
        trigger: '.tier-governance-strip',
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power2.out'
    });
  }









  // ==========================================================================
  // SPECIALIST FINAL CTA: INPUT VALIDATION, CUSTOM DROPDOWN, & PAGE ROUTING
  // ==========================================================================
  const doctorForm = document.getElementById('specialistBookingForm');
  const doctorName = document.getElementById('doctorPatientName');
  const doctorPhone = document.getElementById('doctorPatientPhone');
  const doctorSubmitBtn = document.getElementById('specialistSubmitBtn');

  const docNameGroup = document.getElementById('doctorNameGroup');
  const docPhoneGroup = document.getElementById('doctorPhoneGroup');
  const docSelectGroup = document.getElementById('doctorSelectGroup');

  // Custom Dropdown Selectors
  const specDropdown = document.getElementById('specialistCustomDropdown');
  const specDropdownTrigger = document.getElementById('specialistDropdownTrigger');
  const specSelectedText = document.getElementById('specialistSelectedText');
  const specDropdownItems = document.querySelectorAll('#specialistDropdownMenu .dropdown-item');
  const selectedDoctorTarget = document.getElementById('selectedDoctorTarget');

  // 1. Strict Input Sanitization in Real Time
  if (doctorName) {
    doctorName.addEventListener('input', () => {
      // Allows only alphabets (A-Z, a-z) and spaces; strips all digits and symbols
      doctorName.value = doctorName.value.replace(/[^A-Za-z\s]/g, '');
      if (doctorName.value.trim().length >= 2) {
        docNameGroup.classList.remove('has-error');
      }
    });
  }

  if (doctorPhone) {
    doctorPhone.addEventListener('input', () => {
      // Allows only digits (0-9); strips all letters and symbols
      doctorPhone.value = doctorPhone.value.replace(/[^0-9]/g, '');
      if (doctorPhone.value.trim().length === 10) {
        docPhoneGroup.classList.remove('has-error');
      }
    });
  }

  // 2. Custom Method Dropdown Toggle & Selection Logic
  if (specDropdown && specDropdownTrigger) {
    function toggleDoctorDropdown(openState) {
      const isOpen = openState !== undefined ? openState : !specDropdown.classList.contains('is-open');
      specDropdown.classList.toggle('is-open', isOpen);
      specDropdownTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    specDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleDoctorDropdown();
    });

    specDropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetPage = item.dataset.value;
        const textLabel = item.querySelector('span').textContent;

        selectedDoctorTarget.value = targetPage;
        specSelectedText.textContent = textLabel;
        specDropdownTrigger.classList.add('has-value');

        specDropdownItems.forEach(i => i.classList.remove('is-selected'));
        item.classList.add('is-selected');

        docSelectGroup.classList.remove('has-error');
        toggleDoctorDropdown(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!specDropdown.contains(e.target)) {
        toggleDoctorDropdown(false);
      }
    });
  }

  // 3. Strict Form Validation & Respective Page Check / Fallback Redirect
  if (doctorForm) {
    doctorForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name: Alphabets only, 2 to 50 characters
      const nameVal = doctorName.value.trim();
      const nameRegex = /^[A-Za-z\s]{2,50}$/;
      if (!nameRegex.test(nameVal)) {
        docNameGroup.classList.add('has-error');
        isValid = false;
      } else {
        docNameGroup.classList.remove('has-error');
      }

      // Validate Phone: Exactly 10 digits
      const phoneVal = doctorPhone.value.trim();
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phoneVal)) {
        docPhoneGroup.classList.add('has-error');
        isValid = false;
      } else {
        docPhoneGroup.classList.remove('has-error');
      }

      // Validate Custom Dropdown Selection
      const targetPage = selectedDoctorTarget.value.trim();
      if (!targetPage) {
        docSelectGroup.classList.add('has-error');
        isValid = false;
      } else {
        docSelectGroup.classList.remove('has-error');
      }

      if (!isValid) return;

      // Loading Feedback State
      doctorSubmitBtn.disabled = true;
      doctorSubmitBtn.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <span>Routing Consultation...</span>
      `;

      // Check if chosen page exists; if missing or 404, route safely to error.html
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
  if (document.querySelector('.specialist-final-cta-section')) {
    gsap.from('.specialist-intake-card', {
      scrollTrigger: {
        trigger: '.specialist-final-cta-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.specialist-intake-info > *', {
      scrollTrigger: {
        trigger: '.specialist-intake-card',
        start: 'top 75%'
      },
      opacity: 0,
      x: -30,
      stagger: 0.12,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.specialist-form-envelope', {
      scrollTrigger: {
        trigger: '.specialist-intake-card',
        start: 'top 75%'
      },
      opacity: 0,
      x: 30,
      duration: 0.95,
      ease: 'power3.out'
    });
  }