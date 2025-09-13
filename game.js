document.addEventListener('DOMContentLoaded', function() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewContents = document.querySelectorAll('.view-content');
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            
            navButtons.forEach(btn => {
                btn.classList.remove('active', 'bg-blue-600');
                btn.classList.add('bg-gray-700');
            });
            
            this.classList.add('active', 'bg-blue-600');
            this.classList.remove('bg-gray-700');
            
            viewContents.forEach(view => {
                view.classList.add('hidden');
            });
            
            const targetViewElement = document.getElementById(targetView + '-view');
            if (targetViewElement) {
                targetViewElement.classList.remove('hidden');
            }
        });
    });
});