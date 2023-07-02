import { createServer, Factory, Model } from 'miragejs'
import { faker } from '@faker-js/faker'

interface Meal {
  name: string
  description: string
  date: string,
  time: string
  isOnDiet: boolean
}

export function makeServer() {
  const server = createServer({
    models: {
      meal: Model.extend<Partial<Meal>>({})
    },

    factories: {
      meal: Factory.extend({
        name(i: number) {
          return `meal-${i + 1}`
        },
        description() {
          return faker.commerce.productDescription()
        },
        date() {
          return faker.date.birthdate()
        },
        time() {
          return faker.date.anytime()
        },
        isOnDiet() {
          return faker.datatype.boolean()
        },
      })
    },


    seeds(server) {
      server.createList('meal', 200)
    },

    routes() {
      this.namespace = '/api'
      this.timing = 750

      this.get('/meals')
      this.post('/meals')
    },
  })



  return server
}