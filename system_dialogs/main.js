/* main.js */

const {app, BrowserWindow, ipcMain} = require('electron');

let win;

function createWindow() { 
   win = new BrowserWindow({width: 800, height: 600});
   /* load local .html file*/
   win.loadURL(`file://${__dirname}/index.html`);
}  

ipcMain.on('openFile', (event, path) => { 
   const {dialog} = require('electron'); 
   const fs = require('fs'); 
   dialog.showOpenDialog(function (fileNames) { 
      
      // fileNames is an array that contains all the selected 
      if(fileNames === undefined) { 
         console.log("No file selected"); 
      
      } else { 
         readFile(fileNames[0]); 
      } 
   });
   
   function readFile(filepath) { 
      fs.readFile(filepath, 'utf-8', (err, data) => { 
         
         if(err){ 
            alert("An error ocurred reading the file :" + err.message); 
            return; 
         } 
         
         // handle the file content 
         event.sender.send('fileData', data); 
      }) 
   } 
})  

app.on('ready', createWindow); 