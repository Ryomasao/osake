import firebase from '~/plugins/firebase'
export default ({ store }) => {
  //SSR falseのplugin
  //Firebase上にユーザーがログインしているかどうかをチェックする
  firebase.auth().onAuthStateChanged(user => {
    if(user) {
      //console.log('user logined')
      store.dispatch('setUser', user)
    } else {
      //console.log('user not logined')
    }
  })
}