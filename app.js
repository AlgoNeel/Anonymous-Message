// আপনার প্রাপ্ত Google Apps Script URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbytr8e6q8c8ehPn4KBUnVfKYlxC7krkYNv0TISOFdwZ8_wmDokFmYoDorVpvH6WCY_1/exec'; 

const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');
const charDisplay = document.getElementById('current');
const submitBtn = document.getElementById('submitBtn');
const toast = document.getElementById('toast');

// ক্যারেক্টার কাউন্টার আপডেট (Real-time Character Counter)
messageInput.addEventListener('input', () => {
    const length = messageInput.value.length;
    charDisplay.innerText = length;
    
    // ৩০০ ক্যারেক্টার পূর্ণ হলে কাউন্টার লাল হবে
    if (length >= 300) {
        charDisplay.style.color = "#FF0050";
    } else {
        charDisplay.style.color = "#A0A0A0";
    }
});

// ফর্ম সাবমিট হ্যান্ডলার
messageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const message = messageInput.value.trim();
    if (!message) return;

    // বাটন এনিমেশন এবং ফিডব্যাক (UX)
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.querySelector('.btn-text').innerText;
    submitBtn.querySelector('.btn-text').innerText = "Sending...";
    submitBtn.style.opacity = "0.7";

    // Google Docs এ ডেটা পাঠানোর জন্য ফরম্যাটিং
    const formData = new URLSearchParams();
    formData.append('message', message);

    // Fetch API ব্যবহার করে ডেটা পাঠানো
    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Apps Script এর জন্য এটি বাধ্যতামূলক
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
    })
    .then(() => {
        // মেসেজ পাঠানো সফল হলে UI আপডেট
        showToast();
        messageInput.value = ''; 
        charDisplay.innerText = "0";
        resetButton(originalBtnText);
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Something went wrong. Please check your internet connection.');
        resetButton(originalBtnText);
    });
});

// সফলভাবে মেসেজ পাঠানোর পর টোস্ট মেসেজ দেখানো
function showToast() {
    toast.classList.remove('hidden');
    // ৩.৫ সেকেন্ড পর টোস্ট মেসেজ গায়েব হয়ে যাবে
    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.classList.add('hidden');
            toast.style.opacity = "1";
        }, 500);
    }, 3500);
}

// বাটন আগের অবস্থায় ফিরিয়ে আনা
function resetButton(text) {
    submitBtn.disabled = false;
    submitBtn.style.opacity = "1";
    submitBtn.querySelector('.btn-text').innerText = text;
}