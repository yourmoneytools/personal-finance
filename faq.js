document.addEventListener('DOMContentLoaded', function () {
    const faqTops = document.querySelectorAll('.faq-top');
  
    faqTops.forEach(top => {
      const block = top.parentElement;
      const bottom = block.querySelector('.faq-bottom');
      const plusIcon = top.querySelector('#plus');
      const minusIcon = top.querySelector('#minus');
  
      // Set initial state
      bottom.style.maxHeight = '0';
      bottom.style.overflow = 'hidden';
      bottom.style.transition = 'max-height 0.3s ease';
      minusIcon.style.display = 'none';
  
      top.addEventListener('click', () => {
        const isOpen = bottom.style.maxHeight !== '0px';
  
        // Close all blocks
        document.querySelectorAll('.faq-block .faq-bottom').forEach(el => {
          el.style.maxHeight = '0';
          el.style.overflow = 'hidden';
        });
        document.querySelectorAll('.faq-block #plus').forEach(icon => icon.style.display = 'block');
        document.querySelectorAll('.faq-block #minus').forEach(icon => icon.style.display = 'none');
  
        // Open clicked block
        if (!isOpen) {
          bottom.style.maxHeight = bottom.scrollHeight + 'px';
          plusIcon.style.display = 'none';
          minusIcon.style.display = 'block';
        }
      });
    });
  });
  