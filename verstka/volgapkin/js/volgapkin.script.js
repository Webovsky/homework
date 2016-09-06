/* Скрипт динамического создания элементов */
window.onload = function () {
	var elementsStarRating = document.getElementsByClassName('star-rating');
			
	for (var i=0;i<elementsStarRating.length;i++)
	{
		for (var rate=1;rate<=5;rate++)
		{
			var elemStar = document.createElement ("div");
			var rt = rate;
									
			elemStar.onclick = function (x) 
			{	
				return function() 
				{
					this.parentNode.className = "star-rating rate-" + x;
				}
			}(rt);
					
			elementsStarRating[i].appendChild(elemStar);
		}
				
	}
}