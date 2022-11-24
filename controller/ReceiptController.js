const ReceiptService = require("../services/ReceiptService")
const _= require('lodash')
const fs=require('fs')
const file = require("../")
const path = require("path")

module.exports = {
    addReceipt : async (req,res) =>{
        let {body} = req
        try{
            let receipts = await ReceiptService.create(body)
            res.json({flag:true,message:"receipt added",data:receipts})
        }
        catch(e){
            console.log(e)
            res.json({flag:false,message:e.message})
        }
    },
    receiptList : async (req,res) =>{
        let {body} = req
        try{
            let model = {
                start : body.start || 0,
                limit : body.limit || 10
            }
            let receipts = await ReceiptService.findAll(model)
            res.json({flag:true,data:receipts})
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
    },
    getReceipt : async(req,res) =>{
        let {params} = req
        try{
            let receipt = await ReceiptService.findOne(params.id)
            res.json({flag:true,data:receipt})
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
    },
    getReports : async (req,res) =>{
        try{
            return res.sendFile(path.resolve("files", "./receipt.csv"));
        }
        catch(e){
            res.json({flag:false,message:e.message})
        }
    }
}