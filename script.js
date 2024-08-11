let gameSeq = [];
let userSeq = [];

let btns = ["pink", "yellow", "purple", "blue"];

let started = false; //state of game if false cause it has not being started yet
let level = 0;

let highestScore = 0;

let userTurn = false; //it tracks whether it's the user's turn to input the sequence or if the game is waiting to show the next sequence. it will prevent to move on to next level if the user has not pressed any button in level 1.

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
	if (!started) {
		console.log("Game started");
		started = true;
		levelUp();
	}
});

function gameFlash(btn) {
	btn.classList.add("flash");
	setTimeout(function () {
		btn.classList.remove("flash");
	}, 300);
}

function userFlash(btn) {
	btn.classList.add("userflash");
	setTimeout(function () {
		btn.classList.remove("userflash");
	}, 300);
	//after 1 sec, userflash class will be removed so the styling will also be removed
}

function levelUp() {
	userSeq = [];
	level++;
	h2.innerText = `Level: ${level}`;
	userTurn = false;

	let randonIdx = Math.floor(Math.random() * 4);
	let randonColor = btns[randonIdx]; //selecting the color from that 'randomIdx'
	let randonBtn = document.querySelector(`.${randonColor}`); //access the button of that color selcted through 'randonColor'

	// console.log(randonIdx);
	// console.log(randonColor);
	// console.log(randonBtn);

	gameSeq.push(randonColor);
	console.log(gameSeq);

	//After choosing random btn, btnFlash function will be executed
	gameFlash(randonBtn);

	setTimeout(() => {
		userTurn = true;
	}, 500); // Give a small delay before allowing the user to start their turn
}

function checkAns(idx) {
	if (userSeq[idx] === gameSeq[idx]) {
		if (userSeq.length == gameSeq.length) {
			setTimeout(levelUp, 1000);
		}
	} else {
		if (level > highestScore) {
			highestScore = level;
		}
		h2.innerHTML = `Game Over! Your score was <b> ${level}</b> 
		<br>Your Highest Score was: <b> ${highestScore}</b> 
		<br>Press any key to Start Again.`;
		document.querySelector("body").style.backgroundColor = "rgb(186, 11, 11)";
		setTimeout(function () {
			document.querySelector("body").style.backgroundColor = "white";
		}, 200);
		reset();
	}
}

function btnPressed() {
	if (!userTurn) return; // Ignore button presses if it's not the user's turn

	let btn = this;
	userFlash(btn);

	userColor = btn.getAttribute("id");

	userSeq.push(userColor);

	checkAns(userSeq.length - 1); //We'll only check the last button
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
	btn.addEventListener("click", btnPressed);
}

function reset() {
	started = false;
	gameSeq = [];
	userSeq = [];
	level = 0;
}
