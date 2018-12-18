import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';

export default Route.extend({
    ajax: service(),
    model(){
        return hash({'users' : this.ajax.request('https://api.github.com/users').then(function(response){
                return  response;
            })
        })
    }
});
