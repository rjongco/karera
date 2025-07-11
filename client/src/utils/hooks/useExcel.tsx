import { useState } from "react";
import { TRANSACTIONS_TABLE, USER_MANAGEMENT_TABLE } from "../../constants";
import writeXlsxFile from 'write-excel-file'
import { 
    userExcelschema, 
    trasanctionExcelschema,
 } from "../../constants/excel";
import { getCurrentDateTimeString, getGovtId } from "../logic";

export const useExcel = () => {
    const [dataExcel, setDataExcel] = useState<any | null>([]);
    const [excelType, setExcelType] = useState("");

  const exportExcel = async () => {
    if(excelType === USER_MANAGEMENT_TABLE){
        if(dataExcel?.content){
            const generatedExcelArr:any = dataExcel?.content.map((values:any, i:number) => {
                const sequenceNo = i + 1;
                    const { 
                        firstName, 
                        lastName,   
                        role,
                        status,
                        email,
                        mobile, 
                        birthdate,
                        placeOfBirth,
                        permanentAddress,
                        currentAddress,
                        nationalities,
                        natureOfWork,
                        sourceOfIncome,
                        govtType,
                        govtId,
                        isKYC,
                        createdAt,
                        updatedAt,
                        deletedAt
                    } = values
                
                return {
                        sequenceNo,
                        firstName,
                        lastName,
                        role,
                        status,
                        email,
                        mobile,
                        birthdate:new Date(birthdate),
                        placeOfBirth,
                        provincePermanentAddress: permanentAddress?.province?.name,
                        cityPermanentAddress:permanentAddress?.city?.name,
                        barangayPermanentAddress:permanentAddress?.barangay?.name,
                        streetPermanentAddress:permanentAddress?.street,
                        zipcodePermanentAddress:permanentAddress?.zipCode,
                        
                        provinceCurrentAddress: currentAddress?.province?.name,
                        cityCurrentAddress:currentAddress?.city?.name,
                        barangayCurrentAddress:currentAddress?.barangay?.name,
                        streetCurrentAddress:currentAddress?.street,
                        zipcodeCurrentAddress:currentAddress?.zipCode,

                        nationalities,
                        natureOfWork,
                        sourceOfIncome,
                        govtType: getGovtId(govtType),
                        govtId,
                        isKYC: isKYC ? "Approved" : "Not yet approved",
                        createdAt:new Date(createdAt),
                        updatedAt:new Date(updatedAt),
                        deletedAt:new Date(deletedAt) || ""
                } 
            })

            // Generate unique filename with current datetime
            const currentDateTime = getCurrentDateTimeString();
            const userfileName = `userma_${currentDateTime}.xlsx`;

            await writeXlsxFile(generatedExcelArr, {
                schema: userExcelschema,
                fileName: userfileName
            })
        }
    }else if(excelType === TRANSACTIONS_TABLE){
        if(dataExcel?.content){
            const generatedExcelArrTrans:any = dataExcel?.content.map((values:any, i:number) => {
                    const { 
                        transactionId,
                        callbackId, 
                        createdAt,   
                        type,
                        amount,
                        status,
                        playerName,
                        game_id,
                    } = values

                    return {
                        transactionId:`${transactionId}`,
                        callbackId,
                        createdAt:new Date(createdAt),
                        type,
                        amount:parseFloat(amount).toFixed(2),
                        status,
                        playerName,
                        game_id
                    }
                })

                generatedExcelArrTrans.push({
                    transactionId:"Total",
                    callbackId:"",
                    createdAt:"",
                    type:"",
                    amount: isNaN(dataExcel?.amountTotal,) ? "0.00" : parseFloat(dataExcel?.amountTotal).toFixed(2),
                    status:"",
                    playerName:"",
                    game_id:""
                })

                  // Generate unique filename with current datetime
                const currentDateTime = getCurrentDateTimeString();
                const transactionfileName = `transaction_report_${currentDateTime}.xlsx`;


                await writeXlsxFile(generatedExcelArrTrans, {
                    schema: trasanctionExcelschema,
                    fileName: transactionfileName,
                })
            }
    }
  };

  return {
    dataExcel,
    setExcelType,
    setDataExcel,
    exportExcel,
  };
};
