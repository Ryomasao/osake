export const getArticles = async ({ $axios }) => {
  try {
    const url ='/articles.json' 
    const loadedArticles = await $axios.$get(url)
    return loadedArticles
  } catch(error) {
    console.log(error)
  }
}