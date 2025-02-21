              🚗 Gerenciamento de Vagas de Estacionamento

                                                                          
Este projeto é um sistema para gerenciamento de vagas de estacionamento, permitindo cadastro de vagas, reservas e encerramento de locações. A solução foi construída utilizando Spring Boot no backend e React com PrimeReact no frontend, seguindo uma arquitetura escalável e modular.

📌 Tecnologias Utilizadas
🔧 Backend (Spring Boot)
Java 17 + Spring Boot 2.7
Spring Data JPA + Hibernate
Banco de Dados H2 (desenvolvimento) / MySQL/PostgreSQL (produção)
Maven para gerenciamento de dependências
Lombok para reduzir boilerplate
Spring Security (para futura implementação)
🎨 Frontend (React)
React 19 + PrimeReact para UI
React Router para navegação
Fetch API para comunicação com a API
Styled Components para estilização
⚙️ Configuração do Projeto
📌 1. Clonar o Repositório
bash
Copiar
Editar
git clone https://github.com/seu-usuario/estacionamento.git
cd estacionamento
📌 2. Configurar o Backend
bash
Copiar
Editar
cd backend
mvn clean install
mvn spring-boot:run
📌 Endpoints Principais

GET /api/vagas → Lista todas as vagas
POST /api/vagas → Cadastra uma nova vaga
GET /api/vagas/disponiveis → Retorna apenas as vagas disponíveis
POST /api/reservas/{vagaId} → Cria uma reserva para uma vaga
PUT /api/reservas/{id}/encerrar → Finaliza uma reserva e calcula o valor devido
A API será iniciada em http://localhost:9292/api

📌 3. Configurar o Frontend
bash
Copiar
Editar
cd frontend
npm install
npm start
A aplicação estará disponível em http://localhost:3000

🛠 Execução e Testes
🔹 Rodando os Testes do Backend
Os testes utilizam JUnit 5 e Mockito.

bash
Copiar
Editar
cd backend
mvn test
🔹 Testando a API com Postman
Use o arquivo de coleção do Postman para testar os endpoints.
📌 Arquitetura do Projeto
O projeto segue uma estrutura baseada em MVC (Model-View-Controller) no backend e componentização no frontend.

📂 Backend (Spring Boot)

css
Copiar
Editar
/src/main/java/com/teste/pratico/
├── controller   → Controladores REST (Vagas, Reservas)
├── service      → Contém a lógica de negócio (ReservaService, VagaService)
├── repository   → Interfaces de persistência (Spring Data JPA)
├── model        → Entidades de domínio (ParkingSpot, Reserva)
├── dto          → Objetos de transferência de dados (DTOs)
└── config       → Configurações (CORS, Banco de Dados, Segurança)
📂 Frontend (React + PrimeReact)

css
Copiar
Editar
/src/components/
├── Menu.js        → Componente de navegação
├── ListaVagas.js  → Exibe a listagem de vagas com DataTable e filtros
├── CadastroVaga.js → Formulário para cadastrar novas vagas
├── Reserva.js     → Gerenciamento de reservas (criação e encerramento)
└── api.js         → Serviço centralizado para chamadas HTTP
🔥 Decisões Arquiteturais
Spring Boot como API REST → Mantém separação de responsabilidades e facilita escalabilidade.
React com PrimeReact → Permite uma UI rica, interativa e altamente responsiva.
Banco de dados H2 para desenvolvimento → Facilita testes rápidos e independência de infraestrutura.
Uso de Services no backend → Separa lógica de negócios dos controllers, facilitando manutenção e testes.
Filtros e paginação no frontend → Reduz carga no servidor e melhora a experiência do usuário.
Cálculo de valores usando BigDecimal → Garante precisão no cálculo financeiro ao encerrar reservas.
🎯 Desafios e Soluções
✅ Sincronização do estado do React com o backend
🚀 Solução: Implementamos useEffect para atualizar a UI sempre que houver mudanças nos dados.

✅ Cálculo correto do valor total da reserva
🚀 Solução: Utilizamos BigDecimal no backend para garantir precisão em operações financeiras.

✅ Controle de status das vagas
🚀 Solução: O sistema impede que uma vaga já reservada seja reservada novamente e atualiza automaticamente o status ao encerrar.

✅ Evitar que reservas já encerradas sejam encerradas novamente
🚀 Solução: Implementamos validações que bloqueiam encerramentos duplicados e retornam erro apropriado.

✅ Desabilitar o botão "Encerrar" para vagas já disponíveis
🚀 Solução: No frontend, aplicamos disabled no botão caso a reserva já tenha sido encerrada.
