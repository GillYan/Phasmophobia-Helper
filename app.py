#!/usr/local/bin/python

from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_url_path='')
#app.debug = True

#set ghost type evidences
spirit = ["Spirit Box", "Fingerprints", "Ghost Writing"]
wraith = ["Spirit Box", "Fingerprints", "Freezing Temperatures"]
phantom = ["EMF5", "Ghost Orb", "Freezing Temperatures"]
poltergeist = ["Spirit Box", "Fingerprints", "Ghost Orb"]
banshee = ["EMF5", "Fingerprints", "Freezing Temperatures"]
jinn = ["EMF5", "Spirit Box", "Ghost Orb"]
mare = ["Spirit Box", "Ghost Orb", "Freezing Temperatures"]
revenant = ["EMF5", "Fingerprints", "Ghost Writing"]
shade = ["EMF5", "Ghost Orb", "Ghost Writing"]
demon = ["Spirit Box", "Ghost Writing", "Freezing Temperatures"]
yurei = ["Ghost Orb", "Ghost Writing", "Freezing Temperatures"]
oni = ["EMF5", "Spirit Box", "Ghost Writing"]

typeString = "Spirit, Wraith, Phantom, Poltergeist, Banshee, Jinn, Mare, Revenant, Shade, Demon, Yurei, Oni"
typeList = [spirit, wraith, phantom, poltergeist, banshee, jinn, mare, revenant, shade, demon, yurei, oni]
typeDict = {
        0: "Spirit",
        1: "Wraith",
        2: "Phantom",
        3: "Poltergeist",
        4: "Banshee",
        5: "Jinn",
        6: "Mare",
        7: "Revenant",
        8: "Shade",
        9: "Demon",
        10: "Yurei",
        11: "Oni"
}

def getPossibilities(evidence):
    num = len(evidence)
    s = set(evidence)
    can = ""
    cant = ""
    
    #go through all ghost types by index
    for i in range(len(typeList)):
        #check the difference in evidences between the given evidence and the ghost type
        #check variable becomes a list of evidences for the given ghost type that are not part
        #of the given evidence list
        check = [x for x in typeList[i] if x not in s]
        
        #check which ghosts satisfy all evidences in the provided evidence list
        if len(check) <= 3 - num:
            can += typeDict.get(i, "err")
            can += " ("
            can += ", ".join(check)
            can += "), "
        else:
            cant += typeDict.get(i, "err")
            cant += ", "

    #strip trailing commas
    if can and num == 3:
        can = can[:-5]
    elif can:
        can = can[:-2]
    if cant:
        cant = cant[:-2]
    return can, cant

@app.route('/')
def index(name=None):

    return render_template('index.html', name=name)

@app.route('/process', methods = ["POST"])
def getTypes(name=None):
    if request.method == "POST":
        #intialize possible and not possible ghost types string
        can = ""
        cant = ""

        #get the selected evidences in a list
        evidence = request.json
        size = len(evidence)
        #check if there is 3 or less evidences
        if size > 3:
            cant += typeString
        elif size == 0:
            can += typeString
        #valid number of evidences, start checking
        else:
            can, cant = getPossibilities(evidence)

        #if no possibilities, set string to None
        if not can:
            can = "None"
        if not cant:
            cant = "None"

        #return as JSON with keys possible and impossible
        return jsonify(possible = can, impossible = cant)

