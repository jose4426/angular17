import {extract} from '@extractus/article-extractor'
const article = await extract('https://www.bcv.org.ve/')

console.log(article)