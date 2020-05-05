

const itemCTRL=(function(){
		var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
		};
		class Item {
			constructor(id,name,calories){
				this.id=id;
				this.name=name;
				this.calories=calories
			}
		}

let state={
		items:[],
		currentItem:null,
		totalCalories:0
		
	}

	return {
		getItems:function(){
			return state.items; 
		},
		
		getTotalCalories:function(){
			let total=0;

			state.items.forEach(item=>{
				total+=item.calories;
			})
			return total;
		},

		addItem:function(name,calories){
			calories=parseInt(calories);
			const id=ID();
			const item=new Item(id,name,calories);
			return item;
		},

		clearAllItems:function(){
			state={
			items:[],
			currentItem:null,
			totalCalories:0
		} 
		},
		getItemToEdit(id){
			const item=state.items.find(item=> item.id===id)
			return item;
		},

		setCurrentItem(item){
			state.currentItem=item;
		},
		getCurrentItem:function(){
			return state.currentItem;
			
		},	
		updateItem(newName,newCalories){
			newCalories=parseInt(newCalories);
			let newItem;
			state.items.forEach(item=>{
				if(item.id===state.currentItem.id){
					item.name=newName;
					item.calories=newCalories;
					newItem=item;
				}
			})
				return newItem;
		},
		deleteEl(id){
			const findIndex=state.items.findIndex(item=> item.id===id);
			state.items.splice(findIndex,1);
		}
	}

})();


const uiCTRL=(function(){
	const elements={
		addBtn:".add-btn",
		inputName:"#item-name",
		inputCalories:"#item-calories",
		itemDOM:"#item-list",
		caloriesDOM:".total-calories",
		updateBtn:".update-btn",
		deleteBtn:".delete-btn",
		backBtn:".back-btn",
		clearBtn:".clear-btn",
		editBtn:".fa-pencil",
	}

	function renderSingleItem(item){
		const markUP=`
			<li class="collection-item" id="${item.id}">
        <strong>${item.name} :</strong> <em>${item.calories}Calories</em>
        <a href="#" class="secondary-content">
          <i class="fa fa-pencil"></i>
        </a>
      </li>
		`
		document.querySelector(elements.itemDOM).insertAdjacentHTML("beforeend", markUP);
	}
	return {
		elements:elements,
		getInput:function(){
			return {
				name:document.querySelector(elements.inputName).value,
				calories:document.querySelector(elements.inputCalories).value
			}
			
		},
		clearInput:function(){
			document.querySelector(elements.inputName).value="";
			document.querySelector(elements.inputCalories).value="";
		},

		populateDOM:function(items){
			document.querySelector(elements.itemDOM).innerHTML="";
			items.forEach(item=>{
				renderSingleItem(item);
			})	
		},

		renderCalories(calories){
				document.querySelector(elements.caloriesDOM).textContent=calories;
		},
		hideState(){
				document.querySelector(elements.updateBtn).style.display="none";
				document.querySelector(elements.deleteBtn).style.display="none";
				document.querySelector(elements.backBtn).style.display="none";
					document.querySelector(elements.addBtn).style.display="inline";
		},
		clearDOM(){
				document.querySelector(elements.itemDOM).innerHTML="";
		},
		changeState(){
				document.querySelector(elements.inputName).value=itemCTRL.getCurrentItem().name;
			document.querySelector(elements.inputCalories).value=itemCTRL.getCurrentItem().calories;
			document.querySelector(elements.updateBtn).style.display="inline";
				document.querySelector(elements.deleteBtn).style.display="inline";
				document.querySelector(elements.backBtn).style.display="inline";
					document.querySelector(elements.addBtn).style.display="none";
		},

		deleteElFromDOM(elToDelete){
			elToDelete.parentElement.removeChild(elToDelete);
		}
		
	}

})();


const APP=(function(itemCTRL,uiCTRL){
	let items=itemCTRL.getItems();
	console.log(items);
	const elements=uiCTRL.elements;
		const loadEventListeners=function(){
			document.querySelector(elements.addBtn).addEventListener("click",e=>{
				addItem(e);
				
			})

			document.querySelector(elements.clearBtn).addEventListener("click",e=>{
				clearAll();

				console.log(items);
				const totalCalories=itemCTRL.getTotalCalories();

				uiCTRL.renderCalories(totalCalories);
			})

			document.querySelector(elements.itemDOM).addEventListener("click",e=>{
				if(e.target.matches(`.fa-pencil`)){
					editSubmit(e);
				}
				
			})
			document.querySelector(elements.updateBtn).addEventListener("click", e=>{
				updateOnSubmit(e);
			})
			document.querySelector(elements.backBtn).addEventListener("click", e=>{
				uiCTRL.hideState();
				uiCTRL.clearInput();
			})

			document.querySelector(elements.deleteBtn).addEventListener("click", e=>{
				deleteOnSubmit(e);
			})

		}


		function addItem(e){
			e.preventDefault();
			const name=uiCTRL.getInput().name;
			const calories=uiCTRL.getInput().calories;
			
			if(name!=="" && calories!==""){
				const item=itemCTRL.addItem(name,calories);
				items.push(item);
				console.log(items);
				console.log(item);

				uiCTRL.populateDOM(items);
				const totalCalories=itemCTRL.getTotalCalories();

				uiCTRL.renderCalories(totalCalories);

				uiCTRL.clearInput();
			}
		}

		function editSubmit(e){
			
				const id=(e.target.parentElement.parentElement).id;

				const itemToEdit=itemCTRL.getItemToEdit(id);
				console.log(itemToEdit);
				itemCTRL.setCurrentItem(itemToEdit);
	uiCTRL.changeState();

		}

		function clearAll(){
			
			itemCTRL.clearAllItems();
			items=itemCTRL.getItems();
	uiCTRL.clearDOM();
		}

		function updateOnSubmit(e){
			const currentItem=itemCTRL.getCurrentItem();
			const newName=uiCTRL.getInput().name;
			const newCalories=uiCTRL.getInput().calories;
			const updatedItem=itemCTRL.updateItem(newName,newCalories);
			uiCTRL.populateDOM(items);
uiCTRL.clearInput();	
				const totalCalories=itemCTRL.getTotalCalories();

				uiCTRL.renderCalories(totalCalories);

					uiCTRL.hideState();

		}


			function deleteOnSubmit(e){
						const currentItem=itemCTRL.getCurrentItem();
						const elToDelete=document.querySelector(`#${currentItem.id}`)
						itemCTRL.deleteEl(currentItem.id);
						console.log(elToDelete);
						uiCTRL.deleteElFromDOM(elToDelete);
						const totalCalories=itemCTRL.getTotalCalories();

				uiCTRL.renderCalories(totalCalories);

				uiCTRL.clearInput();
				uiCTRL.hideState();
			 }
	return {
		init:function(){
				loadEventListeners();
				uiCTRL.hideState();
				uiCTRL.populateDOM(items);

				const totalCalories=itemCTRL.getTotalCalories();

				uiCTRL.renderCalories(totalCalories);

		}
	}
		


})(itemCTRL,uiCTRL);



APP.init();