/**
 * ============================================================
 * Main JavaScript — World Homoeo & Electropathy Clinic Website
 * Vanilla JS (ES6+) · No dependencies · Bootstrap 5 compatible
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ──────────────────────────────────────────────
  // 1. UTILITY HELPERS
  // ──────────────────────────────────────────────

  /** Safely select a single element */
  const qs = (selector, scope = document) => scope.querySelector(selector);

  /** Safely select multiple elements */
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];

  /** Throttle helper — limits fn to once every `wait` ms */
  const throttle = (fn, wait = 100) => {
    let lastTime = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastTime >= wait) {
        lastTime = now;
        fn(...args);
      }
    };
  };

  /** Ease-out quad curve for counter animation */
  const easeOutQuad = (t) => t * (2 - t);


  // ──────────────────────────────────────────────
  // 2. STICKY NAVBAR
  //    Adds `.scrolled` class to #mainNavbar when
  //    the page is scrolled more than 50 px.
  // ──────────────────────────────────────────────

  const mainNavbar = qs('#mainNavbar');

  const handleNavbarScroll = () => {
    if (!mainNavbar) return;
    if (window.scrollY > 50) {
      mainNavbar.classList.add('scrolled');
    } else {
      mainNavbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', throttle(handleNavbarScroll, 50));
  // Run once on load in case the page is already scrolled
  handleNavbarScroll();


  // ──────────────────────────────────────────────
  // 3. SMOOTH SCROLL FOR ANCHOR LINKS
  //    Offsets by the current navbar height so the
  //    target section isn't hidden behind it.
  // ──────────────────────────────────────────────

  qsa('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');

      // Skip empty hashes or "#" only
      if (!targetId || targetId === '#') return;

      const targetEl = qs(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const navbarHeight = mainNavbar ? mainNavbar.offsetHeight : 0;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });


  // ──────────────────────────────────────────────
  // 4. STATS COUNTER ANIMATION
  //    Uses Intersection Observer on `.stat-number`
  //    elements. Parses text like "5000+", "100%",
  //    "10+" and animates from 0 → target over 2 s.
  // ──────────────────────────────────────────────

  /**
   * Parse a stat string such as "5000+", "100%", or "8+"
   * Returns { target: Number, suffix: String }
   */
  const parseStatText = (text) => {
    const cleaned = text.trim();
    const match = cleaned.match(/^([\d,]+)\s*([+%]?)$/);
    if (!match) return { target: 0, suffix: '' };
    return {
      target: parseInt(match[1].replace(/,/g, ''), 10),
      suffix: match[2] || '',
    };
  };

  /**
   * Animate a counter element from 0 to `target` over `duration` ms.
   * Appends `suffix` (e.g. "+" or "%") once counting completes.
   */
  const animateCounter = (el, target, suffix, duration = 2000) => {
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuad(progress);
      const currentValue = Math.floor(easedProgress * target);

      el.textContent = currentValue.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Ensure the final value is exact
        el.textContent = target.toLocaleString() + suffix;
      }
    };

    requestAnimationFrame(step);
  };

  // Create observer for stat counter elements
  const statElements = qsa('.stat-number');

  if (statElements.length > 0) {
    const statObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            // Prevent re-animating
            if (el.dataset.counted) return;
            el.dataset.counted = 'true';

            const { target, suffix } = parseStatText(el.textContent);
            animateCounter(el, target, suffix);

            statObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.3 }
    );

    statElements.forEach((el) => statObserver.observe(el));
  }


  // ──────────────────────────────────────────────
  // 5. SCROLL ANIMATIONS
  //    Intersection Observer on `.animate-on-scroll`
  //    elements. Supports data-animation values:
  //      fade-up | fade-left | fade-right | zoom-in
  //    If parent has `.stagger`, children receive
  //    incremental transition-delay.
  // ──────────────────────────────────────────────

  const animatedElements = qsa('.animate-on-scroll');

  if (animatedElements.length > 0) {
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;

            // Check if this element's parent uses stagger
            if (el.parentElement && el.parentElement.classList.contains('stagger')) {
              const siblings = qsa('.animate-on-scroll', el.parentElement);
              const index = siblings.indexOf(el);
              el.style.transitionDelay = `${index * 150}ms`;
            }

            // Check for a specific data-animation attribute
            const animationType = el.dataset.animation;
            if (animationType) {
              el.classList.add(animationType);
            }

            // Trigger the animation by adding `.animated`
            el.classList.add('animated');

            animationObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    animatedElements.forEach((el) => animationObserver.observe(el));
  }


  // ──────────────────────────────────────────────
  // 6. ACTIVE NAV LINK HIGHLIGHTING
  //    Matches the current page pathname against
  //    each nav link's href to add `.active` class.
  // ──────────────────────────────────────────────

  const setActiveNavLink = () => {
    const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
    const navLinks = qsa('.navbar-nav .nav-link');

    navLinks.forEach((link) => {
      // Remove any existing active class
      link.classList.remove('active');

      const linkHref = link.getAttribute('href');
      if (!linkHref) return;

      // Resolve relative hrefs to absolute for comparison
      let linkPath;
      try {
        linkPath = new URL(linkHref, window.location.origin).pathname.replace(/\/+$/, '') || '/';
      } catch {
        linkPath = linkHref.replace(/\/+$/, '') || '/';
      }

      if (linkPath === currentPath) {
        link.classList.add('active');
      }
    });
  };

  setActiveNavLink();


  // ──────────────────────────────────────────────
  // 7. FORM VALIDATION (Client-side)
  //    Validates required fields, email format,
  //    and phone format before WhatsApp redirect.
  // ──────────────────────────────────────────────

  /**
   * Validate a single form field.
   * Returns an error message string or null if valid.
   */
  const validateField = (field) => {
    const value = field.value.trim();
    const fieldName = field.getAttribute('placeholder') || field.name || 'This field';

    // Required check
    if (field.hasAttribute('required') && value === '') {
      return `${fieldName} is required.`;
    }

    // Email format
    if (field.type === 'email' && value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address.';
      }
    }

    // Phone format (digits, spaces, dashes, +, parens; at least 7 digits)
    if (field.type === 'tel' && value !== '') {
      const digitsOnly = value.replace(/\D/g, '');
      if (digitsOnly.length < 7 || digitsOnly.length > 15) {
        return 'Please enter a valid phone number (7-15 digits).';
      }
    }

    return null; // valid
  };

  /**
   * Validate all fields in a form.
   * Displays error messages and returns true if all valid.
   */
  const validateForm = (form) => {
    let isValid = true;
    const fields = qsa('input, select, textarea', form);

    // Clear previous validation state
    fields.forEach((field) => {
      field.classList.remove('is-invalid');
      const feedback = field.nextElementSibling;
      if (feedback && feedback.classList.contains('invalid-feedback')) {
        feedback.textContent = '';
      }
    });

    fields.forEach((field) => {
      // Skip hidden, submit, and button fields
      if (['hidden', 'submit', 'button'].includes(field.type)) return;

      const error = validateField(field);
      if (error) {
        isValid = false;
        field.classList.add('is-invalid');

        // Show feedback message if a .invalid-feedback sibling exists
        let feedback = field.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
          feedback.textContent = error;
        } else {
          // Create feedback element dynamically
          const feedbackEl = document.createElement('div');
          feedbackEl.className = 'invalid-feedback';
          feedbackEl.textContent = error;
          field.parentNode.insertBefore(feedbackEl, field.nextSibling);
        }
      }
    });

    return isValid;
  };


  // ──────────────────────────────────────────────
  // 8. WHATSAPP FORM HANDLER
  //    Handles submit on #appointmentForm and
  //    #contactForm. Collects fields, formats a
  //    human-readable message, and opens WhatsApp.
  // ──────────────────────────────────────────────

  const WHATSAPP_NUMBER = '919786837575';

  /**
   * Build a readable WhatsApp message from form data.
   * @param {HTMLFormElement} form
   * @param {string} formType — "Appointment" or "Contact"
   * @returns {string}
   */
  const buildWhatsAppMessage = (form, formType) => {
    const data = new FormData(form);
    const lines = [`*New ${formType} Request*`, '─────────────────'];

    // Map of common field names to friendly labels
    const labelMap = {
      name: 'Name',
      fullname: 'Full Name',
      full_name: 'Full Name',
      email: 'Email',
      phone: 'Phone',
      mobile: 'Mobile',
      date: 'Preferred Date',
      appointment_date: 'Preferred Date',
      time: 'Preferred Time',
      appointment_time: 'Preferred Time',
      service: 'Service',
      treatment: 'Treatment',
      department: 'Department',
      message: 'Message',
      subject: 'Subject',
      address: 'Address',
      age: 'Age',
      gender: 'Gender',
    };

    for (const [key, value] of data.entries()) {
      if (!value.toString().trim()) continue; // skip empty

      // Derive a readable label
      const normalizedKey = key.toLowerCase().replace(/[-\s]/g, '_');
      const label = labelMap[normalizedKey] || key.replace(/[_-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

      lines.push(`*${label}:* ${value}`);
    }

    lines.push('─────────────────');
    lines.push('Sent from the clinic website');

    return lines.join('\n');
  };

  /**
   * Attach WhatsApp redirect handler to a form.
   */
  const attachWhatsAppHandler = (formId, formType) => {
    const form = qs(`#${formId}`);
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Validate before sending
      if (!validateForm(form)) return;

      const message = buildWhatsAppMessage(form, formType);
      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  };

  attachWhatsAppHandler('appointmentForm', 'Appointment');
  attachWhatsAppHandler('contactForm', 'Contact');


  // ──────────────────────────────────────────────
  // 9. BACK TO TOP BUTTON
  //    Shows/hides `.back-to-top` when scrolled
  //    past 300 px. Smooth scrolls to top on click.
  // ──────────────────────────────────────────────

  const backToTopBtn = qs('.back-to-top');

  if (backToTopBtn) {
    const toggleBackToTop = () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    };

    window.addEventListener('scroll', throttle(toggleBackToTop, 100));
    toggleBackToTop(); // initial check

    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // ──────────────────────────────────────────────
  // 10. PRELOADER
  //     Fades out `.preloader` once the window has
  //     fully loaded (images, fonts, etc.).
  // ──────────────────────────────────────────────

  const preloader = qs('.preloader');

  if (preloader) {
    const hidePreloader = () => {
      preloader.style.transition = 'opacity 0.5s ease';
      preloader.style.opacity = '0';
      preloader.addEventListener('transitionend', () => {
        preloader.style.display = 'none';
      }, { once: true });
    };

    // If the window has already loaded (e.g., cached), hide immediately
    if (document.readyState === 'complete') {
      hidePreloader();
    } else {
      window.addEventListener('load', hidePreloader);
    }
  }


  // ──────────────────────────────────────────────
  // 11. NAVBAR COLLAPSE ON LINK CLICK
  //     Auto-closes the Bootstrap 5 mobile navbar
  //     when any `.nav-link` inside it is clicked.
  // ──────────────────────────────────────────────

  const navbarCollapse = qs('.navbar-collapse');

  if (navbarCollapse) {
    qsa('.nav-link', navbarCollapse).forEach((link) => {
      link.addEventListener('click', () => {
        // Only collapse if the toggler is visible (mobile view)
        const toggler = qs('.navbar-toggler');
        if (toggler && window.getComputedStyle(toggler).display !== 'none') {
          // Use Bootstrap 5's native Collapse API if available
          const bsCollapse = bootstrap?.Collapse?.getInstance(navbarCollapse);
          if (bsCollapse) {
            bsCollapse.hide();
          } else {
            // Fallback: manually remove the `show` class
            navbarCollapse.classList.remove('show');
          }
        }
      });
    });
  }


}); // END DOMContentLoaded
