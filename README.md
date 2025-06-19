# 🚗 Sistema de Gerenciamento de Vagas de Estacionamento

Este projeto é uma solução completa para gerenciamento de vagas de estacionamento, permitindo o **cadastro de vagas**, **criação de reservas** e **encerramento de locações**, com cálculo automático do valor devido. Desenvolvido com **Spring Boot** no backend e **React + PrimeReact** no frontend, a aplicação segue uma arquitetura modular e escalável, pronta para ambientes reais.

---

## 🧰 Tecnologias Utilizadas

### 🔧 Backend (Spring Boot)

* Java 17 + Spring Boot 2.7
* Spring Data JPA + Hibernate
* Banco de dados H2 (para desenvolvimento) e MySQL/PostgreSQL (produção)
* Maven para gerenciamento de dependências
* Lombok para redução de código repetitivo
* Spring Security (estrutura já preparada para implementação futura)

### 🎨 Frontend (React + PrimeReact)

* React 19 com PrimeReact para componentes UI
* React Router para navegação
* Fetch API para integração com backend
* Styled Components para estilização com escopo controlado

---

## ⚙️ Como Executar

### 📌 1. Clonar o Repositório

```bash
git clone https://github.com/seu-usuario/estacionamento.git
cd estacionamento
```

### 📌 2. Iniciar o Backend

```bash
cd backend
mvn clean install
mvn spring-boot:run
```

> A API estará disponível em: **[http://localhost:9292/api](http://localhost:9292/api)**

#### Endpoints Principais:

* `GET /api/vagas` – Lista todas as vagas
* `POST /api/vagas` – Cadastra uma nova vaga
* `GET /api/vagas/disponiveis` – Lista vagas disponíveis
* `POST /api/reservas/{vagaId}` – Cria uma reserva
* `PUT /api/reservas/{id}/encerrar` – Finaliza uma reserva e calcula o valor

### 📌 3. Iniciar o Frontend

```bash
cd frontend
npm install
npm start
```

> A interface estará disponível em: **[http://localhost:3000](http://localhost:3000)**

---

## 🧪 Testes e Validação

### 🔹 Testes Automatizados (Backend)

Utiliza **JUnit 5** e **Mockito**:

```bash
cd backend
mvn test
```

### 🔹 Testes de API (Postman)

O repositório inclui uma coleção do Postman para facilitar os testes manuais dos endpoints.

---

## 🏗️ Arquitetura do Projeto

### 📂 Backend (Spring Boot - padrão MVC)

```
/src/main/java/com/teste/pratico/
├── controller   → Endpoints REST (Vagas, Reservas)
├── service      → Regras de negócio (ReservaService, VagaService)
├── repository   → Interfaces de persistência (JPA)
├── model        → Entidades (ParkingSpot, Reserva)
├── dto          → Transferência de dados
└── config       → Configurações (CORS, banco, segurança)
```

### 📂 Frontend (React + PrimeReact)

```
/src/components/
├── Menu.js         → Menu de navegação
├── ListaVagas.js   → Tabela de vagas com filtros
├── CadastroVaga.js → Formulário para novas vagas
├── Reserva.js      → Criar e encerrar reservas
└── api.js          → Integração com o backend
```

---

## 🔥 Decisões de Projeto

* **Separação entre frontend e backend** → Facilita manutenção e escalabilidade.
* **Spring Boot como API REST** → Padrão sólido e flexível para integração com qualquer frontend.
* **React + PrimeReact** → Interface rica, moderna e responsiva.
* **H2 como banco de desenvolvimento** → Rápido para testes locais.
* **BigDecimal** no cálculo de reservas → Precisão em operações financeiras.
* **Frontend com filtros e paginação** → Melhora a performance e experiência do usuário.

---

## 🎯 Desafios e Soluções

| Desafio                                                   | Solução                                                   |
| --------------------------------------------------------- | --------------------------------------------------------- |
| **Sincronização de estado React x Backend**               | `useEffect` para atualizar dados em tempo real.           |
| **Cálculo correto do valor da reserva**                   | Uso de `BigDecimal` no backend.                           |
| **Evitar reservas duplicadas ou encerramentos inválidos** | Validações robustas na API e interface protegida.         |
| **Botão de encerramento incorreto**                       | Desativado automaticamente no frontend após encerramento. |

