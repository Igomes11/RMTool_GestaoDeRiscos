# 🚀 RM Tool — Sistema de Gestão de Riscos em Projetos de Software (EM ANDAMENTO)

**Proposta inicial:**

O **RM Tool** é uma aplicação web desenvolvida para o gerenciamento de riscos tecnológicos em projetos de software.  
A ferramenta permite cadastrar, visualizar e gerenciar riscos de forma prática e intuitiva, auxiliando equipes na mitigação de falhas e vulnerabilidades.

---

## 🧩 Tecnologias Utilizadas

### 🖥️ Frontend
- **React.js** (sem Tailwind)
- **CSS puro** para estilização
- **Axios** para integração com o backend
- **HTML5 / JavaScript (ES6+)**

### ⚙️ Backend
- **Java 17+**
- **Spring Boot**
- **Spring Data JPA**
- **MySQL** (banco de dados relacional)
- **Maven** para gerenciamento de dependências

---

## 🧠 Estrutura do Projeto

```
RM-Tool/
│
├── frontend-react/             # Aplicação React
│   ├── src/
│   │   ├── components/         # Componentes visuais (Navbar, Tabelas, Formulários)
│   │   ├── pages/              # Páginas: Dashboard, Projetos, Tecnologias, Riscos
│   │   ├── services/           # Integração com API (Axios)
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── public/
│
├── backend-java/               # API REST com Spring Boot
│   ├── src/
│   │   ├── main/java/com/rmtool/
│   │   │   ├── controller/     # Endpoints REST
│   │   │   ├── model/          # Entidades (JPA)
│   │   │   ├── repository/     # Repositórios do banco
│   │   │   └── service/        # Regras de negócio
│   │   └── resources/
│   │       └── application.properties
│   ├── pom.xml
│
└── README.md
```

---

## ⚙️ Como Executar o Projeto

### 1️⃣ Clonar o repositório
```bash
git clone https://github.com/seu-usuario/rm-tool.git
cd rm-tool
```

### 2️⃣ Configurar o Backend (Java)
```bash
cd backend-java
```

- Configure o arquivo `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/rmtool
spring.datasource.username=root
spring.datasource.password=suasenha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

- Execute o backend:
```bash
./mvnw spring-boot:run
```
> O servidor iniciará em **http://localhost:8080**

---

### 3️⃣ Rodar o Frontend (React)
```bash
cd ../frontend-react
npm install
npm start
```
> O frontend iniciará em **http://localhost:3000**

---

## 🔗 Comunicação entre Frontend e Backend

O React se comunica com o backend Java via **API REST**:

```
[React Frontend] → (Axios/Fetch) → [Spring Boot API] → [MySQL]
```

Exemplo de requisição:
```js
import axios from "axios";

axios.get("http://localhost:8080/api/riscos")
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

---

## 🧱 Funcionalidades

- ✅ Cadastrar novos riscos em projetos de software 
- ✅ Listar riscos existentes  
- ✅ Editar e remover riscos  
- ✅ Filtro e busca por nome ou categoria  
- ✅ Integração com MySQL  
- ✅ Interface responsiva e moderna  

---

## 🧑‍💻 Desenvolvido por

**Arthur Moura** — Estudante de Análise e Desenvolvimento de Sistemas - IFPE

**Igor Gomes** — Estudante de Análise e Desenvolvimento de Sistemas - IFPE

**Emanuel Dantas** — Professor Orientador - Projeto PIBIC: *Ferramenta Web de Gestão de Riscos Tecnológicos em Projetos de Software.*

---

## 📄 Licença
Este projeto está sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
