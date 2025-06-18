# 要件定義

背景コンポーネントを作成するwebアプリケーション
各種のパラメータはurlに保持

## 技術要件

フロントエンド: Typescript, Next.js (App Router)
バックエンド: Typescript, Next.js (Server Actions)
スタイリング: tailwind v4, daisyUI v5

## コード規約

typescriptの実装に関しては、以下のコード規約を守ってください
es2015以降のモダンな文法を積極的に使用する
変数宣言にvarを使用しない
letよりもconstを優先的に使用する
関数定義にはアロー関数を使用する
非同期処理は生のPromiseを扱うのではなく、なるべくasync/awaitを使用する
forEachよりもfor ofを優先的に使用する
複数の条件分岐がある場合、早期リターンを活用する
関数の引数が3つ以上になる場合、分割代入を使用する

また、以下のようなソフトウェア開発の原則に則って実装してください
KISS原則
YAGNI原則
DRY原則

next.js app router特有の事情として、各コンポーネントはserver componentとclient componentに大別されます
client componentからserver componentをインポートすることは出来ないため、
もしネストさせたい場合はcomposition patternを活用してください

## ディレクトリ構成
/src               ソースファイルは全てここに集約する
/src/app           next.js app routerのフロント側ルーティングに使用するファイル
/src/components    各種コンポーネントファイル
/src/lib           クライアントとサーバー共通で使用するユーティリティ関数や型定義等
/src/lib/client    ユーティリティ関数の中でも、クライアント側で実行されるもの（windowオブジェクトを使用しているものや、reactのカスタムフック等）
/src/lib/server    ユーティリティ関数の中でも、サーバー側で実行されるもの（app routerのサーバーアクション等）
