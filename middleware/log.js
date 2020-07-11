export default function(context){
    if(!context.store.getters.isAutenticated){
      context.redirect('/admin/auth/')
    }
}