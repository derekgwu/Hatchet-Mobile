import sqlite3

conn = sqlite3.connect("articles.db")
cursor = conn.cursor()

cursor.execute("""
    CREATE TABLE articles (
    id int AUTO_INCREMENT primary key,
    article_link varchar(256)
);

""")

