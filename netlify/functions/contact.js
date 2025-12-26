/**
 * Netlify Function: お問い合わせフォーム送信
 * Google Forms の URL と Entry ID を秘匿化
 */

exports.handler = async (event, context) => {
  // CORS ヘッダー
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // OPTIONS リクエスト (CORS preflight)
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  // POST 以外は拒否
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ success: false, message: 'Method Not Allowed' }),
    };
  }

  try {
    // リクエストボディをパース
    const data = JSON.parse(event.body);

    // Honeypot チェック (スパム対策)
    if (data.website) {
      console.log('Honeypot triggered');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: 'Bad Request' }),
      };
    }

    // 必須フィールドの検証
    if (!data.name || !data.email || !data.message) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ success: false, message: '必須項目を入力してください' }),
      };
    }

    // 環境変数から秘匿情報を取得
    const formUrl = process.env.GOOGLE_FORM_URL;

    if (!formUrl) {
      console.error('GOOGLE_FORM_URL is not set');
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ success: false, message: 'サーバー設定エラー' }),
      };
    }

    // お問い合わせ種別の値を変換
    let typeValue = data.type;
    if (typeValue === 'business') {
      typeValue = 'お仕事のご依頼';
    } else if (typeValue === 'entry') {
      typeValue = 'エントリー';
    }

    // Google Forms 用のデータを構築
    const formData = new URLSearchParams();
    formData.append(process.env.ENTRY_TYPE || 'entry.230326707', typeValue || '');
    formData.append(process.env.ENTRY_NAME || 'entry.731623761', data.name || '');
    formData.append(process.env.ENTRY_PHONE || 'entry.108141932', data.phone || '');
    formData.append(process.env.ENTRY_EMAIL || 'entry.1056215106', data.email || '');
    formData.append(process.env.ENTRY_COMPANY || 'entry.946042311', data.company || '');
    formData.append(process.env.ENTRY_MESSAGE || 'entry.1926310205', data.message || '');

    // Google Forms に送信
    const response = await fetch(formUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData.toString(),
    });

    // Google Forms は成功時も様々なステータスを返すため、
    // エラーでなければ成功とみなす
    console.log('Google Forms response status:', response.status);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, message: '送信完了しました' }),
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ success: false, message: 'エラーが発生しました。もう一度お試しください。' }),
    };
  }
};
