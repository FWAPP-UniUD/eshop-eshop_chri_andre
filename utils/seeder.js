import mongoose from 'mongoose';
import md5 from 'md5';
import User from './user';
import config from './config';

mongoose.connect(config.db);

mongoose.connection.dropCollection('users')
    .catch(function() { 
        // do nothing, probably the collection didn't exist
    })
    .finally(function() {
        User.create([{
            email: "test@example.com",
            name: "Test Account",
            password: md5("test")
        }]).then(users => {
            console.log(`${users.length} users created`);
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            mongoose.connection.close();
        });
    });


