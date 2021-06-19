
    window.onload = function () {

        window.onorientationchange = function () {
            var orientation = window.orientation;
            switch (orientation) {
                case 0:
                case 90:
                case -90: window.location.reload();
                    break;
            }
        };

        // document.addEventListener("orientationchange", function (event) {
        //     switch (window.orientation) {
        //         case -90: case 90:
        //             console.log('aw');
        //             alert('aw');
        //             /* Device is in landscape mode */
        //             break;
        //         default:
        //             alert('waw');
        //         /* Device is in portrait mode */
        //     }
        // });

        "use strict";

        function _s(x) {
            return document.getElementById(x);
        }

        // var vw = window.innerWidth || 360;
        // var vh = window.innerHeight || 560;

        var vw = window.innerWidth || 360;
        var vh = window.innerHeight || 560;

        // var w = (vw > 400) ? 400 : vw;
        // var h = (vh > 700) ? 700 : vh;

        if (vw == 731) {
            vw = vw + 100;
        }

        if (vw == 823) {
            vw = vw + 170;
        }

        var w = (vw > 400) ? 400 : vw;
        var h = (vh > 700) ? 700 : vh;

        var ll = (vw - w) / 2;
        var ltp = (vh - h) / 2;

        // var ll = "100%";
        // var ltp = "100%";

        _s("container").style.backgroundImage = "url(https://bdsports.000webhostapp.com/wsnd/9.jpg)";

        var nextBtn = _s("nextBtn");
        var completeDiv = _s("over");
        var levelDiv = _s("levelDiv");

        var myDomain = "https://bdsports.000webhostapp.com/";
        var canPlay = false;
        var sounds = {
            "levelComplete": new Audio(),
            "levelStart": new Audio(),
            "right": new Audio(),
            "wrong": new Audio(),
            "select": new Audio(),
            "shuffle": new Audio(),
            "extraWord": new Audio()
        }

        sounds.levelComplete.src = myDomain + "wsnd/level_complete.mp3";
        sounds.levelStart.src = myDomain + "wsnd/level_start.mp3";
        sounds.right.src = myDomain + "wsnd/right.mp3";
        sounds.wrong.src = myDomain + "wsnd/wrong.mp3";
        sounds.select.src = myDomain + "wsnd/select.mp3";
        sounds.shuffle.src = myDomain + "wsnd/shuffle.ogg";
        sounds.extraWord.src = myDomain + "wsnd/extra_word.ogg";

        function startTimer(duration, display) {
            var timer = duration, minutes, seconds;
            setInterval(function () {
                minutes = parseInt(timer / 60, 10);
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;

                display.textContent = minutes + ":" + seconds;

                if (--timer < 0) {
                    timer = duration;
                }
            }, 1000);
        }

        function play(x) {
            if (canPlay) {
                try {
                    if (sounds[x].paused) {
                        sounds[x].play().catch(function (err) { });
                    }
                    else {
                        sounds[x].currentTime = 0;
                    }
                }
                catch (err) {
                    //alert(err);
                }
            }
        }

        var starCnt = _s("starCnt");
        var compl = _s("complete");
        var nextBtnCnt = _s("nextBtnCnt");

        function startPlay() {
            if (!localStorage.getItem('runOnce')) {
                localStorage.setItem('runOnce', '1');
                swal({
                    title: "ISI 'QUOTES' NYA",
                    text: "TARIK HURUF YANG BENAR DARI KUMPULAN HURUF RANDOM YANG TERSEDIA DAN ISI AREA KOSONG UNTUK MEMBENTUK KATA YANG TEPAT SESUAI QUOTES BUKAN MAIN",
                    buttons: ["SKIP", "LANJUT"],
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            swal({
                                title: "KUMPULKAN POINNYA",
                                text: "DAPATKAN 10 POIN UNTUK SETIAP QUOTES YANG LENGKAP DALAM 60 DETIK. APABILA SUDAH MENYELESAIKAN SEMUA QUOTES, PERMAINAN AKAN KEMBALI KE AWAL POIN MENJADI 20 DAN WAKTU 30 DETIK.",
                                buttons: ["SKIP", "LANJUT"],
                                dangerMode: true,
                            })
                                .then((willDelete) => {
                                    if (willDelete) {
                                        swal({
                                            title: "HADIAH",
                                            text: "DAPATKAN ITEM MENARIK YANG BISA LO DAPATKAN SETIAP MINGGUNYA SELAMA PERIODE BUKAN MAIN",
                                            buttons: ["SKIP", "LANJUT"],
                                            dangerMode: true,
                                        })
                                            .then((willDelete) => {
                                                if (willDelete) {
                                                    swal({
                                                        title: "PENGUMUMAN PEMENANG",
                                                        text: "PEMENANG SETIAP MINGGUNYA ADALAH LO YANG PUNYA POIN TERBANYAK DAN KAMI HUBUNGI",
                                                        buttons: ["SKIP", "LANJUT"],
                                                        dangerMode: true,
                                                    })
                                                        .then((willDelete) => {
                                                            if (willDelete) {
                                                                startLevel(0);

                                                            } else {
                                                                startLevel(0);

                                                            }
                                                        });
                                                } else {

                                                }
                                            });
                                    } else {
                                        startLevel(0);
                                    }
                                });
                        } else {
                            startLevel(0);
                        }
                    });

            } else {
                // console.log(localStorage.getItem('runOnce'));
                startLevel(0);
            }

            _s("st").style.display = "none";
            _s("logoBukan").style.display = "none";
            levelBtn.style.display = "inline-block";
            //lContainer.style.transform = "scale(1)";
            nextBtn.style.display = "inline-block";
            levelCnt.style.display = "none";
            starCnt.style.display = "none";
            compl.style.display = "none";
            levelBack.style.display = "none";
            nextBtnCnt.style.display = "none";
            // levelDiv.style.transform = "translateY(0)";
            canPlay = true;
            for (var x in sounds) {
                try {
                    sounds[x].play().catch(function (err) { });
                }
                catch (err) {
                    //alert(err);
                }
            }
        }

        _s("st").addEventListener("click", startPlay);

        var container = _s("container");
        container.style.height = h;
        container.style.width = w;
        container.style.left = ll + "px";
        container.style.top = ltp + "px";

        var cw = 220;
        var ch = 220;
        var ct = h / 2 + (h / 2 - ch) / 2;
        var cl = (w - cw) / 2;
        var c = _s("gameContainer");
        c.height = h;
        c.width = w;

        var ctx = c.getContext("2d");

        //ctx.fillRect(cl,ct,cw,ch);

        var shuffleBtn = _s("shuffle");
        var hintBtn = _s("hint");

        var lContainer = _s("lContainer");
        lContainer.style.height = ch + "px";
        lContainer.style.width = cw + "px";
        lContainer.style.top = ct + "px";
        lContainer.style.left = cl + "px";

        var lt = [_s("l1"), _s("l2"), _s("l3"), _s("l4"), _s("l5")];
        var previewTxt = _s("previewTxt");

        var levels = [
            [['KERE','KEREN'], , ['GIEN', 'VEIN', 'VINE', 'GEN', 'GIE', 'GIN', 'VEG', 'VIE']],
            [['ICED', 'ICEDS'], ['COVE', 'ECO', 'VIE']],
            [['ME', 'MY', 'MERRY'], ['ERR', 'RYE', 'YER']],
            [['IT', 'HIT', 'TICK', 'THICK'], ['CHIK', 'CHIT', 'HICK', 'ITCH', 'KIT', 'TIC']],
            [['HE', 'WE', 'LIE', 'WHILE'], ['WILE', 'HEW', 'HIE', 'LEI']],
            [['AM', 'AS', 'ALL', 'MALL', 'SMALL'], ['MALLS', 'ALLS', 'ALMS', 'LAMS', 'SALL', 'SLAM', 'LAM']],
            [['SEE', 'SEEN', 'SENSE'], ['ESES', 'NESS', 'SEES', 'SENE', 'SEN']],
            [['HIM', 'HIT', 'MIGHT'], ['GIT', 'TIM']],
            [['AT', 'TO', 'LOT', 'TOTAL'], ['ALTO', 'TALT', 'OAT', 'TAO', 'TAT', 'TOT']],
            [['OR', 'FOR', 'FOOL', 'ROOF', 'FLOOR'], ['OF', 'LOOF', 'ROLF', 'FRO', 'LOO', 'ROO']],
            [['AM', 'ARM', 'MAD', 'DRAMA'], ['DAMAR', 'DRAM', 'MAAR', 'AMA', 'DAM', 'MAR', 'RAD', 'RAM']],
            [['IN', 'IT', 'NUT', 'UNIT', 'UNTIL'], ['UNLIT', 'LINT', 'LITU', 'LUNT', 'LIT', 'NIL', 'TIL', 'TIN', 'TUN']],
            [['DIE', 'DIG', 'DUE', 'GUIDE'], ['DUG', 'GIE']],
            [['AGE', 'ALL', 'LEG', 'LEGAL'], ['EGAL', 'GALE', 'GALL', 'LEAL', 'ALE', 'GAL', 'GEL', 'LAG']],
            [['US', 'DUST', 'DUTY', 'STUDY'], ['DUSTY', 'STUD', 'STY', 'USD']],
            [['ALL', 'ASH', 'HALL', 'SHALL'], ['HALLS', 'ALLS', 'LASH', 'SALL', 'HAS']],
            [['IF', 'IT', 'FIT', 'HIT', 'FIFTH'], []],
            [['SEE', 'KNEE', 'SEEK', 'KNEES'], ['KEENS', 'SKEEN', 'SKENE', 'KEEN', 'SEEN', 'SENE', 'SKEE', 'EEK', 'EKE', 'SEN']],
            [['HE', 'WE', 'HER', 'HERE', 'WHERE'], ['HEWER', 'EWER', 'WEER', 'WERE', 'WHEE', 'ERE', 'EWE', 'HEW', 'REE', 'WEE']],
            [['LET', 'SET', 'YES', 'YET', 'STYLE'], ['LEST', 'LETS', 'STEY', 'STYE', 'TYES', 'LES', 'LEY', 'LYE', 'SLY', 'STY']],
            [['OK', 'LOCK', 'CLOCK'], ['COL']],
            [['HE', 'SO', 'SHE', 'SHOE', 'SHOES'], ['HOSES', 'HOES', 'HOSE', 'SHES', 'HOE']],
            [['TIE', 'QUIT', 'QUIET', 'QUITE'], []],
            [['NOW', 'OWN', 'KNOW', 'KNOWN'], ['WONK', 'NON', 'WOK', 'WON']],
            [['ALL', 'CALL', 'COAL', 'LOCAL'], ['COLA', 'OLLA', 'COL']],
            [['ACE', 'SEA', 'CASE', 'CASES'], ['ACES', 'SACS', 'SEAS', 'ASS', 'SAC', 'SEC']],
            [['ME', 'MOVE', 'MOVIE'], ['VIE']],
            [['EYE', 'EVER', 'VERY', 'EVERY'], ['VEERY', 'VEER', 'ERE', 'EVE', 'REE', 'REV', 'RYE', 'YER']],
            [['TO', 'OUT', 'TOE', 'QUOTE'], []],
            [['IN', 'BIG', 'RING', 'BRING'], ['BRIG', 'GIRN', 'GRIN', 'BIN', 'GIN', 'NIB', 'RIB', 'RIG']],
            [['CAP', 'PACE', 'PEACE'], ['CAPE', 'CEPE', 'ACE', 'APE', 'PEA', 'PEE']],
            [['IT', 'HIT', 'DIRT', 'THIRD'], ['THIR', 'DIT', 'HID', 'RID', 'TRI']],
            [['SEE', 'ELSE', 'PEEL', 'SLEEP'], ['PEELS', 'EELS', 'PEES', 'SEEP', 'EEL', 'LES', 'PEE']],
            [['AT', 'IT', 'VIA', 'TAIL', 'VITAL'], ['TALI', 'VAIL', 'VIAL', 'VITA', 'AIL', 'AIT', 'LAV', 'LIT', 'TIL', 'VAT']],
            [['COW', 'ROW', 'WORD', 'CROWD'], ['CORD', 'CROW', 'COD', 'DOW', 'ORC', 'ROC', 'ROD']],
            [['DOVE', 'MODE', 'MOVE', 'MOVED'], ['DEMO', 'DOME', 'DEV', 'DOE', 'MED', 'ODE']],
            [['AM', 'OR', 'ARM', 'ORAL', 'MORAL'], ['MOLAR', 'LOAM', 'MARL', 'MORA', 'ROAM', 'LAM', 'MAR', 'MOL', 'OAR', 'ORA', 'RAM']],
            [['DIE', 'RED', 'DIVE', 'RIDE', 'DRIVE'], ['DIVER', 'RIVED', 'DIRE', 'IRED', 'RIVE', 'VIED', 'DEV', 'IRE', 'REI', 'REV', 'RID', 'VIE']],
            [['AIR', 'CAR', 'HAIR', 'RICH', 'CHAIR'], ['ARCH', 'CHAR', 'RICA', 'ARC']],
            [['RUN', 'SUN', 'USE', 'SURE', 'NURSE'], ['SUE', 'RUNES', 'ERNS', 'RUES', 'RUNE', 'RUNS', 'RUSE', 'URNS', 'USER', 'RES', 'RUE', 'SEN', 'SER', 'SUR', 'URN']],
            [['COT', 'COST', 'COSTS'], ['SCOTS', 'COTS', 'SCOT', 'SOTS', 'TOSS']],
            [['EVE', 'EVER', 'VEER', 'SERVE'], ['SEVER', 'VEERS', 'VERSE', 'EVES', 'REVS', 'SEER', 'SERE', 'ERE', 'REE', 'RES', 'REV', 'SEE', 'SER']],
            [['SEE', 'SEW', 'SEEK', 'WEEK', 'WEEKS'], ['EWES', 'SKEE', 'SKEW', 'EEK', 'EKE', 'EWE', 'WEE']],
            [['BOT', 'BUD', 'BUT', 'OUT', 'DOUBT'], ['BOUT', 'DOT', 'DUB', 'DUO', 'OUD', 'TOD', 'TUB', 'UDO']],
            [['IN', 'GIN', 'GRIN', 'RING', 'REIGN'], ['NIGER', 'GIEN', 'GIRE', 'GIRN', 'REIN', 'GEN', 'GIE', 'IRE', 'REG', 'REI', 'RIG']],
            [['IT', 'NUT', 'TINY', 'UNIT', 'UNITY'], ['IN', 'TIN', 'TUN']],
            [['IN', 'IS', 'SIGN', 'SING', 'SIGNS'], ['SINGS', 'GINS', 'SINS', 'GIN', 'INS', 'SIN']],
            [['OLD', 'FOLD', 'FOOD', 'FOOL', 'FLOOD'], ['LOOF', 'LOO']],
            [['FOE', 'CORE', 'FORE', 'FORCE'], ['FOR', 'CERO', 'CORF', 'FROE', 'ECO', 'FER', 'FRO', 'ORC', 'ORE', 'REC', 'REF', 'ROC', 'ROE']],
            [['FAME', 'LEAF', 'MALE', 'MEAL', 'FLAME'], ['FLEAM', 'ALEF', 'ALME', 'FEAL', 'FLAM', 'FLEA', 'LAME', 'ALE', 'ELM', 'ELF', 'FEM', 'LAM', 'LEF', 'MAE']],
            [['CAN', 'INCH', 'CHAIN', 'CHINA'], ['CAIN', 'CHAN', 'CHIN', 'INCA', 'ANI', 'HIN', 'NAH']],
            [['SET', 'SHE', 'THE', 'CHEST'], ['ETCH', 'ETHS', 'HEST', 'HETS', 'SECT', 'TECH', 'ETC', 'HET', 'SEC']],


        ]
        //styling line tarik-tarik
        //koordinat
        var points = [[Math.round(ll + w / 2), Math.round(ltp + ct + cw / 8)], [Math.round(ll + cl + cw / 8), Math.round(ltp + ct + ch * 41.5 / 100)], [Math.round(ll + w - (cl + cw * 25 / 200)), Math.round(ltp + ct + ch * 41.5 / 100)], [Math.round(ll + cl + cw / 4), Math.round(ltp + ct + ch * 87.5 / 100)], [Math.round(ll + w - (cl + cw / 4)), Math.round(ltp + ct + ch * 87.5 / 100)]];
        // console.log(points);
        var linePoints = [];
        var started = true;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "black";
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        function drawLine(x, y) {
            // console.log('x :', x);
            // console.log('y :', y);
            // console.log(linePoints);
            if (linePoints[0] >= 0) {
                ctx.clearRect(0, 0, w, h);
                ctx.beginPath();
                ctx.moveTo(points[linePoints[0]][0] - ll, points[linePoints[0]][1] - ltp);
                for (var n = 1; n < linePoints.length; n++) {
                    ctx.lineTo(points[linePoints[n]][0] - ll, points[linePoints[n]][1] - ltp);
                }
                ctx.lineTo(x - ll, y - ltp);
                ctx.stroke();
                //letterTrans(lt[linePoints[linePoints.length-1]]);
            }
        }

        var temp1 = [];
        var temp2 = [];
        var tempTotalScore = 0;
        function clearLine() {
            var wordPos = levels[currentLevel][0].indexOf(currentWord);
            if (linePoints[0] >= 0) {
                if (wordPos > -1) {
                    ctx.strokeStyle = "lime";
                    previewTxt.style.background = "lime";
                    previewTxt.style.color = "#000";

                    var txt = "";
                    var wordArr = currentWord.split("");

                    for (var n = 0; n < currentWord.length; n++) {
                        txt += "<div class='wld'>" + wordArr[n] + "</div>";
                    }
                    score += 10;
                    tempTotalScore += score;

                    poin1[0].innerHTML = "<img src='koin.png' style='width:27%;margin-top:-5px;'> <font class='nilai' size='5px' color='white'>"+ tempTotalScore +"</font>";
                    totalScore += score;
                    wcnt[wordPos].innerHTML = txt;
                    score = 0;

                    if (temp1.indexOf(currentWord) < 0) {
                        temp1.push(currentWord);
                        updateCoin(10);
                        //play("right");
                        if (temp1.length >= levels[currentLevel][0].length) {
                            temp1 = [];
                            temp2 = [];
                            setTimeout(function () {
                                levelComplete(currentLevel);
                                //    startLevel(currentLevel+1);
                            }, 2000)

                            setTimeout(function () {
                                var wls = document.getElementsByClassName("wld");
                                for (var n = 0; n < wls.length; n++) {
                                    wls[n].style.transform = "translateY(" + Math.floor(100 + Math.random() * 200) + "px) rotate(" + Math.floor(Math.random() * 90 - 45) + "deg)";
                                    wls[n].style.opacity = 0;
                                    lContainer.style.transform = "scale(0) rotate(0)";
                                    levelDiv.style.transform = "translateY(-100px)";
                                    shuffleBtn.style.transform = "translateX(-100px)";
                                    hintBtn.style.transform = "translateX(100px)";
                                }
                            }, 1000);
                        }
                        setTimeout(function () {
                            play("right");
                        }, 100);
                    }
                }
                else if (levels[currentLevel][1].indexOf(currentWord) > -1) {
                    ctx.strokeStyle = "orange";
                    previewTxt.style.background = "orange";
                    previewTxt.style.color = "#fff";
                    if (temp2.indexOf(currentWord) === -1) {
                        wrong--;
                        temp2.push(currentWord);
                        bonusCoin += currentWord.length;
                        updateCoin(currentWord.length);
                        setTimeout(function () {
                            play("extraWord");
                        }, 100)
                    }
                    else {

                    }
                }
                else {
                    ctx.strokeStyle = "red";
                    previewTxt.style.background = "red";
                    previewTxt.style.color = "#fff";
                    setTimeout(function () {
                        wrong++;
                        play("wrong");
                    }, 100);
                }
                drawLine(points[linePoints[linePoints.length - 1]][0], points[linePoints[linePoints.length - 1]][1]);
                setTimeout(function () {
                    ctx.clearRect(0, 0, w, h);
                    ctx.strokeStyle = "black";
                    previewTxt.textContent = "";
                    previewTxt.style.background = "rgba(240,240,240,0.8)";
                    previewTxt.style.color = "#666";
                    previewTxt.style.display = "none";
                }, 500)
            }
        }

        c.addEventListener("touchstart", function (e) {
            e.preventDefault();
            var touchObject, tx, ty;
            if (started) {
                touchObject = e.changedTouches[0];
                tx = parseInt(touchObject.clientX) - ((vw - vh) / 2);
                ty = parseInt(touchObject.clientY) + 108;
                for (var n = 0; n < 5; n++) {
                    if (Math.sqrt(Math.pow(points[n][0] - tx, 2) + Math.pow(points[n][1] - ty, 2)) < 30) {
                        linePoints.push(n);
                        //    play("select");
                        previewTxt.textContent += lt[n].textContent;
                        previewTxt.style.display = "inline-block";
                        started = false;
                        play("select");
                    }
                }

            }
        })

        c.addEventListener("touchmove", function (e) {
            e.preventDefault();
            var touchObject, tx, ty;
            if (!started) {
                touchObject = e.changedTouches[0];
                console.log(e.changedTouches[0]);
                tx = parseInt(touchObject.clientX) - ((vw - vh) / 2);
                ty = parseInt(touchObject.clientY) + 108;
                for (var n = 0; n < 5; n++) {
                    if (Math.sqrt(Math.pow(points[n][0] - tx, 2) + Math.pow(points[n][1] - ty, 2)) < 30) {
                        if (linePoints.indexOf(n) === -1) {
                            linePoints.push(n);
                            console.log(linePoints);
                            //play("select");
                            previewTxt.textContent += lt[n].textContent;
                            play("select");
                        }
                    }
                }
                // console.log(tx, ty);
                drawLine(tx, ty);
            }
        })

        c.addEventListener("touchend", function () {
            currentWord = "";
            for (var n = 0; n < linePoints.length; n++) {
                currentWord += lt[linePoints[n]].textContent;
            }

            clearLine();
            linePoints = [];
            started = true;
        })

        //Mouse events...
        var msdn = false;
        c.addEventListener("mousedown", function (e) {

            e.preventDefault();
            msdn = true;
            var touchObject, tx, ty;
            if (started) {
                touchObject = e//.changedTouches[0];
                tx = parseInt(touchObject.clientX);
                ty = parseInt(touchObject.clientY);
                for (var n = 0; n < 5; n++) {
                    if (Math.sqrt(Math.pow(points[n][0] - tx, 2) + Math.pow(points[n][1] - ty, 2)) < 30) {
                        linePoints.push(n);
                        //play("select");
                        previewTxt.textContent += lt[n].textContent;
                        previewTxt.style.display = "inline-block";
                        started = false;
                        play("select");
                    }
                }

            }
        })

        c.addEventListener("mousemove", function (e) {
            e.preventDefault();
            var touchObject, tx, ty;
            if (!started) {
                touchObject = e//.changedTouches[0];
                tx = parseInt(touchObject.clientX);
                ty = parseInt(touchObject.clientY);
                for (var n = 0; n < 5; n++) {
                    if (Math.sqrt(Math.pow(points[n][0] - tx, 2) + Math.pow(points[n][1] - ty, 2)) < 30) {
                        if (linePoints.indexOf(n) === -1) {
                            linePoints.push(n);
                            //play("select");
                            previewTxt.textContent += lt[n].textContent;
                            play("select");
                        }
                    }
                }
                drawLine(tx, ty);
            }
        })

        c.addEventListener("mouseup", function () {
            currentWord = "";
            for (var n = 0; n < linePoints.length; n++) {
                currentWord += lt[linePoints[n]].textContent;
            }

            clearLine();
            linePoints = [];
            started = true;
            msdn = false;
        })




        //transitions
        function trn1(x, t) {
            x.style.transform = t;
        }

        function letterTrans(x) {
            trn1(x, "scale(0.8)");
            setTimeout(function () {
                trn1(x, "scale(1)");
            }, 100)
        }

        //Level

        var currentLevel = 0;
        var currentWord = "";
        var wcnt = document.getElementsByClassName("word");
        var tes1 = document.getElementsByClassName("texttesting1");
        var tes2 = document.getElementsByClassName("texttesting2");
        var timer1 = document.getElementsByClassName("timer");
        var poin1 = document.getElementsByClassName("points-wrapper");

        function startLevel(ln) {
            _s("points-wrapper").style.display = "flex";
            var canv = _s("gameContainer");
            var canv_left = (vw / 15);
            canv.style.left = "" + canv_left + "" + "%";

            tes1[0].innerHTML = "<div class='tes' style='font-size:28px;font-weight:bold'>BELUM</div>";
            tes2[0].innerHTML = "<div class='tes' style='font-size:28px;font-weight:bold'>KALO BELUM</div>";

            timer1[0].innerHTML = "01:00";
            poin1[0].innerHTML = "<img src='koin.png' style='width:27%;margin-top:-5px;'> <font class='nilai' size='5px' color='white'>0</font>";
            //timer
            var fiveMinutes = 60 * 1,
                display = document.querySelector('.timer');
            startTimer(fiveMinutes, display);
            //

            currentLevel = ln;
            ctx.fillRect(0, 0, w, h);
            completeDiv.style.display = "none";
            levelDiv.style.transform = "translateY(0px)";
            shuffleBtn.style.transform = "translateX(0)";
            hintBtn.style.transform = "translateX(0)";
            _s("levelNum").textContent = ln + 1;
            var levelContent = levels[ln][0];
            levelContent = levelContent[levelContent.length - 1].split("");
            levelContent.sort(function (x, y) { return Math.random() - 0.5 });
            for (var n = 0; n < levelContent.length; n++) {
                lt[n].textContent = levelContent[n];
                //lt[n].style.transform = "rotate("+Math.floor(Math.random()*40-20)+"deg)";
            }
            lContainer.style.transform = "scale(1) rotate(0deg)";
            for (var n = 0; n < levels[ln][0].length; n++) {
                var txt = "";
                for (var x = 0; x < levels[ln][0][n].length; x++) {
                    txt += "<div class='wl'>.</div>";
                }
                wcnt[n].innerHTML = txt;
            }

            var curvePoints = [];
            for (var n = 0; n < 20; n++) {
                if (n % 2 === 0) {
                    curvePoints.push(Math.floor(w / 2 - Math.random() * w / 10));
                }
                else {
                    curvePoints.push(Math.floor(w / 2 + Math.random() * w / 10));
                }
            }

            var dx = 0;
            var fy = h / 19;
            function drawAnim() {
                ctx.clearRect(0, 0, w, h);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                for (var n = 0; n < curvePoints.length; n++) {
                    ctx.lineTo(curvePoints[n] - dx, fy * n);
                }
                ctx.lineTo(0, h);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.moveTo(w, 0);
                for (var n = 0; n < curvePoints.length; n++) {
                    ctx.lineTo(curvePoints[n] + dx, fy * n);
                }
                ctx.lineTo(w, h);
                ctx.fill();
                ctx.closePath();
                dx += 10;
                if (dx > w / 1.5) {
                    clearInterval(intv);
                    dx = 0;
                }
            }

            var intv = setInterval(drawAnim, 20);

        }

        //startLevel(0);

        //star...
        function star(x) {
            var txt = "";
            for (var n = 0; n < 3; n++) {
                txt += (n < x) ? "<span>⭐</span>" : "<span style='visibility:hidden'>⭐</span>";
            }
            _s("star").innerHTML = txt;
        }

        //menu

        nextBtn.addEventListener("click", function () {
            if ((currentLevel + 1) < levels.length) {
                startLevel(currentLevel + 1);
                //sounds.levelStart.play().catch(function(err){alert(err)});
                play("levelStart");
            }
            else {
                startLevel(0);
                //currentLevel = 0;
            }
        })

        var wrong = 0;
        var totalCoin = 0;
        var bonusCoin = 0;
        var score = 0;
        var totalScore = 0;

        function levelComplete(x) {
            completeDiv.style.display = "block";
            tempTotalScore = 0;
            alert(totalScore);

            var starCount;
            if (wrong < 2) {
                starCount = 3;
            }
            else if (wrong < 4) {
                starCount = 2;
            }
            else {
                starCount = 1;
            }
            wrong = 0;
            // star(starCount);
            updateLevelMenu(currentLevel + 1, bonusCoin, starCount);
            bonusCoin = 0;
            play("levelComplete");
        }

        function shuffle() {
            var levelContent = levels[currentLevel][0];
            levelContent = levelContent[levelContent.length - 1].split("").sort(function (x, y) { return Math.random() - 0.5 });
            for (var n = 0; n < levelContent.length; n++) {
                lt[n].textContent = levelContent[n];
                //lt[n].style.transform = "rotate("+Math.floor(Math.random()*40-20)+"deg)";
            }
            lContainer.style.transform = "scale(0.1) rotate(720deg)";
            setTimeout(function () {
                lContainer.style.transform = "scale(1) rotate(0deg)";
            }, 500)
            play("shuffle");
        }

        shuffleBtn.addEventListener("click", shuffle);

        var levelBtn = _s("levelBtn");
        var levelCnt = _s("levelCnt");
        var levelBack = document.querySelector("#levelBack button");
        var lvb = _s("levelBack");
        lvb.style.left = "0px";
        lvb.style.bottom = (ltp + 20) + 'px';
        lvb.style.width = vw + "px";

        levelBtn.addEventListener("click", function () {
            levelCnt.style.display = "block";
            nextBtn.style.display = "inline-block"; ""
            levelCnt.style.display = "block";
            starCnt.style.display = "none";
            compl.style.display = "none";
            nextBtnCnt.style.display = "none";
        })

        levelBack.addEventListener("click", function () {
            levelCnt.style.display = "none";
            compl.style.display = "block";
            starCnt.style.display = "block";
            nextBtnCnt.style.display = "block";
        })

        function levelMenu() {
            var txt = "";
            for (var n = 0; n < levels.length; n++) {
                txt += "<button class='level'>";
                txt += "<span class='lt'>Level " + (n + 1) + "</span>";
                txt += "<span class='cn'>💰 0</span>";
                txt += "<span class='st'></span></button>";
            }
            _s("levelList").innerHTML = txt;
        }

        levelMenu();

        for (var n = 0; n < levels.length; n++) {
            document.querySelector(".level:nth-child(" + (n + 1) + ")").addEventListener("click", function () {
                startLevel(parseInt(this.textContent.slice(6)) - 1);
                levelCnt.style.display = "none";
                levelBack.style.display = "inline-block";
                nextBtnCnt.style.display = "block";
                starCnt.style.display = "block";
                compl.innerHTML = "Level Complete";
                compl.style.display = "block";
                play("levelStart");
            })
        }

        function updateLevelMenu(ln, cn, st) {
            var stars = "";
            for (var n = 0; n < st; n++) {
                stars += "⭐";
            }
            var txt = "";
            txt += "<span class='lt finish'>Level " + ln + "</span>";
            txt += "<span class='cn'>💰 " + cn + "</span>"
            txt += "<span class='st'>" + stars + "</span>"
            var elm = document.querySelector(".level:nth-child(" + ln + ")")
            elm.innerHTML = txt;
        }

        //updateLevelMenu(2,65,3);

        var coinElm = _s("coin");
        function updateCoin(x) {
            totalCoin += x;
            coinElm.innerHTML = "<span>" + totalCoin + "</span>";
        }

        function hint() {
            for (var n = 0; n < levels[currentLevel][0].length; n++) {
                if (temp1.indexOf(levels[currentLevel][0][n]) === -1 && totalCoin >= 20) {
                    currentWord = levels[currentLevel][0][n];
                    var wordPos = levels[currentLevel][0].indexOf(currentWord);
                    var txt = "";
                    var wordArr = currentWord.split("");
                    
                    for (var n = 0; n < currentWord.length; n++) {
                        txt += "<div class='wld'>" + wordArr[n] + "</div>";
                    }
                    wcnt[wordPos].innerHTML = txt;

                    if (temp1.indexOf(currentWord) < 0) {
                        temp1.push(currentWord);
                        updateCoin(-20);
                        //play("right");
                        if (temp1.length >= levels[currentLevel][0].length) {
                            temp1 = [];
                            temp2 = [];
                            setTimeout(function () {
                                levelComplete();
                                //    startLevel(currentLevel+1);
                            }, 2000)

                            setTimeout(function () {
                                var wls = document.getElementsByClassName("wld");
                                for (var n = 0; n < wls.length; n++) {
                                    wls[n].style.transform = "translateY(" + Math.floor(100 + Math.random() * 200) + "px) rotate(" + Math.floor(Math.random() * 90 - 45) + "deg)";
                                    wls[n].style.opacity = 0;
                                    lContainer.style.transform = "scale(0) rotate(0)";
                                    levelDiv.style.transform = "translateY(-100px)";
                                    shuffleBtn.style.transform = "translateX(-100px)";
                                    hintBtn.style.transform = "translateX(100px)";
                                }
                            }, 1000);
                        }
                        setTimeout(function () {
                            play("right");
                        }, 100);
                    }
                    break;
                }
            }
        }

        hintBtn.addEventListener("click", hint)

        container.style.display = "block";
    }
