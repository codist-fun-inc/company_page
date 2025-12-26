# デプロイコマンド

変更を GitHub に push して Netlify に自動デプロイします。

## 実行手順

1. `git status` で変更を確認
2. 変更がある場合:
   - `git add .` で全ての変更をステージング
   - ユーザーにコミットメッセージを確認（または自動生成）
   - `git commit` でコミット
   - `git push origin main` でプッシュ
3. 変更がない場合:
   - 「変更がありません」と報告

## 注意事項

- .env ファイルは .gitignore に含まれているため push されません
- main ブランチに push すると Netlify が自動でデプロイします
- デプロイ状況: https://app.netlify.com/sites/codist-company/deploys
