/* Буфер объектов таблиц */
var tableBuffer = [];

/* Компонент таблицы */
var	tableComponent = function (aParams) {
	/* Сохраняем параметры */
	this.$fields = [];
	this.$data = [];
	this.$id = aParams.id;
	this.$topRows = aParams.topRows;

	
	/* Создаем объекты таблицы*/
	(function preCreateTable(aId){

		var elemTableBlock = document.getElementById(aId);
		var elemHeader = document.createElement('div');
		
		elemHeader.className = "st-header";
		
		elemTableBlock.appendChild(elemHeader);
		
		var elemTopRows = document.createElement('div');
		
		elemTopRows.className = "st-top-rows";
		elemTopRows.innerHTML = "rows <select><option>10<option>20<option>50</select>";
		
		elemHeader.appendChild(elemTopRows);
		
		var elemSearchBtn = document.createElement('a');
		
		elemSearchBtn.className = "st-search-btn";
		
		elemSearchBtn.innerHTML = "search";
		
		elemHeader.appendChild(elemSearchBtn);
		
		

		var elemTable = document.createElement('table');
		
		elemTable.className = "table table-bordered table-striped st-table";
		
		elemTableBlock.appendChild(elemTable);
		
		var elemFooter = document.createElement('div');
		
		elemFooter.className = "st-footer";
		
		elemTableBlock.appendChild(elemFooter);
		
		
	})(this.$id);
	/* Методы */
	
	/* Callback функции */
	this.clickOnRow = function (aRow) {
		alert("id = " + aRow.child
		
			 );
	}
	
	// метод добавляет колонки
	this.insertColumn = function (aFields){

		var elemTable = document.querySelector("#" + this.$id + " table");
							
		if (elemTable)
		{
			for (var i=0;i<aFields.length;i++)
			{
				var rows = document.querySelectorAll("#" + this.$id + " tr");

				if (!rows.length)
				{  
					var rowNew = document.createElement("tr");					
					
					elemTable.appendChild(rowNew);
														
					rows = document.querySelectorAll("#" + this.$id + " tr");
					
				}
					
				for(var j=0;j<rows.length;j++)
				{
					var cellNew = document.createElement("td");
						
					if (j==0)
						cellNew.innerHTML = "<a>&#8595;</a>" + aFields[i];
						
							
					rows[j].appendChild(cellNew);
				}

			}
		}
		
	}
	
	// метод добавляет строку
	this.insertRow = function (aCells) {
		var elemTable = document.querySelector("#" + this.$id + " table");
		
		if (elemTable) 
		{
			var rowNew = document.createElement("tr");
			
			elemTable.appendChild(rowNew);
			
			for (var i=0;i<aCells.length;i++)
			{
				var cellNew = document.createElement("td");
				
				cellNew.innerHTML = aCells[i];
				
				rowNew.appendChild(cellNew);
			}
		}
	}
	
	// метод загружает данные из ajax 
	this.uploadData = function (aUrl) {
	
		var xhr = new XMLHttpRequest();
		
		xhr.open('GET', 'http://www.filltext.com/?rows=32&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32%7D', false);
		
		xhr.send();
		
		if (xhr.status != 200) {
			console.log( xhr.status + ': ' + xhr.statusText ); 
		} else {
		
			var jsonParse = JSON.parse(xhr.responseText);
			var context = this;
			var insertColumn = this.insertColumn;
			var insertRow = this.insertRow;
			
			// функция извлекает поля
			function extractFields (data) { 
			
				for (var key in data) {	
					if (typeof data[key] == "object")
					{
						 extractFields(data[key]);
					}
					else
					{   
						// добавляем новый столбец
						insertColumn.call(context,[key]);
					}
				}
			}
			
			// функция извлекает данные
			function extractData (data, outRow) {

				for (var key in data) {
					if (typeof data[key] == "object")
						extractData(data[key],outRow);
					else
					{
						// добавление строки
						outRow.push([data[key]]);
						
					}
				}
				
				// возвращаем строку 
				return outRow;
			}
			
			// добавляем стоблцы к таблице
			extractFields(jsonParse[0]);
			
			// проходим по всем строкам JSON
			for(var i=0;i<jsonParse.length;i++)
			{
				insertRow.call(context,extractData(jsonParse[i],[]));
			}
			
			
			
		//	alert(Object.keys(jsonParse[0]).length);
			/*for(var key in jsonParse[0]) {
				alert(key + " = " + jsonParse[0][key]);
			}*/
		}
		
	}
	
	// метод сортирует данные 
} 

/* Компонент query для таблиц */

var $ = function (aTableId) {
	this.tableIndex = -1;

	for (var i=0;i<tableBuffer.length;i++)
	{

		if (tableBuffer[i].$id == aTableId)
		{
			this.tableIndex = i;
			return tableBuffer[i];
		}
	}  	
	
}

window.onload = function () {
	var tableElements = document.getElementsByClassName('smart-table');
	
	for (var i=0;i<tableElements.length;i++)
	{
		var rows = 20;
		if (tableElements.className == 'st-20')
			rows = 20;
		if (tableElements.className == 'st-50')
			rows = 50;
		var tableNew = new tableComponent({id:tableElements[i].getAttribute('id'),topRows:rows});
		
		

		tableBuffer.push(tableNew);
		
	}

	//$('tb').insertColumn(['id','count']);
	
	//$('tb').insertRow([123,12]);
	//$('tb').insertRow([123,12]);
	//$('tb').insertRow([123,12]);
	
	$('tb').uploadData('ff');
	
	$('tb2').insertColumn(['id','count','name','lastname','email']);
	
	
}