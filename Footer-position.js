// Dynamic Footer Positioning
// This script adjusts footer position based on the number of visible menu cards

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    const footer = document.querySelector('footer');
    const itemsContainer = document.querySelector('.items');
    
    // Function to calculate and adjust footer position
    function adjustFooterPosition() {
        const visibleCards = document.querySelectorAll('.card[style*="display: block"], .card:not([style*="display: none"])');
        const cardHeight = 400; // Height of each card
        const cardMargin = 20; // Margin between cards
        const containerPadding = 80; // Top and bottom padding of items container
        
        if (visibleCards.length === 0) {
            // No cards visible - move footer very close
            footer.style.marginTop = '20px';
            itemsContainer.style.minHeight = '200px';
        } else if (visibleCards.length <= 3) {
            // 1-3 cards (one row) - move footer closer
            footer.style.marginTop = '50px';
            itemsContainer.style.minHeight = '500px';
        } else if (visibleCards.length <= 6) {
            // 4-6 cards (two rows) - moderate spacing
            footer.style.marginTop = '100px';
            itemsContainer.style.minHeight = '800px';
        } else if (visibleCards.length <= 9) {
            // 7-9 cards (three rows) - more spacing
            footer.style.marginTop = '150px';
            itemsContainer.style.minHeight = '1100px';
        } else {
            // More than 9 cards - maximum spacing
            footer.style.marginTop = '200px';
            itemsContainer.style.minHeight = '1400px';
        }
    }
    
    // Add click event to each filter button
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the category to filter by
            const category = button.getAttribute('data-category');
            
            // Show/hide cards based on category
            cards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    // Add fade-in effect
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 50);
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Adjust footer position after filtering
            setTimeout(adjustFooterPosition, 100);
        });
    });
    
    // Initialize footer position on page load
    adjustFooterPosition();
    
    // Adjust footer position on window resize
    window.addEventListener('resize', adjustFooterPosition);
});
