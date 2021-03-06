/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {

  Route.group(() => {

    Route.group(() => {
      Route.get('/', 'UsersController.index')
      Route.post('/', 'UsersController.store')
      Route.get('/:id', 'UsersController.show')
      Route.put('/:id', 'UsersController.update')
      Route.delete('/:id', 'UsersController.destroy')
    }).prefix('/users')

    Route.group(() => {
      Route.get('/', 'TodosController.index')
      Route.post('/', 'TodosController.store')
      Route.get('/:id', 'TodosController.show')
      Route.put('/:id', 'TodosController.update')
      Route.delete('/:id', 'TodosController.destroy')
    }).prefix('/todos')

  }).middleware('auth')

  Route.group(() => {
    Route.post('/sign-in', 'AuthController.signIn')
    Route.post('/sign-up', 'AuthController.signUp')
  }).prefix('/auth')


}).prefix('/api')
