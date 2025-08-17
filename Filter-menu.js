// Menu Filtering Functionality
// This script handles the filtering of menu items by category

document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and cards
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    const itemsContainer = document.querySelector('.items');
    const premiumContainer = document.querySelector('.premium');

    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the category to filter by
            const category = button.getAttribute('data-category');
            
            let visibleCards = 0;
            
            // Show/hide cards based on category
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    visibleCards++;
                    // Add fade-in effect
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Adjust container height based on number of visible cards
            adjustContainerHeight(visibleCards);
        });
    });
    
    // Function to adjust container height based on visible cards
    function adjustContainerHeight(visibleCards) {
        if (visibleCards === 0) {
            // No cards to show
            itemsContainer.style.minHeight = '200px';
            premiumContainer.style.height = '200px';
        } else if (visibleCards <= 3) {
            // 1-3 cards (one row)
            itemsContainer.style.minHeight = '500px';
            premiumContainer.style.height = '500px';
        } else if (visibleCards <= 6) {
            // 4-6 cards (two rows)
            itemsContainer.style.minHeight = '800px';
            premiumContainer.style.height = '800px';
        } else if (visibleCards <= 9) {
            // 7-9 cards (three rows)
            itemsContainer.style.minHeight = '1100px';
            premiumContainer.style.height = '1100px';
        } else {
            // More than 9 cards (four or more rows)
            itemsContainer.style.minHeight = '1400px';
            premiumContainer.style.height = '1400px';
        }
    }
    
    // Initialize with all cards visible
    adjustContainerHeight(cards.length);
});
