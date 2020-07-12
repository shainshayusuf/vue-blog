import Vuex from 'vuex'
import Cookie from 'js-cookie'


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
                    localStorage.setItem('token', result.idToken)
                    localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn )*1000)
                    Cookie.set('jwt', result.idToken)
                    Cookie.set('expirationTime', new Date().getTime() + Number.parseInt(result.expiresIn )*1000)
                    this.$axios.$post('http://localhost:3000/api/track-data',{data:"Authenticated"})
                    
                }).catch(e => {
                    console.log(e)
                })
            },
            
            initAuth(vuexContext, req) {
                let token;
                let tokenTime;
                if (req) {
                    if (!req.headers.cookie) {
                        return;
                    }
                    const jwtCookie = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('jwt='))

                    if (!jwtCookie) {
                        return;
                    }
                    token = jwtCookie.split("=")[1];
                    tokenTime = req.headers.cookie
                        .split(';')
                        .find(c => c.trim().startsWith('expirationTime=')).split('=')[1]
                }
                else {
                    token = localStorage.getItem('token');
                    tokenTime = localStorage.getItem('tokenExpiration')

                   
                }
                if (new Date().getTime() > +tokenTime || !token) {
                    
                    vuexContext.dispatch('logout')
                    return;
                }

                
                vuexContext.commit('setToken', token)
            },
            logout(vuexContext){
                vuexContext.commit('clearToken')
                Cookie.remove('jwt')
                Cookie.remove('expirationTime')
                if(process.client){
                    localStorage.removeItem('token')
                    localStorage.removeItem('tokenExpiration')
                }
                
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