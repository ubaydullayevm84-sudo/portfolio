// Script for interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('Sayt yuklandi!');

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Yuborilmoqda...';
            submitBtn.disabled = true;

            try {
                const response = await fetch('/api/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, phone, message }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Xabar muvaffaqiyatli yuborildi!');
                    contactForm.reset();
                } else {
                    alert('Xatolik: ' + (data.error || 'Noma\'lum xatolik'));
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Serverga ulanishda xatolik yuz berdi. Iltimos, keyinroq urinib ko\'ring.');
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Mobile menu toggle
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
});
