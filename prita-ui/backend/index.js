const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const { spawn } = require('child_process')
const xlsx = require('xlsx');
const fs = require('fs')
const path = require('path')
const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}));
app.options('*',cors())
app.use(bodyParser.json());


let preSITBranchName = ''
let SITBranchName = ''
const excelPathWithUTC = path.join(__dirname,'OutputRuleNames','output-file.xlsx')
const excelPathWithoutUTC = path.join(__dirname,'OutputRuleNames','outputRuleWithoutTC-file.xlsx')

app.get('/run-command',(req,res) => {
   res.send('Welcome to run command')
})

app.post('/run-command', (req, res) => {
 console.log("Received request",req.body)
  res.set('Access-Control-Allow-Origin', '*');
 const { jarPath } = req.body;
 console.log("jarpath",jarPath)
 if (!jarPath) {
   return res.status(400).send({ error: 'Jar path is required' });
 }
 const command = `java -jar ${jarPath}SavingRuleNames.jar`;
 exec(command, (error, stdout, stderr) => {
   if (error) {
     return res.status(500).send({ error: error.message });
   }
   res.send({ stdout, stderr });
 });
});

app.post('/save-branch',(req,res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  preSITBranchName = req.body.branches;

  const filePath = path.join(__dirname,'branch-name.txt');
  fs.writeFile(filePath,preSITBranchName.toString(),(err)=>{
    if(err){
      console.log("error writing file",err);
      return res.status(500).send({message:"error saving branch to file"})
    }
  })
  res.status(200).send({message:'Branch name saved successfully',preSITBranchName})
})

app.post('/sit-branch-name',(req,res)=>{
  res.set('Access-Control-Allow-Origin', '*');
  SITBranchName = req.body.branch;
  const filePath = path.join(__dirname,'SITbranch-name.txt');
  fs.writeFile(filePath,SITBranchName,(err)=>{
    if(err){
      console.log("error writing file",err);
      return res.status(500).send({message:"error while creating file with branch name"})
    }
  })
  res.status(200).send({message:'Created Input File With Branch Name',SITBranchName})
})

//Function to read data from Excel file and convert it to JSON
function readExcelData(excelFilePath) {
   const workbook = xlsx.readFile(excelFilePath);
   const worksheet = workbook.Sheets[workbook.SheetNames[0]];
   const jsonData = xlsx.utils.sheet_to_json(worksheet);
   console.log("jsondata",jsonData)
   return jsonData;
}

// API endpoint to fetch Excel data
app.get('/api/excel-data', (req, res) => {
// Path to your Excel file
  const data = readExcelData(excelPathWithUTC);
  res.json(data);  // Send JSON data to frontend
});

app.get('/api/excel-without-tc-data', (req, res) => {
  // Path to your Excel file
    const data = readExcelData(excelPathWithoutUTC);
    res.json(data);  // Send JSON data to frontend
  });
  
// app.post('/run-command',(req,res)=>{
//   const { jarPath } = req.body;
//   const jarFilePath = `${jarPath}SavingRuleNames.jar`;
// const javaProcess = spawn('java', ['-jar', jarFilePath]);
// javaProcess.stdout.on('data', (data) => {
//    console.log(`Output: ${data}`);
// });
// javaProcess.stderr.on('data', (data) => {
//    console.error(`Error: ${data}`);
// });
// javaProcess.on('close', (code) => {
//    console.log(`Process exited with code ${code}`);
// });
// })


const PORT = 8080;
app.listen(PORT, () => {
 console.log(`Server is running on port ${PORT}`);
});
