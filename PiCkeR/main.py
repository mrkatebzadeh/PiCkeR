#!/usr/bin/env python3
from flask import Flask, request, send_from_directory, request, jsonify
from flask_cors import CORS, cross_origin
import PiCkeR.model as model
from flask import Flask, redirect, render_template, session, url_for


papers = model.load_papers()
topics = model.load_topics()
pcs = model.load_pcs(topics)

app = Flask(__name__, static_folder='client/build', static_url_path='')
cors = CORS(app)

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=False, port=os.environ.get('PORT', 5001))

@app.route('/papers')
@cross_origin()
def getpapers():
    global papers
    if len(papers) == 0:
        papers = model.load_papers()
    return {'papers': papers}


@app.route('/topics')
@cross_origin()
def gettopics():
    global topics
    if len(topics) == 0:
        topics = model.load_topics()
    return {'topics': topics}


@app.route('/pclists', methods=['POST'])
@cross_origin()
def getpclists():
    content = request.json
    print(content)
    topic = content['topic']
    shuffle = content['shuffle']
    index = content['index']
    weight = content['weight']
    combined = content['combined']
    res = ""
    if not combined:
        exp1 = model.get_pcs_exp(pcs, topic, 1, shuffled=shuffle)
        exp2 = model.get_pcs_exp(pcs, topic, 2, shuffled=shuffle)
        res = jsonify({'1': exp1, '2': exp2, 'index': index, 'weight': weight})
    else:
        combined = model.get_pcs_comb(pcs, topic, weight, shuffled=shuffle)
        res = jsonify({'pclist': combined})
    return res


@app.route('/')
def serve():
    global topics, pcs
    if len(topics) == 0:
        topics = model.load_topics()
    if len(pcs) == 0:
        pcs = model.load_pcs(topics)
    return send_from_directory(app.static_folder, 'index.html')
