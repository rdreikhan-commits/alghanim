// Interactive logic for Alghanim Landing Page & Booking Form Integration

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Swiper for Gallery
    if (document.querySelector('.gallerySwiper')) {
        new Swiper('.gallerySwiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            autoplay: {
                delay: 3500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 28,
                },
            },
        });
    }

    // 2. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // 3. FAQ Accordion Interactivity
    const faqBtns = document.querySelectorAll('.faq-btn');

    faqBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const content = btn.nextElementSibling;
            const icon = btn.querySelector('[data-lucide="chevron-down"]');
            
            document.querySelectorAll('.faq-content').forEach(item => {
                if (item !== content) {
                    item.classList.add('hidden');
                    const otherIcon = item.previousElementSibling.querySelector('[data-lucide="chevron-down"]');
                    if (otherIcon) otherIcon.style.transform = 'rotate(0deg)';
                }
            });

            content.classList.toggle('hidden');
            if (icon) {
                const isHidden = content.classList.contains('hidden');
                icon.style.transform = isHidden ? 'rotate(0deg)' : 'rotate(180deg)';
            }
        });
    });

    // 4. Booking Form Modal Logic & Google Sheets Integration
    const bookingModal = document.getElementById('booking-modal');
    const bookingForm = document.getElementById('booking-form');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const targetProgramInput = document.getElementById('target-program');
    
    // Official WhatsApp Number
    const OFFICIAL_WA_NUMBER = '628131670218';

    // Open Modal Function
    window.openBookingModal = function(programName = 'Promo DP Rp 3 Juta Umrah 2026') {
        if (targetProgramInput) {
            targetProgramInput.value = programName;
        }
        if (bookingModal) {
            bookingModal.classList.remove('hidden');
            bookingModal.classList.add('flex');
        }
    };

    // Close Modal Function
    if (closeModalBtn && bookingModal) {
        closeModalBtn.addEventListener('click', () => {
            bookingModal.classList.add('hidden');
            bookingModal.classList.remove('flex');
        });
    }

    // 5. Brochure Lightbox Modal Logic
    const brochureModal = document.getElementById('brochure-modal');
    const closeBrochureModalBtn = document.getElementById('close-brochure-modal-btn');

    window.openBrochureModal = function() {
        if (brochureModal) {
            brochureModal.classList.remove('hidden');
            brochureModal.classList.add('flex');
        }
    };

    if (closeBrochureModalBtn && brochureModal) {
        closeBrochureModalBtn.addEventListener('click', () => {
            brochureModal.classList.add('hidden');
            brochureModal.classList.remove('flex');
        });

        brochureModal.addEventListener('click', (e) => {
            if (e.target === brochureModal) {
                brochureModal.classList.add('hidden');
                brochureModal.classList.remove('flex');
            }
        });
    }

    // 6. Welcome Promo Pop-up & Synchronized 24-Hour Countdown Timer
    const welcomePromoModal = document.getElementById('welcome-promo-modal');
    const closeWelcomePromoBtn = document.getElementById('close-welcome-promo-btn');
    const claimPromoBtn = document.getElementById('claim-promo-btn');

    // Setup / Get 24-Hour Expiry Timestamp
    let promoEndTime = localStorage.getItem('alghanim_promo_end_time');
    if (!promoEndTime) {
        const now = new Date();
        now.setHours(now.getHours() + 24);
        promoEndTime = now.getTime();
        localStorage.setItem('alghanim_promo_end_time', promoEndTime);
    }

    // Update Synchronized Countdown Elements (in Pop-up & Above Price Section)
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = parseInt(promoEndTime, 10) - now;

        let hours = 0, minutes = 0, seconds = 0;

        if (distance > 0) {
            hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            seconds = Math.floor((distance % (1000 * 60)) / 1000);
        }

        const formattedH = String(hours).padStart(2, '0');
        const formattedM = String(minutes).padStart(2, '0');
        const formattedS = String(seconds).padStart(2, '0');

        document.querySelectorAll('.promo-hours-val').forEach(el => el.innerText = formattedH);
        document.querySelectorAll('.promo-minutes-val').forEach(el => el.innerText = formattedM);
        document.querySelectorAll('.promo-seconds-val').forEach(el => el.innerText = formattedS);
    }

    // Run Countdown Interval
    updateCountdown();
    setInterval(updateCountdown, 1000);

    // Auto open promo modal after 800ms
    setTimeout(() => {
        if (welcomePromoModal) {
            welcomePromoModal.classList.remove('hidden');
            welcomePromoModal.classList.add('flex');
        }
    }, 800);

    // Close Promo Modal
    if (closeWelcomePromoBtn && welcomePromoModal) {
        closeWelcomePromoBtn.addEventListener('click', () => {
            welcomePromoModal.classList.add('hidden');
            welcomePromoModal.classList.remove('flex');
        });
    }

    // Claim Promo Action -> Opens Booking Form with Preset Promo
    if (claimPromoBtn && welcomePromoModal) {
        claimPromoBtn.addEventListener('click', () => {
            welcomePromoModal.classList.add('hidden');
            welcomePromoModal.classList.remove('flex');
            window.openBookingModal('PROMO SPESIAL DP Rp 3.000.000 (Booking Seat 2026)');
        });
    }

    // 7. Form Submit Handler
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerText = 'Mengirim & Mengarahkan ke WA...';
            }

            const nama = document.getElementById('jemaah-nama').value.trim();
            const domisili = document.getElementById('jemaah-domisili').value.trim();
            const hp = document.getElementById('jemaah-hp').value.trim();
            const program = targetProgramInput ? targetProgramInput.value : 'Promo DP Rp 3 Juta Umrah 2026';

            // Data payload for Spreadsheet / Webhook API
            const payload = {
                timestamp: new Date().toLocaleString('id-ID'),
                nama: nama,
                domisili: domisili,
                no_hp: hp,
                program: program
            };

            console.log('Sending Jemaah Data to Spreadsheet DB:', payload);
            
            const localLeads = JSON.parse(localStorage.getItem('alghanim_leads') || '[]');
            localLeads.push(payload);
            localStorage.setItem('alghanim_leads', JSON.stringify(localLeads));

            // Format WhatsApp Message
            const waMessage = `Halo Admin Alghanim, saya ${nama} dari ${domisili} (No. HP: ${hp}). Saya ingin KLAIM ${program}. Mohon info prosedur pembayarannya.`;
            const waUrl = `https://wa.me/${OFFICIAL_WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;

            setTimeout(() => {
                if (bookingModal) {
                    bookingModal.classList.add('hidden');
                    bookingModal.classList.remove('flex');
                }
                bookingForm.reset();
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerText = 'Lanjutkan ke WhatsApp';
                }
                window.open(waUrl, '_blank');
            }, 600);
        });
    }

    // Refresh Lucide Icons after DOM updates
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
