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

            const botToken = '8010371886:AAHLEoDiPwP-UjLRkbNa_srLQrmP8WCVX80';
            const chatId = '6156910611';
            const text = `🔔 *Yangi buyurtma!*\n\n👤 *Ismi:* ${name}\n📞 *Tel:* ${phone}\n💬 *Xabar:* ${message}`;

            try {
                const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        chat_id: chatId,
                        text: text,
                        parse_mode: 'Markdown'
                    }),
                });

                if (response.ok) {
                    alert('Xabar muvaffaqiyatli yuborildi!');
                    contactForm.reset();
                } else {
                    const data = await response.json();
                    alert('Xatolik: ' + (data.description || 'Noma\'lum xatolik'));
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
