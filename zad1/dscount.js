function dscount (args)
{  
	var lowerString = args[0].toLowerCase();
	var count=0;
	
	for(var i=1;i<lowerString.length;i++)
	{
		if (lowerString[i] == args[2] && lowerString[i-1] == args[1])
			count ++;
	}
	return count;
}