// ==========================================================================
// ABOUT PAGE HERO ENTRANCE GSAP ANIMATIONS
// ==========================================================================
if (document.querySelector('.about-hero-section')) {
    const aboutHeroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    aboutHeroTl
        .from('.about-hero-section .hero-breadcrumb-badge', {
            opacity: 0,
            y: 15,
            duration: 0.6,
            delay: 0.1
        })
        .from('.about-hero-title', {
            opacity: 0,
            y: 30,
            duration: 0.85
        }, '-=0.4')
        .from('.about-hero-lead', {
            opacity: 0,
            y: 20,
            duration: 0.7
        }, '-=0.5')
        .from('.founder-oath-card', {
            opacity: 0,
            y: 25,
            duration: 0.85
        }, '-=0.4')
        .from('.about-trust-row .about-stat', {
            opacity: 0,
            y: 15,
            stagger: 0.12,
            duration: 0.6
        }, '-=0.4')
        .from('.about-visual-frame', {
            opacity: 0,
            scale: 0.95,
            y: 30,
            duration: 1,
            ease: 'expo.out'
        }, '-=1')
        .from('.floating-credential-pod', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            ease: 'back.out(1.4)'
        }, '-=0.5');

    // Subtle parallax on hero portrait on scroll
    if (document.querySelector('.about-hero-img')) {
        gsap.to('.about-hero-img', {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
                trigger: '.about-hero-section',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });
    }
}








// ==========================================================================
// ANIMATED STROKE DASH ARRAY & TIMELINE SCROLL TRIGGER
// ==========================================================================
const animatedStrokeLine = document.getElementById('animatedStrokeLine');
const timelineNodes = document.querySelectorAll('.timeline-node');
const timelineStage = document.getElementById('timelineStage');

if (animatedStrokeLine && timelineStage) {
    // 1. Calculate path length dynamically
    const pathLength = animatedStrokeLine.getTotalLength ? animatedStrokeLine.getTotalLength() : 1000;

    // Set up initial dash properties
    animatedStrokeLine.style.strokeDasharray = pathLength;
    animatedStrokeLine.style.strokeDashoffset = pathLength;

    // 2. Animate the stroke-dashoffset on scroll
    gsap.to(animatedStrokeLine, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
            trigger: timelineStage,
            start: 'top 70%',
            end: 'bottom 85%',
            scrub: 0.8,
            onUpdate: (self) => {
                // Check progress and light up respective nodes as the stroke draws past them
                const currentProgress = self.progress;

                timelineNodes.forEach((node, index) => {
                    const threshold = (index + 0.15) / timelineNodes.length;
                    if (currentProgress >= threshold) {
                        node.classList.add('is-passed');
                    } else {
                        node.classList.remove('is-passed');
                    }
                });
            }
        }
    });

    // 3. Stagger node cards entrance
    timelineNodes.forEach((node, i) => {
        const isEven = i % 2 === 1;
        const xOffset = window.innerWidth >= 768 ? (isEven ? 40 : -40) : 25;

        gsap.from(node.querySelector('.node-card'), {
            scrollTrigger: {
                trigger: node,
                start: 'top 80%'
            },
            opacity: 0,
            x: xOffset,
            duration: 0.85,
            ease: 'power3.out'
        });
    });
}

