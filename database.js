const {MongoClient} = require('mongodb');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const scoreCollection = client.db('startup').collection('score');

function addScore(score) {
    scoreCollection.insertOne(score);
  }
  
  function getHighScores() {
    const query = {};
    const options = {
      sort: {wins: -1},
      limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
  }

  async function hasPlayer(userName) {
    const query = {name: {$eq: userName}};
    const finder = await scoreCollection.find(query).toArray();
    if(finder.length === 0) {
        return false;
    }
    return true;
  }

  function updateScore(userName, outcome) {
    const query = {name: {$eq: userName}};
    if(outcome) {
        scoreCollection.updateOne(query, {$inc: {wins: 1}});
    }
    else {
        scoreCollection.updateOne(query, {$inc: {losses: 1}});
    }
    
  }
  
  module.exports = {addScore, getHighScores, hasPlayer, updateScore};
  