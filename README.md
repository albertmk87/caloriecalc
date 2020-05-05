A calorie tracker app in vanilla js using module pattern. Three controllers, APP,uiCtrl and itemCtrl. In the itemCtrl is the item constructor
plus the state object where the items,the total calories and current item  are kept plus function to get the total calories, add item,delete item
clear all items from the list etc. In the uiCtrl the rendering single item then populating all items to the dom, deleting adding item to the dom etc.
The APP controller has a function loadEventListener plus function to get together the uiCtrl and itemCtrl functions.
Only thing left is to integrate the local storage.
