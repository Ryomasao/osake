export const getPosts = async ({ $axios }, offset = 0) => {

  delete $axios.defaults.headers.common['if-none-match']
  const indexes = await getPostsIndexes($axios)

  // 一度に取得する記事の件数
  const count = 3
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
        limitToFirst: count
      }
    })
    return loadedPosts
  } catch(error) {
    console.log(error)
  }
}

const getPostsIndexes = async ($axios) => {

  // https://howtofirebase.com/firebase-data-structures-pagination-96c16ffdb5ca
  // 直近の10件だけとりあえずとってくるパターンをどう実装したらよいのか。
  // firebaseにはoffset的なものがない
  // POSTするときに生成されるkeyはtimestampなので、こちらの利用ができる 
  // とはいえ、オブジェクト中の別のキーをもとにとかはできないかも
  // ここでは、timestampのkeyをもとにやってみると

  try {
    const url ='/articles.json' 
    const data = await $axios.$get(url, {
      params: {
        shallow: true
      }
    })
    return data
  } catch(error) {
    console.log('error')
  }
}