from bs4 import BeautifulSoup
from gensim import corpora
from gensim.models import ldamodel
from nltk.stem.porter import PorterStemmer
from nltk.tokenize import RegexpTokenizer
from requests import get
from stop_words import get_stop_words


def clean_and_tokenize_text(text, tokenizer, stemmer, stop_words):
    raw = text.lower()
    tokens = tokenizer.tokenize(raw)
    stemmed = [stemmer.stem(t) for t in tokens]
    cleaned = [t for t in stemmed if t not in stop_words]
    return cleaned


def parse_html_pages(urls, tokenizer, stemmer, stop_words):
    page_contents = []
    for url in urls:
        response = get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        text = soup.body.text
        tokens = clean_and_tokenize_text(text, tokenizer, stemmer, stop_words)
        page_contents.append(tokens)
    return page_contents


def cluster_tabs(k, urls):
    stop_words = get_stop_words('english')
    tokenizer = RegexpTokenizer(r'\w+')
    porter_stemmer = PorterStemmer()

    texts = parse_html_pages(urls, tokenizer, porter_stemmer, stop_words)
    dictionary = corpora.Dictionary(texts)
    corpus = [dictionary.doc2bow(text) for text in texts]
    lda = ldamodel.LdaModel(corpus, num_topics=k, id2word=dictionary, passes=20)

    results = [lda[dictionary.doc2bow(text)] for text in texts]
    labels = [max(result, key=lambda tup: tup[1])[0] for result in results]
    return labels
