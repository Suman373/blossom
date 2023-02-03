const date = new Date();

export default [
    {
        id:0,
        title:"Nurture spring fundraise",
        about:"Nurture has come up with the donations to the street people from children to old age person",
        orgName:"Nurture",
        amount:"5000",
        deadline:`${date.toLocaleString()}`,
        createdAt:"26tsdjkhskdh",
        status:200
    },
];

/** 
    title:{
        type:String
    },
    about:{
        type:String
    },
    orgName:{
        type:String
    },
    amount:{
        type:String
    },
    deadline:{
        type:Date,
    }
**/