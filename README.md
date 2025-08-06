# React App Template 🚀

Este é um template base para criar aplicações React com foco em **deploy automático no S3 + CloudFront** via GitHub Actions.

> Ideal para projetos que precisam de deploy rápido, automatizado e escalável com infraestrutura AWS.

---

## 📦 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [AWS S3](https://aws.amazon.com/s3/) para hospedagem
- [AWS CloudFront](https://aws.amazon.com/cloudfront/) para distribuição de conteúdo
- [GitHub Actions](https://github.com/features/actions) para CI/CD

---

## 🚀 Começando

### Pré-requisitos

Antes de começar, você precisa ter:

- Conta na [AWS](https://aws.amazon.com/)
- Bucket S3 criado para hospedagem do site
- Distribuição CloudFront configurada (opcional, mas recomendado)
- Chaves de acesso da AWS (Access Key ID e Secret Access Key)
- GitHub Secrets configurados no seu repositório

---

### 🔧 Scripts disponíveis

| Script            | Descrição                              |
| ----------------- | -------------------------------------- |
| `npm install`     | Instala as dependências do projeto     |
| `npm run dev`     | Inicia o servidor de desenvolvimento   |
| `npm run build`   | Gera a versão de produção da aplicação |
| `npm run preview` | Pré-visualiza a build localmente       |

---

## ⚙️ Estrutura do Projeto

```bash
├── public/               # Arquivos públicos
├── src/                  # Código-fonte principal
│   ├── components/       # Componentes reutilizáveis
│   ├── App.tsx           # Componente principal
│   └── main.tsx          # Ponto de entrada
├── dist/                 # Build final (gerado pelo Vite)
├── .github/workflows/    # CI/CD com GitHub Actions
│   └── deploy.yml        # Workflow de deploy para S3
├── .gitignore
├── index.html
├── package.json
└── vite.config.ts
```

````

---

## 🛠️ Configuração do GitHub Actions

### 1. Configure os segredos no GitHub

Acesse seu repositório no GitHub > **Settings** > **Secrets and variables** > **Actions** > **New repository secret**, e adicione:

| Nome                             | Descrição                       |
| -------------------------------- | ------------------------------- |
| `AWS_S3_BUCKET_NAME`             | Nome do seu bucket S3           |
| `AWS_REGION`                     | Região da AWS (ex: `us-east-1`) |
| `AWS_ACCESS_KEY_ID`              | Chave de acesso AWS             |
| `AWS_SECRET_ACCESS_KEY`          | Segredo da chave de acesso AWS  |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | ID da distribuição CloudFront   |

---

### 2. Fluxo de Deploy com GitHub Actions

O deploy será feito automaticamente toda vez que houver um **push na branch `main`**.

#### `.github/workflows/deploy.yml`

```yaml
name: Deploy React App to S3

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repo
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "23"

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to S3
        uses: jakejarvis/s3-sync-action@master
        with:
          args: --delete
        env:
          AWS_S3_BUCKET: ${{ secrets.AWS_S3_BUCKET_NAME }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          AWS_REGION: ${{ secrets.AWS_REGION }}
          SOURCE_DIR: dist

      - name: Invalidate CloudFront Cache
        uses: chetan/invalidate-cloudfront-action@v2
        env:
          DISTRIBUTION: ${{ secrets.AWS_CLOUDFRONT_DISTRIBUTION_ID }}
          PATHS: "/*"
          AWS_REGION: ${{ secrets.AWS_REGION }}
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
```

---

## 🌐 Acesso ao Site

Após o deploy, sua aplicação estará disponível no endpoint do CloudFront, como:

```
https://dxxxxxxxxxxxxx.cloudfront.net
```

> Você também pode configurar um domínio personalizado com HTTPS via AWS Route 53 + ACM.

---

## 🧪 Testes Locais

```bash
npm run dev
```

Acesse `http://localhost:5173` para ver o app localmente.

---

## 🧹 Limpeza do Cache

Toda vez que a aplicação for implantada, o cache do CloudFront será invalidado automaticamente para garantir que a versão mais recente esteja disponível.

---

## 🙋 Dúvidas e Contribuições

Sinta-se à vontade para abrir issues ou pull requests!

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 💡 Inspirado por

- [Create React App](https://create-react-app.dev/)
- [Vite](https://vitejs.dev/)
- [AWS Frontend Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)



````
