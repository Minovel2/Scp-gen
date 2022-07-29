let startRoom = 45,type = [],seedNum,degr = [0,1,0,2,0,1,0,3,3,1,3,2,2,1,0],abc = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",floorplan = [], docking = [],i,ochered = [],endrooms = [],placed,floorplanCount,x, x1, count,loop, bigRoom,maxloop = 2, maxBigRoom = 3;
let maxrooms = 50;
let minrooms = 20;

let seed = "XVZJM9EG";
seedNum = "";
for (let j=0;(j<seed.length && j < 8);j++)
seedNum += abc.indexOf(seed[j]);
seedNum = new Random(+seedNum);
let mode;
gen(0);
gen(1);

function gen(n) {
  mode = n;
  start();
  dock();
  mapping();
  showMap();
}

function floor(f,j = 1) {
    for (let i=0; i<100; i+=j)
    f(i);
}

function start() {
floor((i) => floorplan[i] = 0);
floorplanCount = [0,0,0,0];
endrooms.length = 0;
type.length = 0;
nAdd(startRoom);
ochered = [startRoom];
if (mode==1) hard(startRoom);
  
  loop = 0;
  bigRoom = 0;
  while (floorplanCount[3] <= maxrooms && ochered.length > 0) {
  i = ochered.shift();
  placed = false;
  x = i % 10; 
   if (x > 0) 
   visit(i - 1,type[i]);
   if (x < 9) 
   visit(i + 1,type[i]);
   if (i > 9)
   visit(i - 10,type[i]);
   if (i < 90)
   visit(i + 10,type[i]);
   }
  if (loop < maxloop || floorplanCount[3] < minrooms) {
  start.apply(this); 
  return;
  }
  if (mode == 1 && (Math.abs(floorplanCount[1] - floorplanCount[2]) > 10 || !boolSide())) {
  start.apply(this); 
  return;
  }
}

function boolSide(num = 13) {
    let roomC = 0;
  for (let i = 0; (i < 10 && roomC < 2); i++) {
    if (nCount(i*10 + 9) && floorplan[i*10+8] == 5 && floorplan[i*10 + 9] == 5) {
        roomC++;
        floorplan[i*10 + 9] = num;
    }
  }
  if (roomC > 1) return true;
  else return false;
}

function rSide(k) {
  let n = Math.floor(random(2));
  if (n==0)
  return k;
  return -1 * k;
}

function hard(i) {
  ochered.shift();
  let side1 = i+rSide(1), side2 = i+rSide(10);
  nAdd(side1,1);
  nAdd(side2,2);
}

function showMap() {
floor((i) => {
    if (floorplan[i] !== " ")
floorplan[i] = abc[floorplan[i]];
if (type[i] == undefined) type[i] = " ";
});
console.log("Типы:");
floor((j) => console.log(type.slice(j, j + 10)),10);
console.log("Карта:");
floor((j) => console.log(floorplan.slice(j, j + 10)),10);
console.log(`Сид: ${seed}, Колец: ${loop}`);
console.log("Биг рум: " + bigRoom);
console.log("Количество: " + floorplanCount[3]);
console.log("Схема стыковки: ");
floor((j) => console.log(docking.slice(j, j + 10)),10);}

function nAdd(i,type1 = 0) {
    floorplan[i] = 5;
    type[i] = type1;
    floorplanCount[3]++;
    floorplanCount[type1]++;
    ochered.push(i);
    x1 = i % 10;
  if (x1 > 0 && floorplan[i - 1] < 5) floorplan[i - 1] += 1;
  if (x1 < 9 && floorplan[i + 1] < 5) floorplan[i + 1] += 1;
  if (i > 9 && floorplan[i - 10] < 5) floorplan[i - 10] += 1;
  if (i < 90 && floorplan[i + 10] < 5) floorplan[i + 10] += 1;
}

function nCount(i) {
  let x1 = i % 10;
  count = 0;
  line(floorplan,5,x1,i,() => count++)
  if (count == 1) {
    return true;
  } else return false;
}
function line(arr,n,x1,i,f1,f2 = f1,f3=f1,f4=f1) {
  if (x1 > 0 && (arr[i-1] == n || arr[i-1] == undefined))
  f1();
  if (x1 < 9 && (arr[i+1] == n || arr[i+1] == undefined))
  f2();
  if (i > 9 && (arr[i-10] == n || arr[i-10] == undefined))
  f3();
  if (i < 90 && (arr[i+10] == n || arr[i+10] == undefined))
  f4();
}

