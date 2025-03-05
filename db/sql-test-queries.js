const db = require("./connection");

async function getAllUsers() {
  try {
    const result = await db.query("SELECT * FROM users;");
    console.log("All Users:", result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

async function getArticlesByTopic() {
  try {
    const result = await db.query(
      "SELECT * FROM articles WHERE topic = 'coding';"
    );
    console.log("Articles on Coding:", result.rows);
  } catch (err) {
    console.error("Error fetching articles:", err);
  }
}

async function getCommentsByNegativeVotes() {
  try {
    const result = await db.query("SELECT * FROM comments WHERE votes < 0;");
    console.log("Comments with Negative Votes:", result.rows);
  } catch (err) {
    console.error("Error fetching comments:", err);
  }
}

async function getAllTopics() {
  try {
    const result = await db.query("SELECT * FROM topics;");
    console.log("All Topics:", result.rows);
  } catch (err) {
    console.error("Error fetching topics:", err);
  }
}

async function getArticlesByUser() {
  try {
    const result = await db.query(
      "SELECT * FROM articles WHERE author = 'grumpy19';"
    );
    console.log("Articles by grumpy19:", result.rows);
  } catch (err) {
    console.error("Error fetching articles by grumpy19:", err);
  }
}

async function getCommentsByVotes() {
  try {
    const result = await db.query("SELECT * FROM comments WHERE votes > 10;");
    console.log("Comments with More than 10 Votes:", result.rows);
  } catch (err) {
    console.error("Error fetching comments with more than 10 votes:", err);
  }
}

async function runQueries() {
  await getAllUsers();
  await getArticlesByTopic();
  await getCommentsByNegativeVotes();
  await getAllTopics();
  await getArticlesByUser();
  await getCommentsByVotes();
}


runQueries();