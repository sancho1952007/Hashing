const prompt = require('prompt-sync')();
const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

console.log('1) Login\n2) Signup\nChoose Your Option:');
var options = prompt();

if (options.trim()!=''){
    fs.readFile(path.join(__dirname, 'data.json'), (err, data) => {
        if (err){
            console.log(err);
        }
        else{
            data = JSON.parse(data);
            if (options=='1'){
                console.clear()
                console.log('Enter Username: ');
                var username = prompt();
                console.log('\n\nEnter Password: ');
                var password = prompt();
                var hash = crypto.createHmac('sha256', password).update(username).digest('hex');
                if (hash in data){
                    console.log('Welcome, '+data[hash]+'!');
                }
                else{
                    console.log('User Not Found!');
                }
            }
    
            else if (options=='2'){
                console.clear();
                console.log('Enter Your Prefered Username: ');
                var username = prompt();
                console.log('\n\nEnter Your Prefered Password: ');
                var password = prompt();
                var hash = crypto.createHmac('sha256', password).update(username).digest('hex');
                if (hash in data || username in data['usernames']){
                    console.log('Error, User Exists!\nChoose Another Username For Yourself Or Login To An Existing Account...');
                }
                else{
                    data[hash]=username;
                    data['usernames'].push(username);
                    fs.writeFile(path.join(__dirname, 'data.json'), JSON.stringify(data), (err) => {
                        if (err){
                            console.log(err);
                        }
                    });
                }
            }
    
            else{
                process.exit();
            }
        }
    });
}

else{
    process.exit();
}