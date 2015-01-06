require('./ai.js');
var fs = require('fs');
var deepExtend = require('deep-extend');
var DEFAULT_PARAM = JSON.parse(fs.readFileSync('../data/default_param.json', 'utf8'));
var MAX_TURN=99;
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
    console.log('[Start]');
    console.log('Blue:level '+blue_level);
    console.log(blue_param);
    console.log('Red:level '+red_level);
    console.log(red_palam);
    
    while(true){
        var level=((turn_player===1)?blue_level+1:red_level+1);
        var param=((turn_player===1)?blue_param:red_palam);
        var rabel=((turn_player===1)?"B":"R");
        
        count+=1;
        if(count>MAX_TURN){
            end=0;  
            break;
        }
        hand=Aijs.thinkAI(map,turn_player,level,undefined,undefined,param)[0];
        map[hand[1]]=map[hand[0]];
        map[hand[0]]=0;
        console.log("-------------")
        console.log(pL(count,2)+":"+rabel+pL(hand[0],2)+"->"+pL(hand[1],2)+"("+pL(map[hand[1]],2)+")")
        console.log(" ")
        printMap(map)
        if(Aijs.isDraw(map)===true){
            end=0;  
            break;
        }
        end=Aijs.isEndX(map,true);
        if(end===1||end===-1){
            break;
        }
        turn_player=turn_player*-1;

    }
    console.log(" ")
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

function shuffleParam(param,change_level,change_count){
    var new_param={};
    deepExtend(new_param, param);
    for(var i=0;i<=change_count;i++){
        var piece =Math.round(Math.random()*7)+1;
        var rank  =Math.round(Math.random()*5);
        var change=((Math.random()*10-5)*change_level)/100;
        new_param[piece][rank]+=Math.round(new_param[piece][rank]*change);
    }
    return new_param;
}
function printMap(map){
    var MAP={   0:-1,10:-2,20:-3,30:-4,40:-5,50:-6,
                1: 0,11:-8,21: 0,31: 0,41:-7,51: 0,
                2: 0,12: 0,22: 0,32: 0,42: 0,52: 0,
                3: 0,13: 0,23: 0,33: 0,43: 0,53: 0,
                4: 0,14: 7,24: 0,34: 0,44: 8,54: 0,
                5: 6,15: 5,25: 4,35: 3,45: 2,55: 1,
             }
    console.log(pL(map[0],2)+pL(map[10],2)+pL(map[20],2)+pL(map[30],2)+pL(map[40],2)+pL(map[50],2));
    console.log(pL(map[1],2)+pL(map[11],2)+pL(map[21],2)+pL(map[31],2)+pL(map[41],2)+pL(map[51],2));
    console.log(pL(map[2],2)+pL(map[12],2)+pL(map[22],2)+pL(map[32],2)+pL(map[42],2)+pL(map[52],2));
    console.log(pL(map[3],2)+pL(map[13],2)+pL(map[23],2)+pL(map[33],2)+pL(map[43],2)+pL(map[53],2));
    console.log(pL(map[4],2)+pL(map[14],2)+pL(map[24],2)+pL(map[34],2)+pL(map[44],2)+pL(map[54],2));
    console.log(pL(map[5],2)+pL(map[15],2)+pL(map[25],2)+pL(map[35],2)+pL(map[45],2)+pL(map[55],2));
}
                
function pL(val,n){
	var leftval = "";
	for(;leftval.length < n;leftval+=' ');
	return (leftval+val).slice(-n);
}
/***
* メイン関数。
***/
function main(){
    var param1=shuffleParam(DEFAULT_PARAM,5,10);
    var param2=shuffleParam(DEFAULT_PARAM,5,10);
    
    play(MAP,2,param1,2,param2);       
}


main();
