#!/bin/sh

app="PiCkeR"
export FLASK_APP=$app
export FLASK_ENV=development

python3 -m flask run --host=0.0.0.0 --port=5001