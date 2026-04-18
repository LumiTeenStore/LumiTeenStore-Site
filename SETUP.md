# Lumi Teen Store — Setup Guide

## Stack
- **Next.js 16** (App Router)
- **Tailwind CSS v4**
- **Firebase** (Firestore + Auth + Storage)
- **Deploy:** Vercel

---

## 1. Firebase Setup

### Criar projeto Firebase
1. Acesse [firebase.google.com](https://firebase.google.com) e crie um projeto
2. Ative os serviços:
   - **Firestore Database** → modo produção
   - **Authentication** → método Email/Senha
   - **Storage**

### Criar usuário admin
No Firebase Console → Authentication → Users → Add user  
Defina o e-mail e senha que será usado no painel `/admin/login`

### Configurar Storage (CORS)
No Google Cloud Console (associado ao projeto Firebase):
```json
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT"],
    "maxAgeSeconds": 3600
  }
]
```

### Regras do Firestore
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Regras do Storage
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

---

## 2. Variáveis de Ambiente

Copie o arquivo `.env.local.example` para `.env.local` e preencha com as credenciais do Firebase:

```bash
cp .env.local.example .env.local
```

As variáveis necessárias estão no Firebase Console → Configurações do projeto → Apps web:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

---

## 3. WhatsApp e Contato

Edite o arquivo `lib/constants.ts` e ajuste:

```ts
export const STORE_INFO: StoreInfo = {
  whatsapp: "5598983158573", 
  instagram: "@lumiteenstore",
  email: "lumiteenstore@gmail.com",
};
```

---

## 4. Rodando localmente

```bash
npm install
npm run dev
```

Acesse: http://localhost:3000

---

## 5. Deploy no Vercel

1. Faça push do código para um repositório GitHub
2. Acesse [vercel.com](https://vercel.com) → New Project → importe o repositório
3. Adicione as variáveis de ambiente (as mesmas do `.env.local`)
4. Deploy!

---

## Páginas

| Rota | Descrição |
|------|-----------|
| `/` | Home (landing page) |
| `/catalogo` | Catálogo com filtros |
| `/produto/[id]` | Página do produto |
| `/contato` | Página de contato |
| `/admin/login` | Login do admin |
| `/admin/dashboard` | Dashboard |
| `/admin/produtos` | Listagem de produtos |
| `/admin/produtos/novo` | Novo produto |
| `/admin/produtos/[id]/editar` | Editar produto |
