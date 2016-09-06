function checkSyntax (arg) {
	var openedStack = [];
	var openSymbols = '{[(<';
	var closeSymbols = '}])>';
	
	for (var i=0;i<arg.length;i++)
	{
		if (openSymbols.indexOf(arg[i])!=-1)
		
			openedStack.push(openSymbols.indexOf(arg[i]));			

		if (closeSymbols.indexOf(arg[i])!=-1)
		{
			if (openedStack.length && openedStack[openedStack.length-1] == closeSymbols.indexOf(arg[i]))
			
				openedStack.pop();
			else 
				return false;
		}
		
	}
	
	if (openedStack.length)
		return false;
	return true;
}