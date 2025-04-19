document.addEventListener('DOMContentLoaded', () => {
  // Initialize tooltips
  try {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    // @ts-ignore - Bootstrap will be loaded from CDN
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => {
      // @ts-ignore - Bootstrap will be loaded from CDN
      return new bootstrap.Tooltip(tooltipTriggerEl);
    });
  } catch (e) {
    console.warn('Bootstrap tooltips could not be initialized', e);
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active state in sidebar
        document.querySelectorAll('.list-group-item').forEach(item => {
          item.classList.remove('active');
        });
        document.querySelector(`.list-group-item[href="${targetId}"]`)?.classList.add('active');
      }
    });
  });

  // Highlight current section in sidebar based on scroll position
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section[id]').forEach(section => {
      const htmlSection = section as HTMLElement;
      const sectionTop = htmlSection.offsetTop - 100;
      const sectionBottom = sectionTop + htmlSection.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        document.querySelectorAll('.list-group-item').forEach(item => {
          item.classList.remove('active');
        });
        document.querySelector(`.list-group-item[href="#${sectionId}"]`)?.classList.add('active');
      }
    });
  });
});