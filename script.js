// ============================================
// Telegram — отправка заявок через /tg-notify (tg-proxy на сервере)
// ============================================
const siteName = SITE_CONFIG.name;
const siteCity = SITE_CONFIG.city;

function formatMessage(formData) {
    let message = `🔔 <b>Новая заявка с ${siteName} (${siteCity})</b>\n\n`;
    message += `👤 <b>Имя:</b> ${formData.name || 'Не указано'}\n`;
    message += `📞 <b>Телефон:</b> ${formData.phone || 'Не указано'}\n`;
    message += `📋 <b>Тип заявки:</b> ${formData.type || 'Не указано'}\n`;
    if (formData.question) {
        message += `💬 <b>Вопрос:</b> ${formData.question}\n`;
    }
    if (formData.quantity) {
        message += `🔢 <b>Счетчиков:</b> ${formData.quantity}\n`;
    }
    message += `\n🌐 <b>Сайт:</b> ${SITE_CONFIG.baseUrl}\n`;
    message += `⏰ <b>Время:</b> ${new Date().toLocaleString('ru-RU')}`;

    return message;
}

async function sendToTelegram(formData) {
    const message = formatMessage(formData);

    try {
        const response = await fetch('/tg-notify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });

        const data = await response.json();

        if (data.ok) {
            console.log('✅ Заявка отправлена в Telegram');
            return true;
        }

        console.error('❌ Ошибка отправки в Telegram:', data);
        return false;
    } catch (error) {
        console.error('❌ Ошибка при отправке в Telegram:', error);
        return false;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.ajax_form');

    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const quantityEl = form.querySelector('[name="quantity"]');
            const questionEl = form.querySelector('[name="question"]');

            const formData = {
                name: form.querySelector('[name="name"]')?.value || '',
                phone: form.querySelector('[name="phone"]')?.value || '',
                type: form.querySelector('[name="pagetitle"]')?.value || 'Заявка',
                question: questionEl ? questionEl.value : '',
                quantity: quantityEl && quantityEl.value ? quantityEl.options[quantityEl.selectedIndex].text : ''
            };

            const sent = await sendToTelegram(formData);

            if (sent) {
                window.location.href = 'thanks.html';
            } else {
                alert(`Произошла ошибка при отправке заявки. Пожалуйста, позвоните нам: ${SITE_CONFIG.phoneDisplay}`);
            }
        });
    });
});
