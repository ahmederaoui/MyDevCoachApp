import mutations from './mutations.js'
import getters from './getters'
import actions from './actions'

export default{
    namespaced : true,
    state() {
        return {
            lastFetch : null,
            coaches:[
            {
                id:'c1',
                firstName : "ahmed",
                lastName : "eraoui",
                areas : ['frontend','backend','career'],
                description :"I'am Ahmed Eraoui. i'm a senior developer how will have his own startup",
                hourlyRate:30
            },
            {
                id:'c2',
                firstName : "anas",
                lastName : "nedday",
                areas : ['frontend','career'],
                description :"I'am anas nedday. i'm a je developer how will have his own startup",
                hourlyRate:30
            }

            ]
        }
    },
    mutations,
    actions,
    getters
}