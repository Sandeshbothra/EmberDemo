import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
    shortListedUser:[],
    allUser:null,
    allUser : computed('model.users',function(){
        if(this.model.users && this.model.users.length>0 && this.model.users.length >8){
            return this.model.users.slice(0,8);
        }else{
            return this.users
        }
    }),
    actions:{
        textEntered(){
            let searchVal = $('input[name=searchUser]').val();
            let users = this.model.users;
            let searched = searchVal == '' ? users : [];
            if(searchVal != ''){
                users.forEach(function(user){
                    if(user.login.indexOf(searchVal.toLowerCase()) >= 0){
                        searched.pushObject(user)
                    }
                });
            }
            this.set('allUser',searched.slice(0,8));
        },
        addToShortListed(user){
            let allUser = this.allUser;
            this.shortListedUser.pushObject(user);
            allUser.removeObject(user);
            this.set('allUser',allUser);
            this.notifyPropertyChange('allUser')
        },

        removeFromAlluser(user){
            let users = this.model.users;
            users.removeObject(user)
            this.set('model.user',users);
            this.notifyPropertyChange('allUser')
            $('input[name=searchUser]').val('');
            $('input[name=searchUser]').trigger('input');
        },
        
        removeShortlistedUser(user,index){
            let shortListedUser = this.shortListedUser;
            shortListedUser.splice(index,1);
            this.allUser.pushObject(user);
            this.set('shortListedUser',shortListedUser);
            this.notifyPropertyChange('shortListedUser');

        }
    }
});
