# Motion Atlas

**Find it. Tune it. Tell AI.**

アニメーション名を知らなくても、見て選び、比較し、速度・遅延・強さを調整して、AIへの実装指示とHTML/CSSをコピーできるモーション設計ツールです。

## MVP features

- 50種類以上のオリジナルMotion
- カテゴリ・目的・キーワード検索
- 任意テキストでライブプレビュー
- Restart
- お気に入り（localStorage）
- 最大4つの比較 / Sync Play
- Duration / Delay / Intensity / Easing 調整
- AI向け日本語実装指示の生成・コピー
- HTML/CSS生成・コピー
- `prefers-reduced-motion` を含むコード出力
- PWA / オフラインキャッシュ
- iPhoneを含むレスポンシブ対応

## Technology

HTML / CSS / vanilla JavaScript only. No external runtime dependency.

## GitHub Pages

`main` ブランチをGitHub Pagesで公開できます。`.github/workflows/pages.yml` はGitHub ActionsからPagesへデプロイする構成です。

## License / references

アプリ本体のコードは独自実装です。公開されているモーション・コンポーネントカタログの「見て選ぶ」「調整する」「コピーする」という設計原理を参考にしていますが、第三者のアニメーションコードは同梱していません。

MIT License
