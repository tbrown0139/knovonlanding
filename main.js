const DEFAULT_IMAGE_URL = 'images/utah-default.jpg'; // Local default image
const greetingElement = document.getElementById('greeting');
const dateElement = document.getElementById('date');
const appsContainer = document.getElementById('apps-container');
const now = new Date();
const hours = now.getHours();
const month = now.getMonth();
const date = now.getDate();

// Function to set the background image locally
function setBackgroundImage() {
    document.body.style.backgroundImage = `url(${DEFAULT_IMAGE_URL})`;
}

// Function to format the date
function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Display the formatted date
dateElement.textContent = formatDate(now);

// Determine the time-based greeting and background
if ((month === 11 && date === 24) || (month === 11 && date === 25)) {
    greetingElement.textContent = 'Merry Christmas';
    setBackgroundImage();
} else if (month === 11 && date === 31) {
    greetingElement.textContent = 'Happy New Year';
    setBackgroundImage();
} else if (month === 0 && date === 1) {
    greetingElement.textContent = 'Happy New Year';
    setBackgroundImage();
} else if (month === 6 && date === 4) {
    greetingElement.textContent = 'Happy 4th of July';
    setBackgroundImage();
} else if (month === 10 && date === 11) {
    greetingElement.textContent = 'Happy Birthday to our founder';
    setBackgroundImage();
} else if (month === 9 && date === 31) {
    greetingElement.textContent = 'Happy Halloween';
    setBackgroundImage();
} else if (hours < 12) {
    greetingElement.textContent = 'Good Morning';
    setBackgroundImage();
} else if (hours < 18) {
    greetingElement.textContent = 'Good Afternoon';
    setBackgroundImage();
} else {
    greetingElement.textContent = 'Good Evening';
    setBackgroundImage();
}

// List of apps with their names, URLs, and icons
const apps = [
    { name: 'Disney Plus', url: 'https://disneyplus.com', icon: 'images/disneyplus-logo.png' },
    { name: 'Knovon', url: 'https://knovon.org', icon: 'icons/knovontablogo.png' },
    { name: 'Gmail', url: 'https://mail.google.com', icon: 'images/gmail-logo.png' },
    { name: 'Zoho Mail', url: 'https://mail.zoho.com', icon: 'images/zoho-logo.png' },
    { name: 'Roblox', url: 'https://roblox.com', icon: 'images/roblox-logo.png' },
    { name: 'GitHub', url: 'https://github.com', icon: 'images/github-logo.png' },
    { name: 'Canva', url: 'https://canva.com', icon: 'images/canva-logo.png' },
    { name: 'ChatGPT', url: 'https
