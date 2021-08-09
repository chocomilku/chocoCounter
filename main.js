// websocket
let socket = new ReconnectingWebSocket("ws://127.0.0.1:24050/ws");

socket.onopen = () => console.log("Successfully Connected");

socket.onclose = event => {
  console.log("Socket Closed Connection: ", event);
  socket.send("Client Closed!");
};

socket.onerror = error => console.log("Socket Error: ", error); 


// variables
let $title = document.getElementById('title')
let grade = document.getElementById('grade')
let star = document.getElementById('star')
let bg = document.getElementById('bg')
let playing = false
let mode;
let selector;
let selector2; // showing selector for halfTop
let selector3; // showing selector for halfBottom
let all = ["c1", "_c1", "c2", "_c2", "c3", "_c3", "c4", "_c4", "c5", "_c5","c6", "_c6", "c7", "_c7", "c8", "_c8", "c9", "_c9", "grade", "star"]

let artist;
let title;
let diff;
let mapper
let mods;

let tempImg;
let tempTitle;

/* 
c1 = max combo
c2 = combo
c3 = max judge
c4 = 300 judge
c5 = 200 judge
c6 = 100 judge
c7 = 50 judge
c8 = 0 judge
c9 = accuracy

$ for upper text
_ for lower text
*/
let $c1 = document.getElementById('c1')
let $c2 = document.getElementById('c2')
let $c3 = document.getElementById('c3')
let $c4 = document.getElementById('c4')
let $c5 = document.getElementById('c5')
let $c6 = document.getElementById('c6')
let $c7 = document.getElementById('c7')
let $c8 = document.getElementById('c8')
let $c9 = document.getElementById('c9')

let _c1 = document.getElementById('_c1')
let _c2 = document.getElementById('_c2')
let _c3 = document.getElementById('_c3')
let _c4 = document.getElementById('_c4')
let _c5 = document.getElementById('_c5')
let _c6 = document.getElementById('_c6')
let _c7 = document.getElementById('_c7')
let _c8 = document.getElementById('_c8')
let _c9 = document.getElementById('_c9')

let pp = new CountUp('pp', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: ".", suffix: "pp" })
let acc = new CountUp('c9', 0, 0, 2, .5, { useEasing: true, useGrouping: true, separator: "", decimal: ".", suffix: "%" })
let combo = new CountUp('c2', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: ".", suffix: "x" })
let maxCombo = new CountUp('c1', 0, 0, 0, .5, { useEasing: true, useGrouping: true, separator: "", decimal: ".", suffix: "x" })
// dom

