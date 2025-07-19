document.addEventListener('DOMContentLoaded', function() {
  // Update current year
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
  
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const mainContent = document.querySelector('.main-content');
  
  if (menuToggle && sidebar && mainContent) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      sidebar.classList.toggle('active');
      mainContent.classList.toggle('active');
    });
  }
  
  // Close sidebar when clicking on a link (mobile)
  document.querySelectorAll('.sidebar-links a').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        if (menuToggle && sidebar && mainContent) {
          menuToggle.classList.remove('active');
          sidebar.classList.remove('active');
          mainContent.classList.remove('active');
        }
      }
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Highlight active section in sidebar
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      const sidebarLink = document.querySelector(`.sidebar-links a[href="#${sectionId}"]`);
      
      if (sidebarLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.sidebar-links a').forEach(link => {
            link.classList.remove('active');
          });
          sidebarLink.classList.add('active');
        }
      }
    });
  });
  
  // Typewriter effect with Arabic text
  const texts = ["مطور واجهات أمامية", "مصمم واجهات المستخدم", "مصمم ويب"];
  let currentPhrase = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typewriter = document.querySelector('.typewriter-text');
  
  function typeWriter() {
    if (!typewriter) return;
    
    const currentText = texts[currentPhrase];
    
    if (isDeleting) {
      typewriter.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typewriter.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }
    
    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeWriter, 1500);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      currentPhrase = (currentPhrase + 1) % texts.length;
      setTimeout(typeWriter, 500);
    } else {
      const speed = isDeleting ? 50 : 100;
      setTimeout(typeWriter, speed);
    }
  }
  
  // Start typewriter effect after initial delay
  if (typewriter) {
    setTimeout(typeWriter, 1000);
  }
  
  // Animate skills bars when they come into view
  let skillsAnimated = false;
  
  function animateSkills() {
    if (skillsAnimated) return;
    
    const skills = document.querySelectorAll('.skill-fill');
    const skillsSection = document.querySelector('.skills-section');
    
    if (!skillsSection) return;
    
    const sectionTop = skillsSection.offsetTop;
    const sectionHeight = skillsSection.offsetHeight;
    const scrollPosition = window.scrollY + window.innerHeight;
    
    if (scrollPosition > sectionTop + sectionHeight / 2) {
      skills.forEach(skill => {
        const percent = skill.getAttribute('data-percent');
        if (percent) {
          skill.style.width = percent;
        }
      });
      skillsAnimated = true;
    }
  }
  
  // Initial check and scroll listener
  animateSkills();
  window.addEventListener('scroll', animateSkills);
  
  // Create additional smaller stars
  const starContainer = document.querySelector('.star-container');
  if (starContainer) {
    const starsCount = 200;
    
    for (let i = 0; i < starsCount; i++) {
      const star = document.createElement('div');
      star.className = 'star-particle';
      
      // Random properties
      const size = Math.random() * 2 + 0.5;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const duration = Math.random() * 10 + 5;
      const delay = Math.random() * 5;
      const opacity = Math.random() * 0.7 + 0.3;
      
      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        top: ${y}%;
        background: white;
        border-radius: 50%;
        animation: float ${duration}s linear ${delay}s infinite, twinkle ${Math.random() * 5 + 3}s ease-in-out infinite;
        opacity: ${opacity};
        will-change: transform;
      `;
      
      starContainer.appendChild(star);
    }
  }
});

// Projects toggle functionality with Arabic text
const projectsBtn = document.querySelector('.ui-btn');
const projectsGrid = document.querySelector('.projects-grid');
const hiddenProjects = `
  <div class="project-card">
    <div class="project-image">
      <img src="./imgs/XO.jpg" alt="لعبة XO">
    </div>
    <div class="project-info">
      <h3>لعبة XO</h3>
      <p>لعبة XO الكلاسيكية بتصميم عصري وواجهة تفاعلية.</p>
      <br>
      <div class="project-tags">
        <span class="project-tag">HTML</span>
        <span class="project-tag">CSS</span>
        <span class="project-tag">JS</span>
      </div>
      <div class="project-links">
        <a target="_blank" href="https://xogame-issam-25.web.app"><i class="fas fa-external-link-alt"></i> عرض حي</a>
        <a href="#"><i class="fab fa-github"></i> الكود المصدري</a>
      </div>
    </div>
  </div>
  <div class="project-card">
    <div class="project-image">
      <img src="./imgs/calcule.jpg" alt="آلة حاسبة">
    </div>
    <div class="project-info">
      <h3>آلة حاسبة</h3>
      <p>آلة حاسبة متكاملة بواجهة مستخدم سهلة وبسيطة.</p>
      <div class="project-tags">
        <span class="project-tag">HTML</span>
        <span class="project-tag">CSS</span>
        <span class="project-tag">JS</span>
      </div>
      <div class="project-links">
        <a target="_blank" href="https://calcule-moaadel-2025.web.app"><i class="fas fa-external-link-alt"></i> عرض حي</a>
        <a href="#"><i class="fab fa-github"></i> الكود المصدري</a>
      </div>
    </div>
  </div>
`;

let projectsVisible = false;

if (projectsBtn && projectsGrid) {
  projectsBtn.addEventListener('click', function() {
    if (!projectsVisible) {
      // Insert additional projects
      projectsGrid.insertAdjacentHTML('beforeend', hiddenProjects);
      const span = projectsBtn.querySelector('span');
      if (span) span.textContent = 'إخفاء المشاريع';
      projectsVisible = true;
    } else {
      // Remove the last two projects (the hidden ones we added)
      const projects = projectsGrid.querySelectorAll('.project-card');
      for (let i = projects.length - 1; i >= projects.length - 2; i--) {
        if (projects[i]) {
          projectsGrid.removeChild(projects[i]);
        }
      }
      const span = projectsBtn.querySelector('span');
      if (span) span.textContent = 'المزيد من المشاريع';
      projectsVisible = false;
    }
  });
}

// EmailJS initialization and contact form with Arabic messages
(function() {
  emailjs.init("j027nEI_A_h6_5Avk"); 
})();

function sendMail(event) {
  event.preventDefault(); // منع إعادة تحميل الصفحة

  const params = {
    sendername: document.getElementById("sendername").value,
    to: document.getElementById("to").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  emailjs.send("service_au4rreb", "template_fenoxrf", params)
    .then(function(response) {
      Swal.fire({
        icon: 'success',
        title: '🎉 تم الإرسال بنجاح!',
        text: 'شكراً لتواصلك معنا. سيتم الرد عليك قريباً.',
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#3085d6'
      });
      const form = document.getElementById("contactForm");
      if (form) form.reset();
    }, function(error) {
      Swal.fire({
        icon: 'error',
        title: '❌ فشل الإرسال',
        text: 'حدث خطأ أثناء الإرسال: ' + error.text,
        confirmButtonText: 'حسناً',
        confirmButtonColor: '#3085d6'
      });
    });

  return false;
}
//==============================================================================
const toggleButton = document.getElementById('toggle-btn')

function toggleSidebar(){
  sidebar.classList.toggle('close')
  toggleButton.classList.toggle('rotate')

  closeAllSubMenus()
}

function toggleSubMenu(button){

  if(!button.nextElementSibling.classList.contains('show')){
    closeAllSubMenus()
  }

  button.nextElementSibling.classList.toggle('show')
  button.classList.toggle('rotate')

  if(sidebar.classList.contains('close')){
    sidebar.classList.toggle('close')
    toggleButton.classList.toggle('rotate')
  }
}
//==================================================================================
    const sidebar = document.getElementById('sidebar');

    function toggleSidebar() {
      sidebar.classList.toggle('close');
      toggleButton.classList.toggle('rotate');
      closeAllSubMenus();
    }

    function toggleSubMenu(button) {
      if (!button.nextElementSibling.classList.contains('show')) {
        closeAllSubMenus();
      }

      button.nextElementSibling.classList.toggle('show');
      button.classList.toggle('rotate');
    }

    function closeAllSubMenus() {
      document.querySelectorAll('.sub-menu').forEach(menu => {
        menu.classList.remove('show');
      });
      document.querySelectorAll('.dropdown-btn').forEach(btn => {
        btn.classList.remove('rotate');
      });
    }

    // Close submenus when clicking outside
    document.addEventListener('click', function(event) {
      if (!event.target.closest('.dropdown-btn') && !event.target.closest('.sub-menu')) {
        closeAllSubMenus();
      }
    });