# Teste Ubistart

## Tópicos
<!--ts-->
* [Executar](#Executar)
* [Observações](#Observações)
* [EndPoints](#EndPoints)
    * [Authorization](#Authorization)
    * [TODOs](#TODOs)
    * [Users](#Users)
<!--te-->
## Executar

Para executar o projeto, crie um banco de dados chamado "ubistart_dev".<br>
Crie um usuário para esse banco, os dados estão em ".env" na raiz do projeto, MYSQL_USER e MYSQL_PASSWORD dizem respeito ao usuário e senha, respectivamente.<br>
Importe de dentro da pasta "_executar" o dump com a estrutura das tabelas e os dados do MySQL.<br>
Após isso, abra um terminal na raiz do projeto e execute os comandos abaixo
```nodejs
npm i; npm start
```
### Observações
Os endPoints da collection do Postman e o dump do banco de dados estão na pasta _executar
Com exceção do Sign-In e Sign-Up, todos os endPoints precisam de autenticação por JWT, que é inserida na aba 'Authorization', escolhendo a opção 'Bearer Token'

Usuário Admin:
```nodejs
{
    email: admin@admin.com
    password: "aaa123"
}
```

### EndPoints

#### Authorization
##### Sign-Up
POST localhost:3333/api/auth/sign-up<br>
Body:
```nodejs
{
    "email": "string@email.com",
    "password": "string"
}
```
##### Sign-In
POST localhost:3333/api/auth/sign-in<br>
Body:
```nodejs
{
    "email": "string@email.com",
    "password": "string"
}
```
#### TODOs
##### Listar
GET localhost:3333/api/todos<br>
Authorization: Bearer<br>
Query String: 
```nodejs
{
page: integer (página atual da paginação)
limit: integer (quantidade de registros por página)
filter%5Batrasadas%5D: any (filtrar por atrasados)
}
```
Exemplo: localhost:3333/api/todos?page=1&limit=10
##### Criar
POST localhost:3333/api/todos<br>
Authorization: Bearer<br>
Body:
```nodejs
{
    "description": "string",
    "deadline": "datetime"
}
```
##### Visualizar
GET localhost:3333/api/todos/:todoId<br>
Authorization: Bearer<br>
Query Params:
```nodejs
{
    todoId: string
}
```

##### Atualizar
PUT localhost:3333/api/todos/:todoId<br>
Authorization: Bearer<br>
Query Params:
```nodejs
{
    todoId: string
}
```
Body:
```nodejs
{
    "description": "string",
    "deadline": "datetime",
    "close": any
}
```

##### Deletar
DELETE localhost:3333/api/todos/:todoId<br>
Authorization: Bearer<br>
Query Params:
```nodejs
{
    todoId: string
}
```
#### Users
##### Listar
GET localhost:3333/api/users<br>
Authorization: Bearer<br>
Query String:
```nodejs
{
page: integer (página atual da paginação)
limit: integer (quantidade de registros por página)
filter%5Bemail%5D: string (admin filtrar por email)
}
```
Exemplo: localhost:3333/api/users?page=1&limit=10&filter%5Bemail%5D=teste999@teste.com
##### Criar
POST localhost:3333/api/users<br>
Authorization: Bearer<br>
Body:
```nodejs
{
    "email": "teste2@teste.com",
    "password": "aaa123"
}
```

##### Visualizar
GET localhost:3333/api/users/:userId<br>
Authorization: Bearer<br>
Query Params:
```nodejs
{
    userId: string
}
```

##### Atualizar
PUT localhost:3333/api/users/:userId<br>
Authorization: Bearer<br>
Query Params:
```nodejs
{
    userId: string
}
```
```nodejs
Body: {
    "oldPassword": "string",
    "password": "string"
}
```

##### Deletar
DELETE localhost:3333/api/users/:userId<br>
Authorization: Bearer<br>
Query Params:
```nodejs
{
    userId: string
}
```
