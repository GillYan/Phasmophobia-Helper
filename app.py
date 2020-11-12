#!/usr/local/bin/python

from flask import Flask, render_template, request, redirect, url_for, session

import requests
import random
import json

app = Flask(__name__, static_url_path='')
app.secret_key = "MRPOPO88RISING"
#app.debug = True

@app.route('/')
def index(name=None):

	return render_template('index.html', name=name)