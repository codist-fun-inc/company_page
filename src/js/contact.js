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
                // Google Formsに送信
                await fetch(form.action, {
                    method: 'POST',
                    mode: 'no-cors',
                    body: new FormData(form)
                });

                alert('お問い合わせを受け付けました。担当者からご連絡させていただきます。');
                form.reset();
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

document.addEventListener('DOMContentLoaded', function() {
    // URLからtype parameterを取得
    const urlParams = new URLSearchParams(window.location.search);
    const type = urlParams.get('type');

    if (type === 'entry') {
        // デスクトップ版のラジオボタン
        const desktopEntryRadio = document.querySelector('#contact-form-desktop input[value="エントリー"]');
        if (desktopEntryRadio) {
            desktopEntryRadio.checked = true;
        }

        // モバイル版のラジオボタン
        const mobileEntryRadio = document.querySelector('#contact-form-mobile input[value="entry"]');
        if (mobileEntryRadio) {
            mobileEntryRadio.checked = true;
        }
    }
});