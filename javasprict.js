const FIRST_MARK = 'o';

const NEXT_MARK = 'x';

let count = 1;

const IDS = [
['b1','b2','b3'],
['b4','b5','b6'],
['b7','b8','b9']]

let isRun = true;

function $(id){
  return document.getElementById(id);
}

function isFirstMove(){
  let isFirst = count % 2;
  return isFirst == 1;
}

function changeDisplayCount(){
  if(isFirstMove()){
    $('display-count').innerHTML = FIRST_MARK + 'turn'
  }else{
    $('display-count').innerHTML = NEXT_MARK + 'turn'
  }
}

function judgeEnd(){
  let isEnd = false;
  for(let row=0;row < 3;row++){
    isEnd = isWin(IDS[row][0],IDS[row][1],IDS[row][2])
    if(isEnd){
      displayResult($(IDS[row][0]).value + 'won');
      return true;
    }
  }
  for(let col=0;col <3;col++){
    isEnd = isWin(IDS[0][col],IDS[1][col],IDS[2][col])
    if(isEnd){
      displayResult($(IDS[0][col]).value + 'won');
      return true; }
  }
  isEnd = isWin(IDS[0][0],IDS[1][1],IDS[2][2]);
  if(isEnd){
    displayResult($(IDS[1][1]).value + 'won');
    return true;
  }
  isEnd = isWin(IDS[0][2],IDS[1][1],IDS[2][0]);
  if(isEnd){
    displayResult($(IDS[1][1]).value + 'won')
    return true;
  }
  if(9 <= count){
    displayResult('drow');
    return true;
  }
  return false;
}

function isWin(firstId, secondId, thirdId){
  console.log('syouhai wo hantei suru')
  console.log(firstId)
  console.log(secondId)
  console.log(thirdId)
  if($(firstId).value == ''){
    return false;
  }
  if($(secondId).value == ''){
    return false;
  }
  if($(thirdId).value == ''){
    return false;
  }
  if(
     ($(firstId).value == $(secondId).value)
     && ($(secondId).value == $(thirdId).value)
  ){
    return true;
  }
  return false;
}

function displayResult(message){
  $('display-result').innerHTML = message;
  isRun =false;
  $('reset').style = '';
}


function clickAction(event){
  if(!isRun){
    return;
  }
  let id = event.target.id;
  let object = $(id);
  
  if(object.value != ''){
    return;
  }
  if(isFirstMove()){
    object.value = FIRST_MARK;
  } else {
    object.value = NEXT_MARK
  }
  if(judgeEnd()){
    return;
  }
  count = count + 1;
  changeDisplayCount();
}

function resetAction(){
  count = 1;
  changeDisplayCount();
  $(IDS[0][0]).value = '';
  $(IDS[0][1]).value = '';
  $(IDS[0][2]).value = ''; 
  $(IDS[1][0]).value = '';
  $(IDS[1][1]).value = '';
  $(IDS[1][2]).value = '';
  $(IDS[2][0]).value = '';
  $(IDS[2][1]).value = '';
  $(IDS[2][2]).value = '';
  displayResult('');
  isRun = true;
  $('reset').style.display = 'none';
}

function onloadAction(){
  for(let row=0;row < 3;row++){
    for(let col=0;col < 3;col++){
      $(IDS[row][col]).onclick = clickAction;
    }
  }
  $('reset').onclick = resetAction;
  resetAction();
}

window.onload = onloadAction;
