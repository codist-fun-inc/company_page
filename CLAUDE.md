# codist コーポレートサイト

## スキル使用ルール（重要）

このプロジェクトでサイトの修正・更新・変更依頼があった場合は、**最初のアクションとして必ず`corporate-site-edit`スキルを使用すること**。

| 依頼内容 | 使用スキル |
|---------|-----------|
| サイトの修正・更新・変更 | `corporate-site-edit` |
| デプロイのみ | `deploy-codist` |

直接ファイルを編集せず、スキル経由で作業を行う。

---

## プロジェクト概要

- **サイト名**: 株式会社codist コーポレートサイト
- **本番URL**: https://codist.fun/
- **プレビューURL**: https://codist-company.netlify.app/
- **リポジトリ**: https://github.com/codist-fun-inc/company_page
- **ホスティング**: Netlify
- **デプロイ**: mainブランチへのpushで自動デプロイ

---

## ディレクトリ構成

```
company_page/
├── CLAUDE.md              # このファイル
├── netlify.toml           # Netlify設定
├── netlify/
│   └── functions/
│       └── contact.js     # お問い合わせフォーム用Serverless Function
├── src/                   # 公開ディレクトリ（Netlifyのpublish先）
│   ├── index.html         # トップページ
│   ├── contact.html       # お問い合わせページ
│   ├── member.html        # メンバー紹介ページ
│   ├── recruit.html       # 採用情報ページ
│   ├── privacy_policy.html # プライバシーポリシー
│   ├── security.html      # セキュリティポリシー
│   ├── qurlity.html       # 品質について
│   ├── 404.html           # 404エラーページ
│   ├── css/
│   │   └── style.css      # カスタムスタイル
│   ├── js/
│   │   ├── tailwind.js    # Tailwind設定 & scroll-fadeアニメーション
│   │   ├── scroll.js      # スムーズスクロール処理
│   │   ├── menu.js        # モバイルメニュー制御
│   │   ├── slider.js      # 実績スライダー
│   │   ├── footer.js      # フッターバナー表示制御
│   │   ├── contact.js     # お問い合わせフォーム
│   │   └── enviroment.js  # 環境設定
│   └── images/            # 画像ファイル
├── index.html             # ルートリダイレクト用
├── sitemap.xml            # サイトマップ
└── robots.txt             # クローラー設定
```

---

## 技術スタック

- **CSS**: Tailwind CSS（CDN）
- **フォント**: Noto Sans JP, Orbitron（Google Fonts）
- **JavaScript**: Vanilla JS（フレームワークなし）
- **ホスティング**: Netlify
- **Serverless**: Netlify Functions（お問い合わせ用）

---

## レスポンシブ対応

デスクトップ/モバイルで別々の要素を使用：

```html
<section class="... desktop">  <!-- PC用 -->
<section class="... mobile">   <!-- スマホ用（768px以下） -->
```

CSSで切り替え：
- `.desktop`: 768px以下で `display: none`
- `.mobile`: 768px超で `display: none`

---

## 主要JavaScript機能

| ファイル | 機能 |
|---------|------|
| `tailwind.js` | Tailwind設定、`.scroll-fade`要素のフェードインアニメーション |
| `scroll.js` | アンカーリンクのスムーズスクロール |
| `menu.js` | モバイルハンバーガーメニュー |
| `slider.js` | WORKセクションのスライダー |
| `footer.js` | フッターCTAバナーの表示/非表示 |
| `contact.js` | フォーム送信処理 |

---

## よくある修正パターン

### スクロールアニメーション
- 対象: `src/js/tailwind.js`
- `.scroll-fade`クラスを持つ要素がビューポートに入るとフェードイン

### モバイルメニュー
- 対象: `src/js/menu.js`, `src/css/style.css`
- `.mobile-menu`のopen/close制御

### スライダー
- 対象: `src/js/slider.js`
- `#work`セクションの実績カード切り替え

### フッターバナー
- 対象: `src/js/footer.js`
- スクロール時に表示、5秒後に非表示

---

## デプロイ手順

1. mainブランチに変更をpush
2. Netlifyが自動でビルド・デプロイ
3. 本番反映（通常1-2分）

```bash
git add .
git commit -m "変更内容"
git push origin main
```
