function drawRating(vote)
{
	var rate = '';
	/* Проверка правильности введенных данных */
	if (vote > 100 || vote < 0 || vote != Math.floor(vote))
		return null;
	
	if (vote == 0)
		return '*****';
		
	for (var i=0;i<100;i+=20)
	{
		if (i<vote)
			rate+='*';
		else
			rate+='0';
	}
	
	return rate;
}