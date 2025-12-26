// フォーム送信処理
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonContent = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '送信中...';

            try {
                // フォームデータを取得
                const formData = {
                    type: form.querySelector('[name="type"]:checked')?.value || '',
                    name: form.querySelector('[name="name"]')?.value || '',
                    phone: form.querySelector('[name="phone"]')?.value || '',
                    email: form.querySelector('[name="email"]')?.value || '',
                    company: form.querySelector('[name="company"]')?.value || '',
                    message: form.querySelector('[name="message"]')?.value || '',
                    website: form.querySelector('[name="website"]')?.value || '' // honeypot
                };

                // Netlify Functions に送信
                const response = await fetch('/.netlify/functions/contact', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();

                if (result.success) {
                    alert('お問い合わせを受け付けました。担当者からご連絡させていただきます。');
                    form.reset();
                } else {
                    throw new Error(result.message || 'エラーが発生しました');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('エラーが発生しました。もう一度お試しください。');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonContent;
            }
        });
    });
});

// URLパラメータに基づいてラジオボタンを自動選択
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (type === 'entry') {
        // エントリーのラジオボタンを選択
        const entryRadios = document.querySelectorAll('input[name="type"][value="entry"]');
        entryRadios.forEach(radio => {
            radio.checked = true;
        });
    } else if (type === 'work' || type === 'business') {
        // お仕事のご依頼のラジオボタンを選択
        const businessRadios = document.querySelectorAll('input[name="type"][value="business"]');
        businessRadios.forEach(radio => {
            radio.checked = true;
        });
    }
});
