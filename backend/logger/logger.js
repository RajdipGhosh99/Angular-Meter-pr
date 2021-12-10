const { createLogger ,transports,format, } = require('winston');
require("winston-mongodb")

const logger= createLogger({
    transports:[
        new transports.File({
            level:"info",
            filename:"logtxt.json",
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            level: "error",
            filename: "errortxt.json",
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.MongoDB({
            level:"info",
            db:"mongodb://localhost:27017/MeterAPP",
            collection:"log"
        }),
        new transports.MongoDB({
            level: "error",
            db: "mongodb://localhost:27017/MeterAPP",
            options: { useUnifiedTopology: true, useNewUrlParser: true},
            collection: "errorLog"
        })
    ]
})

module.exports=logger;