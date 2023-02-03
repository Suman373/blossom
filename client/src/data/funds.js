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
    {
        id:1,
        title:"SKS Shikshya fundraise",
        about:"SKS is going to raise funds to help the schools in village located in Birbhum",
        orgName:"SKS",
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