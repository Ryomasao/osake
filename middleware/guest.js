export default async (context) => {
  if(process.server) {
    if(context.store.getters.isLogin) {
      return context.redirect('/')
    }
  }

  if(process.client) {
    if(context.store.getters.isLogin) {
      context.route.push('/')
    }
  }

}