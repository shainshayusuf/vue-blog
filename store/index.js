import Vuex from 'vuex'


const createStore = () => {
    return new Vuex.Store({
        state: {
            loadedPosts: [],
            token: null
        },
        mutations: {
            setPosts(state, posts) {
                state.loadedPosts = posts
            },
            addPosts(state, post) {
                state.loadedPosts.push(post)
            },
            editPost(state, editedPost) {
                const postIndex = state.loadedPosts.findIndex(post => post.id === editedPost.id)

                state.loadedPosts[postIndex] = editedPost
            },
            setToken(state, token) {
                state.token = token

            },
            clearToken(state){
                state.token = null
            }
        },
        actions: {
            nuxtServerInit(vuexContext, context) {
                return context.app.$axios.$get('/posts.json').then(
                    data => {
                        const postArray = []
                        for (const key in data) {
                            postArray.push({ ...data[key], id: key })
                        }
                        vuexContext.commit('setPosts', postArray)
                    }
                ).catch(e => context.error(e))

            },
            addPosts(vuexContext, post) {
                const createdPost = {
                    ...post,
                    updatedDate: new Date()
                };
                return this.$axios
                    .$post(process.env.baseUrl + "/posts.json?auth=" + vuexContext.state.token, createdPost)
                    .then(data => {
                        vuexContext.commit('addPosts', { ...createdPost, id: data.name })

                    })
                    .catch(e => {
                        console.log(e);
                    });
            },
            editPost(vuexContext, editedPost) {
                return this.$axios.$put(process.env.baseUrl + '/posts/' + editedPost.id + '.json?auth=' + vuexContext.state.token, editedPost).then(res => {
                    vuexContext.commit('editPost', editedPost)
                }).catch(e => {
                    console.log(e)
                })
            },

            setPosts(vuexContext, posts) {
                vuexContext.commit('setPosts', posts)
            },
            authenticateUsers(vuexContext, authData) {
                let authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + process.env.APIkey

                if (!authData.isLogin) {
                    authUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + process.env.APIkey
                }
                return this.$axios.$post(authUrl, {
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }).then(result => {
                    vuexContext.commit('setToken', result.idToken)
                    vuexContext.dispatch('setLogoutTimer',result.expiresIn)
                }).catch(e => {
                    console.log(e)
                })
            },
            setLogoutTimer(duration){
                setTimeout(()=>{
                    vuexContext.commit('clearToken')
                },duration)
            }
        },
        getters: {
            loadedPosts(state) {
                return state.loadedPosts
            },
            isAuthenticated(state) {
                return state.token != null
            }
        }
    })
}

export default createStore