from flask import Flask, jsonify
from flask_cors import CORS
import hatchet_api
import sqlite3
app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def get_data():
    data = {'key': 'pie'}
    return jsonify(data)

@app.route('/api', methods=['GET'])
def data():
    data = {'articles' : hatchet_api.get_recent_articles()}
    return jsonify(data)

@app.route('/article/<id_tag>')
def display_article(id_tag):
    print(id_tag)
    conn = sqlite3.connect("articles.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT article_link FROM articles WHERE id = (?)", [id_tag])
    article = cursor.fetchone()
    print(article['article_link'])
    link = article['article_link']
    title = hatchet_api.get_title(link)
    print(title)
    authors = hatchet_api.get_author(link)
    date = hatchet_api.get_date(link)
    front_img = hatchet_api.get_front_image(link)
    story = hatchet_api.get_article(link)
    data = {"title": title, 'authors': authors, 'date': date, "front_img" : front_img, 'story' : story}
    return jsonify(data)

app.run(host='0.0.0.0', debug=True)