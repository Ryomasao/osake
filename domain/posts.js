import firebase from '~/plugins/firebase'

export const getPosts = async ({ $axios }, offset = 0) => {

  try {
    delete $axios.defaults.headers.common['if-none-match']
    const url ='/articles.json' 
    const loadedPosts = await $axios.$get(url, {
      params: {
        orderBy: '"$key"',
      }
    })
    return loadedPosts
  } catch(error) {
    console.log('Error: getPost ', error)
  }

  return

  // axiosのonRequestではなく一旦クエリパラメータで渡す
  //const token = store.getters.token

  // if-none-matchはetagをもとにしたキャッシュコントロール機能
  // firebaseのqueryを使用するときに、このヘッダがついていると、エラーになるもよう
  // ヘッダを付与しているのではaxiosなのかブラウザなのか不明
  // etagが発行されると、勝手にブラウザが付与する？
  // etagを発行しているのはサーバー側の初回アクセスだろうから、firebase?
  // ブラウザでrestapiを参照してもetagついてないや

  // とりあえずaxiosのheaderを変更する。ここで変更すると他にも影響ありそうなのでどっかで直す
  delete $axios.defaults.headers.common['if-none-match']
  const indexes = await getPostsIndexes($axios)

  // 一度に取得する記事の件数
  const count = 21
  const keys = Object.keys(indexes).sort()
  let index = 0

  //　もうデータはない
  if(offset >= keys.length) {
    return {}
  }

  if(keys.length > 0  ) {
    index = keys[offset]
  }

  try {
    delete $axios.defaults.headers.common['if-none-match']
    const url ='/articles.json' 
    const loadedPosts = await $axios.$get(url, {
      params: {
        orderBy: '"$key"',
        startAt: '"' + index + '"',
        limitToFirst: count,
        //auth: token
      }
    })
    return loadedPosts
  } catch(error) {
    console.log('Error: getPost ', error)
  }
}

const getPostsIndexes = async ($axios) => {

  //const token = store.getters.token

  // https://howtofirebase.com/firebase-data-structures-pagination-96c16ffdb5ca
  // 直近の10件だけとりあえずとってくるパターンをどう実装したらよいのか。
  // firebaseにはoffset的なものがない
  // POSTするときに生成されるkeyはtimestampなので、こちらの利用ができる 
  // とはいえ、オブジェクト中の別のキーをもとにとかはできないかも
  // ここでは、timestampのkeyをもとにやってみる

  try {
    const url ='/articles.json' 
    const data = await $axios.$get(url, {
      params: {
        shallow: true,
        //auth: token
      }
    })
    return data
  } catch(error) {
    console.log('Error: getPostsIndexesError ', error)
  }
}

export const createPost = async ($axios, post, token) => {
  post.imagePath = await uploadImage(post.inputImage.image, post.inputImage.name)
  .catch(error => {
    throw error
  })

  // @ToDo ↑のthorwをすることで、後続が処理されることなく、return されるはず、、、
  // testを書いて、ちゃんとasync await promiseをもっかい理解しよう

  const postedData = await $axios.$post('/articles.json?auth=' + token, post)
  .catch(error => {
    //console.log('%O', error)
    const response = {
      statusCode: error.response.status,
      message: error.message,
    }
    throw response
  })
  
  return postedData
}

export const editPost = async ($axios, { id, post }, token) => {

  // 更新時に、画像が置き換わっていた場合
  if(!post.inputImage.existedImage) {
    post.imagePath = await uploadImage(post.inputImage.image, post.inputImage.name)
    .catch(error => {
      throw error
    })
  } 
  const postedData = await $axios.$put('/articles/' + id + '.json?auth=' + token, post)
  .catch(error => {
    //console.log('%O', error)
    const response = {
      statusCode: error.response.status,
      message: error.message,
    }
    throw response
  })
  
  return postedData
}

const uploadImage =  async(image, imageName) => {
    const storageRef = firebase.storage().ref()
    const imagesRef = storageRef.child('images')
    const spaceRef = imagesRef.child(imageName)

    // 画像のアップロードについてはtokenを指定していない
    // firebase.auth()で認証した状態をもっているんだと思う
    await spaceRef.put(image)
    .catch(error => {
      console.log('Error: uploadImage ', error)
      throw error
    })

    const bucketName = 'osake-d4cfe.appspot.com'
    const filePath = spaceRef.fullPath
    // 画像のURLはこんな形式に設定されるみたい
    const imagePath = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`
    return imagePath
}
