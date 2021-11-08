import express from 'express'
import UserModel from '../../packages/auth/server/model'
import webhookVerification from '../middleware/webhookVerification'
import { i18nextXhr, refreshTranslations } from './controllers/locales'
import circularjson from 'circular-json'
import { hasPermission, hasOwnerRights } from '../../packages/permissions'

import axios from 'axios'
const router = express.Router()

router.post('/test-permission', hasPermission('create'), async (req, res, next) => {
  console.log('IS THIS A LOG FROM C')
})

router.post('/set-document-superadmin', hasOwnerRights, async (req, res, next) => {
  const filter = { _id: req.user._id }
  const upd = await UserModel.findOneAndUpdate(filter, {
    role: 'root'
  })
  res.json({ status: 'ok' })
})

// locales with i18n
router.get('/locales/refresh', webhookVerification, refreshTranslations)
// It's probably a good idea to serve these static assets with Nginx or Apache as well:
router.get('/locales/:locale/:ns.json', i18nextXhr)


router.get('/testya', async (req, res) => {
  const axIn = axios.create({
    headers: {
      'Content-Type': 'application/json; charset=utf-8;',
      'Authorization': 'Bearer AgAAAAAoy1o5AAZuEHPlv1ltUUo9qX2P_wXkPYs',
      'Client-Login': 'saneco1043',
      'Accept-Language': 'ru'
    }
  })

   const body = {
    "method": "get",
    "params": {
      "SelectionCriteria": { },
      "Goals": [ "20002", "20003" ],
      "AttributionModels": [ "LSC" ],
      "FieldNames": [ "Date", "Clicks", 'Ctr', "Impressions", "Conversions", "CostPerConversion", "GoalsRoi", "Revenue", "ConversionRate"], 
      "OrderBy": [{
        "Field": "Date"
      }],
      "ReportName": "Conversions",
      "ReportType": "ACCOUNT_PERFORMANCE_REPORT",
      "DateRangeType": "THIS_MONTH",
      "Format": "TSV",
      "IncludeVAT": "YES",
      "IncludeDiscount": "YES"
    }

    // 'CampaignName',
    // 'Clicks',
    // 'Cost',
    // 'AvgCpc',
    // 'Ctr',
    // 'CostPerConversion',
    // 'Conversions',
    // 'AvgClickPosition',
    // 'BounceRate',
    // 'AvgTrafficVolume'
    // params: {
    //   SelectionCriteria: {},
    //   FieldNames: [
    //     'Id',
    //     'Name',
    //     "BlockedIps", "ExcludedSites", "Currency", "DailyBudget", "Notification", "EndDate", "Funds", "ClientInfo", "Id", "Name", "NegativeKeywords", "RepresentedBy", "StartDate", "Statistics", "State", "Status", "StatusPayment", "StatusClarification", "SourceId", "TimeTargeting", "TimeZone", "Type"
    //   ]
    // }
   }

   const payload = JSON.stringify(body)

   const { data } = await axIn.post('https://api.direct.yandex.com/json/v5/reports', payload)
   console.log(data)
  res.json(data)
})

export default router

// /**
//  * Преобразует данные формата TSV в таблицу
//  *
//  * @param {YaDirect} data Данные в TSV формате
//  * @customfunction
//  */

//  function TSVtoTable(data){
//   var str = data;
//   var x = str.split('\n');
//   for (var i=0; i<x.length; i++) {
//       var y = x[i].split('\t');
//       x[i] = y;
//   }
//     return x;
//   }
  
  
//   /**
//    * Возвращает статисктику из Яндекс Директа
//    *
//    * @param {eh3eldlxoL4iMnoRcAhkGa} yaToken Токен Яндекс Директ
//    * @param {anilange-ss} login Логин клиента в Яндекс Директ
//    * @param {2019-05-24} datefrom Начальная дата отчетного периода в формате YYYY-MM-DD
//    * @param {2019-05-24} dateto Конечная дата отчетного периода в формате YYYY-MM-DD
//    * @param {CampaignName;Clicks;Cost} fields Параметры и показатели отчёта
//    * @param {YES} includeVAT Включая НДС
//    * @param {100000040;1100000041} goals id целей
//    * @param {LYDC} attribution Модель атрибуции
//    * @customfunction
//    */
  
