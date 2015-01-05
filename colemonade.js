require('./ai.js');
var fs = require('fs');
var DEFAULT_PARAM = JSON.parse(fs.readFileSync('./default_param.json', 'utf8'));
var MAX_TURN=255;
var MAP={   0:-1,10:-2,20:-3,30:-4,40:-5,50:-6,
                1: 0,11:-8,21: 0,31: 0,41:-7,51: 0,
                2: 0,12: 0,22: 0,32: 0,42: 0,52: 0,
                3: 0,13: 0,23: 0,33: 0,43: 0,53: 0,
                4: 0,14: 7,24: 0,34: 0,44: 8,54: 0,
                5: 6,15: 5,25: 4,35: 3,45: 2,55: 1,
             }

/***
* 任意のレベル、任意の評価関数で対局を行う。
***/
function play(baseMap,blue_level,blue_param,red_level,red_palam){
    var turn_player=1;
    var end;
    var map=Aijs.copyMap(baseMap);
    var count=0;
    while(true){
        var level=((turn_player===1)?blue_level+1:red_level+1);
        var param=((turn_player===1)?blue_param+1:red_palam+1);
        
        count+=1;
        if(count>MAX_TURN){
            end=0;  
            break;
        }
        hand=Aijs.thinkAI(map,turn_player,3,undefined,undefined,param)[0];
        map[hand[1]]=map[hand[0]];
        map[hand[0]]=0;
        if(Aijs.isDraw(map)===true){
            end=0;  
            break;
        }
        end=Aijs.isEndX(map,false);
        if(end===1||end===-1){
            break;
        }
        turn_player=turn_player*-1;
    }
    switch(end){
        case 0:
            console.log('Draw');
            break;
        case 1:
            console.log('Blue win!');
            break;
        case -1:
            console.log('Red win!');
            break;
    }
    return end;
}

/***
* メイン関数。
***/
function main(){
    play(MAP,2,DEFAULT_PARAM,2,DEFAULT_PARAM);       
}

main();
