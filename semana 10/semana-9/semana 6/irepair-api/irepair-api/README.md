# iRepair API

Back-end do iRepair construído com **Express**, **Prisma** e **MySQL**. Autenticação via **JWT** armazenado em cookie `httpOnly`.

---

## 📁 Estrutura do projeto

```
irepair-api/
├── prisma/
│   └── schema.prisma         # Models: User, Client, Device, ServiceOrder
├── src/
│   ├── config/
│   │   └── prismaClient.ts   # Singleton do Prisma
│   ├── controllers/
│   │   ├── authController.ts
│   │   ├── clientController.ts
│   │   ├── deviceController.ts
│   │   └── orderController.ts
│   ├── middlewares/
│   │   └── authMiddleware.ts # Verifica JWT do cookie
│   ├── routes/
│   │   ├── authRoutes.ts
│   │   ├── clientRoutes.ts
│   │   ├── deviceRoutes.ts
│   │   └── orderRoutes.ts
│   ├── app.ts                # Express + CORS + rotas
│   └── server.ts             # Inicialização
├── frontend-example/         # Arquivos prontos para colar no front
│   ├── api.ts                # Instância Axios com withCredentials
│   ├── AuthContext.tsx        # Context com user, login, logout, isAuthenticated
│   ├── PrivateRoute.tsx       # Protege rotas privadas
│   ├── Login.tsx              # Tela de login
│   └── App.tsx                # Exemplo de configuração de rotas
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

---

## 🚀 Setup

### 1. Copie os arquivos para seu repositório

Coloque a pasta `irepair-api/` na raiz do seu monorepo, ao lado do front-end:

```
Trainee/
├── irepair/          # seu front-end (Semana 6)
└── irepair-api/      # este back-end
```

### 2. Instale as dependências

```bash
cd irepair-api
npm install
```

### 3. Configure o `.env`

Copie o exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

```env
PORT=3333
DATABASE_URL="mysql://root:senha@localhost:3306/irepair_db"
JWT_SECRET="uma_string_longa_e_aleatoria_aqui"
FRONTEND_URL="http://localhost:5173"
```

> ⚠️ **Nunca commite o `.env`** — ele já está no `.gitignore`.

### 4. Crie o banco de dados

No MySQL, crie o banco manualmente:

```sql
CREATE DATABASE irepair_db;
```

### 5. Rode as migrations

```bash
npm run prisma:migrate
# quando perguntar o nome da migration, digite: init
```

### 6. Inicie o servidor em desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`.

---

## 🔐 Rotas de Autenticação

| Método | Rota            | Auth? | Descrição                              |
|--------|-----------------|-------|----------------------------------------|
| POST   | /auth/register  | ❌    | Cria usuário (senha hasheada c/ bcrypt)|
| POST   | /auth/login     | ❌    | Login — seta cookie `httpOnly`         |
| POST   | /auth/logout    | ❌    | Limpa o cookie                         |
| GET    | /auth/me        | ✅    | Retorna dados do usuário autenticado   |

### Exemplo — Register

```json
POST /auth/register
{
  "name": "Felipe",
  "email": "felipe@email.com",
  "password": "minhasenha123"
}
```

### Exemplo — Login

```json
POST /auth/login
{
  "email": "felipe@email.com",
  "password": "minhasenha123"
}
```

---

## 📦 Rotas de Negócio (todas protegidas por JWT)

### Clientes `/clients`

| Método | Rota         | Descrição              |
|--------|--------------|------------------------|
| GET    | /clients     | Lista todos os clientes|
| GET    | /clients/:id | Busca cliente por ID   |
| POST   | /clients     | Cria cliente           |
| PUT    | /clients/:id | Atualiza cliente       |
| DELETE | /clients/:id | Remove cliente         |

**Body para criar/atualizar:**
```json
{ "name": "João Silva", "phone": "31999999999", "email": "joao@email.com" }
```

### Dispositivos `/devices`

| Método | Rota         | Descrição                 |
|--------|--------------|---------------------------|
| GET    | /devices     | Lista todos os dispositivos|
| GET    | /devices/:id | Busca dispositivo por ID  |
| POST   | /devices     | Cria dispositivo          |
| PUT    | /devices/:id | Atualiza dispositivo      |
| DELETE | /devices/:id | Remove dispositivo        |

**Body para criar:**
```json
{ "brand": "Apple", "model": "iPhone 13", "serial": "ABC123", "clientId": 1 }
```

### Ordens de Serviço `/orders`

| Método | Rota       | Descrição               |
|--------|------------|-------------------------|
| GET    | /orders    | Lista todas as ordens   |
| GET    | /orders/:id| Busca ordem por ID      |
| POST   | /orders    | Cria ordem              |
| PUT    | /orders/:id| Atualiza ordem/status   |
| DELETE | /orders/:id| Remove ordem            |

**Body para criar:**
```json
{ "description": "Troca de tela", "deviceId": 1, "price": 350.00 }
```

**Status disponíveis:** `PENDING` | `IN_PROGRESS` | `DONE` | `CANCELLED`

---

## 🖥️ Integrando ao Front-End

Os arquivos prontos estão em `frontend-example/`. Siga os passos:

### 1. Instale o Axios no front

```bash
cd ../irepair
npm install axios
```

### 2. Crie a instância do Axios

Copie `frontend-example/api.ts` para `src/lib/api.ts` no seu front.

Adicione ao `.env` do front:
```env
VITE_API_URL=http://localhost:3333
```

### 3. Adicione o AuthContext

Copie `frontend-example/AuthContext.tsx` para `src/contexts/AuthContext.tsx`.

Envolva seu `App` com o `<AuthProvider>`:

```tsx
// main.tsx
import { AuthProvider } from "./contexts/AuthContext";

root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
```

### 4. Proteja as rotas

Copie `frontend-example/PrivateRoute.tsx` para `src/components/PrivateRoute.tsx`.

Use nas rotas que precisam de autenticação:

```tsx
<Route path="/orders" element={<PrivateRoute><Orders /></PrivateRoute>} />
```

### 5. Adicione a tela de Login

Copie `frontend-example/Login.tsx` para `src/pages/Login.tsx` e estilize conforme o design do iRepair.

---

## 🌿 GitFlow

```bash
# Certifique-se de estar na branch correta
git checkout feature/irepair-semana9

# Após configurar tudo
git add .
git commit -m "feat: add irepair-api with auth and business routes"
git push origin feature/irepair-semana9

# Abra PR para desenvolvimento
```
