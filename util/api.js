const config = require('../config.json');
const express = require('express')
const { createConnection } = require('mysql')
const con = createConnection(config["mysql"]);
const app = express()

// Made by Jordan.#2139 & Hyperz#0001
// Made by Jordan.#2139 & Hyperz#0001
// Made by Jordan.#2139 & Hyperz#0001

module.exports = {
    async apistart(client) {
        app.listen(3017, null, null, () => console.log(`API is up and running on port 3017.`));
        // Statistics
        app.get('/stats', function(req, res) { // Stats api
                res.set('Access-Control-Allow-Origin', '*');
                con.query(`SELECT COUNT(*) as total FROM bannedusers`, (erro, rowo) => {
                    con.query(`SELECT COUNT(caseid) as total FROM cases`, (errol, rowol) => {
                        res.send({ 'guilds': client.guilds.cache.size, 'banned': rowo[0].total, 'cases': rowol[0].total })
                    })
                })
            })
            // Case Checking (Via case ID)
        app.get(`/case-:caseID`, async function(req, res) {
                res.set('Access-Control-Allow-Origin', '*');
                const caseid = await req.params.caseID
                con.query(`SELECT * FROM cases WHERE caseid="${caseid}"`, async(err, row) => {
                    if (err) throw err;
                    if (row[0]) {
                        res.send({
                            'number': row[0].caseid,
                            'enforcertag': row[0].enforcertag,
                            'enforcerid': row[0].enforcerid,
                            'usertag': row[0].caseusertag,
                            'userid': row[0].caseuserid,
                            'reason': row[0].casereason
                        })
                    } else {
                        res.send({
                            'error': 'Not a valid case ID',
                        })
                    }
                });
            })
            // Staff DB (see if user is staff on the bot)   
        app.get(`/staff-:userID`, async function(req, res) {
                res.set('Access-Control-Allow-Origin', '*');
                const userid = await req.params.userID
                con.query(`SELECT * FROM staff WHERE userid="${userid}"`, async(err, row) => {
                    if (err) throw err;
                    if (row[0]) {
                        res.send({
                            'isStaff': true,
                            'usertag': row[0].usertag,
                            'userid': row[0].userid,
                        })
                    } else {
                        res.send({
                            'isStaff': false
                        })
                    }
                });
            })
            // Ban viewing
        app.get(`/bans-:userID`, async function(req, res) {
                res.set('Access-Control-Allow-Origin', '*');
                const userid = await req.params.userID
                con.query(`SELECT * FROM bannedusers WHERE userid="${userid}"`, async(err, row) => {
                    if (err) throw err;
                    if (row[0]) {
                        res.send({
                            'banned': true,
                            'usertag': row[0].usertag,
                            'userid': row[0].userid,
                            'reason': row[0].reason,
                            'proof': row[0].proof,
                            'bandate': row[0].bandate
                        })
                    } else {
                        res.send({
                            'banned': false
                        })
                    }
                });
            })
            // Guild viewing
        app.get(`/guilds-:guildID`, async function(req, res) {
            res.set('Access-Control-Allow-Origin', '*');
            const guildid = await req.params.guildID
            con.query(`SELECT * FROM guilds WHERE id="${guildid}"`, async(err, row) => {
                if (err) throw err;
                if (row[0]) {
                    res.send({
                        'indb': true,
                        'active': row[0].active,
                        'name': row[0].name,
                        'autobans': row[0].autobans,
                        'autounbans': row[0].autounbans,
                        'altprev': row[0].altprev,
                        'altprevage': row[0].altprevage
                    })
                } else {
                    res.send({
                        'indb': false
                    })
                }
            });
        })
    }
}

// Made by Jordan.#2139 & Hyperz#0001
// Made by Jordan.#2139 & Hyperz#0001
// Made by Jordan.#2139 & Hyperz#0001
