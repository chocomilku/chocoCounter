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

        //playing states
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
          $c3.classList.remove('hide')
          $c3.classList.add('change')
          $c3.classList.remove('change')
          }

          if ($c4 != stats.memoryAR) {
          $c4.innerText = stats.memoryAR
          $c4.classList.remove('hide')
          $c4.classList.add('change')
          $c4.classList.remove('change')
          }

          if ($c5 != stats.memoryHP) {
            $c5.innerText = stats.memoryHP
            $c5.classList.remove('hide')
            $c5.classList.add('change')
            $c5.classList.remove('change')
          }

          if ($c6 != stats.memoryOD) {
            $c6.innerText = stats.memoryOD
            $c6.classList.remove('hide')
            $c6.classList.add('change')
            $c6.classList.remove('change')
          }

          if (star != stats.fullSR) {
            star.innerText = stats.fullSR + "*"
            star.classList.remove('hide')
            star.classList.add('change')
            star.classList.remove('change')
          }

      }
    } catch (err) { console.log(err); };
};