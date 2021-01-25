const config = require('./env.json')

const faunadb = require('faunadb')
const q = faunadb.query;
const { Collection, CreateCollection, Exists, If } = q;
async function setup(faunaDBKey) {
  try {
    const faunadbClient = new faunadb.Client({ secret: faunaDBKey, keepAlive: true });
    await faunadbClient.query(If(Exists(Collection('users')), true, CreateCollection({ name: 'users' })));
    console.log('"users" collection created.')
  
  } catch (error) {
    console.error(error)
  }

}

setup(config.FAUNADB_SECRET_KEY).then(() => console.log('finished'))