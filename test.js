class personne {
  constructor(name) {
    this.name = name;
    this.free = true;
    this.blackList = [];
  }
  addBlackList(tab) {
    tab.forEach((element) => this.blackList.push(element));
  }
}

function findMaxBlackList(tab) {
  let max = 0;
  let index = 0;
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].blackList.length > max) {
      max = tab[i].blackList.length;
      index = i;
    }
  }
  return index;
}

function isInTab(tab, name) {
  let result = false;
  tab.forEach((element) => {
    if (element.name == name) {
      result = true;
    }
  });
  return result;
}

function copyTab(tab) {
  let result = [];
  for (let i = 0; i < tab.length; i++) {
    result[i] = tab[i];
  }
  return result;
}

function createMatch(participants) {
  var match = [];
  var donner = [];
  var partAux = copyTab(participants);
  let error = false;
  for (let i = 0; i < participants.length; i++) {
    let index = findMaxBlackList(partAux);
    /*console.log(
      "le plus restrictif : " +
        participants[index].name +
        "  | index : " +
        index
    );*/
    let run = true;
    let count = 0;
    let indexMatch = Math.floor(Math.random() * participants.length);
    //console.log("index match : " + indexMatch);
    while (run) {
      if (
        partAux[index].name != participants[indexMatch].name &&
        participants[indexMatch].free &&
        !isInTab(partAux[index].blackList, participants[indexMatch].name)
      ) {
        run = false;
        participants[indexMatch].free = false;
        match.push(participants[indexMatch]);
        donner.push(partAux[index]);
        partAux.splice(index, 1);
      } else {
        if (indexMatch + 1 >= participants.length) {
          indexMatch = 0;
        } else {
          indexMatch++;
        }
        //console.log(" évolution de indexMatch : " + indexMatch);
      }
      count++;
      if (count > participants.length) {
        error = true;
        break;
      }
    }
  }
  let result = {
    donneur: donner,
    receveur: match,
    error: error,
  };
  return result;
}

var participants = [
  new personne("romain"),
  new personne("alexandre"),
  new personne("thomas"),
  new personne("william"),
  new personne("manon"),
];

participants[0].addBlackList([
  participants[1],
  participants[2],
  participants[3],
]); // blacklist : alexandre et thomas
participants[4].addBlackList([participants[3]]); // blacklist : wiliam
participants[1].addBlackList([
  participants[0],
  participants[1],
  participants[2],
  participants[3],
]); // manon
console.log(createMatch(participants));
