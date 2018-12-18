import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
    ajax: service(),
    model(params){
        return hash({'user' : this.ajax.request('https://api.github.com/users/'+params.id).then(function(response){
                 return  response;
             })
         })
    },
    actions:{
        redirect(){
            this.transitionTo('users')
        }
    }
});
