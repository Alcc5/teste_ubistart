# Teste Ubistart

## Tópicos
=================
<!--ts-->
* [Executar](#Executar)
* [Observações](#Observações)
* [EndPoints](#EndPoints)
    * [Authorization](#Authorization)
    * [TODOs](#TODOs)
    * [Users](#Users)
<!--te-->
## Executar

Para executar o projeto, abra um terminal na raiz do projeto e execute os comandos abaixo
```nodejs
npm i; npm start
```
### Observações
Os endPoints da collection do Postman e o dump do banco de dados estão na pasta _executar
Com exceção do Sign-In e Sign-Up, todos os endPoints precisam de autenticação por JWT, que é inserida na aba 'Authorization', escolhendo a opção 'Bearer Token'

Usuário Admin:{
    email: admin@admin.com
    password: "aaa123"
}

### EndPoints

#### Authorization
##### Sign-Up
POST localhost:3333/api/auth/sign-up
Body: 
{
    "email": "string@email.com",
    "password": "string"
}

##### Sign-In
POST localhost:3333/api/auth/sign-in
Body: 
{
    "email": "string@email.com",
    "password": "string"
}
#### TODOs
##### Listar
GET localhost:3333/api/todos
Authorization: Bearer
Query String: {
page: integer (página atual da paginação)
limit: integer (quantidade de registros por página)
filter%5Batrasadas%5D: any (filtrar por atrasados)
}
Exemplo: localhost:3333/api/todos?page=1&limit=10
##### Criar
POST localhost:3333/api/todos
Authorization: Bearer
Body: 
{
    "description": "string",
    "deadline": "datetime"
}

##### Visualizar
GET localhost:3333/api/todos/:todoId
Authorization: Bearer
Query Params:
{
    todoId: string
}


##### Atualizar
PUT localhost:3333/api/todos/:todoId
Authorization: Bearer
Query Params:
{
    todoId: string
}
Body: {
    "description": "string",
    "deadline": "datetime",
    "close": any
}

##### Deletar
DELETE localhost:3333/api/todos/:todoId
Authorization: Bearer
Query Params:
{
    todoId: string
}
#### Users
##### Listar
GET localhost:3333/api/users
Authorization: Bearer
Query String: {
page: integer (página atual da paginação)
limit: integer (quantidade de registros por página)
filter%5Bemail%5D: string (admin filtrar por email)
}
Exemplo: localhost:3333/api/users?page=1&limit=10&filter%5Bemail%5D=teste999@teste.com
##### Criar
POST localhost:3333/api/users
Authorization: Bearer
Body: 
{
    "email": "teste2@teste.com",
    "password": "aaa123"
}

##### Visualizar
GET localhost:3333/api/users/:userId
Authorization: Bearer
Query Params:
{
    userId: string
}


##### Atualizar
PUT localhost:3333/api/users/:userId
Authorization: Bearer
Query Params:
{
    userId: string
}
Body: {
    "oldPassword": "string",
    "password": "string"
}

##### Deletar
DELETE localhost:3333/api/users/:userId
Authorization: Bearer
Query Params:
{
    userId: string
}
