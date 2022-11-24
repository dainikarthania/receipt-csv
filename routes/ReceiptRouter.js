let express = require('express'),
    router = express.Router();
let {addReceipt,getReceipt,receiptList,getReports} = require('../controller/ReceiptController')
let validator = require('../schema')
/**
 * @swagger
 * /:
 *  post: 
 *    tags:
 *     - Receipt
 *    summary: add new receipt 
 *    description: user will add new receipt
 *    operationId: addReceipt
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 enum:
 *                   - Entertainment
 *                   - Transport
 *                   - Groceries
 *                   - Shopping
 *                   - Other
 *               title:
 *                   type: string
 *                   minimum: 3
 *                   maximum: 100
 *               cost:
 *                   type: number
 *                   minimum: 10
 *       required: true
 *      responses:
 *       "200":
 *         description: receipt added 
 *    
 */
router.post("/",validator("addReceipt"),addReceipt)
/**
 * @swagger
 *  /list:
 *    post: 
 *      tags:
 *        - Receipt
 *      summary: get all receipt 
 *      description: user will get all receipt in list
 *      operationId: receiptList
 *      requestBody:
 *        content:
 *          application/json:
 *             schema:
 *                type: object
 *                properties:
 *                  start:
 *                    type: number
 *                     example: 0
 *                   limit:
 *                     type: number
 *                     example: 10
 *         required: true
 *      responses:
 *        "200":
 *          description: receipt list found
 *    
 */
router.post("/list",validator("list"),receiptList)
/**
 * @swagger
 * /${id}:
 *  get: 
 *    tags:
 *      - Receipt
 *    summary: get receipt details 
 *    description: user will get receipt details via id
 *    parameters:
 *       - name: id
 *         in: path
 *         description: id will find receipt details
 *         required: true
 *         schema:
 *           type: string     
 *    operationId: getReceipt
 *     responses:
 *       "200":
 *         description: receipt found
 *    
 */
router.get("/:id",getReceipt)
/**
 * @swagger
 * /get/reports:
 *  get: 
 *    tags:
 *      - Receipt
 *    summary: get receipt reports 
 *    description: user will get receipt reports    
 *    operationId: getReports
 *     responses:
 *       "200":
 *         description: reports found
 *    
 */
router.get("/get/reports",getReports)


module.exports = router
