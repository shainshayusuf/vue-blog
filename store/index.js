import Vuex from 'vuex'

const createStore =() => {
    return new Vuex.Store({
        state:{
            loadedPosts:[]
        },
        mutations:{
            setPosts(state,posts){
                state.loadedPosts=posts
            }
        },
        actions:{
            nuxtServerInit(vuexContext,context){
                return new Promise(resolve => {
                    setTimeout(() => {
                        vuexContext.commit('setPosts',[{
                              id: '1',
                              title: 'First post',
                              previewText: 'Herman Ostrovskiy',
                              thumbnail:
                              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
                            },
                              {
                                id: '2',
                                title: 'Second post',
                                previewText: 'Herman Ostrovskiy too',
                                thumbnail:
                              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
                              },
                              {
                                id: '3',
                                title: 'Third post',
                                previewText: 'Herman Ostrovskiy too',
                                thumbnail:
                              "https://static.pexels.com/photos/270348/pexels-photo-270348.jpeg"
                              }]
                           )
                      resolve()
                    }, 1000);
                });
            
            },
            setPosts(vuexContext,posts){
                vuexContext.commit('setPosts',posts)
            }
        },
        getters:{
            loadedPosts(state){
                return state.loadedPosts
            }
        }
    })
}

export default createStore