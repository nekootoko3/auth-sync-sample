# ブラウザ間で認証状態を同期するサンプル

localStorage を利用して認証状態をタブ間で同期する実装のサンプルです。

## 動かし方

turborepo をインストールしてください。

https://turbo.build/repo/docs/installing

インストール後、以下コマンドを実行することで各サービスを立ち上げることができます。

```sh
turbo dev
```

## サービスの説明

`turbo dev` を実行することで localhost で 4 つのサービスが立ち上がります。
各サービスがどのポートを使っているかとサービスの説明は以下のとおりです。

### simple

単一ドメインで認証状態を同期するサンプルです。
http://localhost:3010 で立ち上がります。
http://localhost:3010/auth で認証状態を変更できます。
別タブで http://localhost:3010/auth を立ち上げておくと、認証状態が変わると画面がリロードされます。

### auth/docs/web

複数ドメインで認証状態を同期するサンプルです。
auth で認証状態を変更すると docs と web で変更に応じて画面がリロードされます。

- auth
  - http://localhost:3000/auth で認証状態を変更できます。
  - /embedded のページは web の /embed-auth のページに埋め込まれた iframe で描画されており、認証情報を同期する役割を担っています。
- docs
  - http://localhost:3001を立ち上げておくと、認証状態が変わると画面がリロードされます。
- web
  - http://localhost:3002 を立ち上げておくと、認証状態が変わると画面がリロードされます。

docs と web には /auth というパスが存在しています。
このページは auth 内の iframe で使われており、auth から認証状態の変更があったことを受け取って、localStorage の変更を行うためのページになっています。
