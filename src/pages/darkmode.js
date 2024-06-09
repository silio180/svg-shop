    document.addEventListener('DOMContentLoaded', () => {
    const checkbox = document.getElementById('checkbox');

    const isLightMode = localStorage.getItem('isLightMode') === 'true';
    if (isLightMode) {
    document.body.classList.add('light');
    checkbox.checked = true;
    }

    checkbox.addEventListener('change', () =>{
    document.body.classList.toggle('light');
    localStorage.setItem('isLightMode', checkbox.checked);
    });
});