window.onload=function(){
    init();
}
var s1, s2;
var a=[];
var c;
function ran(){
    for(var i=0; i<100; ++i)s1=(s1*5+s2)%1000000007;
    return s1;
}
function init(){
    play.innerHTML="<input id='s1' placeholder='seed 1'>　<input id='s2' placeholder='seed 2'>　<button onclick='start()'>Start</button>";
}
function start(){
    var r1=document.querySelector('#s1').value, r2=document.querySelector('#s2').value;
    s1=0, s2=0;
    for(var i=0; i<r1.length; ++i)s1+=parseInt(r1[i], 36)*(i+1);
    for(var i=0; i<r2.length; ++i)s2+=parseInt(r2[i], 36)*(i+1);
    s1=s1*s1*s1*s1; s2=s2*s2*s2*s2;
    var b=[]; a=[];
    for(var i=0; i<8; ++i)b.push(i+1);
    for(var i=0; i<5; ++i)b.push(i+1);
    for(var i=0; i<3; ++i)b.push(1);
    for(var i=0; i<16; ++i){
        var k=ran()%(16-i); a.push(b[k]);
        for(var j=k; j<16-i; ++j)b[j]=b[j+1];
    }
    a.push(0);
    c=-1;
    play.innerHTML="<div class='card'><button onclick='fst(1)'>先手</button>　　<button onclick='fst(0)'>後手</button></div>";
}
var d, d2, df, df2, t, sc, sc2;
function fst(x){c=x, d=1-c, d2=c, df=0, df2=0, sc=3, sc2=3, t=1; round();}
function round(){
    ++t;
    if(t>15){
        alert("You: "+String(a[d])+" Opponent: "+String(a[d2]));
        if(sc>sc2||((sc==sc2)&&b[d]>b[d2]))end(1);
        else if(sc<sc2||((sc==sc2)&&b[d]<b[d2]))end(0);
        else end(2);
        return;
    }
    play.innerHTML=String(15-t)+" cards left<br><br>";
    if(c==1){
        df=0;
        play.innerHTML+="<div class='card'><button onclick='f("+String(a[d])+")'>"+String(a[d])+"</button>　　<button onclick='f("+String(a[t])+")'>"+String(a[t])+"</button></div>";
    }
    else{
        df2=0;
        alert("Now you have "+String(a[d]));
        var s="<div class='card'>";
        for(var i=1; i<9; ++i){
            s+="<button onclick='g("+String(i)+")'>"+String(i)+"</button>";
            if(i==4)s+='<br><br>';
            else if(i<8)s+=' ';
        }
        play.innerHTML=s+"</div>";
    }
    c=1-c;
}
function f(x){
    if(x!=a[t])d=t;
    if(df2==0){
        if(x==1){
            var s="<div class='guess'>";
            for(var i=2; i<9; ++i){
                s+="<button onclick='f1("+String(i)+")'>"+String(i)+"</button>";
                if(i==5)s+='<br><br>';
                else if(i<8)s+=' ';
            }
            play.innerHTML=s+"</div>";
        }
        else if(x==2)alert("It's "+String(a[d2])), round();
        else if(x==3){
            alert("It's "+String(a[d2]));
            if(a[d]>a[d2])hp(1), d2=++t;
            else if(a[d]<a[d2])hp(0), d=++t;
            else alert("tie");
            round();
        }
        else if(x==4)df=1, round();
        else if(x==5){
            if(a[d2]==8)end(1);
            alert("It's "+String(a[d2])), d2=++t;
            round();
        }
        else if(x==6){
            var d3=d; d=d2, d2=d3;
            round();
        }
        else if(x==8)hp(0), round();
        else round();
    }
    else round();
}
function f1(x){
    if(x==a[d2])hp(1), d2=++t;
    else alert('Wrong');
    round();
}
function g(x){
    if(x!=a[t])d2=t;
    if(df==0){
        if(x==1){
            var s="<div class='guess'>";
            for(var i=2; i<9; ++i){
                s+="<button onclick='g1("+String(i)+")'>"+String(i)+"</button>";
                if(i==5)s+='<br><br>';
                else if(i<8)s+=' ';
            }
            play.innerHTML=s+"</div>";
        }
        else if(x==3){
            if(a[d2]>a[d])hp(0), d=++t;
            else if(a[d2]<a[d])alert("It's "+String(a[d2])), hp(1), d2=++t;
            else alert('tie');
            round();
        }
        else if(x==4)df2=1;
        else if(x==5){
            if(a[d]==8)hp(0);
            d=++t, round();
        }
        else if(x==6){
            var d3=d; d=d2, d2=d3;
            round();
        }
        else if(x==8)hp(1), round();
        else round();
    }
    else round();
}
function g1(x){
    if(x==a[d])hp(0), d=++t;
    round();
}
function hp(x){
    if(x==1)--sc2, alert('Opponent: --hp');
    else --sc, alert('You : --hp');
    if(sc==0)end(0);
    if(sc2==0)end(1);
}
function end(x){
    if(x==1)play.innerHTML='You win!';
    else if(x==0)play.innerHTML='You lose!';
    else play.innerHTML='Tie';
    play.innerHTML+="<br><br><button onclick='init()'>Play Again</button>"
}