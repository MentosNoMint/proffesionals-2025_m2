let isToaster = false;

const toaster = (text, color) => {
    if (isToaster) return;

    const toaster = document.querySelector('.toaster');
    const span = document.querySelector('.toaster span');
    const circle = document.querySelector('.circle');

    isToaster = true;

    toaster.style.transform = 'translateY(0)';
    circle.style.background = color;
    span.textContent = text;

    setTimeout(() => {
        toaster.style.transform = 'translateY(150%)';
        isToaster = false;
    }, 3000)
}

export default toaster;