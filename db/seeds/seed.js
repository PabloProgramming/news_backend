const db = require("../connection");
const format = require("pg-format");
const {convertTimestampToDate} = require("../seeds/utils");

const seed = async ({topicData, userData, articleData, commentData}) => {
  try {
    // First drop the tables in the reverse order to avoid foreign key issues
    await db.query(`
      -- Drop Comments Table first (dependent on Articles and Users)
      DROP TABLE IF EXISTS comments;
    `);

    await db.query(`
      -- Drop Articles Table (dependent on Topics and Users)
      DROP TABLE IF EXISTS articles;
    `);

    await db.query(`
      -- Drop Users Table (needed by Articles and Comments)
      DROP TABLE IF EXISTS users;
    `);

    await db.query(`
      -- Drop Topics Table (father table)
      DROP TABLE IF EXISTS topics;
    `);

    // Create the tables in the correct order
    await db.query(`
      CREATE TABLE topics (
        slug VARCHAR PRIMARY KEY,
        description VARCHAR(2000) NOT NULL,
        img_url VARCHAR(1000)
      );
    `);

    await db.query(`
      CREATE TABLE users (
        username VARCHAR(255) PRIMARY KEY,
        name VARCHAR(300) NOT NULL,
        avatar_url VARCHAR(1000)
      );
    `);

    await db.query(`
      CREATE TABLE articles (
        article_id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        body TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        votes INTEGER DEFAULT 0,
        article_img_url VARCHAR(1000),
        topic VARCHAR NOT NULL,  -- Apply NOT NULL here
        author VARCHAR NOT NULL,  -- Apply NOT NULL here
        FOREIGN KEY (topic) REFERENCES topics(slug),
        FOREIGN KEY (author) REFERENCES users(username)
      );
    `);

    await db.query(`
      CREATE TABLE comments (
        comment_id SERIAL PRIMARY KEY,
        body TEXT,
        votes INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
        author VARCHAR NOT NULL,
        article_id INTEGER NOT NULL,
        FOREIGN KEY (author) REFERENCES users(username),
        FOREIGN KEY (article_id) REFERENCES articles(article_id)
      );
    `);
    console.log("Tables created successfully");

    // Format JSON object into a strig array to insert into table with db.query
    const topicsArray = formatTopics(topicData);

    const insertTopicsQueries = format(
      `INSERT INTO topics (slug, description, img_url)
      VALUES %L RETURNING *;`,
      topicsArray
    );

    const topics = await db.query(insertTopicsQueries);
    console.log("Inserted Topics:");

    const usersArray = formatUsers(userData);
    const insertUsersQuery = format(
      `INSERT INTO users (username, name, avatar_url)
       VALUES %L
       RETURNING *;`,
      usersArray
    );
    const users = await db.query(insertUsersQuery);
    console.log("Inserted Users:");

    const articlesArray = formatArticles(articleData);

    const insertArticlesQuery = format(
      `INSERT INTO articles (title, body, votes, topic, author, created_at)
       VALUES %L
       RETURNING *;`,
      articlesArray
    );

    const articles = await db.query(insertArticlesQuery);

    const commentsArray = formatComments(commentData, articles.rows);

    const insertCommentsQuery = format(
      `INSERT INTO comments (author, article_id, votes, created_at, body)
       VALUES %L
       RETURNING *;`,
      commentsArray
    );

    const comments = await db.query(insertCommentsQuery);
    console.log("Inserted Comments");
  } catch (err) {
    console.error("Error creating tables:", err);
  }
};

function formatTopics(topicData) {
  return topicData.map((topic) => {
    const {slug, description, img_url} = topic;
    return [slug, description, img_url];
  });
}

function formatUsers(userData) {
  return userData.map((user) => {
    const {username, name, avatar_url} = user;
    return [username, name, avatar_url];
  });
}

function formatArticles(articleData) {
  return articleData.map((article) => {
    const {title, body, votes, topic, author, created_at} =
      convertTimestampToDate(article);
    return [title, body, votes || 0, topic, author, created_at];
  });
}

function formatComments(commentData, insertedArticlesData) {
  const articleRef = insertedArticlesData.reduce((acc, article) => {
    acc[article.title] = article.article_id;
    return acc;
  }, {});

  return commentData.map((comment) => {
    const {author, article_title, votes, created_at, body} =
      convertTimestampToDate(comment);
    return [author, articleRef[article_title], votes || 0, created_at, body];
  });
}

module.exports = seed;

