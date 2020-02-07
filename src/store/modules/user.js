const user = {
    state : sessionStorage.getItem('UserState') ? JSON.parse(sessionStorage.getItem('UserState')) : {
        user: {
            id:'',
            username:'',
            token: ''
        }
    },

    getters : {
        getUser(state) {
            return state.user;
        }
    },

    mutations : {
        updateUser(state,user) {
            state.user = user;
        }
    },

    actions : {
        asyncUpdateUser(context, user) {
            context.commit('updateUser', user);
        }
    }
};

export default user;