function nType(i, c = type[i]) {
  let x1 = i % 10;
  count = 0;
  line(type,c,x1,i,() => count++)
  if (x1 == 0) count++;
  if (x1 == 9) count++;
  if (i < 10) count++;
  if (i > 89) count++;
  if (count > 3) return true;
  else return false;
}

function visit(j,from) {
    if (mode == 1 && !nType(j,from))
    return;
    
    if (floorplan[j] == undefined || floorplan[j] > 4)
        return;

    if (random() < 0.5 && j != startRoom + 10)
        return;
        
    if (floorplan[j] > 1 && loop >= maxloop)
        return;
        
    if (floorplanCount[3] >= maxrooms)
        return;
  
    if (loop < maxloop || bigRoom < maxBigRoom) {
      x1 = j % 10;
         if (x1 > 0 && floorplan[j-1] + floorplan[j+9] + floorplan[j+10] > 14) {
           bigR(j,from);
     return;      
    }
    else if (x1 < 9 && floorplan[j+10] + floorplan[j+11] + floorplan[j+1] > 14) {
      bigR(j,from);
     return;
    }
    else if (x1 < 9 && floorplan[j+1] + floorplan[j-9] + floorplan[j-10] > 14) {
      bigR(j,from);
     return;
    }
    else if (x1 > 0 && floorplan[j-10] + floorplan[j-11] + floorplan[j-1] > 14) {
      bigR(j,from);
     return;
    }
    else if (floorplan[j] > 1) {
    nAdd(j,from);
    floorplan[j] = 5;
    loop++;
    } }
     if (floorplan[j] < 2)
    nAdd(j,from);
    return;
}
function bigR(j,from) {
  if (bigRoom < maxBigRoom && random() < 0.6 && floorplan[j] == 2) {
    bigRoom++;
    nAdd(j,from);
  }
}
function dock() {
  floor((j) => {
      x1 = j % 10;
    docking[j] = 0;
    if (floorplan[j] > 4)
    line(floorplan,5,x1,j,() => docking[j] += 8,() => docking[j] += 2,() => docking[j] += 1,() => docking[j] += 4);
  });
}
function Random(seed) {
  seed = (seed || 9) % 2147483647;
  return {
    next: function() {
      return seed = seed * 48271 % 2147483647;
    },
  };
};
function random(n = true) {
  let num1 = `${seedNum.next()}`,num2 = `${seedNum.next()}`;
  let res = parseFloat(`0.${num1[num1.length-2]}${num2[num2.length-2]}${num1[num1.length-4]}${num2[num2.length-4]}`);
  if (n === true)
  return res
  return Math.floor(res*n);
}
function map1(arr,num,min = 1,max = min) {
  for (let j=0;j < random(max-min+1)+min;j++) {
  floorplan[arr.splice(random(arr.length),1)] = num;
  }
}
function mapping() {
    let straight = [], triple = [];
    for (let j = 0; j < 100; j++) {
  if (floorplan[j] == 5 && nCount(j))
  endrooms.push(j);
  if (docking[j] == 5 || docking[j] == 10)
  straight.push(j);
  if (docking[j] == 14 || docking[j] == 13 || docking[j] == 11 || docking[j] == 7)
  triple.push(j);
  if (floorplan[j] < 5)
  floorplan[j] = " ";
  docking[j] = abc[docking[j]];
  if (docking[j] == 0)
  docking[j] = " ";
}
if (mode == 0) {
  map1(endrooms,0);
floorplan[endrooms.pop()] = 1;
floorplan[endrooms.shift()] = 1;
  if (triple.length > straight.length)
  map1(triple,2);
  else map1(straight,2);
  map1(endrooms,3);
  map1(straight,4);
  map1(endrooms,6);
  map1(endrooms,7);
  map1(endrooms,8);
  map1(endrooms,9);
  map1(straight,10,1,3);
  map1(straight,11,2,5);
  }
  if (mode == 1) {
      floorplan[startRoom] = 18;
      floorplan[endrooms.pop()] = 14;
      floorplan[endrooms.shift()] = 14;
      map1(endrooms,15);
      map1(straight,16);
      map1(straight,17,2);
      map1(endrooms,19);
      map1(straight,20,0,3);
      map1(straight,21);
      map1(straight,22);
      map1(triple,23,0,1);
      map1(endrooms,24,0,1);
      floor((i) => {
          if (floorplan[i] == 5)
          floorplan[i] = 12;
      });
  }
}
