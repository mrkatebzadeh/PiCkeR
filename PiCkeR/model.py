#%% import some libraries that are needed

import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)
import pandas as pd
import json
import random
from collections import defaultdict
import math


topics_filename = 'topics.txt'
pc_info_filename = 'pcinfo.csv'
data_filename = 'data.json'

noTopic = '--No topic is selected--'
#%% PC member
class PCMember:
    def __init__(self, id, name, email, tag, topics) -> None:
        self.id = id
        self.name = name
        self.email = email
        self.tag = tag
        self.topics = {}
        self.topics[noTopic] = 0
        for t in topics:
            if topics[t] == noTopic or topics[t] != topics[t] or topics[t] == []:
                self.topics[t] = 0
                continue
            self.topics[t] = max(0, int(topics[t]))

    def get_score(self, topics, weights) -> int:
        if len(topics) != len(weights):
            raise ValueError('len(topics) != len(weights): {} != {}'.format(len(topics), len(weights)))
        score = 0 
        for id, t in enumerate(topics):
            if t == '' or t == noTopic: continue
            if self.topics[t] != self.topics[t]: continue
            if self.topics[t] < 1:
                continue
            score += self.topics[t] * weights[id]
        return score

    def __str__(self) -> str:
        return "{}, {}, {}, {}".format(self.id, self.name, self.tag, self.topics)        
#%% Paper
class Paper:
    def __init__(self, id, title, abstract, topics, authors):
      self.id = id
      self.title = title  
      self.abstract = abstract  
      self.topics = topics
      self.authors = authors
    def __str__(self) -> str:
        return "{}, {} | {}, {}, {}".format(self.id, self.title, self.topics )  
#%% load topics
# Input  filename
def load_topics(filename='PiCkeR/static/input/' + topics_filename):
    topics = {noTopic: []}
    with open(filename, 'r') as f:
        for line in f.readlines():
            topics[line.strip()] = []
    return topics

#%% fill topics with pc members
# Input CSV filename
# Input topics

def fill_topics(topics, filename='PiCkeR/static/input/' + pc_info_filename):
    topics_list = ["{}".format(x) for x in topics if x != noTopic]
    pcinfo = pd.read_csv(filename, header=[0], delimiter=',')
    # Make sure the column list matches the pcinfo.csv file. Modify the following lists if needed.
    if 'disabled' in pcinfo.columns:
        pcinfo.columns = ['first','last','email','affiliation','country', 'disabled', 'roles','tags','collaborators','follow'] + topics_list
    else:
        pcinfo.columns = ['first','last','email','affiliation','country','roles','tags','collaborators','follow'] + topics_list

    pcinfo = pcinfo.filter(topics_list)
    pcinfo['index'] = pcinfo.index
    

    for topic in topics:
        if topic == noTopic: continue
        topics[topic] = pcinfo.loc[pcinfo[topic] > 0].filter(["index", topic]).sort_values(by=topic, ascending=False).to_numpy().tolist()
    return topics
#%% store topics in json file
# Input topics
# Input output filename
def dump_topics(topics, output):
    with open(output, "w") as outfile:
        json.dump(topics, outfile, indent=4)
#%%  fill PC members
def load_pcs(topics, filename='PiCkeR/static/input/' + pc_info_filename):
    topics_list = ["{}".format(x) for x in topics if x != noTopic]
    pcinfo = pd.read_csv(filename, header=[0], delimiter=',')
    # Make sure the column list matches the pcinfo.csv file. Modify the following lists if needed.
    if 'disabled' in pcinfo.columns:
        pcinfo.columns = ['first','last','email','affiliation','country', 'disabled', 'roles','tags','collaborators','follow'] + topics_list
    else:
        pcinfo.columns = ['first','last','email','affiliation','country','roles','tags','collaborators','follow'] + topics_list
    pcs = []
    for index, row in pcinfo.iterrows():
        new_topics = topics.copy()
        for topic in new_topics:
            if topic == noTopic: continue
            new_topics[topic] = row[topic]
        # Modify to match the defined tags
        if row['tags'] != 'tpc' and row['tags'] != 'erc' and row['tags'] != 'BUSH' and math.isnan(float(row['tags'])):
            row['tags'] = ''
        pcs += [PCMember(index, row['first'] + ' ' +row['last'], row['email'], row['tags'], new_topics)]
    return pcs
#%%  fill Papers
def load_papers(filename='PiCkeR/static/input/' + data_filename):
    with open(filename, 'r') as f:
        data = json.load(f)
    papers = {}
    for paper in data:
        pid = paper['pid']
        title = paper['title']
        abstract = paper['abstract']
        authors = paper['authors']
        topics = []
        if 'best_matching_topic' in paper:
            topics += [paper['best_matching_topic'].strip()]
        else:
            topics += [noTopic]
        if 'second_best_matching_topic' in paper:
            topics += [paper['second_best_matching_topic'].strip()]
        else:
            topics += [noTopic]
        if 'third_best_matching_topic' in paper:
            topics += [paper['third_best_matching_topic'].strip()]
        else:
            topics += [noTopic]
        papers[str(pid)] = Paper(str(pid), title, abstract, topics, authors).__dict__
    return papers
# %%
def get_pcs_comb_helper(pcs, topic_list, weight_list):
    res = [[pc.__dict__, int(pc.get_score(topic_list, weight_list)), [pc.topics[t] for t in topic_list]] for pc in pcs if pc.get_score(topic_list, weight_list) > 0]
    res.sort(key=lambda pc: -pc[1])
    return res

# %%
def get_pcs_exp_helper(pcs, topic, exp):
    res = []
    for pc in pcs:
        if pc.get_score([topic], [1]) == exp:
            res += [pc.__dict__]
    return res
# %%
def get_pcs_exp(pcs, topic, exp, shuffled=False):
    res = get_pcs_exp_helper(pcs, topic, exp)
    if not shuffled:
        return res
    random.shuffle(res)
    return res
# %%
def get_pcs_comb(pcs, topic_list, weight_list, shuffled=False):
    res = get_pcs_comb_helper(pcs, topic_list, weight_list)
    if not shuffled:
        return res
    d = defaultdict(list)
    for entry in res:
        pc, score, exps = entry
        d[score].append(entry)
    new_res = []
    for i in d:
        ll = d[i]
        random.shuffle(ll)
        new_res += ll
    return new_res



# %%
