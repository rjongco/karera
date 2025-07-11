export const userExcelschema:any = [
    {
        column: 'No.',
        type: Number,
        value: (user: {sequenceNo:string}) => user.sequenceNo
    },
    {
        column: 'First Name',
        type: String,
        value: (user: {firstName:string}) => user.firstName
    },
    {
        column: 'Last Name',
        type: String,
        value: (user: {lastName:string}) => user.lastName
    },
    {
        column: 'Role',
        type: String,
        value: (user: {role:string}) => user.role
    },
    {
        column: 'Status',
        type: String,
        value: (user: {status:string}) => user.status
    },
    {
        column: 'Email',
        type: String,
        value: (user: {email:string}) => user.email
    },
    {
        column: 'Mobile',
        type: String,
        value: (user: {mobile:string}) => user.mobile
    },
    {
        column: 'Birthdate',
        type: Date,
        format: 'mm/dd/yyyy',
        value: (user: {birthdate:string})  => user.birthdate
    },
    {
        column: 'Place of Birth',
        type: String,
        value: (user: {placeOfBirth:string}) => user.placeOfBirth
    },
    {
        column: 'Province (Permanent Address)',
        type: String,
        value: (user: {provincePermanentAddress:string}) => user.provincePermanentAddress
    },
    {
        column: 'City (Permanent Address)',
        type: String,
        value: (user: {cityPermanentAddress:string}) => user.cityPermanentAddress
    },
    {
        column: 'Barangay (Permanent Address)',
        type: String,
        value: (user: {barangayPermanentAddress:string}) => user.barangayPermanentAddress
    },
    {
        column: 'Street (Permanent Address)',
        type: String,
        value: (user: {streetPermanentAddress:string}) => user.streetPermanentAddress
    },
    {
        column: 'Zip Code (Permanent Address)',
        type: String,
        value: (user: {zipcodePermanentAddress:string}) => user.zipcodePermanentAddress
    },

    {
        column: 'Province (Current Address)',
        type: String,
        value: (user: {provinceCurrentAddress:string}) => user.provinceCurrentAddress
    },
    {
        column: 'City (Current Address)',
        type: String,
        value: (user: {cityCurrentAddress:string}) => user.cityCurrentAddress
    },
    {
        column: 'Barangay (Current Address)',
        type: String,
        value: (user: {barangayCurrentAddress:string}) => user.barangayCurrentAddress
    },
    {
        column: 'Street (Current Address)',
        type: String,
        value: (user: {streetCurrentAddress:string}) => user.streetCurrentAddress
    },
    {
        column: 'Zip Code (Current Address)',
        type: String,
        value: (user: {zipcodeCurrentAddress:string}) => user.zipcodeCurrentAddress
    },

    {
        column: 'Nationalities',
        type: String,
        value: (user: {nationalities:string}) => user.nationalities
    },
    {
        column: 'Nature of Work',
        type: String,
        value: (user: {natureOfWork:string}) => user.natureOfWork
    },
    {
        column: 'Source of Income',
        type: String,
        value: (user: {sourceOfIncome:string}) => user.sourceOfIncome
    },
    {
        column: 'Government Type',
        type: String,
        value: (user: {govtType:string}) => user.govtType
    },
    {
        column: 'Government ID',
        type: String,
        value: (user: {govtId:string}) => user.govtId
    },
    {
        column: 'isKYC',
        type: String,
        value: (user: {isKYC:String})  => user.isKYC
      },
    {
        column: 'Created At',
        type: Date,
        format: 'mm/dd/yyyy',
        value: (user: {createdAt:string})  => user.createdAt
    },
    {
        column: 'Updated At',
        type: Date,
        format: 'mm/dd/yyyy',
        value: (user: {updatedAt:string})  => user.updatedAt
    },
    {
        column: 'Deleted At',
        type: Date,
        format: 'mm/dd/yyyy',
        value: (user: {deletedAt:string})  => user.deletedAt
    },
  ];

export const trasanctionExcelschema:any = [
    {
        column: 'Transaction ID',
        type: String,
        value: (transaction: {transactionId:string}) => transaction.transactionId
    },
    {
        column: 'Reference ID',
        type: String,
        value: (transaction: {callbackId:string}) => transaction.callbackId
    },
    {
        column: 'Date Created',
        type: Date,
        format: 'mm/dd/yyyy',
        value: (transaction: {createdAt:string})  => transaction.createdAt
    },
    {
        column: 'Transaction Type',
        type: String,
        value: (transaction: {type:string}) => transaction.type
    },
    {
        column: 'Amount',
        type: String,
        value: (transaction: {amount:string }) => transaction.amount
    },
    {
        column: 'Status',
        type: String,
        value: (transaction: {status:string}) => transaction.status
    },
    {
        column: 'Player',
        type: String,
        value: (transaction: {playerName:string}) => transaction.playerName
    },
    {
        column: 'Game ID',
        type: Number,
        value: (transaction: {game_id:number}) => transaction.game_id
    },
];

  