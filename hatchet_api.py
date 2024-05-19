import requests
from bs4 import BeautifulSoup
import sqlite3
import re

def get_author(url):
    response = requests.get(url)
    html_code = response.text
    soup = BeautifulSoup(html_code, 'html.parser')
    author_names = soup.find_all("span", class_="byline-name")
    cleaned_authors = []
    for author in author_names:
        clean = re.sub(r'<[^>]+>', '', str(author))
        clean = clean.replace("By ", "")
        clean = clean.replace("and ", "")
        cleaned_authors.append(clean)
    parsed_names = []
    for name in author_names:
        name =name.text
        parsed_names.append(name)

    return parsed_names

def get_title(url):
    response = requests.get(url)
    html_code = response.text
    soup = BeautifulSoup(html_code, 'html.parser')
    title = soup.find("h1", class_="sno-story-headline")
    clean = title.get_text(strip=True)
    return clean

def get_date(url):
    response = requests.get(url)
    html_code = response.text
    soup = BeautifulSoup(html_code, 'html.parser')
    date = soup.find("div", class_="sno-story-date")
    clean = re.sub(r'<[^>]+>', '', str(date))
    return clean

def get_front_image(url):
    response = requests.get(url)
    html_code = response.text
    soup = BeautifulSoup(html_code, 'html.parser')
    img_link = soup.find("img", class_="catboxphoto feature-image")
    src = img_link['src']
    return src

def get_article(url):
    response = requests.get(url)
    html_code = response.text
    soup = BeautifulSoup(html_code, 'html.parser')
    story = soup.find("div", id = "sno-story-body-content")
    story = story.get_text()
    story = story.split("\n")
   
    story =  [paragraph for paragraph in story if paragraph != '']
   
    return story
   
def get_recent_articles():
    conn = sqlite3.connect("articles.db")
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM articles ORDER BY id LIMIT 15")
    articles = cursor.fetchall()
    articles_info =[]
    for article in articles:
        title = get_title(article['article_link'])
        img = get_front_image(article['article_link'])
        author = get_author(article['article_link'])
        data = {'title' : title, 'img' : img, 'author' : author, 'id' : article['id']}
        articles_info.append(data)
    return articles_info
   
get_recent_articles()
