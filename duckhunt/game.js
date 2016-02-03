function draw()
{
	var canvas = document.getElementById("game");
	var ctx = canvas.getContext("2d");	
	var img = document.getElementById("sprites");

	//front images drawn last
	ctx.drawImage(img, 0, 115, 32, 32, 180, 160, 70, 70);
	ctx.drawImage(img, 130, 115, 32, 32, 480, 120, 70, 70);
	ctx.drawImage(img, 260, 155, 32, 32, 300, 400, 70, 70);
	ctx.drawImage(img, 81, 195, 32, 32, 680, 60, 70, 70);
	ctx.drawImage(img, 209, 150, 32, 32, 80, 30, 70, 70);
	ctx.drawImage(img, 0, 273, 78, 121, 0, 100, 277, 430);
	ctx.drawImage(img, 0, 720, 800, 180, 0, 420, 800, 180);
	ctx.drawImage(img, 0, 0, 60, 44, 400, 476, 100, 73);
	
}
