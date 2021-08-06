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

          let selector = [0, 1, 2, 3, 12, 13, 14, 15, 16, 17, 18,]
          for (let i = 0; i < all.length; i++) {
            document.getElementById(all[i]).classList.add('hide')
            setTimeout(function(){document.getElementById(all[i]).classList.remove('hide')}, 500)
          }
          for (let n = 0; n < selector.length; n++) {
            setTimeout(function(){
              document.getElementById(all[selector[n]]).style.display = "none";
            }, 250)
          }



        }


    } catch (err) { console.log(err); };
};