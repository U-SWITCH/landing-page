document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    document.getElementById('menu-button').addEventListener('click', function() {
        var menu = document.getElementById('mobile-menu');
        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
            setTimeout(function() {
                menu.classList.add('show');
            }, 10); // Small delay to ensure the transition works
        } else {
            menu.classList.remove('show');
            setTimeout(function() {
                menu.classList.add('hidden');
            }, 300); // Delay to match the transition duration
        }
    });

    // Close mobile menu when a menu item is clicked
    document.querySelectorAll('.mobile-menu-item').forEach(function(item) {
        item.addEventListener('click', function() {
            var menu = document.getElementById('mobile-menu');
            menu.classList.remove('show');
            setTimeout(function() {
                menu.classList.add('hidden');
            }, 300); // Delay to match the transition duration
        });
    });

    // Calendly popup widget
    document.getElementById('schedule-button').addEventListener('click', function() {
        Calendly.initPopupWidget({ url: 'https://calendly.com/apilookinlabs/30min' });
        return false;
    });

    // Background animation for the CCTV section
    const cctvSection = document.querySelector('.cctv-section-background');
    let positions = [
        { position: 'center', size: '150%' },
        { position: 'top left', size: '151%' },
        { position: 'top right', size: '152%' },
        { position: 'center', size: '150%' }
    ];
    let index = 0;

    function animateBackground() {
        cctvSection.style.backgroundPosition = positions[index].position;
        cctvSection.style.backgroundSize = positions[index].size;
        index = (index + 1) % positions.length;
        setTimeout(animateBackground, 10000); // Increase the interval to 10 seconds
    }

    // Start the animation immediately
    animateBackground();
});