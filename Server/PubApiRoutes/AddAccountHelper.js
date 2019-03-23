/*
 * @AddAccountHelper.js
 */
"use strict";

const { Client } = require('pg');

class AddAccountHelper {

    constructor() {
		// methods
        this.addAccount = this.addAccount.bind(this);
    }

    addAccount(reqBodyForm) {
        return new Promise((resolve, reject) => {
            console.log(reqBodyForm);

            let currclient = new Client({
                connectionString: process.env.DATABASE_URL,
                ssl: true,
            });

            currclient.connect();

            currclient.query('INSERT INTO Salesforce.Account(Name) VALUES($1) RETURNING ID;', [reqBodyForm.name],(err, res) => {
                if (err){
                    reject();
                }
                currclient.end();
                resolve(res.rows);
            });
        });

    }

}

module.exports = AddAccountHelper;
