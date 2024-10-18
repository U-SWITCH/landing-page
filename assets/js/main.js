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

    // Calendly popup widget
    document.getElementById('schedule-button').addEventListener('click', function() {
        Calendly.initPopupWidget({ url: 'https://calendly.com/apilookinlabs/30min' });
        return false;
    });
});