---
name: corporate-site-edit
description: コーポレートサイト(codist.fun)の修正とデプロイ。ユーザーがサイトの修正、更新、変更を依頼したときに使用。修正を行い、確認後にgit pushして自動デプロイする。
---

# コーポレートサイト修正 & デプロイ

Codist Inc. のコーポレートサイトを修正し、確認後に自動デプロイするスキルです。

## ワークフロー

### Step 1: 修正内容の理解
1. ユーザーの指示を確認
2. 対象ファイルを Read ツールで読み込む
3. 不明点があれば質問する

### Step 2: 修正の実行
1. 指示に基づいてファイルを修正
2. 修正内容をユーザーに明確に報告
3. 変更箇所を具体的に提示

### Step 3: ユーザー確認
修正完了後、AskUserQuestion ツールを使用して確認を求める：

```
質問: この修正内容でデプロイしてよろしいですか？
選択肢:
- Yes - この内容でデプロイする
- No - 修正をやり直す
```

### Step 4: デプロイ（Yes の場合のみ）
1. `git add <修正したファイル>`
2. `git commit -m "修正内容を反映したメッセージ"`
3. `git push origin main`
4. 「Netlify で自動デプロイが開始されました」と報告

### Step 5: 追加修正（No の場合）
1. ユーザーの追加指示を受ける
2. Step 2 に戻る

## プロジェクト情報

- **本番サイト**: https://codist-company.netlify.app/
- **デプロイ状況**: https://app.netlify.com/sites/codist-company/deploys
- **GitHub**: https://github.com/codist-fun-inc/company_page

## ファイル構成

```
src/
├── index.html      # トップページ
├── contact.html    # お問い合わせページ
├── member.html     # メンバーページ
├── css/            # スタイルシート
├── js/             # JavaScript
└── images/         # 画像ファイル
```

## 注意事項

- 修正前に必ず対象ファイルを確認すること
- .env ファイルは git に含まれない（秘匿情報）
- main ブランチへの push で Netlify が自動デプロイ
- コミットメッセージは日本語で簡潔に
