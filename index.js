const express = require('express')
const app = express ()
const dotenv= require('dotenv').config()
const bodyParser = require('body-parser')
const nodeSchedule = require("node-schedule");
let receiptRouter = require('./routes/ReceiptRouter')
const ReceiptService = require("./services/ReceiptService")
const moment = require('moment')
const {parse} = require('json2csv');
const fs = require('fs');
const _=require('lodash')
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerDefinition = {
    openapi: '3.0.9',
    info: {
      title: 'Receipt-CSV',
      version: '0.0.1',
    },
    servers: [
        {
          url: 'http://localhost:5000',
          description: 'Receipt CSV server',
        },
      ],
  };
  
  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
  };
  

const swaggerSpec = swaggerJSDoc(options);
  
app.use(express.static('files'))
app.use(bodyParser())
app.use("/api/receipt",receiptRouter)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


let reportMonth = 1

async function generateReport(){
    try{
        let lastMonth = moment().subtract(reportMonth,'months').format()
        console.log(lastMonth)
        
        let allReportLastMonth = await ReceiptService.findAllForReport({
            createdAt: lastMonth
        })    

        let sum = allReportLastMonth.reduce((p,v)=>{
            return (typeof p == 'object' ? parseInt(p.cost) : p) + parseInt(v.cost)
        })

        let category = _.groupBy(allReportLastMonth,'category')
        let categoryArr =[]
        for(const k in category){
            let costs = category[k].reduce((p,n)=>{
                return (typeof p == "object" ? p.cost : p) + n.cost
            })

            
            let totalCost = typeof costs == 'object' ? costs.cost : costs

            categoryArr.push({
                    name: k,
                    cost: totalCost,
                    percentage: ((totalCost * 100) / sum).toFixed(2)
            })
        }

        allReportLastMonth.map(a=>{
            a.percentage = ((a.cost * 100) / sum).toFixed(2) 
            a.createdAt = moment(a.createdAt).format("YYYY MM DD mm:hh:ss")
        })


        const csv = parse(allReportLastMonth, {fields:['category', 'title', 'cost','percentage','createdAt']})
        const csvCategory = parse(categoryArr, {fields:['name','cost',"percentage"]})

        console.log(csv,csvCategory)

         fs.writeFile('./files/receipt.csv', csv, function(err) {
              if (err) throw err;
              console.log('receipt file saved');
        });

        fs.writeFile('./files/receiptCategory.csv', csvCategory, function(err) {
            if (err) throw err;
            console.log('receiptCategory file saved');
      });
    }
    catch(e){
        console.log(e)
    }
    
}

//this will run every 5 min
//currently receipt are generate in every 5 min
nodeSchedule.scheduleJob("*/5 * * * *", () => {
    generateReport()
});

app.listen("5000")