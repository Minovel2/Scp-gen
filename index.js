let startRoom = 45;
let floorplan = [], docking = [];
let i;
let ochered = [];
let endrooms = [];
let maxrooms = 50;
let minrooms = 20;
let placed;
let floorplanCount;
let x, x1, count;
let loop, bigRoom;
let maxloop = 2, maxBigRoom = 3, abc = "0123456789ABCDEFGHJKLMNPQRSTWXYZ";

let seed = "AB0BA";
let seedNum = "";
for (let j=0;(j<seed.length && j < 8);j++) {
  seedNum += abc.indexOf(seed[j]);
}
console.log(seedNum)
seedNum = new Random(+seedNum);

function start() {
floorFill(floorplan);
floorplanCount = 0;
endrooms.length = 0;
nAdd(startRoom);
ochered = [startRoom];
  
  loop = 0;
  bigRoom = 0;
  while (floorplanCount <= maxrooms && ochered.length > 0) {
  i = ochered.shift();
  placed = false;
  x = i % 10; 
  
   if (x > 0) 
   visit(i - 1);
   if (x < 9) 
   visit(i + 1);
   if (i > 9)
   visit(i - 10);
   if (i < 90)
   visit(i + 10);
   }
  if (loop < maxloop) {
  start.apply(this); 
  return;
  }
  if (floorplanCount < minrooms) {
  start.apply(this);
  return;
  }
}

function nAdd(i, n = 5) {
    floorplan[i] = n;
    floorplanCount++;
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
  line(x1,i,() => count++)
  if (count == 1) {
    return true;
  } else {return false;}
}
function line(x1,i,f1,f2 = f1,f3=f1,f4=f1) {
  if (x1 > 0 && floorplan[i-1] > 4)
  f1();
  if (x1 < 9 && floorplan[i+1] > 4)
  f2();
  if (i > 9 && floorplan[i-10] > 4)
  f3();
  if (i < 90 && floorplan[i+10] > 4)
  f4();
}

function visit(j) {
  if (floorplan[j] == undefined || floorplan[j] > 4)
        return;

    if (random() < 0.5 && j != startRoom + 10)
        return;
        
    if (floorplan[j] > 1 && loop >= maxloop)
        return;
        
    if (floorplanCount >= maxrooms)
        return;
  
    if (loop < maxloop || bigRoom < maxBigRoom) {
      x1 = j % 10;
         if (x1 > 0 && floorplan[j-1] + floorplan[j+9] + floorplan[j+10] > 14) {
           bigR(j);
     return;      
    }
    else if (x1 < 9 && floorplan[j+10] + floorplan[j+11] + floorplan[j+1] > 14) {
      bigR(j);
     return;
    }
    else if (x1 < 9 && floorplan[j+1] + floorplan[j-9] + floorplan[j-10] > 14) {
      bigR(j);
     return;
    }
    else if (x1 > 0 && floorplan[j-10] + floorplan[j-11] + floorplan[j-1] > 14) {
      bigR(j);
     return;
    }
    else if (floorplan[j] > 1) {
    nAdd(j);
    floorplan[j] = 7;
    loop++;
    } }
     if (floorplan[j] < 2)
    nAdd(j);
    return;
}
function bigR(j) {
  if (bigRoom < maxBigRoom && floorplan[j] == 2) {
    bigRoom++;
    nAdd(j,8);
  }
}
function dock() {
  for (let j=0;j<100;j++) {
    x1 = j % 10;
    docking[j] = 0;
    if (floorplan[j] > 4)
    line(x1,j,() => docking[j] += 8,() => docking[j] += 2,() => docking[j] += 1,() => docking[j] += 4);
  }
}
function floorFill(arr) {
  for (let j = 0; j < 100; j++) {
  arr[j] = 0;
}}
function Random(seed) {
  seed = (seed || 1) % 2147483647;
  return {
    next: function() {
      return seed = seed * 48271 % 2147483647;
    },
  };
};
function random() {
  let num1 = `${seedNum.next()}`,num2 = `${seedNum.next()}`,sub1 = num1.substring(num1.length-2),sub2 = num2.substring(num2.length-2);
  let res1 = `${sub1[0]}${num1.substring(1,num1.length-2)}${sub1[1]}`,res2 = `${sub2[0]}${num2.substring(1,num2.length-2)}${sub2[1]}`
  return parseFloat(`0.${res1}${res2}`);
}

start();
dock();
for (let j = 0; j < 100; j++) {
  if (floorplan[j] == 5 && nCount(j)) {
  floorplan[j] = 6;
  endrooms.push(j);
}
  if (floorplan[j] < 5)
  floorplan[j] = " ";
  docking[j] = abc[docking[j]];
  if (docking[j] == 0)
  docking[j] = " ";
}
console.log("Карта:");
for (let j = 0; j < floorplan.length; j += 10) {
  console.log(floorplan.slice(j, j + 10));
}
console.log(`Сид: ${seed}, Колец: ${loop}`);
console.log("Биг рум: " + bigRoom);
console.log("Конечные комнаты: " + endrooms);
console.log("Количество: " + floorplanCount);
console.log("Схема стыковки: ");
for (let j = 0; j < docking.length; j += 10) {
  console.log(docking.slice(j, j + 10));
}