//   function YandexDirectReport(yaToken, login, datefrom, dateto, fields, includeVAT, goals, attribution) {
    
//     var fireURL =  'https://api.direct.yandex.com/json/v5/reports';
//     var fieldsArray = fields.split(';');
//     var reportName = login + "-" + datefrom + "-" + dateto + "-" + fields + "-" + includeVAT + "-" + goals + "-" + attribution;
//     var data = {
//      "method": "get",
//     //  "params": {
//     //     "SelectionCriteria": {
//     //       "DateFrom": datefrom,
//     //       "DateTo": dateto
//     //     },
//     //     "FieldNames": fieldsArray,
//     //     "ReportType": "CUSTOM_REPORT",
//     //     "DateRangeType": "CUSTOM_DATE",
//     //     "IncludeVAT": includeVAT,
//     //     "ReportName": reportName,
//     //     "Format": "TSV",
//     //     "IncludeDiscount": "NO"
//     //  }
//       "params": {
//         "SelectionCriteria": {
//           "Filter": [{
//             "Field": "CampaignId",
//             "Operator": "IN",
//             "Values": [ "10002", "10007" ]
//           }]
//         },
//         "FieldNames": [ "Date", "CampaignId", "Clicks", "Cost" ], 
//         "OrderBy": [{
//           "Field": "Date"
//         }],
//         "ReportName": "Actual Data",
//         "ReportType": "CAMPAIGN_PERFORMANCE_REPORT",
//         "DateRangeType": "AUTO",
//         "Format": "TSV",
//         "IncludeVAT": "YES",
//         "IncludeDiscount": "YES"
//       }
//     };
//     if(goals !== undefined & goals !== null & goals !== "" & goals !== " "){
//       goals = goals.toString();
//       if(goals.match(/;/g)){
//         data.params.Goals = goals.split(';');
//       } else {
//         data.params.Goals = [goals];
//       }
//     };
//     if(goals !== undefined & goals !== null & goals !== "" & goals !== " "){
//       if(attribution !== undefined & attribution !== null & attribution !== "" & attribution !== " "){
//         attribution = attribution.toString();
//         if(attribution.match(/;/g)){
//           data.params.AttributionModels = attribution.split(';');
//         } else {
//           data.params.AttributionModels = [attribution];
//         }
//       }
//     };
//     var options = {
//      'method' : 'post',
//      'headers': {
//        'Authorization' : 'Bearer ' + yaToken,
//        'Content-Type' : 'application/json; charset=utf-8',
//        'Client-Login' : login,
//        'processingMode' : 'offline',
//        'returnMoneyInMicros' : false,
//        'skipReportHeader' : true,
//        'skipReportSummary' : true
//       },
//      'payload' : JSON.stringify(data),
//      'muteHttpExceptions': true
//     };
//     var runCycle = true;
//     while(runCycle){
//       var response =  UrlFetchApp.fetch(fireURL, options);
//       if(response.getResponseCode() === 200){
//         runCycle = false;
//         return TSVtoTable(response.getContentText());
//       }
//       if(response.getResponseCode().toString().match(/^[3-5].*/g)){
//         runCycle = false;
//         var exceptionInfo = [];
//         try{
//           var jsonRes = JSON.parse(response.getContentText());
//           exceptionInfo.push(
//             ['Ошибка'],
//             ['Код ошибки', jsonRes.error.error_code],
//             ['Подробности', LanguageApp.translate(jsonRes.error.error_detail, 'en', 'ru')],
//             ['ID запроса', jsonRes.error.request_id],
//             ['Информация об ошибках из справки Яндекс Директ', 'https://yandex.ru/dev/direct/doc/ref-v5/concepts/errors-list-docpage/']
//           );
//           return exceptionInfo;
//         } catch(e) {
//           exceptionInfo.push(
//             ['Неизвестная ошибка'],
//             ['HTTP код ошибки', response.getResponseCode()],
//             ['Попробуйте выполнить запрос через некоторое время']
//           );
//           return exceptionInfo;
//         }
//       }
//       Utilities.sleep(1000);
//     }
//   };
  
  
//   function createDayTrigger(){
//     var sheetID = SpreadsheetApp.getActive().getId()
//     ScriptApp.newTrigger('YandexDirectReport').timeBased().everyDays(n)
//   };
  
  
//   function createHourTrigger(){
    
//   }
  
  