socket.onmessage = event => {
    try { 
        let data = JSON.parse(event.data), menu = data.menu, play = data.gameplay, hits = play.hits, meta = menu.bm.metadata, stats = menu.bm.stats

        if (menu.state === 2 || menu.state === 7 || menu.state === 14) {
            playing = true
        } else {
            playing = false
        }

        if (mode != menu.gameMode) {
          mode = menu.gameMode
        }

        //bg
        if (tempImg !== data.menu.bm.path.full) {
            tempImg = data.menu.bm.path.full;
            let img = data.menu.bm.path.full.replace(/#/g, "%23").replace(/%/g, "%25");
            bg.setAttribute(
              "src",
              `http://127.0.0.1:24050/Songs/${img}?a=${Math.random(10000)}`
            );
          }
          //title bar (.top)
          if (artist != meta.artist) {
            artist = meta.artist
          }

          if (title != meta.title) {
            title = meta.title
          }

          if (diff != meta.difficulty) {
            diff = meta.difficulty
          }

          if (mapper != meta.mapper) {
            mapper = meta.mapper
          }

          if (mods != menu.mods.str){
            mods = "+" + menu.mods.str
            if (mods == "+NM") {
                mods = ""
            }
          }

        if (tempTitle != $title) {
            tempTitle = `${artist} - ${title} [${diff}] (${mapper}) ${mods}`
            $title.innerText = tempTitle
            textFit(document.getElementById('title'), {alignHoriz: true, minFontSize: 16, maxFontSize: 50})
        }

        //state if playing
        if (playing == false) {

          if (pp != menu.pp['100']) {
            pp.update(menu.pp['100'])
          }

          if (mode === 0 || mode === 2) {
            _c3.innerText = "CS"
            _c4.innerText = "AR"
            _c5.innerText = "HP"
            _c6.innerText = "OD"
            _c3.style.fontSize = "25px"
            _c4.style.fontSize = "25px"
            _c5.style.fontSize = "25px"
            _c6.style.fontSize = "25px"
            $c3.style.fontSize = "30px"
            $c4.style.fontSize = "30px"
            $c5.style.fontSize = "30px"
            $c6.style.fontSize = "30px"
            $c3.style.width = "100px"
            $c4.style.width = "100px"
            $c5.style.width = "100px"
            $c6.style.width = "100px"
            _c3.style.width = "100px"
            _c4.style.width = "100px"
            _c5.style.width = "100px"
            _c6.style.width = "100px"
            selector = [0, 1, 2, 3, 12, 13, 14, 15, 16, 17, 18,]
          }
           if (mode === 3) {
            _c3.innerText = "Keys"
            _c4.innerText = ""
            _c5.innerText = "HP"
            _c6.innerText = "OD"
            _c3.style.fontSize = "25px"
            _c5.style.fontSize = "25px"
            _c6.style.fontSize = "25px"
            $c3.style.fontSize = "30px"
            $c5.style.fontSize = "30px"
            $c6.style.fontSize = "30px"
            $c3.style.width = "100px"
            $c5.style.width = "100px"
            $c6.style.width = "100px"
            _c3.style.width = "100px"
            _c5.style.width = "100px"
            _c6.style.width = "100px"
            selector = [0, 1, 2, 3, 6, 7, 12, 13, 14, 15, 16, 17, 18,]
          }
           if (mode === 1) {
            _c3.innerText = ""
            _c4.innerText = ""
            _c5.innerText = "HP"
            _c6.innerText = "OD"
            _c5.style.fontSize = "25px"
            _c6.style.fontSize = "25px"
            $c5.style.fontSize = "30px"
            $c6.style.fontSize = "30px"
            $c5.style.width = "100px"
            $c6.style.width = "100px"
            _c5.style.width = "100px"
            _c6.style.width = "100px"
            selector = [0, 1, 2, 3, 4, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18,]
          } 

          for (let n = 0; n < selector.length; n++) {
            document.getElementById(all[selector[n]]).style.width = "0px"
            document.getElementById(all[selector[n]]).style.fontSize = "0px"
          }

          if ($c3 != stats.memoryCS) {
            $c3.innerText = stats.memoryCS
            $c3.classList.remove('change')
            $c3.classList.add('change')
          }

          if ($c4 != stats.memoryAR) {
            $c4.innerText = stats.memoryAR
            $c4.classList.remove('change')
            $c4.classList.add('change')
          }

          if ($c5 != stats.memoryHP) {
            $c5.innerText = stats.memoryHP
            $c5.classList.remove('change')
            $c5.classList.add('change')
          }

          if ($c6 != stats.memoryOD) {
            $c6.innerText = stats.memoryOD
            $c6.classList.remove('change')
            $c6.classList.add('change')
          }

          if (star != stats.fullSR) {
            star.innerText = stats.fullSR + "*"
            star.classList.remove('change')
            star.classList.add('change')
          }
        }

        // state if playing

        if (playing == true) {

          let tempCombo;
          let tempMaxCombo;

          _c9.style.width = "115px"
          $c9.style.width = "115px"
          $c2.style.width = "115px"
          _c2.style.width = "115px"
          _c9.style.fontSize = "25px"
          $c9.style.fontSize = "30px"
          $c2.style.fontSize = "30px"
          _c2.style.fontSize = "25px"


          if (mode === 0) {
            selector = [7, 11, 13, 15,]
            selector2 = [6, 10, 12, 14,]
            selector3 = [4, 5, 8, 9]
            _c4.innerText = "300"
            _c6.innerText = "100"
            _c7.innerText = "50"
            _c8.innerText = "0"
          }

          if (mode === 1) {
            selector = [7, 11, 15,] //show halfBottom
            selector2 = [6, 10, 14,] // show halfTop
            selector3 = [4, 5, 8, 9, 12, 13,] // hide
            _c4.innerText = "300"
            _c6.innerText = "100"
            _c8.innerText = "0"
          }

          if (mode === 2) {
            selector = [7, 11, 13, 15,]
            selector2 = [6, 10, 12, 14,]
            selector3 = [4, 5, 8, 9]
            _c4.innerText = "FRUITS"
            _c6.innerText = "TICKS"
            _c7.innerText = "DRPMSS"
            _c8.innerText = "MISS"
          }

          if (mode === 3) {
            selector = [5, 7, 9, 11, 13, 15,] //show halfBottom
            selector2 = [4, 6, 8, 10, 12,14,] // show halfTop
            selector3 = [] // hide
            _c3.innerText = "320"
            _c4.innerText = "300"
            _c5.innerText = "200"
            _c6.innerText = "100"
            _c7.innerText = "50"
            _c8.innerText = "0"
          }

          /* "c1", "_c1", "c2", "_c2", "c3", "_c3", "c4", "_c4", "c5", "_c5","c6", "_c6", "c7", "_c7", "c8", "_c8", "c9", "_c9", "grade", "star"*/

          for (let x = 0; x < selector.length; x++) {
            document.getElementById(all[selector[x]]).style.width = "100px"
            document.getElementById(all[selector[x]]).style.fontSize = "25px"
          }

          for (let a = 0; a < selector2.length; a++) {
            document.getElementById(all[selector2[a]]).style.width = "100px"
            document.getElementById(all[selector2[a]]).style.fontSize = "30px"
          }

          for (let b = 0; b < selector3.length; b++) {
            document.getElementById(all[selector3[b]]).style.width = "0px"
            document.getElementById(all[selector3[b]]).style.fontSize = "0px"
          }

          if (pp != play.pp.current) {
            pp.update(play.pp.current)
          }

          if (tempCombo != play.combo.current) {
            tempCombo = play.combo.current
          }

          if (tempMaxCombo != play.combo.max) {
            tempMaxCombo = play.combo.max
          }

          if (tempMaxCombo != tempCombo) {
            setTimeout(function(){
            $c1.style.width = "165px"
            $c1.style.fontSize = "30px"
            _c1.style.width = "165px"
            _c1.style.fontSize = "25px"
            }, 300)
            
            } else {
            $c1.style.width = "0px"
            $c1.style.fontSize = "0px"
            _c1.style.width = "0px"
            _c1.style.fontSize = "0px"
            }

          if (combo != play.combo.current) {
            combo.update(play.combo.current)
          }

          if (maxCombo != play.combo.max) {
            maxCombo.update(play.combo.max)
          }

          if (acc != play.accuracy) {
            acc.update(play.accuracy)
          }

          if ($c3 != hits.geki) {
            $c3.innerText = hits.geki
          }

          if (mode === 3 || mode === 2) {
            if ($c4 != hits[300]) {
              $c4.innerText = hits[300]
            } 
          } else {
            if ($c4 != hits[300] + hits.geki) {
              $c4.innerText = hits[300] + hits.geki
            }
          }
          
          if ($c5 != hits.katu) {
            $c5.innerText = hits.katu
          }

          if (mode === 3 || mode === 2) {
            if ($c6 != hits[100]) {
              $c6.innerText = hits[100]
            } 
          } else {
            if ($c6 != hits[100] + hits.katu) {
              $c6.innerText = hits[100] + hits.katu
            }
          }

          if (mode === 2) {
            if ($c7 != hits.katu) {
              $c7.innerText = hits.katu
            }
          } else {
            if ($c7 != hits[50]) {
              $c7.innerText = hits[50]
            }
          }

          if ($c8 != hits[0]) {
            $c8.innerText = hits[0]
          }


        }
    } catch (err) { console.log(err); };
};