// Header GSAP Reveal
if (document.querySelector('.stroke-timeline-section')) {
    gsap.from('.timeline-header > *', {
        scrollTrigger: {
            trigger: '.stroke-timeline-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 25,
        stagger: 0.14,
        duration: 0.85,
        ease: 'power3.out'
    });
}










// ==========================================================================
// ABOUT PAGE: RETRO-FUTURISM LAB GSAP ENTRANCE ANIMATIONS
// ==========================================================================
if (document.querySelector('.about-vapor-section')) {
    // Header Reveal
    gsap.from('.about-vapor-header > *', {
        scrollTrigger: {
            trigger: '.about-vapor-section',
            start: 'top 80%'
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.85,
        ease: 'power3.out'
    });

    // Left Column CRT Terminal Card Slide-in
    gsap.from('.crt-terminal-card', {
        scrollTrigger: {
            trigger: '.vapor-console-layout',
            start: 'top 75%'
        },
        opacity: 0,
        x: -40,
        duration: 1,
        ease: 'power3.out'
    });

    // Right Column Feature Pods Stagger
    gsap.from('.vapor-feature-pod', {
        scrollTrigger: {
            trigger: '.vapor-features-stack',
            start: 'top 75%'
        },
        opacity: 0,
        x: 40,
        stagger: 0.18,
        duration: 0.9,
        ease: 'power3.out'
    });

    // Bottom Ticker Reveal
    gsap.from('.vapor-sub-ticker', {
        scrollTrigger: {
            trigger: '.vapor-sub-ticker',
            start: 'top 90%'
        },
        opacity: 0,
        y: 20,
        duration: 0.75,
        ease: 'power2.out'
    });
}









// ==========================================================================
  // TABS MATRIX / SEGMENTED CONTROL LOGIC & GSAP REVEAL
  // ==========================================================================
  const segmentBtns = document.querySelectorAll('.segment-btn');
  const segmentIndicator = document.getElementById('segmentIndicator');
  const matrixPanels = document.querySelectorAll('.matrix-panel');

  function updateSegmentIndicator(activeBtn) {
    if (!segmentIndicator || !activeBtn) return;
    segmentIndicator.style.width = `${activeBtn.offsetWidth}px`;
    segmentIndicator.style.transform = `translateX(${activeBtn.offsetLeft - 6}px)`;
  }

  segmentBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('active')) return;

      // Update button active state
      segmentBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Slide background pill
      updateSegmentIndicator(btn);

      // Switch active panel
      const targetPanelId = btn.getAttribute('aria-controls');
      matrixPanels.forEach(panel => {
        if (panel.id === targetPanelId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });

      // Refresh ScrollTrigger bounding boxes
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 460);
    });
  });

  // Position indicator correctly on load
  const initialActiveBtn = document.querySelector('.segment-btn.active');
  if (initialActiveBtn) {
    setTimeout(() => updateSegmentIndicator(initialActiveBtn), 150);
  }

  window.addEventListener('resize', () => {
    const active = document.querySelector('.segment-btn.active');
    if (active) updateSegmentIndicator(active);
  });

  // GSAP Scroll Entrance Animations
  if (document.querySelector('.tabs-matrix-section')) {
    gsap.from('.matrix-ctrl-header > *', {
      scrollTrigger: {
        trigger: '.tabs-matrix-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 25,
      stagger: 0.15,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.matrix-panels-wrapper', {
      scrollTrigger: {
        trigger: '.matrix-panels-wrapper',
        start: 'top 75%'
      },
      opacity: 0,
      y: 35,
      duration: 0.95,
      ease: 'power3.out'
    });

    gsap.from('.compliance-footer-bar', {
      scrollTrigger: {
        trigger: '.compliance-footer-bar',
        start: 'top 85%'
      },
      opacity: 0,
      y: 20,
      duration: 0.75,
      ease: 'power2.out'
    });
  }







  // ==========================================================================
  // ABOUT FINAL CTA: STRICT SANITIZATION, DROPDOWN, & VERIFICATION ROUTING
  // ==========================================================================
  const aboutForm = document.getElementById('aboutBookingForm');
  const intakeName = document.getElementById('intakeName');
  const intakePhone = document.getElementById('intakePhone');
  const intakeSubmitBtn = document.getElementById('intakeSubmitBtn');

  const aboutNameGroup = document.getElementById('nameGroup');
  const aboutPhoneGroup = document.getElementById('phoneGroup');
  const aboutFocusGroup = document.getElementById('focusGroup');

  // Custom Dropdown Selectors
  const intakeDropdown = document.getElementById('intakeCustomDropdown');
  const intakeDropdownTrigger = document.getElementById('intakeDropdownTrigger');
  const intakeSelectedText = document.getElementById('intakeSelectedText');
  const intakeDropdownMenu = document.getElementById('intakeDropdownMenu');
  const intakeDropdownItems = document.querySelectorAll('#intakeDropdownMenu .dropdown-item');
  const selectedIntakeTarget = document.getElementById('selectedIntakeTarget');

  // 1. Strict Input Sanitization in Real Time
  if (intakeName) {
    intakeName.addEventListener('input', () => {
      // Accepts only alphabets (A-Z, a-z) and spaces; strips all digits and symbols
      intakeName.value = intakeName.value.replace(/[^A-Za-z\s]/g, '');
      if (intakeName.value.trim().length >= 2) {
        aboutNameGroup.classList.remove('has-error');
      }
    });
  }

  if (intakePhone) {
    intakePhone.addEventListener('input', () => {
      // Accepts only digits (0-9); strips all letters and symbols
      intakePhone.value = intakePhone.value.replace(/[^0-9]/g, '');
      if (intakePhone.value.trim().length === 10) {
        aboutPhoneGroup.classList.remove('has-error');
      }
    });
  }

  // 2. Custom Dropdown Toggle & Selection Logic
  if (intakeDropdown && intakeDropdownTrigger) {
    function toggleIntakeDropdown(openState) {
      const isOpen = openState !== undefined ? openState : !intakeDropdown.classList.contains('is-open');
      intakeDropdown.classList.toggle('is-open', isOpen);
      intakeDropdownTrigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    intakeDropdownTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleIntakeDropdown();
    });

    intakeDropdownItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetPage = item.dataset.value;
        const textLabel = item.querySelector('span').textContent;

        selectedIntakeTarget.value = targetPage;
        intakeSelectedText.textContent = textLabel;
        intakeDropdownTrigger.classList.add('has-value');

        intakeDropdownItems.forEach(i => i.classList.remove('is-selected'));
        item.classList.add('is-selected');

        aboutFocusGroup.classList.remove('has-error');
        toggleIntakeDropdown(false);
      });
    });

    document.addEventListener('click', (e) => {
      if (!intakeDropdown.contains(e.target)) {
        toggleIntakeDropdown(false);
      }
    });
  }

  // 3. Form Validation & Respective Page Check / Fallback Redirect
  if (aboutForm) {
    aboutForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name: Alphabets only, between 2 and 50 characters
      const nameVal = intakeName.value.trim();
      const nameRegex = /^[A-Za-z\s]{2,50}$/;
      if (!nameRegex.test(nameVal)) {
        aboutNameGroup.classList.add('has-error');
        isValid = false;
      } else {
        aboutNameGroup.classList.remove('has-error');
      }

      // Validate Phone: Exactly 10 digits
      const phoneVal = intakePhone.value.trim();
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(phoneVal)) {
        aboutPhoneGroup.classList.add('has-error');
        isValid = false;
      } else {
        aboutPhoneGroup.classList.remove('has-error');
      }

      // Validate Custom Dropdown Selection
      const targetPage = selectedIntakeTarget.value.trim();
      if (!targetPage) {
        aboutFocusGroup.classList.add('has-error');
        isValid = false;
      } else {
        aboutFocusGroup.classList.remove('has-error');
      }

      if (!isValid) return;

      // Loading Feedback State
      intakeSubmitBtn.disabled = true;
      intakeSubmitBtn.innerHTML = `
        <i class="fa-solid fa-circle-notch fa-spin"></i>
        <span>Routing Consultation...</span>
      `;

      // Check if the chosen page file exists; if not, route to error.html
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
  if (document.querySelector('.about-final-cta-section')) {
    gsap.from('.cta-intake-card', {
      scrollTrigger: {
        trigger: '.about-final-cta-section',
        start: 'top 80%'
      },
      opacity: 0,
      y: 40,
      scale: 0.97,
      duration: 1,
      ease: 'power3.out'
    });

    gsap.from('.cta-intake-info > *', {
      scrollTrigger: {
        trigger: '.cta-intake-card',
        start: 'top 75%'
      },
      opacity: 0,
      x: -30,
      stagger: 0.12,
      duration: 0.85,
      ease: 'power3.out'
    });

    gsap.from('.intake-form-card', {
      scrollTrigger: {
        trigger: '.cta-intake-card',
        start: 'top 75%'
      },
      opacity: 0,
      x: 30,
      duration: 0.95,
      ease: 'power3.out'
    });
  }