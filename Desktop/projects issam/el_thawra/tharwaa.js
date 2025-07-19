document.addEventListener('DOMContentLoaded', () => {
  const timelineSection = document.querySelector('.timeline-section');
  const progressBar = document.querySelector('.timeline-progress-bar');
  const items = document.querySelectorAll('.timeline-item');
  const cursor = document.querySelector('.custom-cursor');
  const backToTop = document.querySelector('.back-to-top');
  const heroBtn = document.querySelector('.hero-btn');

  // Initialize Swiper
  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  // Create blood drips
  function createBloodDrips(count = 50) {
    const bloodDrips = document.querySelector('.blood-drips');
    for (let i = 0; i < count; i++) {
      const drop = document.createElement('div');
      drop.className = 'blood-drip';
      drop.style.left = Math.random() * 100 + '%';
      drop.style.top = Math.random() * 100 + '%';
      drop.style.animationDelay = Math.random() * 5 + 's';
      drop.style.animationDuration = (3 + Math.random() * 5) + 's';
      bloodDrips.appendChild(drop);
    }
  }
  createBloodDrips();
  window.addEventListener('resize', () => {
    document.querySelectorAll('.blood-drip').forEach(d => d.remove());
    createBloodDrips();
  });

  // Custom cursor
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // Hover effects
  document.querySelectorAll('a, button, .timeline-card, .swiper-slide, .weapon-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('active'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
  });

  // Timeline progress bar
  window.addEventListener('scroll', () => {
    const rect = timelineSection.getBoundingClientRect();
    const pct = Math.min(
      Math.max((window.scrollY - rect.top + innerHeight * 0.1) / (rect.height - innerHeight * 0.1), 0),
      1
    ) * 100;
    progressBar.style.height = pct + '%';
  });

  // Timeline items animation
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.2 });
  items.forEach(i => obs.observe(i));

  // Splatter effect
  document.querySelectorAll('.timeline-card, .weapon-card, .swiper-slide').forEach(card => {
    card.addEventListener('mouseenter', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const splatter = document.createElement('div');
      splatter.className = 'splatter-effect';
      splatter.style.left = `${x}px`;
      splatter.style.top = `${y}px`;
      card.appendChild(splatter);
      setTimeout(() => splatter.remove(), 500);
    });
  });

  // 3D weapon card effect
  document.querySelectorAll('.weapon-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (x - centerX) / -20;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
    });
  });

  // Back to top button
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.classList.add('active');
    } else {
      backToTop.classList.remove('active');
    }
  });

  // Hero button effect
  heroBtn.addEventListener('mouseenter', () => {
    heroBtn.style.boxShadow = '0 0 30px var(--blood-red)';
  });
  heroBtn.addEventListener('mouseleave', () => {
    heroBtn.style.boxShadow = 'none';
  });

  // Stats counters
  const counters = document.querySelectorAll(".stat-number");
  const animateCount = (el) => {
    const end = parseInt(el.getAttribute("data-stat"));
    if (isNaN(end)) return;

    let start = 0;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 20));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        el.textContent = end.toLocaleString();
        clearInterval(timer);
      } else {
        el.textContent = start.toLocaleString();
      }
    }, 20);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (elementTop < windowHeight - 100) {
        el.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();
});

// Sidebar toggle
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('close');
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Battle locations with coordinates and historical info
  const battles = [
    { name: "معركة الجرف", coords: [34.7833, 5.7333], info: "سبتمبر 1955 - معركة مشهورة أظهرت بسالة المجاهدين في جبال الأوراس." },
    { name: "معركة سوق أهراس", coords: [36.2864, 7.9511], info: "1958 - من أعنف المعارك على الحدود الشرقية الجزائرية التونسية." },
    { name: "معركة تامزورا", coords: [35.6828, 0.1517], info: "1956 - اشتباك مسلح في الغرب الجزائري أوقع خسائر في صفوف الاحتلال." },
    { name: "معركة الونشريس", coords: [35.8828, 1.6166], info: "1957 - وقعت في جبال الونشريس وكانت معركة استنزاف ضد الجيش الفرنسي." },
    { name: "معركة جبل بوزقزة", coords: [36.7333, 3.4167], info: "وقعت شرق العاصمة وشهدت مقاومة شرسة من المجاهدين." },
    { name: "معركة أميزور", coords: [36.6267, 4.8994], info: "1956 - بمنطقة بجاية، تميزت بتكتيكات حرب العصابات." },
    { name: "معركة سيدي إبراهيم", coords: [34.9022, -1.3150], info: "1955 - معركة كبيرة غرب الجزائر قرب تلمسان ضد القوات الفرنسية." },
    { name: "معركة الجزائر الكبرى", coords: [36.7528, 3.0422], info: "1957 - عمليات فدائية داخل العاصمة ضد المراكز الاستعمارية." },
    { name: "معركة المقراني (1864)", coords: [36.45, 4.4833], info: "من أشهر الثورات قبل ثورة التحرير، بقيادة الشيخ المقراني." },
    { name: "الأوراس (انطلاق الثورة)", coords: [35.5616, 6.1736], info: "1 نوفمبر 1954 - بداية الثورة التحريرية من جبال الأوراس." },
    { name: "الولاية الثالثة التاريخية", coords: [36.4833, 4.2000], info: "منطقة القبائل - مركز تنظيمي قوي خلال الثورة." },
    { name: "خط موريس", coords: [36.2376, 8.1218], info: "خط مكهرب أقامه الاحتلال الفرنسي لفصل الجزائر عن تونس." }
  ];

  // Initialize map
  const map = L.map('revolution-map').setView([34.0, 3.0], 6);

  // Add OpenStreetMap tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> Contributors'
  }).addTo(map);

  // Add battle markers
  battles.forEach(battle => {
    L.marker(battle.coords)
      .addTo(map)
      .bindPopup(`<strong>${battle.name}</strong><br>${battle.info}`)
      .openPopup();
  });

  // Draw Morice Line (example coordinates)
  const moriceLine = [
    [36.1699, 5.7433], // Start point
    [35.0, 6.0],       // Midpoint
    [34.5, 6.2]        // End point
  ];
  
  L.polyline(moriceLine, {
    color: 'red',
    weight: 3,
    opacity: 0.8,
    dashArray: '10, 5'
  }).addTo(map);
});
// Add scroll animation for the crimes section
// Scroll Reveal Animations
document.addEventListener('DOMContentLoaded', () => {
  const reveals = document.querySelectorAll('.reveal');

  const revealOnScroll = () => {
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < window.innerHeight - 100) {
        el.classList.add('active');
      }
    });
  };

  revealOnScroll();
  window.addEventListener('scroll', revealOnScroll);
});